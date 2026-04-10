<template>
  <div class="w-full max-w-sm">
    <h4 v-if="siteConfig?.footer?.emailmessage" class="text-black text-md font-bold   mb-6 inline-block pb-1">
      {{ siteConfig?.footer?.emailmessage }}
    </h4>

    <!-- 修正 1: 增加 form 标签 -->
    <form @submit.prevent="onSubmit" class="space-y-2">
       <!-- 药丸型订阅输入框 (像素级还原) -->
          <div class="relative max-w-[420px]">
            <input 
             v-model="email" 
          v-bind="emailAttrs" 
              type="email" 
              placeholder="Enter your email" 
              class="w-full h-[48px] pl-8 pr-40 rounded-full border border-slate-200 bg-white text-[15px] text-black placeholder:text-slate-400 outline-none transition-all focus:border-black shadow-sm"
            />
            <button    type="submit"   :disabled="isSubmitting" class="absolute right-1.5 top-1.5 h-[38px] px-10 bg-[#00378a] text-white rounded-full font-bold text-[15px] transition-all hover:bg-[#00378a]/90 active:scale-95">
              <template  v-if="isLoading" class="flex items-center justify-center gap-2">
            <Loader2 class="w-4 h-4 animate-spin" />
          
          </template>
          <template v-else>
            <span>Send</span>
           
          </template>
            </button>
          </div>

      <!-- 修正 2: 增加错误信息显示 -->
      <p v-if="errors.email" class="text-red-400 text-xs mt-1 ml-4 italic">
        {{ errors.email }}
      </p>
    </form>
  </div>
</template>

<script lang='ts' setup>
import { useForm } from 'vee-validate';
import { Loader2, ArrowRight } from 'lucide-vue-next';
import { categorySchema } from '@/utils/categotyValidation';

// 假设这些是从全局注入或 Props 传入
const config = useRuntimeConfig();
import { toast } from 'vue-sonner'

const siteConfig = useAppConfig(); // 确保 siteConfig 已定义

const accessKey = config.public.web3FormsKey;
const isLoading = ref(false);
// 1. 表单初始化
const { defineField, handleSubmit, errors, isSubmitting, resetForm } = useForm({
    validationSchema: categorySchema,
    initialValues: { 
        email: '', 
        subject: '来自网站的请求' // 更有意义的默认主题
    }
});

const [email, emailAttrs] = defineField('email');

// 2. 修正后的提交逻辑
const onSubmit = handleSubmit(async (values) => {
    if (!accessKey) {
        toast.error('Configuration error: Missing Access Key');
        return;
    }
 isLoading.value = true; // 手动开启加载
    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json", 
                "Accept": "application/json" 
            },
            body: JSON.stringify({
                ...values,
                access_key: accessKey,
                from_name: "Website Catalog Fetcher",
                subject: `New Catalog Request from ${values.email}`
            })
        });

        const data = await response.json();
        
        if (data.success) {
            toast.success('Success! The catalog link has been sent to your email.');
            resetForm(); // 提交成功后重置表单
        } else {
            throw new Error(data.message || 'Submission failed');
        }
    } catch (error: any) {
        toast.error(error.message || 'Failed to send request');
    } finally {
        isLoading.value = false; // 提交完成后手动关闭加载
    }
});
</script>