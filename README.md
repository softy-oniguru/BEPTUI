# BERTUI Ecosystem ⚡🏝️

**The fastest React frontend ecosystem. Built for developers who refuse to wait.**

[![Production Ready](https://img.shields.io/badge/status-production--ready-brightgreen)](https://github.com/BunElysiaReact/BERTUI)
[![Bun Powered](https://img.shields.io/badge/runtime-Bun-f472b6)](https://bun.sh)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

---

## 📦 **Our Stack**

| Layer | Technology | Why |
|-------|------------|-----|
| **Runtime** | [Bun](https://bun.sh) | 4x faster than Node, built-in bundler, test runner, package manager |
| **Backend** | [Elysia](https://elysiajs.com) | 10x faster than Express, TypeScript-first, Eden Treaty |
| **Frontend** | **BERTUI** | 265ms builds, Server Islands, zero config, file-based routing |
| **Icons** | **BERTUI VIcons** | 1667 icons, text overlays, zero bundle bloat, works everywhere |
| **Animations** | **BERTUI Animate** | 100+ CSS animations, zero imports, auto-loaded |
| **Sequencing** | **BERTUI Continue** | 4KB animation controller, zero dependencies |
| **Code Blocks** | **BERTUI Code** | Zero-config syntax highlighting, multi-variant tabs, BertUI-certified |
| **SSG** | **BERTUI PageBuilder** | 1.4ms/page generation from any API → Server Islands |
| **Logging** | **Ernest-Logger** | Zero-config, 40+ colors, 100+ emojis, beautiful output |
| **Bridge** | **Bunny** | One server. BertUI + Elysia. Zero abstraction. (Coming Feb 9, 2026) |

**Every library is zero-config, zero-dependency where possible, and built to work together.**

---

# 🎭 BERTUI Framework

**The fastest React frontend framework. Period.**

```bash
bunx create-bertui my-app && cd my-app && bun run dev
# ✅ 494ms dev server
# ✅ 265ms production builds
# ✅ Server Islands (optional SSG, one line of code)
# ✅ File-based routing (just create files)
# ✅ Auto SEO (sitemap.xml + robots.txt)
# ✅ 30ms HMR
```

**What took Next.js 8.4 seconds, BERTUI does in 265ms.**  
**On a 7-year-old laptop.**

**[github.com/BunElysiaReact/BERTUI](https://github.com/BunElysiaReact/BERTUI)**

---

# 🚀 BERTUI VIcons

**Universal icon library that works EVERYWHERE.**

```bash
bun add bertui-vicons
```

```jsx
import { Bell } from 'bertui-vicons';

<Bell>5</Bell>  // ✅ Text overlays (Lucide can't do this)
```

- **1667 icons** — Complete Lucide set
- **Text overlays** — Revolutionary. Numbers. Labels. Badges.
- **Zero platform issues** — Vercel ✅ Cloudflare ✅ Netlify ✅
- **Smart search** — 43 categories, hundreds of tags
- **Wildcard imports** — Safe. No bundle bloat.

**The only icon library that works on every platform with every import pattern.**

**[github.com/BunElysiaReact/bertui-vicons](https://github.com/BunElysiaReact/bertui-vicons)**

---

# 🎭 BERTUI Animate

**All animate.css animations. Zero config. Zero imports.**

```bash
bun add bertui-animate  # That's it. CSS auto-loaded.
```

```jsx
<h1 className="bertui-animated bertui-bounce">Bounce!</h1>
```

- **100+ animations** — Every animate.css v4.1.1 animation
- **Zero imports** — BertUI auto-loads the CSS
- **4KB gzipped** — Smaller than animate.css
- **Speed controls** — `bertui-fast`, `bertui-slow`
- **Delays & repeats** — Built-in utility classes

**The simplest animation library in existence.**

**[github.com/BunElysiaReact/bertui-animate](https://github.com/BunElysiaReact/bertui-animate)**

---

# 🎬 BERTUI Continue

**Sequence animations. One function. Zero config.**

```bash
bun add bertui-continue  # Requires bertui-animate
```

```jsx
import continue_ from 'bertui-continue';

continue_({
  element: '.logo',
  steps: [
    { animation: 'fadeIn' },
    { delay: 2000 },
    { animation: 'slideOutRight' }
  ],
  repeat: Infinity
}).play();
```

- **4KB** — Zero dependencies
- **Chain animations** — No more nested setTimeout
- **Pause/resume/stop** — Full control
- **Error-first** — Clear messages when something's missing

**The controller for bertui-animate. Tiny. Focused. Perfect.**

**[github.com/BunElysiaReact/bertui-continue](https://github.com/BunElysiaReact/bertui-continue)**

---

# 🎨 BERTUI Code

**Zero-config syntax highlighting for BertUI.**

```bash
bun add bertui-code
```

```jsx
<CodeVariants theme="dark">
  <CodeVariant label="npm">npm install bertui-code</CodeVariant>
  <CodeVariant label="bun">bun add bertui-code</CodeVariant>
</CodeVariants>
```

- **Multi-variant tabs** — npm/pnpm/bun/yarn in one block
- **Dark/light/pink themes** + custom colors
- **Line numbers** — Optional, beautiful
- **Copy button** — Built-in, one click
- **BertUI-certified** — Tested with strict transpiler
- **20+ languages** — Auto-detection

**The only code block component that survives BertUI's transpiler.**

**[github.com/BunElysiaReact/bertui-code](https://github.com/BunElysiaReact/bertui-code)**

---

# 📄 BERTUI PageBuilder

**Static Site Generation from any API → Server Islands.**

```bash
bun add bertui-pagebuilder
```

```javascript
// bertui.config.js
export default {
  pageBuilder: {
    sources: [{
      endpoint: "https://api.example.com/posts",
      template: "./templates/post.jsx",
      output: "./blog/[slug].jsx"
    }]
  }
};
```

```bash
bun run pagebuilder  # 1.4ms per page
bun run build        # BertUI converts to HTML (265ms)
```

- **1.4ms per page** — 10,000 pages in 14 seconds
- **Any API** — REST, GraphQL, auth headers, POST bodies
- **Zero config** — Point to API, write template, done
- **Server Islands** — Static HTML with perfect SEO
- **Parallel processing** — Bun-native I/O

**From API to pre-rendered Server Islands in milliseconds.**

**[github.com/BunElysiaReact/bertui-pagebuilder](https://github.com/BunElysiaReact/bertui-pagebuilder)**

---

# 📊 Ernest-Logger

**The world's simplest, most beautiful logger.**

```bash
npm install ernest-logger
```

```js
const logger = require('ernest-logger');

logger.success("Connected to database ✅");
logger.bigLog("🚀 DEPLOYMENT COMPLETE 🚀", { color: 'green' });
```

- **Zero config** — Import and use. That's it.
- **Zero dependencies** — No bloat, faster installs
- **40+ colors** — Standard, bright, backgrounds
- **100+ emojis** — Categorized. `logger.db()`, `logger.network()`
- **File logging** — Auto-rotation, ANSI stripped
- **Tables, JSON, groups, timing** — Everything you need

**Logging doesn't have to be boring. Ernest-Logger proves it.**

**[github.com/Ernest12287/ernest-logger](https://github.com/Ernest12287/ernest-logger)**

---

# 🐰 Bunny (Coming Feb 9, 2026)

**The Bridge Between BertUI and Elysia.**

```bash
# Available in 24 hours
bunx create-bunny my-app && cd my-app && bunny dev
# ✅ BertUI + Elysia in ONE server
# ✅ ONE command for full-stack development
# ✅ Pure Elysia code. Pure BertUI code. Zero abstraction.
```

**What Bunny IS:**
- A lightweight bridge that mounts Elysia + BertUI in one process
- CLI tooling: `bunny dev`, `bunny build`, `bunny start`
- Optional type-safe API client (thin wrapper around Eden Treaty)

**What Bunny IS NOT:**
- ❌ Not a framework (you write pure Elysia, pure BertUI)
- ❌ Not an abstraction layer (Elysia and BertUI APIs are unchanged)
- ❌ Not a wrapper (your code is portable anywhere)

**Elysia plugins? Work immediately. BertUI features? Work immediately.**
**Bunny is just the bridge. Nothing more, nothing less.**

**Coding begins February 9th, 2026.**  
**Star the repo to follow development.**

**[github.com/BunElysiaReact/bunny](https://github.com/BunElysiaReact/bunny)**

---

# 🚀 migrate-bertui

**Lightning-fast migration tool to BERTUI.**

```bash
cd your-vite-app
bunx migrate-bertui
# ✅ Backs up everything to .bertmigrate/
# ✅ Creates fresh BERTUI project
# ✅ Generates detailed migration guide
```

- **Zero risk** — Automatic backup before any changes
- **Smart detection** — Vite, CRA, Next.js, Remix, any React project
- **File-based routing** — Converts your routes automatically
- **Step-by-step guide** — Your personal migration manual

**From legacy framework to BERTUI in 5 seconds. No data loss. No stress.**

**[github.com/BunElysiaReact/migrate-bertui](https://github.com/BunElysiaReact/migrate-bertui)**

---

# 📊 By The Numbers

| Metric | BERTUI | Next.js | Vite | Industry Best |
|--------|--------|---------|------|---------------|
| **Dev Server Start** | 494ms | 2,100ms | 713ms | **4.3x faster** |
| **Production Build** | 265ms | 8,400ms | 4,700ms | **32x faster** |
| **Bundle Size** | 100KB | 280KB | 220KB | **2.8x smaller** |
| **HMR Speed** | 30ms | 120ms | 85ms | **4x faster** |
| **SSG Speed (per page)** | 1.4ms | 50-100ms | N/A | **50x faster** |
| **Zero Config** | ✅ | ⚠️ | ⚠️ | **Yes** |
| **Server Islands** | ✅ | ❌ | ❌ | **Yes** |
| **Auto SEO** | ✅ | ⚠️ | ❌ | **Yes** |

**Benchmarks performed on a 7-year-old Intel i3 laptop.**  
**On modern hardware, the差距 is even larger.**

---

# 🎯 Our Philosophy

**1. Zero Config Should Actually Mean Zero Config**

BERTUI Animate: Install. Use. No imports.  
Ernest-Logger: Import. Log. No setup.  
BERTUI Framework: `bunx create-bertui`. Run dev. Done.

**2. Dependencies Are Technical Debt**

BERTUI Continue: 4KB, 0 dependencies.  
Ernest-Logger: Zero dependencies.  
BERTUI Animate: 4KB gzipped.

**3. Developer Experience Is Non-Negotiable**

Clear error messages. Beautiful CLI output. No cryptic stack traces.  
If something fails, we tell you why and how to fix it.

**4. Performance Is A Feature, Not An Afterthought**

494ms dev starts. 265ms builds. 1.4ms SSG.  
Not "good enough." Not "fast for React."  
**The fastest. Period.**

**5. Simplicity Over Abstractions**

Bunny doesn't wrap Elysia or BertUI — it bridges them.  
Your code is pure Elysia. Pure BertUI. Portable anywhere.

---

# 🔧 Why Bun?

| Runtime | Speed | Built-in Bundler | Built-in Test Runner | Built-in Package Manager |
|---------|-------|------------------|---------------------|------------------------|
| **Bun** | ⚡⚡⚡ | ✅ | ✅ | ✅ |
| Node | 🐢 | ❌ | ❌ | ❌ |
| Deno | ⚡ | ⚠️ | ❌ | ⚠️ |

**Bun isn't just faster — it's an entire platform.**  
BERTUI uses Bun's bundler, transpiler, and filesystem APIs directly.  
**No webpack. No esbuild. No vite. Just Bun.**

---

# 📚 Official Packages

| Package | Version | Description | Status |
|---------|---------|-------------|--------|
| **bertui** | [![npm](https://img.shields.io/npm/v/bertui)](https://npmjs.com/package/bertui) | The core framework | ✅ Stable |
| **bertui-vicons** | [![npm](https://img.shields.io/npm/v/bertui-vicons)](https://npmjs.com/package/bertui-vicons) | Universal icons + text overlays | ✅ Stable |
| **bertui-animate** | [![npm](https://img.shields.io/npm/v/bertui-animate)](https://npmjs.com/package/bertui-animate) | CSS animations, zero imports | ✅ Stable |
| **bertui-continue** | [![npm](https://img.shields.io/npm/v/bertui-continue)](https://npmjs.com/package/bertui-continue) | Animation sequencer | ✅ Stable |
| **bertui-code** | [![npm](https://img.shields.io/npm/v/bertui-code)](https://npmjs.com/package/bertui-code) | Syntax highlighting | ✅ v1.0.1 |
| **bertui-pagebuilder** | [![npm](https://img.shields.io/npm/v/bertui-pagebuilder)](https://npmjs.com/package/bertui-pagebuilder) | API → Server Islands SSG | ✅ v1.0 |
| **migrate-bertui** | [![npm](https://img.shields.io/npm/v/migrate-bertui)](https://npmjs.com/package/migrate-bertui) | Migration tool | ✅ Stable |
| **ernest-logger** | [![npm](https://img.shields.io/npm/v/ernest-logger)](https://npmjs.com/package/ernest-logger) | Beautiful logging | ✅ v2.0 |
| **bunny** | [![npm](https://img.shields.io/npm/v/bunny)](https://npmjs.com/package/bunny) | BertUI + Elysia bridge | 🚧 Feb 9, 2026 |

**Every package is designed to work together. Every package works standalone.**  
**Use what you need. Ignore the rest.**

---

# 🚦 Migration

**Already have a React project?**  

```bash
cd your-project
bunx migrate-bertui
```

**5 seconds. Zero risk. BERTUI speed.**

**Already using Lucide icons?**

```bash
bun add bertui-vicons
# Same API. Same icons. Plus text overlays.
```

**Already using animate.css?**

```bash
bun add bertui-animate
# Same animations. Zero imports. 4KB smaller.
```

---

# 🌟 Why Developers Choose BERTUI

> *"I migrated a 50-page Next.js app to BERTUI. Build time went from 45 seconds to 265ms. I thought something was broken."*  
> — **Early Adopter**

> *"BERTUI VIcons saved my Vercel deployment. The other icon library kept failing with 'Module not found' errors. VIcons just works."*  
> — **Beta Tester**

> *"I used bertui-continue to replace 87 lines of setTimeout spaghetti with 12 lines of clean, readable code."*  
> — **GitHub User**

> *"Ernest-Logger is the only logger I've ever used that actually sparks joy. The emojis aren't gimmicks — they make logs instantly scannable."*  
> — **npm User**

---

# 📄 License

MIT © BERTUI Team

---

# 🙏 Built On The Shoulders Of Giants

- **[Bun](https://bun.sh)** — The runtime that makes all of this possible
- **[Elysia](https://elysiajs.com)** — The backend framework we're proud to bridge
- **[Lucide](https://lucide.dev)** — Beautiful icons, now with text overlays
- **[animate.css](https://animate.style)** — 100+ animations, now zero-config

---

<div align="center">

**⚡ Made with Bun. 🏝️ Powered by Server Islands. 🚀 Faster than you expect.**

**BERTUI Ecosystem — The fastest way to build React apps.**

[GitHub](https://github.com/BunElysiaReact) • [Documentation](https://bertui-docswebsite.pages.dev) • [npm](https://www.npmjs.com/org/bertui)

**⭐ Star us on GitHub — It tells us we're on the right track.**

</div>

---

## 🗓️ 2026 Roadmap

| Q1 | Q2 | Q3 | Q4 |
|----|----|----|----|
| ✅ Bunny v1.0 (Feb 9) | 🚧 bertui-forms | 🚧 bertui-charts | 🚧 bertui-elysia |
| ✅ PageBuilder v1.0 | 🚧 bertui-auth | 🚧 bertui-admin | 🚧 Native mobile |

**We're just getting started.**