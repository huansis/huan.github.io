<template>
    <Teleport to="body">
        <!-- 弹窗遮罩层 -->
        <div v-if="isOpen" class="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <!-- 遮罩：使用较深色调，反衬出弹窗的“纯白” -->
            <div class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" @click="handleClose"></div>

            <!-- 弹窗主体：纯白实色 UI -->
            <div
                class="relative w-full max-w-lg overflow-hidden rounded-[2rem] bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.2)] animate-in fade-in zoom-in duration-300 md:p-12">
                
                <div class="relative z-10">
                    <!-- 标题：沉稳的工业黑 -->
                    <h2 class="text-3xl font-bold tracking-tight text-slate-900 mb-2">Send Inquiry</h2>
                    <p class="text-slate-500 text-sm mb-8 font-medium">Leave your message and we will respond shortly.</p>

                    <!-- Regarding 逻辑：极简灰色标签 -->
                    <div v-if="showRegarding && productName" class="mb-8 flex items-center gap-3">
                        <span class="text-[10px] font-bold uppercase tracking-widest text-slate-400">Inquiry for:</span>
                        <span class="rounded-md bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700 border border-slate-200">
                            {{ productName }}
                        </span>
                    </div>

                    <form @submit="onSubmit" class="space-y-6" novalidate>
                        <!-- Name -->
                        <div class="space-y-2">
                            <label class="ml-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">Your Name</label>
                            <input v-model="name" v-bind="nameAttrs" type="text"
                                :class="errors.name ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5'"
                                class="w-full rounded-xl border px-4 py-3.5 text-slate-900 placeholder:text-slate-300 outline-none transition-all duration-200"
                                placeholder="Full Name">
                            <p v-if="errors.name" class="ml-1 mt-1 text-[10px] font-bold uppercase tracking-wider text-red-500">{{ errors.name }}</p>
                        </div>

                        <!-- Email -->
                        <div class="space-y-2">
                            <label class="ml-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">Email Address</label>
                            <input v-model="email" v-bind="emailAttrs" type="email"
                                :class="errors.email ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5'"
                                class="w-full rounded-xl border px-4 py-3.5 text-slate-900 placeholder:text-slate-300 outline-none transition-all duration-200"
                                placeholder="name@company.com">
                            <p v-if="errors.email" class="ml-1 mt-1 text-[10px] font-bold uppercase tracking-wider text-red-500">{{ errors.email }}</p>
                        </div>

                        <!-- Message -->
                        <div class="space-y-2">
                            <label class="ml-1 text-[11px] font-bold uppercase tracking-widest text-slate-400">Requirements</label>
                            <textarea v-model="message" v-bind="messageAttrs" rows="4"
                                :class="errors.message ? 'border-red-500 bg-red-50/30' : 'border-slate-200 bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-600/5'"
                                class="w-full resize-none rounded-xl border px-4 py-3.5 text-slate-900 placeholder:text-slate-300 outline-none transition-all duration-200"
                                placeholder="Quantity, Purity, or Packing requirements..."></textarea>
                            <p v-if="errors.message" class="ml-1 mt-1 text-[10px] font-bold uppercase tracking-wider text-red-500">{{ errors.message }}</p>
                        </div>

                        <!-- 提交按钮：深蓝色/工业蓝色实色按钮 -->
                        <button type="submit" :disabled="isSubmitting"
                            class="group relative flex w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-2xl bg-[#0041a3] py-4 text-base font-bold text-white transition-all duration-300 hover:bg-[#0041a3]/90 hover:shadow-xl active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50">
                            <template v-if="isSubmitting">
                                <Loader2 class="h-5 w-5 animate-spin" />
                                <span>Processing...</span>
                            </template>
                            <template v-else>
                                <span>Submit Inquiry Now</span>
                                <ArrowRight class="h-5 w-5 transition-transform group-hover:translate-x-1" />
                            </template>
                        </button>
                    </form>
                </div>

                <!-- 关闭按钮：圆形极简 -->
                <button @click="handleClose" type="button"
                    class="absolute right-6 top-6 flex size-10 cursor-pointer items-center justify-center rounded-full border border-slate-100 bg-slate-50 text-slate-400 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900">
                    <X class="h-5 w-5 pointer-events-none" />
                </button>
            </div>
        </div>
    </Teleport>
</template>

<script setup lang="ts">
import { useForm } from 'vee-validate';
import { contactSchema } from '~/utils/validation';
import { Loader2, X, ArrowRight } from 'lucide-vue-next';
const config = useRuntimeConfig()
const { isOpen, productName, showRegarding, closeInquiry, openInquiry } = useInquiry()
// 获取这个 key
const accessKey = config.public.web3FormsKey

import { toast } from 'vue-sonner'
const siteConfig = ref<any>({ contact: {} })
const { defineField, handleSubmit, errors, isSubmitting, resetForm } = useForm({
    validationSchema: contactSchema,
    initialValues: { name: '', email: '', message: '', subject: 'Pending...' }
});

const [name, nameAttrs] = defineField('name');
const [email, emailAttrs] = defineField('email');
const [message, messageAttrs] = defineField('message');


const handleClose = () => {
    resetForm();
    closeInquiry();
};
const onSubmit = handleSubmit(
    // 1. 成功回调：校验通过执行此段
    async (values) => {
        // console.log('提交触发，配置项:', siteConfig.value);

        if (!accessKey) {
            toast.error('Configuration not loaded yet, please try again.');
            return;
        }
        const payload = {
            ...values, // 这里包含了原来的 { name, email, message, subject: 'Pending...' }
            access_key: accessKey,
            subject: `Inquiry for ${productName.value}` // 这样它会覆盖掉 values 里的 'Pending...'
        };

        try {
            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await response.json();
            if (data.success) {
                toast.success('Inquiry sent successfully!');
                handleClose();
            } else {
                throw new Error(data.message || 'Submission failed');
            }
        } catch (error: any) {

            toast.error(error.message || 'Failed to send inquiry');
        }
    },
    // 2. 失败回调：校验未通过执行此段
    (errors) => {
        console.log('校验失败:', errors);
        toast.error('Please check your input fields.');
    }
);

</script>