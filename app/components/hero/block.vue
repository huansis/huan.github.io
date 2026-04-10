<template>
  <div class="bg-white">
    <!-- Hero 主体区域：增加了 min-h 和响应式高度处理 -->
    <section class="relative w-full min-h-[80vh] lg:h-[80vh] flex items-center bg-[#000b1d] max-lg:min-h-[auto] max-lg:pt-[120px] max-lg:pb-[250px] max-md:mb-[250px]">
      
      <!-- 1. 背景视频层 (保持不变) -->
      <div class="absolute inset-0 z-0 overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-[#00122e]/95 to-[#00122e]/40 z-[1]"></div>
        <video
          ref="videoRef"
          :src="videoSrc"
          :poster="poster"
          autoplay
          loop
          muted
          playsinline
          class="w-full h-full object-cover"
          @canplay="$event.target.playbackRate = 0.5"
        ></video>
      </div>

      <!-- 2. 文字内容容器 -->
      <div class="relative z-[2] w-full max-w-[1240px] mx-auto px-10 h-full flex flex-col justify-center">
        <!-- 核心适配区域：调整了 pb 和内部元素的 mb -->
        <div class="max-w-[650px] pt-10 pb-[140px] lg:pb-[100px] max-lg:text-center max-lg:mx-auto max-lg:flex max-lg:flex-col max-lg:items-center">
          
          <p v-scroll-reveal="{ delay: 0.1 }" 
             class="text-sm md:text-base text-white mb-4 lg:mb-5 opacity-90 tracking-wide">
            {{  siteConfig?.index?.hero?.welcomeText || '老爹模板' }}
          </p>
          
          <h1 v-scroll-reveal="{ delay: 0.2 }" 
              class="text-5xl font-semibold text-white leading-[1.15] mb-5 lg:mb-[25px]">
            {{ siteConfig?.index?.hero?.mainHeading || 'Your Global Business Journey Starts Here' }}
          </h1>
          
          <div class="hidden 2xl:block w-full h-[1px] bg-white/20 mb-6 lg:mb-[35px]"></div>
          
          <p v-scroll-reveal="{ delay: 0.3 }" 
             class="hidden 2xl:block text-base lg:text-lg leading-[1.6] text-white/85 mb-8 lg:mb-10 max-w-[580px]">
            {{ siteConfig?.index?.hero?.description || 'DaddyTemplate is a global business platform that helps businesses to grow and succeed.' }}
          </p>
          
          <NuxtLink v-scroll-reveal="{ delay: 0.3 }" 
                    :to="buttonLink" 
                    class="inline-block px-8 py-[14px] border border-white rounded-[50px] text-white no-underline text-base transition-[background-color,color,border-color] duration-300 hover:bg-white hover:text-[#00122e]">
            {{ siteConfig?.index?.hero?.ctaButton || 'Discover our products' }}
          </NuxtLink>
        </div>

        <!-- 3. 底部悬浮卡片 (逻辑保持，微调响应式) -->
        <div class="absolute bottom-0 left-10 right-10 translate-y-1/2 bg-[#00378ab3] backdrop-blur-[50px] rounded-2xl p-8 lg:p-[50px] z-10 border border-white/10 max-lg:left-5 max-lg:right-5 max-md:translate-y-[120%]">
          <div class="grid grid-cols-[1fr_1.6fr] gap-10 lg:gap-[60px] items-start max-lg:grid-cols-1 max-lg:gap-6">
            <!-- 左侧标题与按钮 -->
            <div class="card-left">
              <h2 class="text-2xl lg:text-[32px] font-semibold text-white leading-[1.2] mb-6 lg:mb-[30px]">{{ siteConfig?.index?.hero?.cardTitle || 'Relied on by brands' }}</h2>
              <NuxtLink :to="cardBtnLink" class="inline-block px-7 py-2.5 border border-white/50 rounded-[50px] text-white no-underline text-sm transition-all duration-300 hover:bg-white/15">
                About Us
              </NuxtLink>
            </div>
            <!-- 右侧长文本描述 -->
            <div class="card-right">
              <p class="text-sm lg:text-[15px] leading-[1.8] text-white/85 text-justify">{{ siteConfig?.index?.hero?.cardDescription || 'We simplify your sourcing with a specialized logistics system and reliable warehouse capacity. From custom synthesis in our labs to global distribution, your satisfaction is our pleasure. Trust the experience that has been leading the industry since 1980.' }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 下一个区块的占位 -->
    <section class="w-full h-[200px] lg:h-[250px] bg-white"></section>
  </div>
</template>

<script setup>
const siteConfig = useAppConfig()

defineProps({
  // 顶部小标签
  label: { type: String, default: '' },
  // 主标题
  title: { type: String, default: 'Aroma Chemicals, Natural Products & Menthol Synthetic' },
  // 主描述
  description: { 
    type: String, 
    default: '' 
  },
  buttonText: { type: String, default: 'Explore Our Catalog' },
  buttonLink: { type: String, default: '/products' },
  
  // 底部卡片 Props
  cardTitle: { type: String, default: '' },
  cardDescription: { 
    type: String, 
    default: '' 
  },
  cardBtnLink: { type: String, default: '/about' },

  // 素材 Props
  videoSrc: { type: String, default: 'https://www.pexels.com/zh-cn/download/video/35063024/' },
  poster: { type: String, default: '' }
})
</script>