<script setup>
// 定义接收的属性：Logo 列表和滚动速度
const props = defineProps({
  logos: {
    type: Array,
    required: true,
    // 数据结构示例: [{ name: 'Aero', src: '/logos/aero.svg' }, ...]
  },
  duration: {
    type: String,
    default: '30s' // 控制滚动速度
  }
})
</script>

<template>
  <div class="logo-ticker-container">
    <div class="logo-ticker-inner max-w-[960px] mx-auto ">
      <!-- 滚动容器：需要放置两组相同的 Logo 以实现无缝循环 -->
      <div 
        class="logo-list" 
        :style="{ animationDuration: duration }"
      >
        <!-- 第一组 -->
        <div v-for="(logo, index) in logos" :key="`a-${index}`" class="logo-item">
          <img :src="logo.src" :alt="logo.name" />
        </div>
        <!-- 第二组 (克隆) -->
        <div v-for="(logo, index) in logos" :key="`b-${index}`" class="logo-item">
          <img :src="logo.src" :alt="logo.name" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo-ticker-container {
  width: 100%;
  padding: 40px 0;
 
  overflow: hidden;
}

.logo-ticker-inner {
  position: relative;
  width: 100%;
  
  /* 核心代码：两侧模糊/淡出效果 */
  /* 使用 mask-image 创建线性渐变蒙版，黑色的地方显示，透明的地方隐藏 */
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 15%,
    black 85%,
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    black 15%,
    black 85%,
    transparent
  );
}

.logo-list {
  display: flex;
  width: max-content; /* 宽度由内容撑开 */
  align-items: center;
  gap: 60px; /* Logo 之间的间距 */
  padding-right: 60px; /* 补齐间距 */
  
  /* 启动动画 */
  animation: scroll linear infinite;
}

.logo-item {
  flex-shrink: 0;
}

.logo-item img {
  height: 60px; /* Logo 高度 */
  width: auto;
  
  /* 核心代码：变成灰色并降低亮度 */
  filter: grayscale(100%);
  opacity: 0.5;
  transition: all 0.3s ease;
}

/* 鼠标悬停时停止动画并恢复彩色 (可选) */
.logo-list:hover {
  animation-play-state: paused;
}
.logo-item img:hover {
  filter: grayscale(0%);
  opacity: 1;
}

/* 无缝滚动动画逻辑 */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    /* 滚动到一半的位置，因为我们放了两组一样的 Logo */
    transform: translateX(-50%);
  }
}
</style>