<template>
  <section class=" text-slate-900 xl:py-40 font-sans overflow-hidden">
    <div class="container mx-auto px-6 max-w-[960px]">

      <!-- 1. 顶部标题区域：洁净且专业 -->
      <div class="flex flex-col items-center text-center mb-[80px]">
        <div v-scroll-reveal="{ delay: 0.1 }"
          class="px-5 py-1.5 rounded-full border border-[#00378a]/60 bg-white text-[11px]  text-[#00378a] mb-6 uppercase tracking-[0.2em] shadow-sm">
          {{ siteConfig?.index?.case?.tag || "Category" }}
        </div>
        <h2 v-scroll-reveal="{ delay: 0.2 }"
          class="text-[40px] md:text-[60px] font-light leading-[1.1] tracking-tight mb-6 text-[#001f4e]">
          {{ siteConfig?.index?.case?.mainHeading || "Core Excellence" }}
        </h2>
        <p v-scroll-reveal="{ delay: 0.3 }"
          class="text-[#001f4e]/90  text-lg max-w-2xl font-extralight leading-relaxed">
          {{ siteConfig?.index?.case?.subtitle || "Since 1980, we have specialized in high-purity aromachemicalsand natural products." }}
        </p>
      </div>

      <!-- 2. 核心内容：带科技感的左右布局 -->
      <div class="h-full  relative">
        <Transition name="fade-slide" mode="out-in">
          <div :key="currentIndex" class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

            <!-- 左侧：产品展示图 -->
            <div v-scroll-reveal="{ delay: 0.2 }" class="lg:col-span-6 relative group">
             
              <div class="product-image-card  h-[200px] md:h-[550px] borderoverflow-hidden">
                <img :src="currentCase.image"
                  class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  :alt="currentCase.title" />
              </div>
            </div>

            <!-- 右侧：详情内容 -->
            <div v-scroll-reveal="{ delay: 0.4 }" class="lg:col-span-6 flex flex-col">
              <!-- 品牌标签 -->
              <div class="brand-badge-container">
                <div class="icon-box-small">
                  <FlaskConical class="size-5 text-[#00378a]" />
                </div>
                <span class="text-[11px] font-bold tracking-[0.25em] uppercase text-[#00378a]">
                    {{ currentCase.brand }}
                </span>
              </div>

              <h3 class="text-[28px] md:text-[38px] font-light leading-tight mb-6 text-[#001f4e]">
                {{ currentCase.title }}
              </h3>

              <!-- 表格：增加横向滚动以防小屏溢出 -->
              <div class="overflow-x-auto">
                <table class="lab-data-table w-full" v-show="currentCase.products?.length > 0">
                  <thead>
                    <tr>
                      <th class="w-[60px] md:w-[80px]">ID</th>
                      <th>Product Name</th>
                      <th class="w-[100px] md:w-[140px]">CAS No.</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in currentCase.products" :key="item.id">
                      <td class="font-mono text-[12px] md:text-[13px] text-[#7c8ba1]">{{ item.id }}</td>
                      <td class="font-semibold text-slate-700 text-sm md:text-base">{{ item.name }}</td>
                      <td class="text-[#00378a] font-medium text-[13px] md:text-[14px]">{{ item.cas }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p v-show="currentCase.description" class="text-slate-500 mt-4 text-sm leading-relaxed">
                {{ currentCase.description }}
              </p>

              <!-- 手机端缩小边距，避免留白过多 -->
              <PremiumButton variant="white" size="sm" withArrow class="mt-8 mb-4 md:my-12" to="/products">
                More Info
              </PremiumButton>

            </div>
          </div>
        </Transition>
      </div>

      <!-- 3. 底部导航控制：工业蓝极简设计 -->
      <div v-scroll-reveal
        class="mt-10  flex items-center justify-between  border-slate-100 pt-8">

        <!-- 1. 进度指示：手机端数字更大，进度条更长 -->
        <div class="flex items-center gap-4 md:gap-4">
          <!-- 当前页码 -->
          <span class="text-lg md:text-sm font-bold text-[#00378a] tabular-nums tracking-tighter">
            0{{ currentIndex + 1 }}
          </span>

          <!-- 进度条：手机端宽度加长 (w-20)，桌面端还原 (md:w-12) -->
          <div class="w-20 md:w-12 h-[1.5px] bg-slate-100 relative">
            <div class="absolute inset-y-0 left-0 bg-[#00378a] transition-all duration-700 ease-in-out"
              :style="{ width: ((currentIndex + 1) / 3) * 100 + '%' }"></div>
          </div>

          <!-- 总页码 -->
          <span class="text-lg md:text-sm font-medium text-slate-300 tabular-nums tracking-tighter">
            03
          </span>
        </div>

        <!-- 2. 极简导航：手机端拥有更明显的点击背板 -->
        <div class="flex items-center gap-3 md:gap-8">
          <!-- 上一个 -->
          <button @click="prevCase" class="mobile-nav-btn group" aria-label="Previous">
            <svg class="size-6 md:size-5 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>

          <!-- 下一个 -->
          <button @click="nextCase" class="mobile-nav-btn group" aria-label="Next">
            <svg class="size-6 md:size-5 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
const siteConfig = useAppConfig()
const cases = siteConfig?.index?.case?.product || []
const currentIndex = ref(0)

import {
  FlaskConical,
  Zap,
  Users,
  Clock,
  DollarSign,
  Database,
  TrendingUp
} from 'lucide-vue-next'

const currentCase = computed(() => cases[currentIndex.value])

const nextCase = () => {
  currentIndex.value = (currentIndex.value + 1) % cases.length
}

const prevCase = () => {
  currentIndex.value = (currentIndex.value - 1 + cases.length) % cases.length
}


</script>

<style scoped>
/* 核心：响应式按钮样式 */
.mobile-nav-btn {
  /* 基础：无边框 */
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  /* 手机端：实色大圆盘背景 (56x56px)，更容易点击 */
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #f8fafc;
  /* 非常浅的灰色，提示可点击区域 */
  color: #00378a;
}

/* 桌面端还原：去掉背景，变回极致简约的 Ghost 风格 */
@media (min-width: 768px) {
  .mobile-nav-btn {
    width: auto;
    height: auto;
    background-color: transparent;
    color: #94a3b8;
    /* 恢复默认淡灰 */
    padding: 8px;
  }

  .mobile-nav-btn:hover {
    color: #00378a;
    background-color: #e0eaf6;
    /* 之前确定的悬浮色 */
  }
}

/* 强制等宽数字 */
.tabular-nums {
  font-variant-numeric: tabular-nums;
}

/* 切换时的淡入淡出和微移位动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.4s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateX(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}

/* 1. 图片卡片：高度还原图片中的柔和扩散阴影 */
.product-image-card {
  width: 100%;

  border-radius: 16px;
  overflow: hidden;



}
@media (min-width: 1024px) {
  .product-image-card {
    aspect-ratio: 4 / 5;
  }
}
/* 2. 品牌标签与图标背景还原 */
.brand-badge-container {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.icon-box-small {
  background-color: #e0eaf6;
  /* 核心还原色 */
  width: 44px;
  height: 44px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

/* 3. 规格参数卡片样式 */
.spec-card {
  background-color: #ffffff;
  border: 1px solid #f0f4f8;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 15px 40px -15px rgba(0, 0, 0, 0.05);
}

/* 4. 导航按钮：极简圆形 */
.nav-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid #f0f4f8;
  background-color: #ffffff;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.nav-btn:hover {
  border-color: #00378a;
  color: #00378a;
  box-shadow: 0 10px 25px -5px rgba(0, 55, 138, 0.1);
  transform: translateY(-2px);
}

/* 动画效果 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* 核心：实验室表格样式还原 */
.product-table-wrapper {
  background: #ffffff;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid #f0f4f8;
  /* 柔和阴影还原 */
  box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.04);
}

.lab-data-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

/* 表头：使用极浅蓝灰色背景 (#e0eaf6) */
.lab-data-table th {
  background-color: #e0eaf6;
  color: #00378a;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  padding: 14px 20px;
  border-bottom: 2px solid #ffffff;
}

/* 单元格样式 */
.lab-data-table td {
  padding: 12px 20px;
  font-size: 14px;
  border-bottom: 1px solid #f8fafc;
  line-height: 1.4;
}

/* 隔行变色，增强阅读感 */
.lab-data-table tbody tr:nth-child(even) {
  background-color: #fbfdff;
}

.lab-data-table tbody tr:hover {
  background-color: #f1f7ff;
  transition: background-color 0.2s ease;
}

.table-footer-note {
  font-size: 12px;
  color: #7c8ba1;
  padding: 12px 20px;
  background: #fcfdfe;
  border-top: 1px solid #f0f4f8;
  font-style: italic;
}

/* 之前已定义的样式保持不变... */
.icon-box-small {
  background-color: #e0eaf6;
  /* ... */
}
</style>