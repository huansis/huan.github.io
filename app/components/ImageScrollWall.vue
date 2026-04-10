<template>
  <div v-scroll-reveal="{ delay: 0.3 }" class="scroll-container">
    <div class="scroll-wrapper" :style="{ '--duration': speed + 's' }">
      <!-- 
        核心修复 1：这里必须循环 displayImages 而不是 images 
        我们渲染两组完全相同的 displayImages 
      -->
      <div v-for="group in [1, 2]" :key="group" class="scroll-group">
        <div 
          v-for="(img, index) in displayImages" 
          :key="`${group}-${index}`" 
          class="image-item"
          :style="{ height: getHeight(index) }"
        >
          <img :src="img" alt="scroll-image" loading="eager" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  images: {
    type: Array,
    required: true,
  },
  speed: {
    type: Number,
    default:100
  }
})

// 核心修复 2：计算逻辑改进
const displayImages = computed(() => {
  if (!props.images || props.images.length === 0) return [];
  
  let list = [...props.images];
  
  // 关键：如果图片总数太少，单组宽度不足以撑满屏幕，滚动就会露馅
  // 假设一张图 260px，我们要确保单组图片至少覆盖 2 倍屏幕宽度（约 4000px）
  // 4000 / 260 ≈ 15 张
  while (list.length < 15) {
    list = list.concat(list);
  }
  return list;
});

// 固定高度序列，确保两组高度完全一致，防止滚动衔接时上下跳动
const getHeight = (index) => {
  const heights = ['280px', '350px', '220px', '400px', '310px'];
  return heights[index % heights.length];
}
</script>

<style scoped>
.scroll-container {
  width: 100%;
  overflow: hidden;
  position: relative;
  padding: 60px 0;
  background-color: transparent;
  
  /* 两侧羽化遮罩 */
  mask-image: linear-gradient(
    to right,
    transparent,
    black 15%,
    black 85%,
    transparent
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    black 15%,
    black 85%,
    transparent
  );
}

.scroll-wrapper {
  display: flex;
  width: max-content; /* 必须：由内容决定总宽度 */
  flex-wrap: nowrap;
  will-change: transform;
  animation: scroll-move var(--duration) linear infinite;
}

.scroll-group {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 24px;
  /* 关键：padding-right 必须和 gap 一致，确保第一组末尾和第二组开头间距正确 */
  padding-right: 24px; 
}

.image-item {
  width: 260px;
  border-radius: 20px;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.image-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* 
动画核心：
100% 必须是 -50%，因为我们有两组相同的 scroll-group。
当第一组滚完，第二组刚好在相同位置接替。
*/
@keyframes scroll-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* 鼠标悬停暂停（可选） */
.scroll-wrapper:hover {
  animation-play-state: paused;
}
</style>