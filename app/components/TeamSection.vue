<template>
  <section class="py-24 px-6 bg-white text-slate-900">
    <div class="container mx-auto max-w-[1200px]">
      
      <!-- 头部标题 (可选) -->
     <div class="flex flex-col items-center text-center mb-[80px]">
        <div v-scroll-reveal="{ delay: 0.1 }"
          class="px-5 py-1.5 rounded-full border border-[#00378a]/60 bg-white text-[11px]  text-[#00378a] mb-6 uppercase tracking-[0.2em] shadow-sm">
           {{ siteConfig?.about?.teamTag || 'Statisticß111' }}
        </div>
        <h1 v-scroll-reveal="{ delay: 0.2 }"
          class="text-[40px] md:text-[60px] font-light leading-[1.1] tracking-tight mb-6 text-[#001f4e]">
        {{ siteConfig?.about?.teamTitleone || 'We bridge the gap between ' }}<br> <span class="text-blue-500">{{ siteConfig?.about?.teamTitletwo || 'vision' }}</span>
        </h1>
     
      </div>

      <!-- 响应式网格布局 -->
      <div v-scroll-reveal="{ delay: 0.3 }" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
        <div 
          v-for="(member, index) in siteConfig?.about?.teamMembers" 
          :key="index"
          class="group bg-[#F4F8FF] rounded-2xl p-10 flex flex-col items-center text-center transition-all duration-500 "
        >
          <!-- 头像区域 -->
          <div class="relative w-40 h-40 mb-8">
            <!-- 背景装饰圆圈 -->
            <div class="absolute inset-0 bg-blue-100/60 rounded-full scale-110 group-hover:scale-125 transition-transform duration-700 ease-out"></div>
            
            <!-- 图片容器 -->
            <div class="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-sm z-10">
              <img 
                :src="member.image" 
                :alt="member.name"
                class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 ease-in-out"
              />
            </div>
          </div>

          <!-- 姓名与职位 -->
          <h3 class="text-xl font-bold text-slate-900 mb-1 tracking-tight">
            {{ member.name }}
          </h3>
          <p class="text-slate-500 text-sm font-medium mb-8">
            {{ member.role }}
          </p>

          <!-- 社交媒体图标 (内置 SVG) -->
          <div class="flex items-center gap-3">
            <a 
              v-for="(link, type) in member.socials" 
              :key="type"
              :href="link"
              class="size-10 rounded-full border border-blue-100 bg-white flex items-center justify-center text-blue-500 transition-all duration-300 hover:bg-blue-600 hover:text-white hover:border-blue-600"
              target="_blank"
            >
              <!-- 根据类型渲染不同的内联 SVG -->
              <svg v-if="type === 'email'" class="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
              <svg v-if="type === 'linkedin'" class="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              <svg v-if="type === 'github'" class="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const  siteConfig = useAppConfig()
</script>

<style scoped>
/* 我们可以针对图片切换增加一点顺滑感 */
img {
  backface-visibility: hidden;
  -webkit-user-drag: none;
}
</style>