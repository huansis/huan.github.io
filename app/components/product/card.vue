<template>
  <NuxtLink 
    :to="product.path" 
    class="group relative block cursor-pointer bg-[#050505] rounded-[0.8rem] border border-white/10 hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden shadow-2xl"
  >
    <!-- 1. 背景底部蓝色微光 (延续全站风格) -->
    <div class="absolute -bottom-1 left-0 right-0 h-24 bg-gradient-to-t from-blue-600/10 via-blue-600/5 to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-blue-600/20"></div>

    <!-- 2. 图片区域：采用深色底座 -->
    <div class="relative aspect-[4/3] overflow-hidden bg-zinc-900/50">
      <img 
        :src="product?.meta?.image || '/img/placeholder.jpg'" 
        :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-1000 ease-out group-hover:scale-110"
      />
      <!-- 图片上的渐变遮罩：防止图片过亮 -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#050505]/60 to-transparent opacity-60"></div>
    </div>

    <!-- 3. 内容区域：精致排版 -->
    <div class="p-6 flex flex-col flex-grow relative z-10">
      
      <!-- 标题：白色加粗 -->
      <h3 class="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 line-clamp-1 tracking-tight">
        {{ product.title }}
      </h3>
      
      <!-- 描述：锌灰色 -->
      <p class="text-zinc-500 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow font-light">
        {{ product.description }}
      </p>

      <!-- 底部：极简交互 -->
      <div class="flex items-center justify-between mt-auto">
        <!-- 一个装饰性的分类标签（可选，如果有数据的话） -->
        <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-600 group-hover:text-blue-500/50 transition-colors">
          View Detail
        </span>

        <div class="text-zinc-700 group-hover:text-blue-500 transition-all duration-500 ease-out flex items-center">
          <!-- 箭头交互：位移 + 发光 -->
          <ArrowRight class="w-6 h-6 transform group-hover:translate-x-1 transition-transform duration-500" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'

defineProps({
  product: {
    type: Object as () => any,
    required: true
  }
})
</script>

<style scoped>
/* 保持截断逻辑 */
.line-clamp-1 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

/* 增加卡片浮动感 */
.shadow-2xl {
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
}
</style>