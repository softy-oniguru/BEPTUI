// bertui/src/config/defaultConfig.js
// Default configuration used when bertui.config.js is not present

export const defaultConfig = {
  // Site information (used for sitemap generation)
  siteName: "BertUI App",
  baseUrl: "http://localhost:3000", // Default to localhost
  
  // HTML Meta Tags (SEO)
  meta: {
    title: "BertUI - Lightning Fast React",
    description: "Build lightning-fast React applications with file-based routing powered by Bun",
    keywords: "react, bun, bertui, fast, file-based routing",
    author: "Pease Ernest",
    themeColor: "#667eea",
    lang: "en",
    
    // Open Graph for social sharing
    ogTitle: "BertUI - Lightning Fast React Framework",
    ogDescription: "Build lightning-fast React apps with zero config",
    ogImage: "/og-image.png"
  },
  
  // App Shell Configuration
  appShell: {
    loading: true,
    loadingText: "Loading...",
    backgroundColor: "#ffffff"
  },
  
  // robots.txt Configuration
  robots: {
    disallow: [], // No paths blocked by default
    crawlDelay: null // No crawl delay by default
  }
};