<template>
  <main class=" font-sans overflow-hidden">

    <!-- 1. Hero Section: 品牌宣言 -->
    <section class="relative pt-32 md:pt-60 pb-20 px-6">
    
      <div class="flex flex-col items-center text-center mb-[80px]">
        <div v-scroll-reveal="{ delay: 0.1 }"
          class="px-5 py-1.5 rounded-full border border-[#00378a]/60 bg-white text-[11px]  text-[#00378a] mb-6 uppercase tracking-[0.2em] shadow-sm">
           {{ siteConfig?.about?.tag || 'WHO WE ARE' }}
        </div>
        <h1 v-scroll-reveal="{ delay: 0.2 }"
          class="text-[40px] md:text-[60px] font-light leading-[1.1] tracking-tight mb-6 text-[#001f4e]">
        {{ siteConfig?.about?.titleOne || 'We bridge the gap between ' }} <span class="text-blue-500">{{ siteConfig?.about?.titleTwo || 'vision' }}</span> {{ siteConfig?.about?.titleThree || 'and reality.' }}
        </h1>
        <p v-scroll-reveal="{ delay: 0.3 }"
          class="text-[#001f4e]/90  text-lg max-w-2xl font-extralight leading-relaxed">
           {{ siteConfig?.about?.description || '老爹模板为外贸企业提供免费模板,帮助他们快速启动业务,提高效率。' }}
        </p>
      </div>
    </section>

    <!-- 2滚动拖动图片 -->
      <ImageScrollWall :images="myImages" :speed="100" />
    <!-- 2. Stats Section: 数据证明 -->
   <StatPillsSection :data="siteConfig?.about?.stats" />
   <TeamSection :data="siteConfig?.about?.team" />
  



  </main>
</template>

<script setup lang="ts">
const siteConfig = useAppConfig()
import { 
  Users, 
  Clock, 
  DollarSign, 
  Database, 
  TrendingUp,
  Zap,
  Target,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Globe,
  Sparkles,
  ChevronLeft, ChevronRight
} from 'lucide-vue-next'

const myImages = [
  'https://img1.baidu.com/it/u=160031104,989826552&fm=253&fmt=auto&app=138&f=JPEG?w=375&h=500',
  'https://img2.baidu.com/it/u=2690620702,4170729255&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
  'https://img2.baidu.com/it/u=1792296073,2641103574&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1419',
  'https://media.istockphoto.com/id/1137564607/zh/%E7%85%A7%E7%89%87/%E8%85%90%E6%AE%96%E8%B3%AA%E5%92%8C%E6%89%8B%E6%88%B4%E8%97%8D%E8%89%B2%E6%A9%A1%E8%86%A0%E6%89%8B%E5%A5%97%E6%89%8B%E6%8C%81%E5%A4%A9%E7%84%B6%E6%9C%89%E6%A9%9F%E6%8F%90%E5%8F%96%E7%93%B6-%E8%8A%B3%E9%A6%99%E7%9A%84%E5%9F%BA%E6%9C%AC%E7%A0%94%E7%A9%B6%E5%9C%A8%E5%AF%A6%E9%A9%97%E5%AE%A4%E8%A9%A6%E9%A9%97.jpg?s=612x612&w=0&k=20&c=o9I53rptRfTo_C1DqpqBRiaipAUD0Brzq13YB0zNlNc=',
  'https://img0.baidu.com/it/u=2596714907,225402579&fm=253&fmt=auto&app=138&f=JPEG?w=756&h=500',
]


const currentImgIndex = ref(0)

const nextImg = () => {
  currentImgIndex.value = (currentImgIndex.value + 1) % siteConfig?.about?.gallery.length
}

const prevImg = () => {
  currentImgIndex.value = (currentImgIndex.value - 1 + siteConfig?.about?.gallery.length) % siteConfig?.about?.gallery.length
}

const iconMap = {
  Zap,
  Users,
  Clock,
  DollarSign,
  Database,
  TrendingUp,
  Target,
  ShieldCheck,
  Cpu,
  ArrowRight,
  Globe,
  Sparkles,
  ChevronLeft, ChevronRight
}


const values = [
  {
    icon: 'Target',
    title: 'Precision First',
    desc: 'We don\'t believe in "close enough." Every detail is intentional, every pixel is deliberate.'
  },
  {
    icon: 'Sparkles',
    title: 'Innovation Driven',
    desc: 'Constantly exploring the frontier of technology to bring you tomorrow\'s solutions today.'
  },
  {
    icon: 'ShieldCheck',
    title: 'Unwavering Quality',
    desc: 'Reliability is our foundation. We build robust systems that stand the test of time and scale.'
  }
]
useSeoMeta({
  title: () => siteConfig?.seo?.about.title || 'Default Title',
  description: () => siteConfig?.seo?.about.description || 'Default description',
  ogTitle: () => siteConfig?.seo?.about.title || 'Default Title',
  ogDescription: () => siteConfig?.seo?.about.description || 'Default description',
  ogImage: () => siteConfig?.seo?.about.ogImage || '/default-og.jpg',
  twitterCard: () => siteConfig?.seo?.about.twitterCard || 'summary_large_image',
})
</script>

<style scoped>
/* 标题文字平衡 */
h1,
h2 {
  text-wrap: balance;
}

/* 文字渐变效果 */
.text-italic {
  font-style: italic;
  font-family: serif;
  /* 增加一点衬线体斜体，更有设计感 */
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
