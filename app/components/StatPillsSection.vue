<template>
  <section class="w-full py-24 bg-white overflow-hidden">
    <div class="container mx-auto px-4 flex flex-col gap-8 items-center">
      <div class="flex flex-col items-center text-center mb-[80px]">
        <div v-scroll-reveal="{ delay: 0.1 }"
          class="px-5 py-1.5 rounded-full border border-[#00378a]/60 bg-white text-[11px]  text-[#00378a] mb-6 uppercase tracking-[0.2em] shadow-sm">
           {{ siteConfig?.about?.secondblock?.tag || 'Statisticß111' }}
        </div>
        <h1 v-scroll-reveal="{ delay: 0.2 }"
          class="text-[40px] md:text-[60px] font-light leading-[1.1] tracking-tight mb-6 text-[#001f4e]">
        {{ siteConfig?.about?.secondblock?.titleone || 'We bridge the gap between ' }}<br> <span class="text-blue-500">{{ siteConfig?.about?.secondblock?.titletwo || 'vision' }}</span>
        </h1>
     
      </div>
      <!-- 第一行 -->
      <div v-scroll-reveal="{ delay: 0.2 }" class="flex flex-wrap justify-center items-center gap-6 w-full">
        <div 
          v-for="(item, index) in row1Items" 
          :key="'r1-' + index"
          :class="getPillClasses(item)"
        >
          <div class="flex items-center gap-5">
            <!-- 修改点：图标内容 (三个旋转45度的十字准星) -->
            <template v-if="item.type === 'icon'">
              <div v-if="item.icon === 'xxx'" class="flex gap-8 ">
                <div v-for="i in 3" :key="i" class="w-12 h-12 relative flex items-center justify-center rotate-45">
                   <!-- 使用和第二行一样的细线逻辑 -->
                   <div class="absolute w-full h-[1px] bg-current"></div>
                   <div class="absolute h-full w-[1px] bg-current"></div>
                </div>
              </div>
            </template>

            <!-- 统计内容 -->
            <template v-else>
              <div class="flex items-baseline shrink-0">
                <span v-if="item.trend === 'up'" class="text-3xl mr-1 font-light">↑</span>
                <span v-count class="text-5xl md:text-6xl font-bold tracking-tight">{{ item.value }}</span>
              </div>
              <p class="max-w-[140px] text-xs md:text-sm leading-tight font-medium opacity-80">
                {{ item.label }}
              </p>
            </template>
          </div>
        </div>
      </div>

      <!-- 第二行 -->
      <div v-scroll-reveal="{ delay: 0.2 }" class="flex flex-wrap justify-center items-center gap-6 w-full">
        <div 
          v-for="(item, index) in row2Items" 
          :key="'r2-' + index"
          :class="getPillClasses(item)"
        >
          <div class="flex items-center gap-5">
            <!-- 图标内容 (垂直十字准星) -->
            <template v-if="item.type === 'icon'">
              <div v-if="item.icon === 'plus'" class="w-24 h-24 relative  flex items-center justify-center">
                 <div class="absolute w-full h-[1px] bg-current"></div>
                 <div class="absolute h-full w-[1px] bg-current"></div>
              </div>
            </template>

            <!-- 统计内容 -->
            <template v-else>
              <div class="flex items-baseline shrink-0">
                <span v-if="item.trend === 'up'" class="text-3xl mr-1 font-light">↑</span>
                <span v-count class="text-5xl md:text-6xl font-bold tracking-tight">{{ item.value }}</span>
              </div>
              <p class="max-w-[140px] text-xs md:text-sm leading-tight font-medium opacity-80">
                {{ item.label }}
              </p>
            </template>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
const siteConfig = useAppConfig()
const props = defineProps({
  data: {
    type: Array,
    default: () => [
      { id: 1, type: 'icon', icon: 'xxx', variant: 'outline', row: 1 },
      { id: 2, type: 'stat', value: '98%', label: 'Transactions are processed successfully', variant: 'soft', trend: 'up', row: 1 },
      { id: 3, type: 'icon', icon: 'xxx', variant: 'outline', row: 1 },
      { id: 4, type: 'stat', value: '$10K+', label: "Our users' average saving amount", variant: 'soft', row: 2 },
      { id: 5, type: 'icon', icon: 'plus', variant: 'outline', row: 2 },
      { id: 6, type: 'stat', value: '50%', label: 'Effective in financial growth than before', variant: 'gradient', trend: 'up', row: 2 },
    ]
  }
})

const row1Items = computed(() => props.data.filter(item => item.row === 1))
const row2Items = computed(() => props.data.filter(item => item.row === 2))

const getPillClasses = (item) => {
  let base = "rounded-[100px] flex items-center justify-center transition-all duration-500 "
  
  if (item.type === 'stat') {
    base += "px-10 py-10 min-w-[320px] md:min-w-[440px] "
  } else {
    base += "px-16 py-10 "
  }

  const variants = {
    'outline': 'border border-blue-100 bg-white text-blue-300',
    'soft': 'bg-[#F4F8FF] text-[#2563EB]',
    'gradient': 'bg-gradient-to-r from-[#2563EB] to-[#93C5FD] text-white'
  }

  return base + (variants[item.variant] || variants.outline)
}
</script>

<style scoped>
/* 保持简洁，无需额外 CSS */
</style>