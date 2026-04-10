// app.config.ts
export default defineAppConfig({
  "base": {
    "email": "inofo@daddytemplate.com",
    "companyName": "Shengyuan",
    "phone": "+86 (136) 5661-7631",
    "address": "123 Main St, Anytown, CHina"
  },
  "logo": {
    "darklogoUrl": "https://hidaddy.oss-cn-shanghai.aliyuncs.com/daddytemplate/fortemplate/dark-logo.png",
    "lightlogoUrl": "https://hidaddy.oss-cn-shanghai.aliyuncs.com/daddytemplate/fortemplate/logo.png",
    "logoName": "",
  },
  megaMenu: {
    // 1. 顶部标题区域
    header: {
      tag: "Product Portfolio",
      title: "Chemical Solutions"
    },
    // 2. 三个分类的具体内容（图片、文字、描述）
    categories: [
      {
        label: "Aroma Chemicals",
        slug: "aroma-chemicals",
        description: "High-purity aroma chemicals for sophisticated fragrance and flavor synthesis.",
        image: "https://framerusercontent.com/images/5umROpQf1LFQZpL5TNpSAKSt0M.jpg"
      },
      {
        label: "Natural Products",
        slug: "natural-products",
        description: "Pure botanical extractions maintaining the full spectrum of natural aromatic profiles.",
        image: "https://media.istockphoto.com/id/1315042436/zh/%E7%85%A7%E7%89%87/%E5%A9%A6%E5%A5%B3%E6%BA%96%E5%82%99%E8%8A%B3%E9%A6%99%E7%99%82%E6%B3%95%E6%9C%83%E8%AD%B0%E5%9C%A8%E9%A4%90%E6%A1%8C%E4%B8%8A%E8%88%87%E7%B2%BE%E6%B2%B9%E6%93%B4%E6%95%A3%E5%8A%91%E9%86%AB%E7%94%A8%E8%8D%89%E8%97%A5%E4%B8%8D%E5%90%8C%E9%A1%9E%E5%9E%8B%E7%9A%84%E6%B2%B9%E5%92%8C%E7%B2%BE%E8%8F%AF%E8%8A%B3%E9%A6%99%E7%99%82%E6%B3%95%E5%92%8C%E6%9B%BF%E4%BB%A3%E9%86%AB%E5%AD%B8%E6%A6%82%E5%BF%B5%E8%87%AA%E7%84%B6%E7%99%82%E6%B3%95.jpg?s=2048x2048&w=is&k=20&c=dM2hJdmCbWzgBuD43iPre0S1S9kt2Bfwg2HB3jqLykQ="
      },
      {
        label: "Menthol Synthetic",
        slug: "menthol-synthetic",
        description: "Tailored chemical solutions designed for specific industrial research requirements.",
        image: "https://media.istockphoto.com/id/1405646574/zh/%E7%85%A7%E7%89%87/translucent-menthol-crystals-and-green-mint-leaves-falling-on-white-background.webp?s=2048x2048&w=is&k=20&c=ckqSAmSzW05UuHudasbLuHwHSKJW__rrw6W858ga5ZQ="
      }
    ],
    // 3. 底部认证与位置信息
    footer: {
      certifications: ["ISO 9001:2008 CERTIFIED", "REACH COMPLIANT"],
      location: "ShengYuan • JiaXing • China"
    }
  },
  "index": {
    "hero": {
      "welcomeText": "SINCE 1980 | ISO 9001:2008 CERTIFIED",
      "mainHeading": "Aroma Chemicals, Natural Products & Menthol Synthetic",
      "description": "Leading manufacturer and exporter of high-purity fragrance ingredients. Backed by 40 years of expertise and a global supply chain, we deliver sustainable quality for the perfumery and food industries worldwide.",
      "ctaButton": "Discover our products",
      "cardTitle": "Your Trusted Partner in China",
      "cardDescription": "We simplify your sourcing with a specialized logistics system and reliable warehouse capacity. From custom synthesis in our labs to global distribution, your satisfaction is our pleasure. Trust the experience that has been leading the industry since 1980.",
    },
    "case": {
      "tag": "CATEGORY",
      "mainHeading": "Core Excellence",
      "subtitle": "Since 1980, we have specialized in high-purity aromachemicalsand natural products.",
      "product": [
        {
          brand: "Sheng Yuan Lab Control",
          title: "Aroma Chemicals",
          products: [
            { id: '00001', name: '2,3-PENTANEDIONE', cas: '600-14-6' },
            { id: '00002', name: '2-METHYL-2-PENTENOIC ACID', cas: '3142-72-1' },
            { id: '00003', name: '3-HYDROXY-2-BUTANONE', cas: '513-86-0' },
            { id: '00004', name: '6-METHYL COUMARIN', cas: '92-48-8' },

          ],

          image: "https://framerusercontent.com/images/5umROpQf1LFQZpL5TNpSAKSt0M.jpg",
          impact: ["40% Less Inventory Waste", "35% Faster Production", "20% More Accurate Forecasting", "25% Faster Fulfillment"]
        },
        {
          brand: "Sheng Yuan Lab Control",
          title: "Natural Products",
          products: [
            { id: '00001', name: 'ANETHOLE', cas: '104-46-1' },
            { id: '00002', name: 'BENZALDEHYDE NATURAL', cas: '100-52-7' },
            { id: '00003', name: 'CASSIA OIL', cas: '8007-80-5' },
            { id: '00004', name: 'CEDARWOOD OIL', cas: '8000-27-9' },
            { id: '00005', name: 'CITRONELLA OIL', cas: '8000-29-1' }
          ],

          image: "https://framerusercontent.com/images/lQWHGHShPHUTMe37bAqGhhIDkI.jpg",

        },
        {
          brand: "Sheng Yuan Lab Control",
          title: "Menthol Synthetic",
          description: `Production Route: M-Cresol → Thymol → L-Menthol & D-Menthol We are a manufacturer of all raw materials along this production chain and are the largest producer of cresol. Our synthetic menthol is produced through our joint venture company, Anhui Haihua, for which Shengyuan serves as the global exclusive agency.

Menthol and its related products are widely used in personal care applications.`,
          image: "https://media.istockphoto.com/id/1405646574/zh/%E7%85%A7%E7%89%87/translucent-menthol-crystals-and-green-mint-leaves-falling-on-white-background.webp?s=2048x2048&w=is&k=20&c=ckqSAmSzW05UuHudasbLuHwHSKJW__rrw6W858ga5ZQ=",
          impact: ["115% Fuel Efficiency Increase", "12,000 Tons CO2 Saved Yearly", "100% On-time Delivery Rate", "Real-time Fleet Visibility"]
        }
      ]
    },
    "benefitsGrid": {
      "tag": "PRODUCTS",
      "mainHeading": "Explore Now",
      "subtitle": "Quickly locate the exact CAS number or chemical name you need.",
      "benefits": [
        {
          title: "Iqqqncreased Productivity",
          description: "Gain actionable insights with AI-driven analytics to improve decision-making and strategy.",
          icon: 'Zap'
        },
        {
          title: "Better Customer Experience",
          description: "Personalized AI interactions improve response times, customer engagement, and overall satisfaction.",
          icon: 'Users'
        },
        {
          title: "24/7 Availability",
          description: "AI-powered systems operate around the clock, ensuring seamless support and execution without downtime.",
          icon: 'Clock'
        },
        {
          title: "Cost Reduction",
          description: "AI automation minimizes manual work, cuts operational costs, and optimizes resource allocation for better profitability.",
          icon: 'DollarSign'
        },
        {
          title: "Data-Driven Insights",
          description: "Leverage AI to analyze vast data sets, identify trends, and make smarter, faster, and more accurate business decisions.",
          icon: 'Database'
        },
        {
          title: "Scalability & Growth",
          description: "AI adapts to your business needs, allowing you to scale efficiently without increasing workload or costs.",
          icon: 'TrendingUp'
        }
      ],
      "name": "North Partners",
      "logo": "https://the7.io/fse-corporate/wp-content/uploads/sites/142/2025/08/Slide-3_2-logo-6.svg"
    },
    "faq": {
      "tag": "FAQS",
      "mainHeading": " We've Got the Answers You're Looking For",
      "subtitle": "Quick answers to your AI automation questions.",
      "faqs": [
        {
          question: "How can AI automation help my business?",
          answer: "AI automation streamlines your repetitive tasks, reduces human error, and provides data-driven insights, allowing your team to focus on strategic growth activities."
        },
        {
          question: "Is AI automation difficult to integrate?",
          answer: "Not at all. Our platform is designed for seamless integration with your existing workflow, requiring minimal technical setup to get started."
        },
        {
          question: "What industries can benefit from AI automation?",
          answer: "From e-commerce and logistics to manufacturing and finance, any industry with standardized processes can see immediate ROI from AI implementation."
        },
        {
          question: "Do I need technical knowledge to use AI automation?",
          answer: "No. Our user-friendly dashboard and pre-built templates make it easy for anyone to deploy and manage sophisticated AI agents without writing code."
        },
        {
          question: "What kind of support do you offer?",
          answer: "We provide 24/7 technical support, comprehensive documentation, and a dedicated success manager to ensure your transition to AI is smooth and effective."
        }
      ]
    },
    "cart": {
      "tag": "Cart",
      "mainHeading": "Book a Call Today and Start Automating",
      "subtitle": "1Get started with AI automation today and watch your business grow."
    },
  },
  "productFeature": {

    "secondSection": {
      "subtitle": "1Top-notch financial stability",
      "title": "1Investing with clarity, navigating with confidence",
      "description": "1Ut elit tellus - luctus nec, luctus consectetur adipiscing elit tellus mattis pulvinar corper mattis nisl pellentesque elit tellus nec elit dapibus. Lorem aliquam commodo, ipsum corper mattis pulvinar dapibus luctus consectetur adipiscing eros nisl pellentesque elit tellus nec elit tellus nec ullam lorvm nulla ipsum corper mattis pulvinar dapibu.",
      "image": "https://the7.io/fse-corporate/wp-content/uploads/sites/142/2025/03/landsc-2x3-094.webp",
      "imageAlt": "Professional working on laptop",
      "customerSatisfaction": "95%",
      "featureBadges": [
        {
          "title": "1Modern professional approach",
          "description": "1Tailored strategies for your unique financial goals",
          "icon": "https://api.iconify.design/lucide:shield-check.svg?color=%233b82f6"
        },
        {
          "title": "1Guaranteed capital growth",
          "description": "1Secure investments with proven returns",
          "icon": "https://api.iconify.design/lucide:trending-up.svg?color=%233b82f6"
        }
      ]
    }
  },
  "about": {
    "tag": "WHO WE ARE",
    "titleOne": "We bridge the gap between",
    "titleTwo": "vision",
    "titleThree": "and reality.",
    "description": "Driven by passion and precision, we craft digital experiences that redefine industry standards and empower global growth.",
    stats: [
      { id: 1, type: 'icon', icon: 'xxx', variant: 'outline', row: 1 },
      { id: 2, type: 'stat', value: '98%', label: 'Transactions are processed successfully', variant: 'soft', trend: 'up', row: 1 },
      { id: 3, type: 'icon', icon: 'xxx', variant: 'outline', row: 1 },
      { id: 4, type: 'stat', value: '$10K+', label: "Our users' average saving amount", variant: 'soft', row: 2 },
      { id: 5, type: 'icon', icon: 'plus', variant: 'outline', row: 2 },
      { id: 6, type: 'stat', value: '50%', label: 'Effective in financial growth than before', variant: 'gradient', trend: 'up', row: 2 },
    ],
    "storyTitle": "Our Story",
    "storyParagraphs": [
      "Founded in the heart of global commerce, [Company Name] has evolved from a specialized sourcing agent into a comprehensive international trade powerhouse. For over six years, we have stood at the intersection of supply and demand, providing seamless connectivity for businesses across the globe. Our journey is built on a foundation of unwavering integrity and a deep understanding of market dynamics.",
      "With a robust network spanning over 50 countries and regions, we facilitate the flow of high-quality goods across continents. We don't just move products; we manage complex supply chains. From rigorous factory audits and quality control to optimized logistics and customs clearance, our team ensures that every link in the chain is optimized for efficiency and reliability."
    ],
    "gallery": [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80'
    ],
    "secondblock": {
      tag: 'Statistics',
      titleone: 'See Your',
      titletwo: 'Wealth Grow',
    },
    teamTag: 'Team',
    teamTitleone: 'See Our',
    teamTitletwo: 'Team',
    teamMembers :[
      {
        name: 'MR Zhang',
        role: 'Founder & CEO',
        image: 'https://img1.baidu.com/it/u=1196787366,2837426063&fm=253&fmt=auto&app=138&f=JPEG?w=475&h=501',
        socials: { email: '#', linkedin: '#', github: '#' }
      },
      {
        name: 'John David',
        role: 'CEO',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400',
        socials: { email: '#', linkedin: '#', github: '#' }
      },
      {
        name: 'Michael James',
        role: 'Marketing Leader',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400',
        socials: { email: '#', linkedin: '#', github: '#' }
      },
      {
        name: 'Jennifer Ann',
        role: 'Project Manager',
        image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
        socials: { email: '#', linkedin: '#', github: '#' }
      },
      {
        name: 'William Joseph',
        role: 'Product Designer',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400',
        socials: { email: '#', linkedin: '#', github: '#' }
      },
      {
        name: 'Charlotte Rose',
        role: 'Product Designer',
        image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=400',
        socials: { email: '#', linkedin: '#', github: '#' }
      },
      {
        name: 'Amelia Grace',
        role: 'Software Engineer',
        image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?q=80&w=400',
        socials: { email: '#', linkedin: '#', github: '#' }
      },
      {
        name: 'Evelyn Mae',
        role: 'Software Engineer',
        image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400',
        socials: { email: '#', linkedin: '#', github: '#' }
      }
    ]
  },
  "contact": {
    "tag": "Contact Us",
    "title": "Start your next",
    "sptext": "project",
    "contactInfo": [
      { icon: 'Mail', label: 'Email', value: 'hello@dadymemplate.com' },
      { icon: 'Phone', label: 'Phone', value: '+86 136 5661 7631' },
      { icon: 'MapPin', label: 'Office', value: 'jiaxing, zhejiang, China' }
    ],
    "email": "inquiry@yourfactory.com",
    "phone": "+86 136 5661 7631",
    "address": "123 Business Avenue, Tech Industrial Zone, Shenzhen, China"
  },
  "footer": {
    "emailmessage": "Request a Product Sample",
    "socials": [
      { label: 'X', href: 'https://x.com/Zhuxiaoming1987' },
      { label: 'Facebook', href: 'https://facebook.com/daddytemplate' },
      { label: 'Discord', href: '#' }
    ]
  },
  "seo": {
    "index": {
      "title": "老爹模板 - 首页",
      "description": "老爹模板为外贸企业提供免费模板,帮助他们快速启动业务,提高效率。",
      "ogImage": "/default-og.jpg",
      "twitterCard": "summary_large_image"
    },
    "about": {
      "tag": "About Us",
      "title": "老爹模板 - 关于我们",
      "description": "老爹模板为外贸企业提供免费模板,帮助他们快速启动业务,提高效率。",
      "ogImage": "/default-og.jpg",
      "twitterCard": "summary_large_image"
    },
    "contact": {
      "title": "老爹模板 - 联系我们",
      "description": "老爹模板为外贸企业提供免费模板,帮助他们快速启动业务,提高效率。",
      "ogImage": "/default-og.jpg",
      "twitterCard": "summary_large_image"
    }
  }
})