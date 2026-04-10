<template>
  <div class="bg-black min-h-screen pt-32 pb-24 text-white font-sans overflow-hidden">
    <!-- 背景装饰：顶部柔和蓝光 -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[300px] bg-blue-600/5 blur-[120px] pointer-events-none"></div>

    <div class="container mx-auto px-6 max-w-[1100px] relative z-10">
      
      <!-- 1. 面包屑 (Breadcrumbs) - 暗黑微调 -->
      <nav v-scroll-reveal class="mb-12 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500">
        <NuxtLink to="/" class="hover:text-blue-500 transition-colors">Home</NuxtLink>
        <span class="opacity-30">/</span>
        <span class="text-zinc-300">Products</span>
      </nav>

      <!-- 2. 标题区域 - 采用 header-reveal -->
      <div class="mb-20 max-w-[700px]">
        <div v-scroll-reveal class="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-6">
          Our Collection
        </div>
        <h1 v-scroll-reveal class="text-[42px] md:text-[60px] font-bold text-white tracking-[-0.04em] leading-[1.1] mb-6">
          Explore Our <span class="text-blue-500">Product</span> Categories
        </h1>
        <p v-scroll-reveal="{ delay: 0.3 }" class="text-zinc-500 text-lg md:text-xl font-light">
          Discover high-performance solutions across our diverse industrial portfolios.
        </p>
      </div>

      <!-- 3. 分类列表 - 采用 Benefits Grid 风格 -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="(category, index) in categories" 
          :key="category" 
          :to="`/products/${category}`"
          v-scroll-reveal="{ delay: index * 0.1, y: 20 }"
          class="group relative block overflow-hidden rounded-[2rem] border border-white/10 bg-[#050505] p-10 transition-all duration-500 hover:border-blue-500/30 shadow-2xl"
        >
          <!-- 底部蓝色渐变光晕 (高度还原) -->
          <div class="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-blue-600/15 via-blue-600/5 to-transparent pointer-events-none transition-opacity duration-500 group-hover:from-blue-600/25"></div>

          <!-- 图标容器 -->
          <div class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:bg-blue-600/10 group-hover:border-blue-500/30 transition-all duration-500">
            <PackageOpen class="w-8 h-8 text-white group-hover:text-blue-500 transition-colors duration-500" />
          </div>

          <!-- 内容内容 -->
          <div class="relative z-10">
            <h3 class="text-2xl font-bold text-white mb-3 tracking-tight group-hover:text-blue-400 transition-colors capitalize">
              {{ category }}
            </h3>
           
            
            <!-- 底部引导按钮风格 -->
            <div class="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-500 group-hover:translate-x-1 transition-transform">
              <span>View Products</span>
              <ArrowRight class="size-3" />
            </div>
          </div>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { PackageOpen, ArrowRight } from 'lucide-vue-next'
const { data: navData } = await useProductsNav()
// 硬编码分类列表，实际项目中可能需要从 API 获取
// console.log('navData', navData.value)
// const categories = navData.value[0].children.map(item => item.title)
const categories = computed(() => {
  if (!navData.value || !navData.value[0]?.children) return []
  return navData.value[0].children.map(item => item.title)
})
// console.log('categories', categories)
</script>
<style scoped>
/* 标题平衡 */
h1 {
  text-wrap: balance;
}

/* 隐藏横向滚动条 */
body {
  overflow-x: hidden;
}

/* 模拟 Apple 风格的卡片深度感 */
.rounded-\[2rem\] {
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.5);
}
</style>