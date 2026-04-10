<!-- pages/products/[category]/index.vue -->
<template>
  <div class="min-h-screen bg-[#FBFDFF] font-sans selection:bg-[#00378a]/10 pt-32 pb-20">
    
    <!-- 1. 顶部视觉切换器 (Visual Switcher) -->
    <section class="container mx-auto px-6 max-w-[1200px] mb-20">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
  <NuxtLink 
    v-for="cat in allCategories" 
    :key="cat.slug"
    :to="`/products/${cat.slug}`"
    class="group relative h-[120px] rounded-2xl overflow-hidden border-2 transition-all duration-300"
    :class="[
      categorySlug === cat.slug 
      ? 'opacity-100 shadow-md scale-[1.02] z-10' 
      : 'border-transparent  hover:opacity-100'
    ]"
  >
    <!-- 1. 全彩背景图 -->
    <img 
      :src="cat.image" 
      class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
    />
    
    <!-- 2. 极简文字遮罩：仅底部一小层半透明黑色，确保白色文字可见 -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>

    <!-- 3. 文字内容：左下角对齐 -->
    <div class="absolute inset-0 p-5 flex items-end justify-between">
      <div class="text-left">
        <span class="text-[9px] font-black text-white/70 uppercase tracking-[0.2em] block mb-0.5">Catalog</span>
        <h3 class="text-white text-[17px] font-bold tracking-tight">
          {{ cat.name }}
        </h3>
      </div>

      <!-- 选中时的极简对勾图标（可选，增加明确性） -->
      <div v-if="categorySlug === cat.slug" class="text-white">
         <Check size="18" stroke-width="3" />
      </div>
    </div>
  </NuxtLink>
</div>

      <!-- 底部统计装饰条 -->
      
      <!-- 类别统计与说明 -->
      <div class="flex items-center gap-6 mt-10 px-4">
          <div class="flex items-center gap-2">
            <span class="size-1.5 rounded-full bg-[#00378a]"></span>
            <span class="text-[11px] font-bold text-[#001f4e] uppercase tracking-widest">
              Showing {{ formattedProducts?.length || 0 }} items in {{ categoryName }}
            </span>
          </div>
          <div class="h-px flex-1 bg-slate-100"></div>
          <p class="text-[11px] text-slate-400 italic">Advanced Purity Analytics v4.0</p>
      </div>
    </section>

    <!-- 2. 主列表区：ProductBlock -->
    <main class="container mx-auto px-6 max-w-[1200px]">
      <div class="transition-all duration-700 ease-in-out" :key="categorySlug">
        <ProductBlock 
          v-if="formattedProducts && formattedProducts.length > 0" 
          :showSearch="true" 
          :products="formattedProducts" 
        />
        
        <!-- 纯净空状态 -->
        <div v-else class="py-40 text-center flex flex-col items-center">
           <div class="size-16 rounded-full bg-slate-50 flex items-center justify-center mb-6">
              <div class="size-2 rounded-full bg-slate-200 animate-ping"></div>
           </div>
           <p class="text-[12px] font-medium text-slate-300 uppercase tracking-widest">Molecular data loading...</p>
        </div>
      </div>
    </main>

  </div>
</template>

<script setup lang="ts">
import { PackageOpen,Check } from 'lucide-vue-next'
const siteConfig = useAppConfig()
const route = useRoute()
const menuConfig = siteConfig.megaMenu?.categories || []
const categoryName = route.params.category as string
const categorySlug = categoryName as string
const allCategories = computed(() => [
  { 
    name: 'Aroma Chemicals', 
    slug: 'aroma-chemicals', 
    image: menuConfig[0]?.image || 'https://images.unsplash.com/photo-1532187863486-abf9d3a099a1?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    name: 'Natural Products', 
    slug: 'natural-products', 
    image: menuConfig[1]?.image || 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=800' 
  },
  { 
    name: 'Menthol Synthetic', 
    slug: 'menthol-synthetic',  
    image: menuConfig[2]?.image || 'https://images.unsplash.com/photo-1614935151651-0bea6508db6b?auto=format&fit=crop&q=80&w=800' 
  }
])
const { data: rawProducts, status } = await useAsyncData('products-collection', () => {
  return queryCollection('products')
    .where('path', 'LIKE', `/products/${categoryName}/%`) 
    .all()
})

// 2. 整理数据 (Mapping)
// 使用 computed 实时转换数据格式，确保与你之前的假数据结构一致
const formattedProducts = computed(() => {
  // 必须确保 rawProducts.value 存在且是数组
  if (!rawProducts.value || !Array.isArray(rawProducts.value)) return []
  
  return rawProducts.value.map((p, index) => { // ✅ 修复：这里必须加上 index 参数
    // 自动获取文件名作为备份 ID
    const fileName = p.path?.split('/').pop() || `item-${index}`
    
    return {
      // 确保 ID 绝对唯一。由于你的 MD 里有 pid: "00001"，这里会优先使用它
      id: (p.meta?.pid || fileName).toString().toUpperCase(), 
      name: p.title || 'Untitled Product',
      cas: String(p.meta?.cas || 'N/A'), // 强制转字符串
      fema: String(p.meta?.fema || '-'),
      grade: p.meta?.grade || 'Food Grade',
      purity: p.meta?.purity || '99%+ Purity',
      molecule_img: p.meta?.molecule_img || '',
      path: p.path
    }
  })
})
// --- 动态 SEO 设置 ---
// 将 categoryName 格式化为标题，例如 "laser-therapy" -> "Laser Therapy"
const formattedCategory = computed(() =>
  categoryName.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
)

useSeoMeta({
  title: `${formattedCategory.value} | Product Collections`,
  description: `Explore our collection of ${formattedCategory.value}. High-quality products for your business needs.`,
  ogTitle: `${formattedCategory.value} | Product Collections`,
  ogDescription: `Explore our collection of ${formattedCategory.value}. High-quality products for your business needs.`
})
</script>

<style scoped>
/* 标题平衡 */
h1 {
  text-wrap: balance;
}

/* 自定义卡片容器阴影 */
.grid>div {
  transition: transform 0.3s ease;
}

/* 兼容低端浏览器的背景 */
.bg-zinc-950\/50 {
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
</style>