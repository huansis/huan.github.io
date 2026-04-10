// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    // public 里的内容可以在前端（浏览器）访问
    public: {
      web3FormsKey: process.env.WEB3FORMS_KEY
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'lucide-vue-next',
      ]
    }
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    pageTransition: { name: 'page', mode: 'out-in' },
  },
  modules: ['@nuxt/content', '@nuxtjs/sitemap', '@nuxt/image', 'shadcn-nuxt', ],
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: '@/components/ui'
  },
  future: {
    compatibilityVersion: 4,
  },
  // 修正 CSS 路径
  css: ['~/assets/css/main.css'],
  devtools: { enabled: true },
  compatibilityDate: '2024-04-03',
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {}
    }
  },

  vue: {
    compilerOptions: {
      // 告诉 Vue 忽略这些自定义指令，不要报错
      isCustomElement: (tag) => ['count', 'scroll-reveal', 'scroll-group'].includes(tag)
    }
  },

  ssr: true,
  // 2. 静态部署预设
  nitro: {
    static: true,
    prerender: {
      crawlLinks: true,  // 关键：自动顺着页面上的链接爬取并生成所有产品页
      routes: ['/'],     // 从首页开始爬
      failOnError: false // 防止因为一个死链接导致整个打包失败
    }
  },

  // 3. Sitemap 依然保留，确保告诉搜索引擎你的所有路径
  sitemap: {
    strictNuxtContentAds: true // 自动包含所有 nuxt-content 里的文章
  }



})