# BertUI ⚡🏝️

**The fastest React framework for developers who refuse to wait.**

Zero configuration. 494ms dev server. 265ms builds. **Perfect SEO with Server Islands.** Auto-generated sitemaps & robots.txt. Full TypeScript support.

Powered by Bun and Elysia.

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

## 🎊 What's New in v1.1.1: SEO Perfection Complete

**We listened. We delivered. BertUI is now the complete SEO powerhouse.**

### 🆕 New in v1.1.1 (Latest)

- 🤖 **Auto-Generated `robots.txt`** - SEO-friendly crawler instructions, zero config
- 🗺️ **Auto-Generated `sitemap.xml`** - All routes indexed automatically at build time
- 📘 **Full TypeScript Support** - Complete `.d.ts` type definitions for the entire API
- 🎯 **Type Safety Without Complexity** - IntelliSense for all BertUI functions (no `.tsx` required)

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
│                                                                 │
│  "The fastest React framework with perfect SEO, period." 🔥    │
└─────────────────────────────────────────────────────────────────┘
```

### 🆕 SEO Features (v1.1.1)

**Auto-Generated `robots.txt`**
```txt
# Generated automatically by BertUI
User-agent: *
Allow: /

Sitemap: https://yourdomain.com/sitemap.xml
```

**Auto-Generated `sitemap.xml`**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://yourdomain.com/</loc>
    <lastmod>2025-01-04</lastmod>
    <priority>1.0</priority>
  </url>
  <!-- All routes auto-discovered and included -->
</urlset>
```

**Configure in one line:**
```js
// bertui.config.js (optional)
export default {
  siteUrl: 'https://yourdomain.com', // Customize your domain
  sitemap: { changefreq: 'weekly', priority: 0.8 }
}
```

### 📘 TypeScript Support (v1.1.1)

**You asked. We delivered. But our way.**

- ✅ **Full `.d.ts` type definitions** - IntelliSense for everything
- ✅ **Zero configuration** - Works in VS Code instantly
- ✅ **JavaScript-first philosophy preserved** - No `.tsx` required
- ✅ **Best of both worlds** - Type safety without compilation overhead

```jsx
// Your .jsx files now have full autocomplete
import { Link, useRouter } from 'bertui/router'; // ← Full types! 🎉

export default function App() {
  const { navigate, params } = useRouter(); // ← TypeScript knows these!
  
  return (
    <div>
      {/* ← All props autocomplete */}
      <Link to="/about" className="link">About</Link>
    </div>
  );
}
```

**What you get:**
- Autocomplete for all BertUI APIs
- Type checking in VS Code (with JSDoc comments)
- IntelliSense for props, hooks, and utilities
- Error catching before runtime

**What you DON'T need:**
- No `tsconfig.json`
- No `.tsx` files
- No TypeScript compiler
- No additional setup

**Still JavaScript. Now with superpowers.** 📘⚡

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

## 🔄 Migrate from Any Framework in 2 Minutes

Got a Vite, CRA, Next.js, or other React project? Migrate instantly:

```bash
cd your-existing-project
bunx migrate-bertui
```

**The migration tool:**
- ✅ **Backs up everything** to `.bertmigrate/` (100% safe)
- 🧹 **Initializes fresh BertUI** project structure
- 📝 **Creates detailed guide** with exact steps for your framework
- 🎯 **Detects your setup** (Vite, CRA, Next, etc.) automatically
- 🚀 **5-minute migration** for most projects

### Migration Example

**Before (Vite):**
```
my-vite-app/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   └── components/
├── vite.config.js
└── package.json
```

**After (BertUI):**
```
my-vite-app/
├── .bertmigrate/              # 📦 Your full backup (safe!)
├── src/
│   ├── pages/                 # ⚡ File-based routing!
│   │   ├── index.jsx          # / route
│   │   └── about.jsx          # /about route
│   ├── components/            # Your components (preserved)
│   └── images/                # Images (auto-served)
├── MIGRATION_GUIDE.md         # Step-by-step instructions
└── package.json
```

**Simple changes needed:**
```jsx
// 1. Change imports
// From: import { Link } from 'react-router-dom'
// To:   import { Link } from 'bertui/router'

// 2. Move route components to pages/
// From: <Route path="/about" element={<About />} />
// To:   Create src/pages/about.jsx

// 3. Add Server Islands (optional)
export const render = "server"; // Instant SEO!
```

**Rollback anytime:**
```bash
rm -rf src/ public/ package.json
cp -r .bertmigrate/* .
```

**[Complete migration guide →](https://github.com/yourusername/migrate-bertui)**

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
      <p>But still interactive after React hydrates!</p>
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
  <meta name="keywords" content="about, company, team">
</head>
<body>
  <div id="root">
    <!-- ⚡ Full HTML content here! Search engines see everything! -->
    <div>
      <h1>About Us</h1>
      <p>Pre-rendered as static HTML at build time!</p>
      <p>But still interactive after React hydrates!</p>
    </div>
  </div>
  <script src="/bundle.js"></script> <!-- React hydrates for interactivity -->
</body>
</html>
```

### The Benefits

**🚀 Instant First Paint**
- Users see content at 0ms (static HTML loads instantly)
- No "blank page while JS loads" problem
- Perfect Lighthouse scores

**🔍 Perfect SEO**
- Search engines index full content immediately
- No client-side rendering detection issues
- Social media preview cards work perfectly

**⚡ Still Interactive**
- React hydrates after initial paint
- Full app functionality preserved
- Best of both worlds

**📦 Zero Configuration**
- Works automatically for all routes
- No server setup required
- Deploy to any static host

### When to Use Server Islands

**✅ Perfect for:**
- Landing pages
- Marketing sites
- Blog posts
- Documentation
- About/Contact pages
- Any SEO-critical content

**❌ Skip for:**
- Dashboards (need live state)
- Admin panels (need authentication state)
- Forms (need immediate interactivity)
- Real-time apps (need WebSocket state)

### Advanced: Dynamic Routes + Server Islands

```jsx
// src/pages/blog/[slug].jsx

export const render = "server";

// 🎯 Define which pages to pre-render
export async function getPaths() {
  return [
    { slug: 'first-post' },
    { slug: 'second-post' },
    { slug: 'third-post' }
  ];
}

export default function BlogPost({ params }) {
  return (
    <article>
      <h1>Blog Post: {params.slug}</h1>
      <p>This page was pre-rendered at build time!</p>
    </article>
  );
}
```

**Generates:**
- `/blog/first-post/index.html`
- `/blog/second-post/index.html`
- `/blog/third-post/index.html`

**[Complete Server Islands guide →](https://bertui-docswebsite.vercel.app/server-islands)**

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
  const userId = params.id; // Get the dynamic param
  
  return (
    <div>
      <h1>User Profile</h1>
      <p>Viewing user: {userId}</p>
    </div>
  );
}

// Visiting /user/123 → params.id = "123"
// Visiting /user/john → params.id = "john"
```

### Nested Routes

```
src/pages/dashboard/index.jsx        →  /dashboard
src/pages/dashboard/settings.jsx     →  /dashboard/settings
src/pages/dashboard/profile.jsx      →  /dashboard/profile
src/pages/dashboard/team/index.jsx   →  /dashboard/team
```

### Navigation

```jsx
import { Link, useRouter } from 'bertui/router';

function Navigation() {
  const { navigate, params, query } = useRouter();
  
  return (
    <nav>
      {/* Link component */}
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/blog/my-post">Blog Post</Link>
      
      {/* Programmatic navigation */}
      <button onClick={() => navigate('/dashboard')}>
        Go to Dashboard
      </button>
      
      {/* Access current route data */}
      <p>Current params: {JSON.stringify(params)}</p>
      <p>Query string: {JSON.stringify(query)}</p>
    </nav>
  );
}
```

### 404 Pages

```jsx
// src/pages/404.jsx

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <Link to="/">Go Home</Link>
    </div>
  );
}
```

---

## 🖼️ Image Handling (Critical!)

**IMPORTANT:** BertUI only processes images from two directories:

```
✅ src/images/     → Served at /images/*  (component images)
✅ public/         → Served at /*          (global assets)

❌ Anywhere else   → Compilation error! ⚠️
```

### Correct Usage

```jsx
// ✅ CORRECT - From src/images/
import Logo from '../images/logo.png';
import Banner from '../images/hero/banner.jpg';

function Header() {
  return (
    <header>
      <img src={Logo} alt="Logo" />
      <img src={Banner} alt="Hero Banner" />
    </header>
  );
}

// ✅ CORRECT - From public/ (for global assets like favicon)
function Layout() {
  return (
    <div>
      <link rel="icon" href="/favicon.svg" />
      <img src="/logo.png" alt="Public Logo" />
    </div>
  );
}
```

### Wrong Usage (Will Break!)

```jsx
// ❌ WRONG - Outside allowed directories
import Banner from '../../assets/banner.png';  // ❌ Don't do this!
import Icon from '../icons/menu.svg';          // ❌ Don't do this!

// Fix: Move to src/images/ or public/
```

### Project Structure

```
my-app/
├── src/
│   ├── images/              # ✅ Component images here
│   │   ├── logo.png
│   │   ├── hero/
│   │   │   └── banner.jpg
│   │   └── icons/
│   │       └── menu.svg
│   ├── pages/
│   └── components/
├── public/                  # ✅ Global static assets here
│   ├── favicon.svg
│   └── robots.txt
└── dist/                    # Build output
    ├── images/              # Copied from src/images/
    ├── favicon.svg          # Copied from public/
    └── index.html
```

---

## 📊 Real-World Performance

**Tested on Intel i3-2348M, 7.6GB RAM** (your modern hardware will be faster):

| Metric | BertUI | Next.js | Vite | Astro |
|--------|--------|---------|------|-------|
| **Dev Server Start** | **494ms** | 2.1s | 713ms | 1.8s |
| **Production Build** | **265ms** | 8.4s | 4.7s | 3.2s |
| **HMR Update** | **30ms** | 120ms | 85ms | 95ms |
| **Bundle Size** | **100KB** | 280KB | 220KB | 150KB |
| **SSG Per Route** | **~80ms** | ~200ms | N/A | ~150ms |
| **Dependencies** | **4** | 50+ | 15+ | 30+ |
| **Install Size** | **~14MB** | ~200MB | ~50MB | ~100MB |

### Time Saved Per Year

**For an active developer (conservative estimates):**

- **5 new projects/week:** ~2.5 hours saved on scaffolding
- **10 dev restarts/day:** ~9 minutes saved on server starts
- **3 builds/day:** ~32 minutes saved on production builds
- **100 HMR updates/day:** ~15 minutes saved on hot reloads

**Total: ~3.5 hours of pure waiting time eliminated per year.**

But the real win? **Flow state.** When tools respond instantly, you stay focused. You ship faster. You build better products.

**[Complete benchmark methodology →](PERFORMANCE.md)**

---

## 🎯 When to Choose BertUI

### ✅ BertUI is Perfect For:

**Speed-Critical Projects**
- You need the fastest possible developer experience
- Every second of build time matters
- You value instant feedback loops

**Content-Heavy Sites**
- Landing pages that need perfect SEO
- Marketing sites with multiple pages
- Documentation sites
- Blogs and content platforms

**Hybrid Applications**
- Mix static marketing pages (Server Islands) with interactive dashboards
- E-commerce sites with static product pages + dynamic cart
- SaaS sites with static landing + dynamic app

**Multiple Projects**
- Agencies building many client sites
- Developers prototyping frequently
- Teams with fast CI/CD requirements

**Bun Ecosystem**
- Already using or willing to try Bun
- Want cutting-edge JavaScript runtime performance

### ❌ Consider Alternatives If:

**You Need Full SSR**
- Real-time server rendering for every request
- Personalized content on every page load
- **Use:** Next.js or Remix

**You Need Advanced CMS Integration**
- MDX with complex processing
- Headless CMS with build-time data fetching
- **Use:** Astro or Next.js

**You Want Multi-Framework Support**
- Need Vue, Svelte, or multiple frameworks
- Micro-frontend architecture
- **Use:** Astro or Vite

**You Can't Use Bun**
- Company policy restricts new runtimes
- Legacy systems require Node.js
- **Use:** Vite or Next.js

**You're Locked Into TypeScript**
- Company requires `.tsx` files (we have `.d.ts` but not `.tsx`)
- Need full TS compilation in the build
- **Use:** Next.js or Vite

---

## 💭 Our Philosophy

### JavaScript-First, TypeScript-Enhanced

**BertUI is JavaScript-first and will remain that way.**

**What we believe:**
- JavaScript is powerful, universal, and requires no compilation
- Zero config means zero config - not "configure TypeScript first"
- Speed shouldn't require type annotations
- Complexity kills productivity

**What we changed in v1.1.1:**
- ✅ Added full `.d.ts` type definitions (you asked, we listened!)
- ✅ Complete IntelliSense and autocomplete in VS Code
- ✅ Type safety without `.tsx` files
- ✅ Best of both worlds: simplicity + DX

**What we won't change:**
- ❌ No `.tsx` file support (use Next.js if you need this)
- ❌ No TypeScript compiler in the build chain
- ❌ No `tsconfig.json` requirement

**Why?**

Because TypeScript compilation adds:
- Build complexity
- Configuration overhead  
- Slower dev experience
- Barriers to entry

**BertUI's mission:** The fastest React development with zero complexity. That mission is non-negotiable.

---

## 🌐 Production Deployment

### Supported Platforms (All Zero Config)

- ✅ **Vercel** - Recommended, includes pre-configured `vercel.json`
- ✅ **Netlify** - Works out of the box
- ✅ **Cloudflare Pages** - Instant edge deploys
- ✅ **GitHub Pages** - Free static hosting
- ✅ **Any static host** - Nginx, Apache, S3, Firebase, Surge, etc.

### Vercel Deployment (Fastest)

Your project includes `vercel.json`:

```json
{
  "buildCommand": "bun run build",
  "outputDirectory": "dist",
  "framework": null,
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Deploy in 3 steps:**
1. Push to GitHub
2. Import to Vercel  
3. Deploy

**Done! Your site is live.** 🎉

### Netlify Deployment

Create `netlify.toml`:

```toml
[build]
  command = "bun run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Static Hosting (Nginx, Apache, etc.)

```bash
# Build
bun run build

# Upload dist/ to your server
scp -r dist/* user@server:/var/www/html/

# Configure server for SPA routing
# (Serve index.html for all routes)
```

### 🆕 SEO Files (v1.1.1)

**Automatically generated on every build:**

```
dist/
├── robots.txt        # 🆕 Auto-generated
├── sitemap.xml       # 🆕 Auto-generated
├── index.html
└── ...
```

**Customize in `bertui.config.js`:**

```js
export default {
  siteUrl: 'https://yourdomain.com',
  
  robots: {
    allow: '/',
    disallow: ['/admin', '/private'],
    sitemap: true // Include sitemap in robots.txt
  },
  
  sitemap: {
    changefreq: 'weekly',
    priority: 0.8,
    exclude: ['/admin/*', '/private/*']
  }
};
```

**[Complete deployment guide →](https://bertui-docswebsite.vercel.app/deployment)**

### Live Production Sites

- [BertUI Documentation](https://bertui-docswebsite.vercel.app/) - This very site
- [Your site here?](https://github.com/BunElysiaReact/BERTUI/issues) - Submit a PR!

---

## 🛠️ Commands Reference

### Development

```bash
# Start dev server (494ms startup)
bun run dev
bertui dev

# Access at http://localhost:3000
```

### Production

```bash
# Build for production (265ms builds)
bun run build
bertui build

# Preview production build locally
bun run preview
bertui preview
```

### Migration

```bash
# Migrate existing project to BertUI
bunx migrate-bertui

# Follow the generated MIGRATION_GUIDE.md
```

### Project Creation

```bash
# Create new BertUI app
bunx create-bertui my-app

# Create with custom template (coming soon)
bunx create-bertui my-app --template blog
```

---

## 🎓 Learning Path

### Level 1: Quick Start (5 minutes)

```bash
bunx create-bertui my-first-app
cd my-first-app
bun run dev
```

**Explore:**
- Open `src/pages/index.jsx`
- Edit the content
- See instant hot reload (30ms)

### Level 2: File-Based Routing (10 minutes)

```bash
# Create new pages
echo 'export default () => <h1>About Page</h1>' > src/pages/about.jsx
echo 'export default () => <h1>Contact</h1>' > src/pages/contact.jsx
```

**Visit:**
- `http://localhost:3000/about`
- `http://localhost:3000/contact`

**Add navigation:**
```jsx
import { Link } from 'bertui/router';

<nav>
  <Link to="/">Home</Link>
  <Link to="/about">About</Link>
  <Link to="/contact">Contact</Link>
</nav>
```

### Level 3: Server Islands (15 minutes)

```jsx
// src/pages/about.jsx

export const render = "server"; // 🏝️ Add this line

export const meta = {
  title: "About - My Site",
  description: "Learn about us"
};

export default function About() {
  return <h1>About Us</h1>;
}
```

**Build and inspect:**
```bash
bun run build
cat dist/about/index.html  # See the pre-rendered HTML!
```

### Level 4: Dynamic Routes (15 minutes)

```jsx
// src/pages/blog/[slug].jsx

export default function BlogPost({ params }) {
  return (
    <article>
      <h1>Post: {params.slug}</h1>
    </article>
  );
}
```

**Visit:**
- `/blog/first-post` → params.slug = "first-post"
- `/blog/my-story` → params.slug = "my-story"

### Level 5: Production Deploy (10 minutes)

```bash
# Build
bun run build

# Deploy to Vercel
vercel

# Or deploy to Netlify
netlify deploy --prod
```

**Total learning time: ~55 minutes to mastery** 🎓

---

## 🚀 Coming Soon (Roadmap)

### v1.2.0: PageBuilder (Q1 2025)

**Build pages dynamically from API data:**

```jsx
// src/pages/products/[id].jsx

export const pageBuilder = {
  dataSource: 'https://api.example.com/products',
  template: 'product',
  pathParam: 'id'
};

export default function Product({ data }) {
  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
      <img src={data.image} alt={data.name} />
    </div>
  );
}
```

**What it does:**
- Fetches data from API at build time
- Generates pages for each item
- Sorts and handles dynamic URLs
- Perfect for e-commerce, blogs, docs

**Think Astro's content collections, but for external APIs.**

### BertUI-SSR Plugin (March 2025)

**Optional server-side rendering for advanced use cases:**

```js
// bertui.config.js
import { ssr } from 'bertui-ssr';

export default {
  plugins: [ssr({ /* options */ })]
};
```

**What it adds:**
- Full SSR for personalized content
- Server-side authentication
- Real-time data fetching
- API route handling

**Why a plugin?** Most sites don't need SSR. For those that do, add it as needed without bloating the core framework.

### BertUI-Icons (Late January 2025)

**The fastest icon library ever built:**

```jsx
import { Camera, Heart, Star } from 'bertui-icons';

<Camera size={24} color="blue" />
<Heart size={32} className="icon" />
<Star size={16} strokeWidth={2} />
```

**Tech stack:**
- Bun FFI for native performance
- Zig for low-level optimization
- SVG path data compiled at build time
- Zero runtime overhead

**Performance:**
- 10x faster than lucide-react
- Tree-shakeable (only load icons you use)
- Full TypeScript support

---

## 📚 Documentation & Resources

### Official Docs
- **Homepage:** https://bertui-docswebsite.vercel.app/
- **Getting Started:** https://bertui-docswebsite.vercel.app/getstarted
- **Server Islands Guide:** https://bertui-docswebsite.vercel.app/server-islands
- **Deployment Guide:** https://bertui-docswebsite.vercel