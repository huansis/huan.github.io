<template>
  <div class="bg-black min-h-screen pb-24 text-white font-sans overflow-hidden">
    
    <!-- 1. 顶部背景与面包屑 (Hero Area) -->
    <div class="relative pt-32 pb-16 overflow-hidden">
      <!-- 品牌蓝光背景 -->
      <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1200px] h-[400px]   pointer-events-none"></div>

      <div class="container mx-auto px-6 max-w-[1200px] relative z-10">
        <nav v-scroll-reveal class="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-zinc-500 mb-8">
          <NuxtLink to="/" class="hover:text-blue-500 transition-colors">Home</NuxtLink>
          <span class="opacity-30">/</span>
          <NuxtLink :to="`/products/${categoryName}`" class="hover:text-blue-500 transition-colors capitalize">{{ categoryName }}</NuxtLink>
          <span class="opacity-30">/</span>
          <span class="text-zinc-300 line-clamp-1 uppercase">{{ product?.title || 'Loading...' }}</span>
        </nav>
      </div>
    </div>

    <!-- 2. 产品主交互区 (Product Interaction) -->
    <div v-if="product" class="container mx-auto px-6 max-w-[1200px] relative z-20">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        <!-- 左侧：画廊区域 (封装进卡片) -->
        <div v-scroll-reveal="{ x: -30 }" class="relative group rounded-[2.5rem] border border-white/10 bg-[#050505] overflow-hidden shadow-2xl p-2">
           <ProductGallery :images="product?.meta?.firstImage || []" class="w-full rounded-[2rem] overflow-hidden" />
        </div>

        <!-- 右侧：核心参数与决策 -->
        <div class="flex flex-col space-y-10">
          
          <!-- 标题区域 -->
          <div class="space-y-4">
            <div v-scroll-reveal class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
             Details
            </div>
            <h1 v-scroll-reveal class="text-3xl md:text-5xl font-bold text-white leading-[1.1] tracking-tight">
              {{ product.title }}
            </h1>
          </div>

          <!-- 价格/报价展示 -->
          <div v-if="product.meta?.price" v-scroll-reveal="{ delay: 0.2 }" 
            class="inline-flex items-center gap-5 p-5 bg-white/5 border border-white/10 rounded-2xl w-fit pr-10 relative overflow-hidden group">
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div class="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30">
              <Receipt class="w-7 h-7 text-blue-500" />
            </div>
            <div class="flex flex-col relative z-10">
              <span class="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Target Quotation</span>
              <span class="text-3xl font-bold text-white tracking-tighter">{{ product.meta?.price }}</span>
            </div>
          </div>

          <!-- 简述 -->
          <div v-scroll-reveal="{ delay: 0.3 }" class="relative ">
            
            <p class="text-zinc-400 text-lg leading-relaxed font-light">
              {{ product.description }}
            </p>
          </div>

          <!-- CTA 转换 -->
          <div v-scroll-reveal="{ delay: 0.4 }" class="space-y-4">
            <button @click="onInquiry"
              class="group cursor-pointer relative w-full bg-white text-black hover:bg-zinc-200 font-bold py-5 rounded-2xl transition-all duration-500 active:scale-[0.98] flex items-center justify-center gap-3 shadow-2xl">
              <span class="text-lg uppercase tracking-widest">Send Inquiry Now</span>
              <ArrowRight class="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <div class="flex items-center justify-center gap-6 text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
              <span class="flex items-center gap-1.5"><CheckCircle2 class="w-3.5 h-3.5 text-blue-500" /> Verified Supplier</span>
              <span class="flex items-center gap-1.5"><CheckCircle2 class="w-3.5 h-3.5 text-blue-500" /> 24h Response</span>
            </div>
          </div>

          <!-- 标签区 -->
          <div v-if="product.meta?.tags && product.meta?.tags.length > 0"
            v-scroll-reveal="{ delay: 0.5 }"
            class="flex flex-wrap gap-2 pt-10 border-t border-white/5">
            <span v-for="tag in product.meta?.tags" :key="tag"
              class="px-4 py-1.5 bg-white/5 border border-white/10 text-zinc-400 text-[10px] font-bold rounded-full hover:border-blue-500/50 hover:text-white transition-all cursor-default capitalize tracking-wider">
              # {{ tag }}
            </span>
          </div>
        </div>
      </div>

      <!-- 3. Markdown 正文详情 (Prose Invert) -->
      <div v-scroll-reveal="{ delay: 0.6 }" class="max-w-[900px] mx-auto mt-32 relative">
        <!-- 装饰线条 -->
        <div class="absolute -top-16 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent text-center flex items-center justify-center">
            <div class="size-1.5 rounded-full bg-blue-500"></div>
        </div>

        <div class="prose prose-invert prose-blue max-w-none 
          prose-headings:tracking-tight 
          prose-headings:font-bold 
          prose-p:text-zinc-400 
          prose-img:rounded-[2rem] 
          prose-img:border 
          prose-img:border-white/10">
          <ContentRenderer :value="product" />
        </div>
      </div>
    </div>

    <!-- 4. 异常处理 -->
    <div v-else-if="!pending" class="container mx-auto px-6 py-40 text-center">
      <div class="inline-flex p-6 rounded-full bg-white/5 border border-white/10 mb-8 text-zinc-800">
        <PackageOpen class="w-16 h-16" />
      </div>
      <h2 class="text-3xl font-bold text-white mb-4">Product Not Found</h2>
      <NuxtLink to="/products" class="text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest font-bold text-xs border-b border-blue-500/30 pb-1">
        Return to Collections
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ChevronRight, CheckCircle2, Send, Receipt,ArrowRight } from 'lucide-vue-next'
const isInquiryOpen = ref(false)
const route = useRoute()
const categoryName = route.params.category as string
const slug = route.params.slug as string
const { openInquiry } = useInquiry()
// 从app.config.ts获取配置


// 打开咨询弹窗
const onInquiry = () => {
    // 默认就是 true，也可以显式写出 
    //showLabel: false 表示不显示咨询弹窗的标题
    // 第一个参数配置如咨询的商品名称
    openInquiry(product.value.title, { showLabel: true })
}
// 🌟 核心修复：使用最稳妥的 queryContent 语法
// 不要手动 import queryContent，Nuxt 会自动导入
const { data: product, pending } = await useAsyncData(`product-${route.path}`, () => {
  // 🌟 核心修改：第一个参数是集合名 'products'，然后用 .path() 过滤路径
  return queryCollection('products').path(route.path).first()
})

// seo meta
watchEffect(() => {
  if (product.value) {
    useSeoMeta({
      title: product.value.seo?.title || product.value.title,
      description: product.value.seo?.description || product.value.description,
      ogTitle: product.value.seo?.title || product.value.title,
      ogDescription: product.value.seo?.description || product.value.description,
      ogImage: product.value.seo?.image || '/default-og.jpg',
      twitterCard: 'summary_large_image',
    })
  }
})
</script>

<style>
@reference "tailwindcss";

.prose h2 {
  @apply text-3xl font-bold mt-16 mb-8 pb-4 border-b border-white/5;
}

.prose h3 {
  @apply text-xl font-bold mt-10 mb-4 text-white flex items-center gap-3;
}

.prose h3::before {
  content: '';
  @apply w-1.5 h-6 bg-blue-600 rounded-full;
}

.prose table {
  @apply w-full border-separate border-spacing-0 rounded-2xl overflow-hidden my-12 border border-white/10 bg-[#050505];
}

.prose thead th {
  @apply bg-white/5 text-zinc-400 font-bold px-6 py-5 text-left border-b border-white/10 uppercase tracking-widest text-[10px];
}

.prose tbody td {
  @apply px-6 py-5 border-b border-white/5 text-sm text-zinc-300 font-light;
}

.prose tbody tr:hover td {
  @apply bg-white/[0.02] text-white;
}

.prose blockquote {
  @apply border-l-4 border-blue-600 bg-white/5 px-10 py-8 rounded-r-lg italic text-zinc-300 my-12 not-italic relative overflow-hidden;
}



.prose ul li {
  @apply relative pl-8 mb-4 before:content-[''] before:absolute before:left-0 before:top-2.5 before:w-2 before:h-2 before:rounded-full before:bg-blue-600 before:shadow-[0_0_8px_rgba(37,99,235,0.8)];
}

.prose a {
  @apply no-underline border-b border-blue-500/30 hover:border-blue-500 transition-all duration-300 pb-0.5 font-medium;
}

.prose img {
  @apply shadow-[0_0_50px_rgba(0,0,0,0.5)] my-16 hover:scale-[1.01] transition-transform duration-700;
}
</style>