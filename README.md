# BertUI ⚡🏝️

**The fastest React framework for developers who refuse to wait.**

Zero configuration. 494ms dev server. 265ms builds. **Perfect SEO with Server Islands.** Auto-generated sitemaps & robots.txt. Full TypeScript support.

Powered by Bun and Elysia. **Built for speed. Built for perfection.**

[![Production Ready](https://img.shields.io/badge/status-production--ready-brightgreen)](https://github.com/BunElysiaReact/BERTUI) 
[![Version](https://img.shields.io/badge/version-1.1.1-blue)](https://www.npmjs.com/package/bertui)
[![Bun Powered](https://img.shields.io/badge/runtime-Bun-f472b6)](https://bun.sh) 
[![Zero Config](https://img.shields.io/badge/config-zero-blue)](https://github.com/BunElysiaReact/BERTUI) 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

```bash
# One command. Zero config. Instant speed.
bunx create-bertui my-app && cd my-app && bun run dev
```

---

## 🔥 The BertUI Ecosystem: Speed Reimagined

**We don't just use existing tools. We rewrite them in the fastest languages possible.**

While other frameworks rely on slow JavaScript implementations, BertUI rebuilds the entire stack from the ground up with **Zig, C++, and Bun FFI** for unmatched performance.

### 🎯 Official BertUI Packages

```
┌──────────────────────────────────────────────────────────────────┐
│                    THE BERTUI SPEED STACK                        │
│                                                                  │
│  ⚡ bertui-icons        →  Icons in Zig (10x faster)            │
│  🌐 bertui-axios        →  HTTP in C++ (Coming Q1 2025)         │
│  🔄 bertui-elyserver    →  Full-stack with Elysia (Coming Soon) │
│  🎨 bertui-animation    →  GPU-accelerated (Coming Soon)        │
│  📊 bertui-charts       →  WebGL rendering (Coming Soon)        │
│                                                                  │
│  "Not just a framework. An entire performance-first ecosystem." │
└──────────────────────────────────────────────────────────────────┘
```

**Why BertUI-Exclusive Packages?**

1. **10-100x Performance Gains** - Native compiled code vs interpreted JavaScript
2. **Zero Compatibility Issues** - Built specifically for BertUI's architecture
3. **Unified DX** - Consistent APIs across all packages
4. **No Bloat** - Only what you need, nothing more

---

## 🎊 What's New in v1.1.1: SEO Perfection Complete

**We listened. We delivered. BertUI is now the complete SEO powerhouse.**

### 🆕 New in v1.1.1 (Latest)

- 🤖 **Auto-Generated `robots.txt`** - SEO-friendly crawler instructions, zero config
- 🗺️ **Auto-Generated `sitemap.xml`** - All routes indexed automatically at build time
- 📘 **Full TypeScript Support** - Complete `.d.ts` type definitions for the entire API
- 🎯 **Type Safety Without Complexity** - IntelliSense for all BertUI functions (no `.tsx` required)
- ⚡ **bertui-icons Integration** - Official icon library with perfect performance

### 🏝️ From v1.1.0: Server Islands

- **Instant SEO** - Add one line, get static HTML at build time
- **Still Lightning Fast** - 265ms builds haven't changed
- **Per-Page Control** - Choose what gets pre-rendered
- **Zero Complexity** - No SSR setup, no server infrastructure

```jsx
// The magic line that gives you perfect SEO
export const render = "server";
```

**[Complete Server Islands guide →](https://bertui-docswebsite.vercel.app/server-islands)**

---

## 🚀 Why BertUI Dominates

### The Speed No One Can Match

**BertUI vs Everyone Else** (Intel i3-2348M, 7.6GB RAM - your results will be faster):

| Metric | BertUI | Vite | Next.js | Winner |
|--------|--------|------|---------|--------|
| Dev Server Startup | **494ms** | 713ms | 2.1s | **BertUI (1.4-4.3x faster)** ⚡ |
| Production Build | **265ms** | 4.70s | 8.4s | **BertUI (18-32x faster)** ⚡ |
| Bundle Size | **100KB** | 220KB | 280KB | **BertUI (2.2-2.8x smaller)** ⚡ |
| Install Time (warm) | **5.0s** | 35.3s | 55s | **BertUI (7-11x faster)** ⚡ |
| SSG Support | **✅ YES** | ❌ NO | ✅ YES | **BertUI (simplest)** 🏝️ |
| Auto SEO Files | **✅ YES** | ❌ NO | ⚠️ Manual | **BertUI (exclusive)** 🤖 |
| TypeScript DX | **✅ YES** | ✅ YES | ✅ YES | **BertUI (no setup)** 📘 |
| Icon Performance | **10x faster** | Standard | Standard | **BertUI (Zig-powered)** ⚡ |

> **"Your speeds are lies!"** — Skeptics (understandable)  
> **Our response:** [Complete reproducible benchmarks](PERFORMANCE.md) with logs, methodology, and test scripts. Run them yourself. ⏱️

**[See full performance report →](PERFORMANCE.md)**

---

## 🎯 The Complete Feature Matrix

### What Makes BertUI Unstoppable

```
┌─────────────────────────────────────────────────────────────────┐
│                    The Only Framework With:                     │
│                                                                 │
│  ⚡ Sub-500ms dev starts  🏝️ Optional SSG (Server Islands)    │
│  📦 Sub-300ms builds      🤖 Auto robots.txt generation        │
│  🗺️ Auto sitemap.xml      📘 Full TypeScript definitions       │
│  🎯 Zero config needed    📁 File-based routing built-in       │
│  🔥 30ms HMR updates      💅 Optimized CSS (LightningCSS)      │
│  🌐 Deploy anywhere       🎨 Modern CSS features               │
│  🐛 Beautiful errors      📊 Detailed build analytics          │
│  ⚡ Zig-powered icons     🚀 Native performance libraries      │
│                                                                 │
│  "The fastest React framework with perfect SEO, period." 🔥    │
└─────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Quick Start

### Create New App (30 seconds to first render)

```bash
bunx create-bertui my-app
cd my-app
bun run dev
```

**That's it.** No webpack config. No babel setup. No bullshit.

**What you get:**
```
my-app/
├── src/
│   ├── pages/
│   │   └── index.jsx          # Your homepage (/ route)
│   ├── components/             # Your components
│   └── images/                 # Auto-served at /images/*
├── public/
│   └── favicon.svg             # Static assets
├── dist/                       # Production build output
│   ├── robots.txt             # 🆕 Auto-generated!
│   └── sitemap.xml            # 🆕 Auto-generated!
└── package.json
```

**First install note:** Initial setup downloads Bun platform binaries (~154MB, one-time). Subsequent projects: ~5 seconds.

---

## ⚡ Using BertUI-Icons (Exclusive Performance)

### Installation

```bash
bun add bertui-icons
```

### Usage - Zero Config, Maximum Speed

```jsx
import { ArrowRight, Activity, User } from 'bertui-icons';

function App() {
  return (
    <div>
      {/* Basic usage */}
      <span dangerouslySetInnerHTML={{ __html: ArrowRight() }} />
      
      {/* With text overlay (unique to bertui-icons!) */}
      <span dangerouslySetInnerHTML={{ 
        __html: Activity({ children: '98', color: 'red' }) 
      }} />
      
      {/* Custom sizing */}
      <span dangerouslySetInnerHTML={{ 
        __html: User({ children: '5', size: 48 }) 
      }} />
    </div>
  );
}
```

### Why bertui-icons is 10x Faster

**Traditional Icon Libraries (React SVG):**
```
Request → Parse SVG string → Create React elements → Virtual DOM diff → Render
Total: ~15-20ms per icon
```

**bertui-icons (Zig + FFI):**
```
Request → FFI call to Zig → Pre-compiled SVG → Direct HTML injection
Total: ~1-2ms per icon
```

**Performance Comparison:**
- **lucide-react:** 15ms per icon render
- **react-icons:** 18ms per icon render
- **bertui-icons:** **1.5ms per icon render** ⚡

**Features Exclusive to bertui-icons:**
- ✅ Text overlays (badges, labels)
- ✅ Dynamic positioning
- ✅ Compiled at build time
- ✅ Zero runtime overhead
- ✅ Unlimited imports (no bundle bloat)

**[Complete bertui-icons docs →](https://github.com/BunElysiaReact/bertui-icons)**

---

## 🌐 The BertUI Ecosystem Roadmap

### 📅 Coming Soon

#### **Q1 2025: bertui-axios** 🌐
**HTTP client rewritten in C++ with Bun FFI**

```jsx
import { get, post } from 'bertui-axios';

// 5-10x faster than axios
const { data } = await get('https://api.example.com/users');
const response = await post('/api/login', { username, password });
```

**Features:**
- C++ compiled HTTP engine
- Automatic retries with exponential backoff
- Built-in caching layer
- Perfect TypeScript support
- 100% axios-compatible API

#### **Q1 2025: bertui-elyserver** 🔄
**Full-stack framework with Elysia integration**

```jsx
// pages/api/users.js - API routes built-in!
export default function handler(req, res) {
  return res.json({ users: [...] });
}

// Automatic API routes, DB integration, auth
// Zero backend setup required
```

**Features:**
- Elysia-powered backend
- Automatic API routing
- Built-in database adapters
- JWT auth out of the box
- WebSocket support

#### **Q2 2025: bertui-animation** 🎨
**GPU-accelerated animations**

```jsx
import { animate } from 'bertui-animation';

// WebGL-powered, 60fps guaranteed
animate('.box', { x: 100, duration: 0.5 });
```

#### **Q2 2025: bertui-charts** 📊
**WebGL chart rendering**

```jsx
import { LineChart } from 'bertui-charts';

// 1M+ datapoints at 60fps
<LineChart data={millionPoints} />
```

---

## 🎯 Full React Support Coming Soon

**BertUI is evolving into a complete full-stack framework.**

```jsx
// Future: Complete React ecosystem support
import { useState } from 'react';
import { useQuery } from 'bertui-query';      // Coming Q1 2025
import { motion } from 'bertui-animation';     // Coming Q2 2025
import { Database } from 'bertui-db';         // Coming Q2 2025

function App() {
  const { data } = useQuery('/api/users');
  
  return (
    <motion.div animate={{ opacity: 1 }}>
      <Database.Table data={data} />
    </motion.div>
  );
}
```

**What's Coming:**
- ✅ Full React Hooks support
- ✅ Built-in state management (bertui-store)
- ✅ Database ORM (bertui-db)
- ✅ Authentication system (bertui-auth)
- ✅ Real-time updates (bertui-realtime)

**BertUI will be the ONLY framework where every package is:**
1. Rewritten in Zig/C++ for maximum speed
2. Perfectly integrated with the core
3. Zero-config out of the box
4. TypeScript-native

---

## 🔥 Why BertUI is Different

### **Other Frameworks:**
```
React App
  ↓
Uses: axios (JavaScript)
Uses: lucide-react (JavaScript)
Uses: framer-motion (JavaScript)
Uses: random npm packages (pray they work)

Result: Slow, bloated, compatibility issues
```

### **BertUI:**
```
BertUI App
  ↓
Uses: bertui-axios (C++)
Uses: bertui-icons (Zig)
Uses: bertui-animation (WebGL)
Uses: ONLY blessed packages (tested, fast)

Result: Fast, lightweight, guaranteed compatibility
```

---

## 📁 File-Based Routing (Zero Config)

**The routing you deserve. No setup required.**

### Basic Routes

```
src/pages/index.jsx          →  /
src/pages/about.jsx          →  /about
src/pages/contact.jsx        →  /contact
src/pages/blog/index.jsx     →  /blog
src/pages/blog/post.jsx      →  /blog/post
```

### Dynamic Routes

```
src/pages/user/[id].jsx              →  /user/:id
src/pages/blog/[slug].jsx            →  /blog/:slug
src/pages/shop/[category]/[item].jsx →  /shop/:category/:item
```

**Example:**
```jsx
// src/pages/user/[id].jsx

export default function UserProfile({ params }) {
  const userId = params.id;
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>Viewing user: {userId}</p>
    </div>
  );
}
```

---

## 🏝️ Server Islands: The Secret Weapon

### What Problem Do They Solve?

**The React Developer's Dilemma:**
- ❌ Vite = Fast dev, **terrible SEO** (client-only)
- ❌ Next.js = Good SEO, **slow builds** + complex setup
- ✅ **BertUI = Fast dev + Fast builds + Perfect SEO + Zero config**

### How Server Islands Work

```jsx
// src/pages/about.jsx

// 🏝️ Add ONE line to enable Server Islands
export const render = "server";

// 🎯 Optional: Add metadata for SEO
export const meta = {
  title: "About Us - Best Company Ever",
  description: "Learn about our amazing team and mission",
  keywords: "about, company, team"
};

// ⚛️ Write normal React components
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>Pre-rendered as static HTML at build time!</p>
    </div>
  );
}
```

**What happens at build time:**
```html
<!-- dist/about/index.html - Generated automatically! -->
<!DOCTYPE html>
<html>
<head>
  <title>About Us - Best Company Ever</title>
  <meta name="description" content="Learn about our amazing team...">
</head>
<body>
  <div id="root">
    <!-- ⚡ Full HTML content here! Search engines see everything! -->
    <div>
      <h1>About Us</h1>
      <p>Pre-rendered as static HTML at build time!</p>
    </div>
  </div>
  <script src="/bundle.js"></script>
</body>
</html>
```

**[Complete Server Islands guide →](https://bertui-docswebsite.vercel.app/server-islands)**

---

## 💭 Our Philosophy

### The BertUI Mission

**"Don't settle for slow JavaScript implementations when faster alternatives exist."**

We're not just building a React framework. We're building a complete ecosystem where:

1. **Every tool is rewritten for speed** (Zig, C++, WebGL)
2. **Zero configuration is non-negotiable** (it just works)
3. **Performance is the default** (not an afterthought)
4. **Developer experience is paramount** (beautiful errors, instant feedback)

### Why We're Exclusive

**BertUI packages only work with BertUI.** Here's why that's a feature, not a bug:

✅ **Perfect Integration** - No compatibility issues, ever  
✅ **Optimized Performance** - Built specifically for BertUI's architecture  
✅ **Unified DX** - Consistent APIs, patterns, and conventions  
✅ **Guaranteed Support** - We test and maintain everything  
✅ **No Bloat** - Only what you need, perfectly tuned  

**Other frameworks try to support everything and end up slow.**  
**BertUI supports the best and makes it blazing fast.**

---

## 🌐 Production Deployment

### Supported Platforms (All Zero Config)

- ✅ **Vercel** - Recommended, includes pre-configured `vercel.json`
- ✅ **Netlify** - Works out of the box
- ✅ **Cloudflare Pages** - Instant edge deploys
- ✅ **GitHub Pages** - Free static hosting
- ✅ **Any static host** - Nginx, Apache, S3, Firebase, Surge, etc.

### Vercel Deployment (Fastest)

```bash
# 1. Push to GitHub
# 2. Import to Vercel
# 3. Deploy

# Done! Your site is live. 🎉
```

**[Complete deployment guide →](https://bertui-docswebsite.vercel.app/deployment)**

---

## 📚 Documentation & Resources

### Official Docs
- **Homepage:** https://bertui-docswebsite.vercel.app/
- **Getting Started:** https://bertui-docswebsite.vercel.app/getstarted
- **Server Islands Guide:** https://bertui-docswebsite.vercel.app/server-islands
- **BertUI Icons:** https://github.com/BunElysiaReact/bertui-icons
- **Deployment Guide:** https://bertui-docswebsite.vercel.app/deployment

### Community
- **GitHub:** https://github.com/BunElysiaReact/BERTUI
- **Issues:** https://github.com/BunElysiaReact/BERTUI/issues
- **Discussions:** https://github.com/BunElysiaReact/BERTUI/discussions

---

## 🛠️ Commands Reference

```bash
# Development
bun run dev              # Start dev server (494ms startup)

# Production
bun run build            # Build for production (265ms builds)
bun run preview          # Preview production build

# Project Creation
bunx create-bertui my-app  # Create new BertUI app
```

---

## 🚀 The Future is Fast

**BertUI isn't just another React framework.**

It's a **complete reimagining** of what web development should be:
- ⚡ **Native-speed libraries** (Zig, C++, WebGL)
- 🎯 **Zero-config everything** (it just works)
- 🏝️ **Perfect SEO** (Server Islands)
- 📦 **Tiny bundles** (sub-100KB apps)
- 🔥 **Instant feedback** (30ms HMR)

**Join us in building the fastest web framework ever created.**

```bash
bunx create-bertui my-app
cd my-app
bun run dev

# Welcome to the future. ⚡
```

---

## 📊 Comparison Table

| Feature | BertUI | Next.js | Vite | Remix |
|---------|--------|---------|------|-------|
| **Dev Server** | 494ms | 2.1s | 713ms | 1.8s |
| **Production Build** | 265ms | 8.4s | 4.7s | 6.2s |
| **Bundle Size** | 100KB | 280KB | 220KB | 250KB |
| **HMR Speed** | 30ms | 120ms | 85ms | 110ms |
| **Server Islands** | ✅ Built-in | ❌ No | ❌ No | ✅ Complex |
| **Auto SEO Files** | ✅ Yes | ⚠️ Manual | ❌ No | ⚠️ Manual |
| **TypeScript DX** | ✅ Zero config | ✅ Config needed | ✅ Config needed | ✅ Config needed |
| **Icon Library** | ⚡ 10x faster | Standard | Standard | Standard |
| **File-based Routing** | ✅ Built-in | ✅ Built-in | ❌ Plugin | ✅ Built-in |
| **Native Libraries** | ✅ Zig/C++ | ❌ No | ❌ No | ❌ No |

---

## 💎 Premium Features Coming Soon

- 🎨 **BertUI Studio** - Visual page builder
- 🔐 **BertUI Auth** - Authentication out of the box
- 💾 **BertUI DB** - Type-safe ORM
- 📊 **BertUI Analytics** - Built-in analytics
- 🌍 **BertUI i18n** - Internationalization
- 🎯 **BertUI SEO** - Advanced SEO tools

---

## ⭐ Star Us on GitHub

If BertUI makes your development faster, **give us a star!** ⭐

**[github.com/BunElysiaReact/BERTUI](https://github.com/BunElysiaReact/BERTUI)**

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details

---

## 🙏 Credits

- Built with [Bun](https://bun.sh/) - The fastest JavaScript runtime
- Powered by [Elysia](https://elysiajs.com/) - Lightning-fast HTTP framework
- Icons by [Lucide](https://lucide.dev/) - Beautiful open-source icons
- Optimized with [Zig](https://ziglang.org/) - Low-level performance

---

**Made with ⚡ by the BertUI team**

*"Speed is not a feature. It's the foundation."*