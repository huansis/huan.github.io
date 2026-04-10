<script setup lang="ts">
import { ClipboardList, Trash2, Send, Globe, Weight, User, Mail, Loader2 } from 'lucide-vue-next'
// 引入 Sheet 相关的组件
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
} from '@/components/ui/sheet'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'

import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
    InputGroupInput,
    InputGroupText,
    InputGroupTextarea,
} from '@/components/ui/input-group'

import {toast} from 'vue-sonner'
const config = useRuntimeConfig()
const { basket, isDrawerOpen, removeFromBasket, clearBasket } = useProductInquiry()
import { useForm } from 'vee-validate';
import { productInquirySchema } from '~/utils/productInquiryValidation';
import { countryList } from '~/utils/countries' //
const accessKey = config.public.web3FormsKey
const countries = countryList
const { handleSubmit, resetForm } = useForm({
    validationSchema: productInquirySchema,
})
const isSubmitting = ref(false)
const onSubmit = handleSubmit(
  async (values) => {
    isSubmitting.value = true

    // A. 格式化产品清单，让邮件内容更易读
    const productListString = basket.value
      .map((item, index) => `${index + 1}. ${item.name} (CAS: ${item.cas})`)
      .join('\n')

    // B. 构建发送给 Web3Forms 的完整负载
    const payload = {
      ...values, // 包含 fullName, email, weight, country
      access_key: accessKey,
      subject: `New Bulk Inquiry: ${basket.value.length} Products Selected`,
      // 将产品清单拼接到 message 字段发送
      message: `
        Customer Details:
        - Name: ${values.fullName}
        - Email: ${values.email}
        - Destination: ${values.country}
        - Est. Weight: ${values.weight || 'Not specified'} Kg

        Selected Products:
        ${productListString}
      `.trim()
    }

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json()

      if (data.success) {
        // 成功反馈
        toast.success('Inquiry sent successfully!', {
          description: 'Our team will contact you with the quotation shortly.'
        })
        
        // 关闭抽屉并清理
        isDrawerOpen.value = false
        resetForm()      // 重置表单文字
        
        // 如果有清空购物车的方法，建议在这里执行
        if (clearBasket) clearBasket() 
        
      } else {
        throw new Error(data.message || 'Submission failed')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to send inquiry, please try again.')
    } finally {
      isSubmitting.value = false
    }
  },

  // --- 失败回调：校验未通过时执行 ---
  (errors) => {
    console.warn('Form Validation Failed:', errors)
    toast.error('Please complete the required fields correctly.')
  }
)
</script>

<template>
    <div>
        <!-- 1. 右下角悬浮球：保持不变，它是触发器 -->
        <Transition name="bounce">
            <div v-if="basket?.length > 0 && !isDrawerOpen" @click="isDrawerOpen = true"
                class="fixed bottom-10 right-10 z-[100] cursor-pointer group scale-100 active:scale-90 transition-transform">
                <div
                    class="absolute -top-2 -right-2 bg-emerald-500 text-white text-[10px] font-bold h-6 min-w-[24px] px-1 rounded-full flex items-center justify-center border-4 border-white shadow-sm">
                    {{ basket.length }}
                </div>
                <div
                    class="bg-[#00378a] text-white pl-6 pr-8 py-4 rounded-full shadow-[0_20px_50px_rgba(0,55,138,0.3)] flex items-center gap-3 hover:bg-[#002d70] transition-all">
                    <ClipboardList size="20" />
                    <span class="text-xs font-bold uppercase tracking-widest">Inquiry Basket</span>
                </div>
            </div>
        </Transition>

        <!-- 2. 使用 Shadcn Sheet 替换原来的 Transition + Div -->
        <Sheet v-model:open="isDrawerOpen">
            <!-- side="right" 确保从右侧滑出，sm:max-w-lg 设置宽度 -->
            <SheetContent side="right" class="sm:max-w-[450px] p-0 flex flex-col gap-0 border-l">

                <!-- 抽屉头部 -->
                <SheetHeader class="p-6 border-b bg-slate-50/50 text-left">
                    <SheetTitle class="text-xl font-bold text-[#001f4e]">Inquiry List</SheetTitle>
                    <SheetDescription class="text-[11px] text-slate-400 uppercase tracking-wider">
                        Review your selected items before requesting a quote
                    </SheetDescription>
                </SheetHeader>

                <!-- 选中的产品列表 (增加滚动区) -->
                <div class="flex-1 overflow-y-auto p-6 space-y-4">
                    <div v-if="basket.length === 0" class="py-20 text-center text-slate-300">
                        Your basket is empty.
                    </div>

                    <div v-for="item in basket" :key="item.id"
                        class="flex gap-4 p-4 border border-slate-100 rounded-2xl relative group bg-white hover:border-slate-200 transition-colors">
                        <div class="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center shrink-0">
                            <img :src="item.molecule_img" class="w-12 h-12 object-contain" />
                        </div>
                        <div class="flex-1 text-left">
                            <div class="text-[10px] font-bold text-[#00378a] uppercase tracking-tighter">REF: #{{
                                item.id }}</div>
                            <div class="font-bold text-[#001f4e] text-base leading-tight mt-0.5">{{ item.name }}</div>
                            <div class="text-[11px] text-slate-400 mt-1 font-mono">CAS: {{ item.cas }}</div>
                        </div>
                        <button @click="removeFromBasket(item.id)"
                            class="absolute top-4 right-4 text-slate-300 hover:text-red-400 transition-colors">
                            <Trash2 size="16" />
                        </button>
                    </div>
                </div>

                <!-- 底部表单区 -->
                <div class="p-6 border-t bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.02)]">
                    <form @submit="onSubmit" class="space-y-4">

                        <div class="grid grid-cols-2 gap-4">
                            <!-- 1. 重量输入 (带单位) -->
                            <FormField v-slot="{ componentField }" name="weight">
                                <FormItem class="space-y-1.5">
                                    <FormLabel
                                        class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 ml-1">
                                        <Weight size="10" /> Est. Weight
                                    </FormLabel>
                                    <div class="relative">
                                        <FormControl>
                                            <Input placeholder="0" v-bind="componentField"
                                                class="pl-4 pr-12 text-slate-900 h-12 rounded-xl bg-slate-50 border-slate-100 focus-visible:ring-[#00378a]/10 focus-visible:border-[#00378a]" />
                                        </FormControl>
                                        <span
                                            class="absolute right-4 top-1/2 -translate-y-1/2 text-[12px] font-bold text-slate-400">Kg</span>
                                    </div>
                                    <FormMessage class="text-[10px] text-red-500" />
                                </FormItem>
                            </FormField>

                            <!-- 4. 国家选择 -->
                            <FormField v-slot="{ componentField }" name="country">
                                <FormItem class="space-y-1.5 text-left">
                                    <FormLabel
                                        class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 ml-1">
                                        <Globe size="10" /> Destination
                                    </FormLabel>

                                    <Select v-bind="componentField">
                                        <FormControl>
                                            <!-- 核心修改：增加 text-slate-900 确保选中后的文字是深色 -->
                                            <SelectTrigger
                                                class="h-12 rounded-xl bg-slate-50 border-slate-100 text-slate-900 font-medium focus:ring-[#00378a]/10">
                                                <SelectValue placeholder="Select" class="placeholder:text-slate-300" />
                                            </SelectTrigger>
                                        </FormControl>

                                        <!-- 核心修改：增加 bg-white 和 shadow-xl 确保下拉框不透明且有层次感 -->
                                        <SelectContent
                                            class="z-[210] max-h-[600px] bg-white border border-slate-100 shadow-xl rounded-xl">
                                            <SelectGroup>
                                                <!-- 核心修改：给每一个 Item 增加 text-slate-900 和 hover 效果 -->
                                                <SelectItem v-for="c in countries" :key="c" :value="c"
                                                    class="text-slate-900 font-medium py-2.5 focus:bg-slate-50 focus:text-[#00378a] cursor-pointer transition-colors">
                                                    {{ c }}
                                                </SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>

                                    <FormMessage class="text-[10px] text-red-500 font-medium ml-1" />
                                </FormItem>
                            </FormField>
                        </div>

                        <!-- 2. 全名 -->
                        <FormField v-slot="{ componentField }" name="fullName">
                            <FormItem class="space-y-1.5 text-left">
                                <FormLabel
                                    class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 ml-1">
                                    <User size="10" /> Full Name
                                </FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter your name" v-bind="componentField"
                                        class="h-12 text-slate-900 rounded-xl bg-slate-50 border-slate-100 focus-visible:ring-[#00378a]/10" />
                                </FormControl>
                                <FormMessage class="text-[10px] text-red-500" />
                            </FormItem>
                        </FormField>

                        <!-- 3. 邮箱地址 -->
                        <FormField v-slot="{ componentField }" name="email">
                            <FormItem class="space-y-1.5 text-left">
                                <FormLabel
                                    class="text-[10px] font-bold text-slate-400 uppercase flex items-center gap-1.5 ml-1">
                                    <Mail size="10" /> Email Address
                                </FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="email@company.com" v-bind="componentField"
                                        class="text-slate-900 h-12 rounded-xl bg-slate-50 border-slate-100 focus-visible:ring-[#00378a]/10" />
                                </FormControl>
                                <FormMessage class="text-[10px] text-red-500" />
                            </FormItem>
                        </FormField>

                        <!-- 提交按钮 -->
                        <Button type="submit" :disabled="isSubmitting"
                            class="w-full h-14 bg-[#00378a] hover:bg-[#002d70] text-white rounded-2xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#00378a]/20 mt-4 transition-all active:scale-[0.98]">
                            <Loader2 v-if="isSubmitting" class="animate-spin" size="18" />
                            <Send v-else size="18" />
                            <span>Get Quotation</span>
                        </Button>
                    </form>
                </div>

            </SheetContent>
        </Sheet>
    </div>
</template>

<style scoped>
/* 只保留悬浮球的 bounce 动画，其余的由 shadcn 处理 */
.bounce-enter-active {
    animation: bounce-in 0.1s;
}

.bounce-leave-active {
    animation: bounce-in 0.1s reverse;
}

@keyframes bounce-in {
    0% {
        transform: scale(0);
        opacity: 0;
    }

    50% {
        transform: scale(1.1);
    }

    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>