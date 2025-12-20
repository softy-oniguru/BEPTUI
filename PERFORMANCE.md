# BertUI vs Vite: Complete Performance Benchmarks

> **Author:** Pease Ernest (Creator of BertUI)  
> **Date:** December 20, 2025  
> **Motivation:** After claims that BertUI's speed metrics were "lies," we conducted comprehensive, reproducible tests on identical hardware with zero configuration for both frameworks.

---

## 📋 Test Methodology

### System Specifications
```
OS:       Debian GNU/Linux 12 (bookworm)
Kernel:   6.1.0-41-amd64
CPU:      Intel Core i3-2348M @ 2.30GHz
Cores:    4 cores
RAM:      7.6Gi
Node:     v22.21.0
Bun:      1.3.5
npm:      10.9.4
Internet: 4.91 Mbps Down / 5.56 Mbps Up
```

### Test Conditions
- **Fair comparison:** Default boilerplates from both frameworks
- **Clean environment:** Cache cleared before cold tests
- **Multiple runs:** 3-5 runs averaged for accuracy
- **Real-world metrics:** Actual console output parsing, not synthetic benchmarks
- **Identical hardware:** Same machine, same network conditions

### Projects Tested
- **BertUI:** `bunx create-bertui` (default template)
- **Vite:** `npm create vite@latest -- --template react` (default template)

---

## 🎯 Test Results

### Test 1: Initial Setup (Cold Cache)
**What this measures:** First-time project creation including all package downloads from npm registry.

| Framework | Time | Download Size | Notes |
|-----------|------|---------------|-------|
| **Vite** | 73.5s | ~40MB | Standard node_modules |
| **BertUI** | 324.5s | ~154MB | Includes platform-specific Bun binaries |

**Winner:** Vite (4.4x faster)

**Analysis:**  
BertUI downloads platform-specific Bun binaries (~100MB) on first install. This is a **one-time cost** that happens once per machine. On a 5Mbps connection, those extra 114MB cost approximately 3 additional minutes. On faster connections (50Mbps+), this difference shrinks to ~30 seconds.

**Real-world impact:** Negligible. You install once, develop for months.

---

### Test 2: Project Creation (Warm Cache)
**What this measures:** Real-world project creation speed after packages are cached.

| Framework | Time | Speedup from Cold | Real-World Scenario |
|-----------|------|-------------------|---------------------|
| **BertUI** | 5.0s | 64.7x faster | Creating new projects daily |
| **Vite** | 35.3s | 2.0x faster | Creating new projects daily |

**Winner:** BertUI ⚡ (7x faster)

**Analysis:**  
This is what matters for actual development. When you `create-bertui my-new-project` after the first time, BertUI is **7 times faster** than Vite. The difference? BertUI uses Bun's blazing-fast package resolution, while npm has to traverse the entire dependency tree even with cached packages.

**Real-world impact:** High. Developers create test projects, experiments, and client projects regularly.

---

### Test 3: Dev Server Startup (5 runs averaged)

| Framework | Run 1 | Run 2 | Run 3 | Run 4 | Run 5 | Average |
|-----------|-------|-------|-------|-------|-------|---------|
| **BertUI** | 641ms | 533ms | 330ms | 536ms | 429ms | **494ms** |
| **Vite** | 734ms | 629ms | 837ms | 735ms | 631ms | **713ms** |

**Winner:** BertUI ⚡ (1.44x faster)

**Detailed Analysis:**
- BertUI saves **219ms per dev server restart**
- BertUI's compilation step: **16ms** (9 files compiled)
- On 10 restarts per day: **2.19 seconds saved**
- Over a month (20 workdays): **44 seconds saved**
- Over a year: **~9 minutes saved**

**But wait, there's more:**  
The real magic isn't just startup time—it's **Hot Module Replacement (HMR)**. BertUI claims 30ms HMR updates. When you're actively developing and saving files hundreds of times per day, those milliseconds compound into real productivity gains.

**Real-world impact:** Moderate-High. Dev server restarts happen multiple times per session.

---

### Test 4: Production Build

| Framework | Build Time | Bundle Size | Files |
|-----------|------------|-------------|-------|
| **BertUI** | 2.57s | 100K | Optimized single CSS + JS bundle |
| **Vite** | 4.70s | 220K | Standard Vite output |

**Winner:** BertUI ⚡ (1.83x faster, 2.2x smaller)

**Build Breakdown (BertUI):**
```
Step 1: Production compilation      - 4 routes compiled
Step 2: CSS optimization           - 4 files → 1 (6.3KB, -23.5% minified)
Step 3: Asset copying              - Images & public files
Step 4: JavaScript bundling        - Bun bundler (main-kazyt3k8.js: 15.13KB)
Step 5: HTML generation            - 4 routes generated
Total: 1218ms (reported by BertUI)
```

**Analysis:**  
BertUI's build process is not just faster—it's **smarter**:
- Single CSS file (no CSS chunking complexity)
- Smaller bundle size (better tree-shaking)
- Optimized for static deployment
- Zero configuration needed

**Real-world impact:** High. Faster CI/CD pipelines, quicker deploys, lower bandwidth costs.

---

## 📊 Complete Performance Summary

| Metric | BertUI | Vite | Winner | Speedup |
|--------|--------|------|--------|---------|
| Cold Cache Install | 324s | 73s | Vite | 4.4x |
| **Warm Cache Install** | **5s** | 35s | **BertUI** ⚡ | **7.0x** |
| **Dev Server Startup** | **494ms** | 713ms | **BertUI** ⚡ | **1.44x** |
| **Production Build** | **2.57s** | 4.70s | **BertUI** ⚡ | **1.83x** |
| **Bundle Size** | **100K** | 220K | **BertUI** ⚡ | **2.2x smaller** |

### The Real Winner? Context.

**Vite wins at:** First-time installation (if you care about that one-time 3-minute difference)

**BertUI dominates at:**
- ✅ Daily project creation (7x faster)
- ✅ Dev server restarts (1.44x faster)  
- ✅ Production builds (1.83x faster)
- ✅ Bundle size (2.2x smaller)
- ✅ Overall developer experience

---

## 🎭 Addressing the Critics

### "BertUI's speed claims are lies!"

**Reality Check:**  
Every single metric in this document was measured on real hardware, with reproducible tests, using default configurations. The numbers don't lie—the critics did.

### "But Vite is faster at..."

Yes, Vite is faster at **initial installation**. And that happens **once**. Every other metric—the ones you interact with **daily**—BertUI wins decisively.

### "This is cherry-picking benchmarks!"

We tested **everything**:
- Cold cache (Vite wins)
- Warm cache (BertUI wins)
- Dev server (BertUI wins)
- Production builds (BertUI wins)
- Bundle size (BertUI wins)

The only "cherry" here is the one metric where Vite wins: a 3-minute one-time installation cost.

### "My Vite dev server starts in 50ms!"

Cool story. Our test shows **713ms average** on real hardware with the default Vite template. If yours is faster, great! But comparing a heavily optimized custom setup to a default template isn't apples-to-apples.

### "You're biased because you created BertUI!"

**Damn right I'm biased**—toward **SPEED**. That's why I built BertUI in the first place. These tests prove what I already knew: developers deserve better than bloated, slow tooling. 

But you know what else? These tests are **reproducible**. Clone the test script, run it yourself, prove me wrong. I'll wait.

---

## 🔬 Reproducibility

All tests can be reproduced using the test scripts available in this repository:

```bash
# Full benchmark suite
./speed-test.sh

# Dev server specific test
./dev-server-test.sh
```

**Test artifacts:**
- Complete logs: `bertui-install.log`, `vite-install.log`
- Dev server logs: `bertui-run-*.log`, `vite-run-*.log`
- Build logs: `bertui-build.log`, `vite-build.log`

All logs preserve exact console output including timestamps and performance metrics.

---

## 💰 The Bottom Line

### Time Saved Per Day (Conservative Estimate)

**Scenario:** Average developer workflow
- 5 project scaffolds per week: `(35s - 5s) × 5 = 150s saved/week`
- 10 dev server restarts per day: `219ms × 10 = 2.19s saved/day`
- 3 production builds per day: `(4.7s - 2.57s) × 3 = 6.39s saved/day`

**Daily savings:** ~10 seconds  
**Weekly savings:** ~2 minutes  
**Monthly savings:** ~9 minutes  
**Yearly savings:** ~2 hours

### But It's Not Just About Time

**It's about flow state.** When your dev server starts in 494ms instead of 713ms, when your builds finish in 2.5 seconds instead of 5, when your HMR updates in 30ms—you stay in the zone. You don't context switch. You **ship faster**.

---

## 🚀 Conclusion

BertUI is exactly what it claims to be: **the fastest React framework for developers who value speed**.

- ✅ Warm cache installs: **7x faster**
- ✅ Dev server startup: **1.44x faster**
- ✅ Production builds: **1.83x faster**  
- ✅ Bundle sizes: **2.2x smaller**

The only "cost" is a 3-minute one-time installation. If that's your dealbreaker, Vite is a great choice.

But if you want **blazing-fast daily development** with zero configuration, BertUI delivers on every promise.

### To the critics: 

You claimed my speeds were "lies." The data proves otherwise. BertUI is fast—**provably, measurably, reproducibly fast**. 

Now stop whining and start building. ⚡

---

## 📚 Additional Resources

- **BertUI Docs:** https://bertui-docswebsite.vercel.app/
- **GitHub:** https://github.com/BunElysiaReact/BERTUI
- **NPM:** https://www.npmjs.com/package/bertui
- **Test Scripts:** Available in the repository root

---

**Built with 🔥 by Pease Ernest**  
*Because developers deserve better tooling.*