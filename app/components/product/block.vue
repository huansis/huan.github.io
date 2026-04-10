<template>
  <section class=" font-sans ">
    <div class=" mx-auto px-5">
      <!-- 标题 -->
     
      <!-- 顶部搜索栏 -->
 <div class="mx-auto px-4 md:px-10 py-10 bg-white"  v-scroll-reveal="{delay:0.5}">
    
    <!-- 1. 顶部搜索区：通过加大上下留白，产生“轻盈”的呼吸感 -->
    <div v-if="showSearch" class="flex flex-col md:flex-row items-end md:items-center justify-between mb-12 gap-4">
      
      <!-- 搜索框容器 (完全保留您的原始样式) -->
      <div class="relative flex items-center w-full md:w-[400px] group">
        <div class="absolute left-5 text-slate-400 group-focus-within:text-[#00378a] transition-colors duration-300">
          <Search size="20" />
        </div>
        <input v-model="searchQuery" type="text"
          :placeholder="'Search Product or CAS...'" 
          class="w-full placeholder:font-light placeholder:text-[14px] bg-white border border-slate-200 rounded-full py-3.5 pl-14 pr-6 
                 text-slate-900 text-base outline-none transition-all duration-300
                 focus:border-[#00378a] focus:ring-4 focus:ring-[#00378a]/5
                 placeholder:text-slate-400 placeholder:transition-all placeholder:duration-500 
                 focus:placeholder:opacity-0 focus:placeholder:translate-x-6" />
      </div>

      <!-- 数量统计：去掉背景色块，改为极简的文字排版 -->
      <div class="flex items-center gap-3 pr-2">
        <span class="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">Inventory Items</span>
        <span class="text-[#00378a] font-bold text-xl leading-none">{{ displayProducts.length }}</span>
      </div>
    </div>

    <!-- 2. 产品列表区：去掉了外部容器框，直接平铺在白色背景上 -->
    <div class="product-list-container">
      
      <!-- 列表头 (桌面端)：完全保留您的列比例 -->
      <div class="hidden md:grid grid-cols-[2.5fr_1.5fr_1fr_1fr] gap-5 px-[30px] pb-4 border-b border-slate-100">
        <div class="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Product Info</div>
        <div class="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Technical Codes</div>
        <div class="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">Documentation</div>
        <div class="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider text-right">Action</div>
      </div>

      <!-- 列表内容：完全保留您的列表项样式 -->
      <div class="divide-y divide-slate-50"  >
        <TransitionGroup name="list-fade">
        <div v-for="item in paginatedProducts" :key="item.id"
            class="group rounded-lg overflow-hidden even:bg-[#e0eaf6]/20 bg-white border-b border-slate-100 p-5  grid grid-cols-1 gap-2 md:grid-cols-[2.5fr_1.5fr_1fr_1fr] items-center gap-5 transition-all duration-300 hover:bg-[#fcfdfe] hover:translate-x-1 md:hover:translate-x-2.5">

            <!-- 1. 图片与名称列 -->
            <div class="flex items-center gap-5">
              <div class="shrink-0">
                <div class="w-[80px] h-[80px] bg-[#e0eaf6] rounded-2xl flex items-center justify-center transition-all duration-400 ">
                  <img v-if="item.molecule_img" :src="item.molecule_img" class="rounded-2xl object-contain transition-all duration-400 " />
                  <FlaskConical v-else size="28" stroke-width="2" class="text-[#00378a]" />
                </div>
              </div>
              <div class="flex flex-col">
                <span class="font-mono text-[11px] bg-slate-100 text-slate-400 text-center w-[80px] rounded-full  font-bold uppercase tracking-tight">REF: #{{ item.id }}</span>
                <h4 class="text-[19px] font-extrabold text-[#001f4e] my-1 leading-tight">{{ item.name }}</h4>
                <div class="flex gap-1.5 mt-2">
                  <span class="bg-emerald-50 text-emerald-600 border border-emerald-100 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-tighter">Food Grade</span>
                  <span class="bg-blue-50 text-blue-600 border border-blue-100 text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-tighter ml-1.5">99%+ Purity</span>
                </div>
              </div>
            </div>

            <!-- 2. 技术参数列 -->
            <div class="flex flex-col gap-2.5">
              <div class="flex flex-col">
                <span class="text-[10px] font-bold text-slate-300 uppercase">CAS NO.</span>
                <span class="font-mono text-[15px] font-bold text-[#00378a]">{{ item.cas }}</span>
              </div>
              <div class="flex flex-col" v-if="item.fema">
                <span class="text-[10px] font-bold text-slate-300 uppercase">FEMA</span>
                <span class="font-mono text-[15px] font-bold text-slate-600">{{ item.fema }}</span>
              </div>
            </div>

            <!-- 3. 文档下载列 -->
            <div class="flex items-center">
              <button class="flex items-center gap-1.5 px-3 py-2 border border-slate-100 rounded-lg text-[11px] font-bold text-slate-400 transition-colors hover:border-[#00378a] hover:text-[#00378a]">
                 <span>Details</span>
                <ArrowUpRight size="16" class="transition-transform duration-300 group-hover/link:translate-x-1" />
              </button>
            </div>

            <!-- 4. 询盘按钮列 -->
            <div class="flex justify-start md:justify-end">
<button 
  @click="addToBasket(item)"
  :disabled="isInBasket(item.id)"
  :class="[
    isInBasket(item.id) 
      ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-default shadow-none' // 已添加：彻底锁定样式
      : 'bg-[#00378a] border-[#00378a] text-white hover:bg-[#002d70] hover:shadow-md active:scale-95 cursor-pointer' // 默认：允许交互
  ]"
  class="relative min-w-[140px] px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all duration-500 overflow-hidden group"
>
  <!-- 图标逻辑 -->
  <div class="relative w-4 h-4 flex items-center justify-center">
    <Transition name="icon-slide">
      <!-- 已添加：使用更淡的灰色，stroke 变细一点显得更轻盈 -->
      <Check v-if="isInBasket(item.id)" :key="'check'" size="16" stroke-width="2.5" class="absolute text-slate-400" />
      <!-- 默认：发送图标 -->
      <Send v-else :key="'send'" size="16" class="absolute text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
    </Transition>
  </div>

  <!-- 文字逻辑 -->
  <Transition name="text-fade" mode="out-in">
    <span :key="isInBasket(item.id) ? 'added' : 'add'" class="tracking-tight">
      {{ isInBasket(item.id) ? 'Added to List' : 'Inquiry' }}
    </span>
  </Transition>
</button>
            </div>
          </div>
        </TransitionGroup>
      </div>
       <!-- 3. 加载更多区域：极简设计 -->
<div class="mt-16">

  <!-- 情况 A: 有搜索结果时 -->
  <template v-if="displayProducts.length > 0">
    
    <!-- 情况 A-1: 还有更多可以加载 -->
    <div v-if="hasMore" class="flex flex-col items-center gap-4">
      <span class="text-[11px] font-bold text-slate-300 uppercase tracking-[0.2em]">
        Viewing {{ paginatedProducts.length }} of {{ displayProducts.length }} Products
      </span>
      <button @click="loadMore"
        class="group relative px-12 py-4 border border-slate-200 rounded-full text-slate-500 font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:border-[#00378a] hover:text-[#00378a] hover:bg-slate-50 active:scale-95">
        Explore More
        <div class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-[#00378a] transition-all duration-300 group-hover:w-8"></div>
      </button>
    </div>

    <!-- 情况 A-2: 搜索结果已全部加载完毕 -->
    <div v-else class="text-center">
      <span class="text-[11px] font-bold text-slate-200 uppercase tracking-[0.2em]">
        All matching products have been loaded
      </span>
    </div>

  </template>

  <!-- 情况 B: 搜索结果为空时 (Empty State) -->
  <div v-else 
       class="py-20 flex flex-col items-center justify-center bg-white rounded-[32px] border border-dashed border-slate-100">
    <div class="p-5 bg-slate-50 rounded-full mb-6">
      <Search size="32" class="text-slate-200" stroke-width="1.5" />
    </div>
    <h3 class="text-lg font-bold text-slate-800 mb-2">No matching products found</h3>
    <button @click="searchQuery = ''" 
            class="mt-8 px-8 py-2.5 border border-slate-200 rounded-full text-[11px] font-bold text-slate-400 uppercase tracking-widest hover:border-[#00378a] hover:text-[#00378a] transition-all">
      Clear Search
    </button>
  </div>

</div>
    </div>
  </div>
    </div>
  </section>
</template>

<script setup>
// 1. 导入所有需要的 API
import { ref, computed, watch } from 'vue' // 确保导入了 watch
import { Search, FileText, Send, FlaskConical,ArrowUpRight,Check } from 'lucide-vue-next'
const { addToBasket, isInBasket } = useProductInquiry()
const INITIAL_COUNT = 6;
// 2. 环境配置与 Props 定义
const siteConfig = useAppConfig()
const props = defineProps({
  products: { type: Array, default: () => [] },
  limit: { type: Number, default: 0 },
  showSearch: { type: Boolean, default: true }
})

// 3. 基础响应式变量定义 (最核心的变量放最前面)
const searchQuery = ref('')
const visibleCount = ref(INITIAL_COUNT)
const pageSize = INITIAL_COUNT

// 4. 第一层过滤：根据搜索条件过滤原始列表
const displayProducts = computed(() => {
  // 1. 获取原始数据源
  const source = props.products || []
  if (source.length === 0) return []

  // 2. 处理搜索词 (去掉空格、转小写)
  const q = searchQuery.value?.trim().toLowerCase() || ''

  // 3. 如果没搜，直接返回原始列表 (受 limit 约束)
  if (!q) {
    return props.limit > 0 ? source.slice(0, props.limit) : source
  }

  // 4. 关键：执行多字段模糊匹配
  return source.filter(p => {
    // 确保所有字段都转为字符串再搜索，防止 cas: 600... 这种数字格式导致报错
    const name = String(p.name || '').toLowerCase()
    const cas = String(p.cas || '').toLowerCase()
    const id = String(p.id || '').toLowerCase()
    const fema = String(p.fema || '').toLowerCase()

    return name.includes(q) || 
           cas.includes(q) || 
           id.includes(q) || 
           fema.includes(q)
  })
})

// 5. 第二层过滤：根据分页数量切片显示
const paginatedProducts = computed(() => {
  // 只有当有搜索结果时，才进行切片显示
  return displayProducts.value.slice(0, visibleCount.value)
})

// 6. 逻辑判断属性
const hasMore = computed(() => {
  return visibleCount.value < displayProducts.value.length
})

// 7. 方法与监听器 (放在最后)
const loadMore = () => {
  visibleCount.value += pageSize
}

// 监听搜索框变化，重置分页
watch(searchQuery, () => {
  visibleCount.value = INITIAL_COUNT
})
</script>

<style scoped>
/* Transition 动画依然建议保留在 CSS 中 */
.list-fade-enter-active,
.list-fade-leave-active {
  transition: all 0.4s ease;
}

.list-fade-enter-from,
.list-fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}


/* 1. 图标滑入滑出动画：像抽屉一样上下切换 */
.icon-slide-enter-active,
.icon-slide-leave-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.icon-slide-enter-from {
  transform: translateY(20px) scale(0.5);
  opacity: 0;
}
.icon-slide-leave-to {
  transform: translateY(-20px) scale(0.5);
  opacity: 0;
}

/* 2. 文字淡入淡出动画 */
.text-fade-enter-active,
.text-fade-leave-active {
  transition: all 0.3s ease;
}
.text-fade-enter-from {
  opacity: 0;
  transform: translateX(5px);
}
.text-fade-leave-to {
  opacity: 0;
  transform: translateX(-5px);
}

/* 3. 按钮背景色过渡增强 */
button {
  transition: background-color 0.6s cubic-bezier(0.4, 0, 0.2, 1), 
              border-color 0.6s cubic-bezier(0.4, 0, 0.2, 1),
              color 0.4s ease;
}
</style>