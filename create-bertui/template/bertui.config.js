// bertui.config.js - FULL EXAMPLE WITH ALL OPTIONS
// This shows EVERY possible configuration option in BertUI

export default {
  // ====================================
  // 🌐 SITE INFORMATION
  // ====================================
  siteName: "My Awesome Blog",
  baseUrl: "https://myawesomeblog.com",
  
  // ====================================
  // 📄 HTML META TAGS (SEO)
  // ====================================
  meta: {
    // Basic Meta Tags
    title: "My Awesome Blog - Thoughts & Ideas",
    description: "A blog about web development, React, and modern JavaScript",
    keywords: "blog, web development, react, javascript, bun",
    author: "John Doe",
    lang: "en", // ISO 639-1 language code
    
    // Visual
    themeColor: "#667eea", // Browser theme color
    
    // Open Graph (Facebook, LinkedIn, Discord, etc.)
    ogTitle: "My Awesome Blog - Thoughts & Ideas",
    ogDescription: "Deep dives into web development and modern frameworks",
    ogImage: "/og-image.png" // 1200x630px recommended
  },
  
  // ====================================
  // 🎨 APP SHELL (Loading Screen)
  // ====================================
  appShell: {
    loading: true,
    loadingText: "Loading your experience...",
    backgroundColor: "#f9fafb" // Tailwind gray-50
  },
  
  // ====================================
  // 🤖 ROBOTS.TXT (SEO & Crawling)
  // ====================================
  robots: {
    // Block paths from search engines
    disallow: [
      "/admin",        // Admin panel
      "/api",          // API endpoints
      "/dashboard",    // User dashboard
      "/preview",      // Draft content
      "/test"          // Testing pages
    ],
    
    // Crawl delay (usually not needed, but useful for high-traffic sites)
    crawlDelay: 1 // 1 second delay between requests
  }
};

// ====================================
// 📝 CONFIGURATION NOTES
// ====================================

// ✅ REQUIRED FIELDS:
// - siteName: Used in sitemap
// - baseUrl: MUST be your production URL for proper sitemap generation

// ✅ OPTIONAL FIELDS:
// - Everything else has sensible defaults

// ====================================
// 🎯 USE CASES
// ====================================

// 1️⃣ SIMPLE BLOG:
// export default {
//   siteName: "My Blog",
//   baseUrl: "https://myblog.com",
//   meta: {
//     title: "My Blog",
//     description: "Thoughts and ideas"
//   }
// };

// 2️⃣ E-COMMERCE SITE:
// export default {
//   siteName: "My Shop",
//   baseUrl: "https://myshop.com",
//   robots: {
//     disallow: ["/admin", "/checkout"] // Block sensitive pages
//   }
// };

// 3️⃣ DOCUMENTATION SITE:
// export default {
//   siteName: "MyFramework Docs",
//   baseUrl: "https://docs.myframework.com",
//   meta: {
//     title: "MyFramework Documentation",
//     themeColor: "#0ea5e9" // Match brand color
//   }
// };

// ====================================
// 🔗 RESOURCES
// ====================================
// Documentation: https://bertui-docswebsite.vercel.app/
// GitHub: https://github.com/BunElysiaReact/BERTUI
// Discord: https://discord.gg/kvbXfkJG