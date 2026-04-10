<template>
  <section class="bg-[#F8FAFC] text-slate-900 py-32 px-6 font-sans overflow-hidden">
    <div class="container mx-auto max-w-[1100px]">
      
      <!-- 1. 头部区域：极其洁净的排版 -->
      <div class="flex flex-col items-center text-center mb-24">
        <div v-scroll-reveal class="px-4 py-1.5 rounded-full border border-slate-200 bg-white text-[11px] font-bold text-blue-600 mb-8 uppercase tracking-[0.2em] shadow-sm">
         {{ siteConfig?.contact?.tag || 'Contact Us' }}
        </div>
        <h1 v-scroll-reveal="{ delay: 0.1 }" class="text-[40px] md:text-[56px] font-semibold leading-[1.1] tracking-tight text-slate-900 mb-6">
         {{ siteConfig?.contact?.title || 'Connect with' }} <span class="text-blue-600">{{ siteConfig?.contact?.sptext || 'Our Experts' }}</span>
        </h1>
        <p v-scroll-reveal="{ delay: 0.15 }" class="text-slate-500 max-w-xl text-lg font-medium">
          Whether you need a custom synthesis or a bulk quotation, our technical team is ready to assist you.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        <!-- 2. 左侧：极简信息展示 -->
        <div class="lg:col-span-5 space-y-10">
          <div v-scroll-reveal="{ delay: 0.2 }" class="space-y-12 pr-8">
            <div>
              <h3 class="text-xl font-bold mb-8 text-slate-900">Contact Details</h3>
              
              <div class="space-y-8">
                <div v-for="(info, index) in siteConfig?.contact?.contactInfo || []" :key="index" class="flex items-center gap-5 group">
                  <div class="p-3.5 rounded-2xl bg-white border border-slate-100 text-blue-600 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:border-blue-200">
                    <component :is="iconMap[info.icon]" v-if="iconMap[info.icon]" class="size-5" />
                  </div>
                  <div>
                    <p class="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-1">{{ info.label }}</p>
                    <p class="text-slate-800 font-semibold text-base">{{ info.value }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 增加一个信任背书区域，增加纯净工业感 -->
            <div class="pt-8 border-t border-slate-200">
              <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Certifications</p>
              <div class="flex gap-4 opacity-50 grayscale">
                <!-- 这里可以放一些 ISO、REACH 证书的小图标 -->
                <span class="text-[10px] font-bold border border-slate-300 px-2 py-1 rounded">ISO 9001</span>
                <span class="text-[10px] font-bold border border-slate-300 px-2 py-1 rounded">REACH</span>
                <span class="text-[10px] font-bold border border-slate-300 px-2 py-1 rounded">GMP</span>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. 右侧：纯白实色表单卡片 -->
        <div v-scroll-reveal="{ delay: 0.3 }" class="lg:col-span-7">
          <div class="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative">
            
            <form @submit.prevent="onSubmit" class="relative z-10 space-y-8" novalidate>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Name -->
                <div class="space-y-2.5">
                  <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input v-model="name" v-bind="nameAttrs" type="text"
                    :class="errors.name ? 'border-red-300 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-blue-600/30 focus:bg-white'"
                    class="w-full px-5 py-4 rounded-xl border text-slate-900 placeholder:text-slate-300 outline-none transition-all duration-300"
                    placeholder="Enter name">
                  <p v-if="errors.name" class="text-red-500 text-[10px] mt-1 ml-1 font-bold uppercase tracking-wider">{{ errors.name }}</p>
                </div>
                <!-- Email -->
                <div class="space-y-2.5">
                  <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                  <input v-model="email" v-bind="emailAttrs" type="email"
                    :class="errors.email ? 'border-red-300 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-blue-600/30 focus:bg-white'"
                    class="w-full px-5 py-4 rounded-xl border text-slate-900 placeholder:text-slate-300 outline-none transition-all duration-300"
                    placeholder="email@company.com">
                  <p v-if="errors.email" class="text-red-500 text-[10px] mt-1 ml-1 font-bold uppercase tracking-wider">{{ errors.email }}</p>
                </div>
              </div>

              <!-- Subject -->
              <div class="space-y-2.5">
                <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Inquiry Subject</label>
                <input v-model="subject" v-bind="subjectAttrs" type="text"
                  :class="errors.subject ? 'border-red-300 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-blue-600/30 focus:bg-white'"
                  class="w-full px-5 py-4 rounded-xl border text-slate-900 placeholder:text-slate-300 outline-none transition-all duration-300"
                  placeholder="e.g. CAS 121-33-5 bulk quotation">
                <p v-if="errors.subject" class="text-red-500 text-[10px] mt-1 ml-1 font-bold uppercase tracking-wider">{{ errors.subject }}</p>
              </div>

              <!-- Message -->
              <div class="space-y-2.5">
                <label class="block text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Detailed Requirements</label>
                <textarea v-model="message" v-bind="messageAttrs" rows="5"
                  :class="errors.message ? 'border-red-300 bg-red-50' : 'border-slate-100 bg-slate-50 focus:border-blue-600/30 focus:bg-white'"
                  class="w-full px-5 py-4 rounded-xl border text-slate-900 placeholder:text-slate-300 outline-none transition-all duration-300 resize-none"
                  placeholder="Quantity, Purity, specific packing..."></textarea>
                <p v-if="errors.message" class="text-red-500 text-[10px] mt-1 ml-1 font-bold uppercase tracking-wider">{{ errors.message }}</p>
              </div>

              <!-- 提交按钮：极其干净的蓝色实色按钮 -->
              <button type="submit" :disabled="isSubmitting"
                class="w-full cursor-pointer mt-4 group relative overflow-hidden bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed py-5 rounded-full font-bold text-sm uppercase tracking-[0.2em] transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-3 shadow-[0_10px_30px_rgba(37,99,235,0.2)]">
                <template v-if="isSubmitting">
                  <Loader2 class="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </template>
                <template v-else>
                  <span>Request Quote</span>
                  <ArrowRight class="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </template>
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


<script setup lang="ts">
import { toast } from 'vue-sonner'
import { ref, onMounted } from 'vue'
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-vue-next'
import { useForm } from 'vee-validate';
import { contactSchema } from '~/utils/validation';
const config = useRuntimeConfig()

// 获取这个 key
const accessKey = config.public.web3FormsKey

const siteConfig = useAppConfig()
const iconMap = {
  Mail,
  Phone,
  MapPin
}
// 1. 使用 vee-validate 管理状态
const { defineField, handleSubmit, errors, isSubmitting, resetForm } = useForm({
    validationSchema: contactSchema,
     initialValues: {
        name: '',
        email: '',
        subject: '',
        message: '',
    },
});

const [name, nameAttrs] = defineField('name',{validateOnModelUpdate: false});
const [email, emailAttrs] = defineField('email',{validateOnModelUpdate: false});
const [subject, subjectAttrs] = defineField('subject',{validateOnModelUpdate: false});
const [message, messageAttrs] = defineField('message',{validateOnModelUpdate: false});

// 2. 封装发送逻辑
const onSubmit = handleSubmit(async (values) => {
    

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json", "Accept": "application/json" },
            body: JSON.stringify({ access_key: accessKey, ...values })
        });

        const data = await response.json();
        if (data.success) {
            toast.success('Inquiry sent successfully!');
            resetForm();
        } else {
            throw new Error(data.message);
        }
    } catch (error: any) {
        toast.error(error.message || 'Failed to send');
    }
});





// seo meta
useSeoMeta({
  title: () => siteConfig.value?.seo?.contact.title || 'Default Title',
  description: () => siteConfig.value?.seo?.contact.description || 'Default description',
  ogTitle: () => siteConfig.value?.seo?.contact.title || 'Default Title',
  ogDescription: () => siteConfig.value?.seo?.contact.description || 'Default description',
  ogImage: () => siteConfig.value?.seo?.contact.ogImage || '/default-og.jpg',
  twitterCard: () => siteConfig.value?.seo?.contact.twitterCard || 'summary_large_image',
})
</script>