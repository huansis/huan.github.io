 <template>
  <section class=" py-[50px]">
    <div v-scroll-reveal="{ delay: 0.2, y: 50 }" class="max-w-[1200px] mx-auto px-5">
      
      <!-- 主容器：使用你的主题蓝色渐变 -->
      <div
        class="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-[#001f4e] via-[#00378a] to-[#0055d4] px-8 py-20 md:py-12 text-center ">

        <!-- 1. 核心纹理层：SVG 强力噪点质感（这是提升高级感的关键） -->
        <div class="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full">
            <filter id="noiseFilter">
              <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
          </svg>
        </div>

        <!-- 2. 垂直动态光束 (高度还原图片效果，改为青蓝色调) -->
        <div class="absolute inset-0 pointer-events-none overflow-hidden">
          <div class="absolute top-0 left-[15%] w-[2px] h-full bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent blur-[15px] animate-beam-slow"></div>
          <div class="absolute top-0 left-[35%] w-[40px] h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent blur-[60px] animate-beam-fast"></div>
          <div class="absolute top-0 left-[55%] w-[1px] h-full bg-gradient-to-b from-transparent via-white/40 to-transparent blur-[20px] animate-beam-slow" style="animation-delay: 1.5s"></div>
          <div class="absolute top-0 left-[75%] w-[60px] h-full bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent blur-[80px] animate-beam-fast" style="animation-delay: 0.5s"></div>
          <div class="absolute top-0 left-[90%] w-[2px] h-full bg-gradient-to-b from-transparent via-blue-300/20 to-transparent blur-[25px] animate-beam-slow"></div>
        </div>

        <!-- 3. 两侧柔光晕 -->
        <div class="absolute -left-32 top-1/2 -translate-y-1/2 size-96 bg-cyan-500/20 rounded-full blur-[120px]"></div>
        <div class="absolute -right-32 top-1/2 -translate-y-1/2 size-96 bg-blue-400/20 rounded-full blur-[120px]"></div>

        <!-- 4. 内容区域 -->
        <div class="relative font-sans z-10 flex flex-col items-center">
          
          <!-- 装饰标签 -->
          <div class="mb-8 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-[10px] text-blue-100 font-bold uppercase tracking-[0.3em]">
            Global Logistics Support
          </div>

          <!-- 主标题：白色，加粗，现代感强 -->
          <h2
            class="text-[36px] md:text-[60px] font-light leading-[1.1] tracking-tight mb-8 text-white max-w-3xl mx-auto drop-shadow-2xl">
            {{ siteConfig?.index?.cart?.mainHeading || "Ready to elevate your production excellence?" }}
          </h2>

          <!-- 副标题：浅蓝白，高透光 -->
          <p class=" text-blue-100/80 text-lg md:text-xl max-w-2xl font-extralight leading-relaxed mx-auto">
            {{ siteConfig?.index?.cart?.subtitle || "Experience the industry-leading purity standards. Our specialists are ready to provide a custom quotation tailored to your needs." }}
          </p>

          <!-- 5. 核心白按钮 -->
          <div class="mt-14">
            <button 
              @click="onInquiry"
              class="group relative inline-flex items-center justify-center px-12 py-5 bg-white text-[#00378a] rounded-full font-bold text-[12px] tracking-[0.2em] uppercase overflow-hidden transition-all hover:bg-blue-50 hover:scale-105 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] active:scale-95"
            >
              <span class="relative z-10 flex items-center gap-3">
                Request a Quote
                <ArrowRight size="18" class="transition-transform group-hover:translate-x-1" />
              </span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
const siteConfig = useAppConfig()
const { isDrawerOpen } = useProductInquiry()
const { openInquiry } = useInquiry()

const onInquiry = () => {
    openInquiry("", { showLabel: false })
}

</script>

<style scoped>
/* 标题平衡感 */
h2 {
  text-wrap: balance;
}

/* 核心：光束动画逻辑 */
@keyframes beam-move {
  0%, 100% { opacity: 0.2; transform: translateY(-5%); }
  50% { opacity: 0.6; transform: translateY(5%); }
}

.animate-beam-slow {
  animation: beam-move 8s infinite ease-in-out;
}

.animate-beam-fast {
  animation: beam-move 5s infinite ease-in-out;
}

/* 增强按钮的点击反馈 */
button:hover {
  filter: brightness(1.05);
}
</style>