<template>
  <footer class="bg-white  font-sans">
    <div class="mx-auto px-8 max-w-[1200px] pt-24 pb-12">
      
      <!-- 1. 顶部内容区 -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-y-16 lg:gap-x-24 mb-22">
        
        <!-- A. 左侧：品牌与订阅 (占 5 列) -->
        <div class="lg:col-span-5 flex flex-col">
          <!-- Logo 区域 -->
          <NuxtLink to="/" class="flex items-center gap-2 mb-12 group">
             <img v-if="siteConfig?.logo?.darklogoUrl" :src="siteConfig?.logo?.darklogoUrl" alt="Logo" class="h-14 w-auto object-contain">
            
          </NuxtLink>

          <!-- 订阅标题 -->
          <CatalogFetcher />

        
        </div>

        <!-- B. 右侧：三列导航 (占 7 列) -->
        <div class="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 justify-end gap-12">
          <!-- Main Pages -->
          <div class="flex flex-col col-start-2 ">
            <h4 class="text-[18px] font-bold text-black mb-6">Main Pages</h4>
            <ul class="space-y-2">
              <li v-for="page in pages" :key="page.label">
                <NuxtLink :to="page.href" class="text-zinc-500 hover:text-black transition-colors text-[14px] font-medium tracking-tight">{{ page.label }}</NuxtLink>
              </li>
            </ul>
          </div>

        

          <!-- Legal -->
          <div class="flex flex-col">
            <h4 class="text-[18px] font-bold text-black mb-6">Legal & Utilities</h4>
            <ul class="space-y-2">
              <li v-for="legal in legalLinks" :key="legal.label">
                <NuxtLink :to="legal.href" class="text-zinc-500 hover:text-black transition-colors text-[14px] font-medium tracking-tight">{{ legal.label }}</NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 2. 底部栏 (像素级布局) -->
      <div class="pt-10 border-t border-slate-100 flex flex-col lg:flex-row justify-between items-center gap-10">
        
        <!-- 左侧版权 -->
        <div class="text-black text-[15px] font-light flex flex-col md:flex-row gap-1 md:gap-2">
          <span>© {{ new Date().getFullYear() }} Copyright — {{ siteConfig?.base?.companyName }}</span>
          <span class="hidden md:inline text-slate-300">|</span>
          <span class="text-zinc-500">Designed by <a href="https://www.daddytemplate.com/" target="_blank">DaddyTemplate</a></span>
        </div>

        <!-- 中间社交图标 (圆形细线风格) -->
        <div class="flex items-center gap-3">
          <a v-for="social in socialIcons" :key="social.label" :href="social.href" 
            class="size-11 rounded-full bg-[#f4f7fa] flex items-center justify-center text-black hover:bg-[#00378a] hover:text-white transition-all shadow-sm">
            <component :is="social.icon" class="size-4" />
          </a>
        </div>

        <!-- 右侧 Ghost 按钮 -->
       
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { Facebook, Instagram,  Linkedin } from 'lucide-vue-next'
const XIcon = defineComponent({
  render() {
    return h('svg', { 
      viewBox: '0 0 24 24', 
      fill: 'currentColor', 
      class: 'size-4' 
    }, [
      h('path', { d: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z' })
    ])
  }
})
const siteConfig = useAppConfig()
const { isDrawerOpen } = useProductInquiry()

const pages = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Products', href: '/products' },
    { label: 'Contact', href: '/contact' }
]



const legalLinks = [
    { label: 'Integration', href: '#' },
    { label: 'Download', href: '#' },
    { label: 'Changelog', href: '#' }
]

const socialIcons = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: XIcon, label: 'X', href: '#' },
  { icon: Linkedin, label: 'Linkedin', href: '#' }
]
</script>

<style scoped>
/* 极致干净的全局字体处理 */
footer {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>