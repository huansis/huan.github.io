// composables/useProductInquiry.ts
import {  toast } from 'vue-sonner'

export const useProductInquiry = () => {
  // 使用 useState 让数据在全局共享（跨页面）
  
  const basket = useState<any[]>('inquiry-basket', () => [])
  const isDrawerOpen = useState('inquiry-drawer-open', () => false)

  // 添加到清单
  const addToBasket = (product: any) => {
    console.log('addToBasket:', product)
    if (!basket.value.find(p => p.id === product.id)) {
      basket.value.push(product)


      toast.success('Added to Inquiry List', {
        description: `${product.name} is ready for inquiry.`,
        duration: 500, // 仅这一次弹窗停留 1.5 秒
      })
    }
  }

  // 从清单移除
  const removeFromBasket = (productId: number | string) => {
    basket.value = basket.value.filter(p => p.id !== productId)
  }

  // 检查是否已在清单中
  const isInBasket = (productId: number | string) => {
    return basket.value.some(p => p.id === productId)
  }

  // 清空清单
  const clearBasket = () => {
    basket.value = []
  }

  return {
    basket,
    isDrawerOpen,
    addToBasket,
    removeFromBasket,
    isInBasket,
    clearBasket,
  }
}