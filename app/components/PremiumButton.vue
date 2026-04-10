<template>
  <NuxtLink
    :to="to"
    :target="isExternal ? '_blank' : undefined"
    :class="[
      'inline-flex cursor-pointer items-center justify-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 active:scale-95 group',
      variantClasses[variant],
      sizeClasses[size]
    ]"
  >
    <!-- 图标插槽 -->
    <slot name="icon">
      

    </slot>

    <!-- 文字 -->
    <span class="relative">
      <slot />
    </span>

    <!-- 右侧箭头（可选） -->
    <ArrowRight   v-if="withArrow" class="size-4 opacity-70 transition-transform group-hover:translate-x-1" />
  </NuxtLink>
</template>

<script setup lang="ts">
import {
     ArrowRight,
} from 'lucide-vue-next'
interface Props {
  to?: string
  icon?: string
  withArrow?: boolean
  variant?: 'primary' | 'glass' | 'outline' | 'neon'
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'md',
  withArrow: false
})

const isExternal = computed(() => props.to?.startsWith('http'))

// 样式变体定义
const variantClasses = {
  // 1. 核心行动点 (Primary) - 稳重的工业蓝，带微弱发光
  // 适合：导航栏右侧的 "Inquiry Now" 或 滚动后的主按钮
  primary: 'bg-[#0052cc] text-white hover:bg-[#0066ff] shadow-[0_4px_14px_0_rgba(0,82,204,0.39)] hover:shadow-[0_6px_20px_rgba(0,82,204,0.23)] transition-all duration-300',
  
  // 2. 实验室毛玻璃 (Glass) - 极具科技感，适合在视频背景上使用
  // 适合：Hero区域的主按钮，能透出背景色
  glass: 'backdrop-blur-md bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/40 transition-all duration-500 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]',
  
  // 3. 极简线条风格 (Outline) - 你要求的“只有边框线条”的那种
  // 适合：次要按钮，或者在背景非常干净时使用
  outline: 'bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/5 transition-colors duration-300',
  
  // 4. 纯净白 (Clean White) - 高对比度，适合在深色导航栏滚动后使用
  // 适合：白色背景下的深色交互
white: `
  relative overflow-hidden bg-white text-[#001f4e] border border-slate-200 
 hover:bg-[#00378a] hover:text-white hover:border-[#00378a]
  active:scale-[0.98] transition-all duration-400 ease-out
  after:absolute after:inset-0 after:bg-[#00378a]/5 after:opacity-0 hover:after:opacity-100 after:transition-opacity
`
}

const sizeClasses = {
  sm: 'text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-10 py-4 text-lg'
}

</script>