# BertUI vs Vite Speed Test Results

**Date:** Sat Dec 20 10:00:14 AM EAT 2025
**Machine:** Intel(R) Core(TM) i3-2348M CPU @ 2.30GHz
**RAM:** 7.6Gi
**CPU Cores:** 4
**Internet:** 4.91 Mbps Down / 5.56 Mbps Up

---

## Test 1: Project Creation + Package Install (COLD CACHE)

**What this measures:** First-time installation including all package downloads from npm registry.

| Framework | Time | Notes |
|-----------|------|-------|
| BertUI | 324.525035182s | Downloads ~154MB (includes bun platform binaries) |
| Vite | 73.457368331s | Downloads ~40MB (standard node_modules) |

**Winner:** Vite

**Note:** BertUI downloads platform-specific bun binaries (~100MB) on first install. This is a one-time cost.

---

## Test 2: Project Creation (WARM CACHE)

**What this measures:** Real-world project creation speed after packages are cached.

| Framework | Time | Speedup from Cold |
|-----------|------|-------------------|
| BertUI | 5.011544180s | 64.7x faster |
| Vite | 35.315170101s | 2.0x faster |

**Winner:** BertUI ⚡

---

## Test 3: Dev Server Cold Start (Average of 3 runs)

| Framework | Run 1 | Run 2 | Run 3 | Average |
|-----------|-------|-------|-------|---------|
| BertUI | 12.066387426s | 12.022775866s | 12.018307483s | 12.036s |
| Vite | 12.021563717s | 12.018622050s | 12.017368717s | 12.019s |

**Winner:** Vite

---

## Test 4: Production Build

| Framework | Build Time | Bundle Size |
|-----------|------------|-------------|
| BertUI | 2.574094867s | 100K |
| Vite | 4.704468383s | 220K |

**Winner:** BertUI ⚡

---

## Summary

### Winner by Category:

**Cold Cache (First Install):**
- ✅ Vite (73.457368331s vs 324.525035182s)

**Warm Cache (Subsequent Installs):**
- ✅ BertUI (5.011544180s vs 35.315170101s)

**Dev Server Speed:**
- ✅ Vite (12.019s vs 12.036s)

**Build Speed:**
- ✅ BertUI (2.574094867s vs 4.704468383s)

---

### Key Findings:

1. **First-time setup:** BertUI downloads larger binaries (~154MB vs Vite's ~40MB) but this is one-time
2. **After cache warm-up:** Both frameworks are significantly faster
3. **Real-world usage:** Dev server and build speeds matter most for daily work
4. **Network impact:** On 5Mbps connection, initial downloads significantly affect cold cache results

**Test completed:** Sat Dec 20 10:08:59 AM EAT 2025
