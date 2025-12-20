# BertUI ⚡

**The fastest React framework for developers who value speed. Zero configuration, instant feedback, production-ready builds.**

Zero configuration. 494ms dev server. 2.6-second builds.
Powered by Bun and Elysia.

[![Production Ready](https://img.shields.io/badge/status-production--ready-brightgreen)](https://github.com/BunElysiaReact/BERTUI)
[![Bun Powered](https://img.shields.io/badge/runtime-Bun-f472b6)](https://bun.sh)
[![Zero Config](https://img.shields.io/badge/config-zero-blue)](https://github.com/your-repo)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## ⚡ Proven Performance

**Not claims. Facts.** [See full benchmarks →](PERFORMANCE.md)

BertUI vs Vite (tested Dec 2025 on Intel i3-2348M, 7.6GB RAM):

| Metric | BertUI | Vite | Winner |
|--------|--------|------|--------|
| Warm Cache Install | **5.0s** | 35.3s | **BertUI (7x faster)** ⚡ |
| Dev Server Startup | **494ms** | 713ms | **BertUI (1.4x faster)** ⚡ |
| Production Build | **2.57s** | 4.70s | **BertUI (1.8x faster)** ⚡ |
| Bundle Size | **100KB** | 220KB | **BertUI (2.2x smaller)** ⚡ |

> **"Your speeds are lies!"** — Critics  
> **Our response:** [Complete reproducible benchmarks](PERFORMANCE.md) with logs, methodology, and test scripts. Run them yourself.

---

## 🚀 Production Ready (v1.0.0+)

BertUI is **battle-tested in production** with:
- ✅ Single CSS file optimization (combined from all source CSS)
- ✅ Vercel deployment verified
- ✅ 16ms compilation speed (9 files)
- ✅ Zero-config static site generation

**Live Demo:** https://bertui-docswebsite.vercel.app/

The fastest, zero-config React static site generator. Built for developer speed.

---

## 📝 Image Handling

BertUI automatically serves and copies images from two specific directories:
- `src/images/` → Available at `/images/*` in development and copied to `dist/images/` in production
- `public/` → Available at `/*` and copied to `dist/` root

**Note:** Images referenced in your JSX/TSX that are located outside these directories (e.g., `../assets/` or absolute paths) will cause compilation errors. Always place project images in `src/images/` or `public/`.

---

## 🔧 Focused Design Decisions

### No Built-in CSS Animations
**Intentional choice:** Removed CSS animation utilities to ensure rock-solid builds with Bun's bundler.

**What this means:**
- Zero runtime dependencies = faster, smaller, more reliable builds
- Use your own CSS animations or libraries like Framer Motion
- All other BertUI features work normally

**Why this is better:** BertUI now delivers what it promises - the fastest possible React development experience with zero configuration headaches.

---

## Features

- ⚡ **Blazing Fast** - Built on Bun, the fastest JavaScript runtime
- 📁 **File-Based Routing** - Zero config routing with dynamic routes
- 🔥 **Hot Module Replacement** - Instant updates (30ms HMR)
- 📦 **Zero Config** - Works out of the box, no webpack/vite config
- 🚀 **Production Ready** - Optimized builds, semantic versioning
- 🎯 **React-Focused** - Optimized for the React ecosystem
- 📊 **Proven Performance** - Benchmarked and reproducible

---

## Quick Start

### Create New App (Recommended)
```bash
bunx create-bertui my-app
cd my-app
bun run dev
```

### Install Globally
```bash
bun add -g bertui
```

Or use directly:
```bash
bunx create-bertui my-app
```

That's it. No webpack config. No babel setup. No bullshit.

This creates a complete BertUI project with:
- Pre-configured file structure
- Sample pages with routing
- Beautiful example components
- All dependencies installed

**First install note:** Initial setup downloads Bun platform binaries (~154MB, one-time cost). Subsequent project creation takes ~5 seconds.

---

## Why BertUI?

- **Instant Feedback** - Dev server starts in 494ms. HMR updates in 30ms.
- **Zero Config** - No `webpack.config.js`. No `vite.config.js`. Just code.
- **Production Ready** - Static site generation with optimized builds (2.6s average).
- **Small Bundles** - 2.2x smaller than Vite (100KB vs 220KB).
- **Proven Fast** - Benchmarked against Vite with reproducible tests.

---

## Performance Deep Dive

### Real-World Speed Comparison

**Daily Development (Where It Matters):**
```
Project Creation:    BertUI 5s     vs  Vite 35s     → 7x faster ⚡
Dev Server Start:    BertUI 494ms  vs  Vite 713ms   → 1.4x faster ⚡
Production Build:    BertUI 2.6s   vs  Vite 4.7s    → 1.8x faster ⚡
Bundle Size:         BertUI 100KB  vs  Vite 220KB   → 2.2x smaller ⚡
```

**Time Saved Per Year:**
- 5 projects/week: ~2.5 minutes/week = **2+ hours/year**
- 10 restarts/day: ~2.2 seconds/day = **9 minutes/year**
- 3 builds/day: ~6.4 seconds/day = **32 minutes/year**

**Total yearly savings: ~2.7 hours** of pure waiting time eliminated.

**But the real win?** Flow state. When tools respond instantly, you stay focused and ship faster.

### Benchmark Transparency

All performance claims are backed by:
- ✅ Real hardware (not cloud VMs)
- ✅ Default configurations (no cherry-picked optimizations)
- ✅ Multiple test runs (averaged for accuracy)
- ✅ Complete logs (every millisecond documented)
- ✅ Reproducible scripts (run them yourself)

**[Read the full performance report →](PERFORMANCE.md)**

**[Run benchmarks yourself →](https://github.com/BunElysiaReact/BERTUI/tree/main/benchmarks)**

---

## When to Use BertUI

✅ You want to build React apps without tooling complexity  
✅ You value dev server speed over every other feature  
✅ You're using Bun (or willing to try it)  
✅ You don't need SSR/islands/multi-framework support  
✅ You create multiple projects frequently (7x faster scaffolding)  
✅ You want faster CI/CD builds (1.8x faster production builds)  

---

## BertUI Is NOT For You If...

❌ You need server-side rendering (SSR)  
❌ You're building a content-heavy blog with MDX  
❌ You want multi-framework support (Vue, Svelte, etc.)  
❌ You can't use Bun (company policy, legacy systems)  
❌ You only create one project ever (first install takes 5 minutes)  

**For those use cases, we recommend:**
- SSR → Next.js, Remix
- Content sites → Astro, Eleventy
- Multi-framework → Astro, Vite

BertUI is laser-focused on one thing: **Fast React development.**  
If that's what you need, you'll love it. If not, use the right tool.

---

## File-Based Routing

BertUI has **complete file-based routing** with zero configuration:

### 📁 Features

#### File-Based Routing
```
src/pages/index.jsx       → /
src/pages/about.jsx       → /about
src/pages/blog/index.jsx  → /blog
```

#### Dynamic Routes
```
src/pages/user/[id].jsx           → /user/:id
src/pages/blog/[slug].jsx         → /blog/:slug
src/pages/shop/[cat]/[prod].jsx   → /shop/:cat/:prod
```

#### Navigation Components
```jsx
import { Link, navigate } from 'bertui/router';

// Link component
<Link to="/about">About</Link>

// Programmatic navigation
const { navigate } = useRouter();
navigate('/dashboard');
```

#### Route Parameters
```jsx
export default function UserProfile({ params }) {
  return <div>User ID: {params.id}</div>;
}
```

---

## 🎓 Usage Example

```jsx
// src/pages/index.jsx
import { Link } from 'bertui/router';

export default function Home() {
  return (
    <div>
      <h1>Welcome to My App!</h1>
      <nav>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/user/123">My Profile</Link>
      </nav>
    </div>
  );
}

// src/pages/user/[id].jsx
export default function UserProfile({ params }) {
  return (
    <div>
      <h1>User {params.id}</h1>
      <p>Profile page for user {params.id}</p>
    </div>
  );
}
```

---

## Production Use

BertUI is production-ready as of v1.0.0.

**Live sites using BertUI:**
- [BertUI Docs](https://bertui-docswebsite.vercel.app/) (you're looking at it)

**Deployment:**
- ✅ Vercel (zero config)
- ✅ Netlify (works out of the box)
- ✅ Cloudflare Pages (instant deploys)
- ✅ Any static host

**Enterprise-ready features:**
- Semantic versioning (SemVer)
- MIT licensed
- Active maintenance
- Issue response within 24 hours
- Reproducible performance benchmarks

---

## Commands

```bash
bertui dev         # Start dev server (494ms startup, benchmarked)
bertui build       # Build for production (2.6s builds, benchmarked)
```

---

## 📈 Performance

- **Fast compilation:** Bun's speed + code splitting (16ms for 9 files)
- **Small bundles:** Each route is a separate chunk (100KB total)
- **Quick HMR:** Only recompiles changed files (30ms updates)
- **Smart routing:** Static routes matched first
- **Proven metrics:** All claims benchmarked and reproducible

---

## 🏆 Benchmark vs Competition

**"Talk is cheap. Show me the benchmarks."** — Linus Torvalds

We did. [Full performance report with methodology →](PERFORMANCE.md)

**TL;DR:**
- 7x faster project creation (warm cache)
- 1.4x faster dev server startup
- 1.8x faster production builds
- 2.2x smaller bundles

**The only thing slower?** First-time install (one-time 5-minute cost for Bun binaries). Everything else? BertUI dominates.

---

## Different Tools for Different Jobs

**Astro** is for content sites with islands architecture.  
**Next.js** is for complex SSR applications.  
**Vite** is for multi-framework projects needing configuration.

**BertUI** is for React apps that need instant dev feedback.  
If you want the fastest possible React development experience, use BertUI.

Not convinced? Run the benchmarks yourself:
```bash
git clone https://github.com/BunElysiaReact/BERTUI
cd BERTUI/benchmarks
./speed-test.sh
```

---

## 📚 Resources

- **Documentation:** https://bertui-docswebsite.vercel.app/
- **Performance Benchmarks:** [PERFORMANCE.md](PERFORMANCE.md)
- **GitHub:** https://github.com/BunElysiaReact/BERTUI
- **NPM:** https://www.npmjs.com/package/bertui
- **Issues:** https://github.com/BunElysiaReact/BERTUI/issues

---

## License

MIT

---

**Built with 🔥 by [Pease Ernest](https://github.com/Ernest12287)**  
*Because developers deserve faster tooling.*

**Performance claims questioned?** [Read the receipts.](PERFORMANCE.md)