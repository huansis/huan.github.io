// composables/useInquiry.ts
export const useInquiry = () => {
    const isOpen = useState('inquiry-modal-open', () => false)
    const productName = useState('inquiry-product-name', () => '')
    // 新增：控制是否显示 "Regarding" 文字行的开关
    const showRegarding = useState('inquiry-show-regarding', () => true)

    /**
     * @param name 产品名称
     * @param options 配置项，可选
     */
    const openInquiry = (name: string, options = { showLabel: true }) => {
        productName.value = name
        showRegarding.value = options.showLabel // 设置是否显示标签
        isOpen.value = true
    }

    const closeInquiry = () => {
        isOpen.value = false
    }

    return {
        isOpen,
        productName,
        showRegarding, // 导出这个状态
        openInquiry,
        closeInquiry
    }
}