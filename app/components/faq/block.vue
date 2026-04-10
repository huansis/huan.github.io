<template>
  <section class=" py-[120px] px-6 font-sans">
    <div class="container mx-auto max-w-[900px]">

      <!-- 1. 标题区域：保持你的全局风格 -->
      <div class="flex flex-col items-center text-center mb-[80px]">
        <div v-scroll-reveal="{ delay: 0.1 }"
          class="px-5 py-1.5 rounded-full border border-[#00378a]/30 bg-white text-[10px] text-[#00378a] mb-6 uppercase tracking-[0.3em] shadow-sm">
          {{ siteConfig?.index?.faq?.tag || "Support" }}
        </div>
        <h2 v-scroll-reveal="{ delay: 0.2 }"
          class="text-[36px] md:text-[52px] font-light leading-[1.1] tracking-tight mb-6 text-[#001f4e]">
          {{ siteConfig?.index?.faq?.mainHeading || "Common Questions" }}
        </h2>
        <p v-scroll-reveal="{ delay: 0.3 }" class="text-slate-400 text-base max-w-xl font-extralight leading-relaxed">
          {{ siteConfig?.index?.faq?.subtitle || "Find answers to the most frequently asked questions about our products and services." }}
        </p>
      </div>

      <!-- 2. 卡片式 FAQ 列表 -->
      <div 
      v-scroll-reveal="{delay:0.5}"
        class="flex flex-col gap-4">
        <div   v-for="(item, index) in siteConfig?.index?.faq?.faqs" :key="index"
          class="group overflow-hidden rounded-2xl border transition-all duration-300"
          :class="[
            activeIndex === index 
            ? 'bg-[#e0eaf6]/40 border-[#e0eafc] ' 
            : 'bg-white border-slate-200 hover:border-[#00378a]/30'
          ]">
          
          <!-- 问题行 -->
          <div 
            class="flex items-center justify-between p-6 md:p-8 cursor-pointer select-none"
            @click="toggle(index)"
          >
            <span class="text-[17px] md:text-[19px] font-bold transition-colors duration-300"
              :class="activeIndex === index ? 'text-[#00378a]' : 'text-[#001f4e]'">
              {{ item.question }}
            </span>

            <!-- 箭头图标 -->
            <ChevronDown 
              size="20" 
              class="text-slate-400 transition-transform duration-300"
              :class="[
                activeIndex === index ? 'rotate-180 text-[#00378a]' : '',
                'group-hover:text-[#00378a]'
              ]" 
            />
          </div>

          <!-- 回答内容区 -->
          <div class="grid transition-[grid-template-rows,opacity] duration-300 ease-in-out"
            :class="[activeIndex === index ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0']">
            <div class="overflow-hidden">
              <!-- 分割线：仅在展开时显示 -->
              <div class="mx-6 md:mx-8 border-t border-[#e0eafc]"></div>
              
              <p class="p-6 md:p-8 pt-5 md:pt-6 text-slate-500 text-base md:text-lg font-normal leading-relaxed">
                {{ item.answer }}
              </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'

// 1. 获取全局配置
const siteConfig = useAppConfig()

// 2. 状态控制
const activeIndex = ref<number | null>(0) // 默认展开第一个，匹配图片效果

const toggle = (index: number) => {
  activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<style scoped>
/* 确保字体平滑 */
.font-sans {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* 简单的卡片入场动画增强 */
.rounded-2xl {
  backface-visibility: hidden;
}
</style>