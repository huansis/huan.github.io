<template>
  <div>
    <HeroBlock />
    <LogoTickerBlock :logos="brandLogos" duration="20s" />
    <CaseBlock />
    <BenefitsGridBlock  :showSearch="true" :products="formattedProducts"  />
    <FaqBlock />
    <CartBlock />
  </div>
</template>

<script setup>
const siteConfig = useAppConfig()


const brandLogos = [
  { name: 'Verdant', src: 'https://ifeat.org/app/uploads/2025/08/Group-48976-1.svg' },
  { name: 'AERO', src: 'https://images.seeklogo.com/logo-png/5/2/fda-logo-png_seeklogo-53223.png' },
  { name: 'Helix', src: 'https://images.seeklogo.com/logo-png/6/2/halal-logo-png_seeklogo-64752.png' },
  { name: 'LITH', src: 'https://images.seeklogo.com/logo-png/24/2/star-kosher-logo-png_seeklogo-247664.png' },
  { name: 'Solvex', src: 'https://image.shutterstock.com/image-photo/image-260nw-2452427655.jpg' },
]


const { data: rawProducts, status } = await useAsyncData('products-collection', () => {
  return queryCollection('products')
    .where('path', 'LIKE', '/products/aroma-chemicals/%') 
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
// seo meta
useSeoMeta({
  title: () => siteConfig.value?.seo?.index.title || 'Default Title',
  description: () => siteConfig.value?.seo?.index.description || 'Default description',
  ogTitle: () => siteConfig.value?.seo?.index.title || 'Default Title',
  ogDescription: () => siteConfig.value?.seo?.index.description || 'Default description',
  ogImage: () => siteConfig.value?.seo?.index.ogImage || '/default-og.jpg',
  twitterCard: () => siteConfig.value?.seo?.index.twitterCard || 'summary_large_image',
})
</script>

<style scoped>
/* styles */
</style>