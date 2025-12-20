#!/bin/bash

# BertUI vs Vite Speed Test - Cold & Warm Cache
# Run this script to test all metrics

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   BertUI vs Vite Speed Test${NC}"
echo -e "${BLUE}   Cold Cache + Warm Cache${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# System Info
echo -e "${YELLOW}=== SYSTEM SPECS ===${NC}"
echo "OS: $(cat /etc/os-release | grep PRETTY_NAME | cut -d'"' -f2)"
echo "Kernel: $(uname -r)"
echo "CPU: $(lscpu | grep 'Model name' | cut -d':' -f2 | xargs)"
echo "Cores: $(nproc) cores"
echo "RAM: $(free -h | awk '/^Mem:/ {print $2}')"
echo "Node: $(node --version)"
echo "Bun: $(bun --version)"
echo "npm: $(npm --version)"
echo ""

# Internet Speed
echo -e "${YELLOW}=== INTERNET SPEED ===${NC}"
if command -v speedtest-cli &> /dev/null; then
    SPEED_RESULT=$(speedtest-cli --simple 2>&1)
    if [ $? -eq 0 ]; then
        echo "$SPEED_RESULT"
        DOWNLOAD_SPEED=$(echo "$SPEED_RESULT" | grep "Download" | awk '{print $2}')
        UPLOAD_SPEED=$(echo "$SPEED_RESULT" | grep "Upload" | awk '{print $2}')
    else
        echo "Speedtest failed, using default..."
        DOWNLOAD_SPEED="5.38"
        UPLOAD_SPEED="5.46"
        echo "Download: ${DOWNLOAD_SPEED} Mbit/s"
        echo "Upload: ${UPLOAD_SPEED} Mbit/s"
    fi
else
    DOWNLOAD_SPEED="5.38"
    UPLOAD_SPEED="5.46"
    echo "Download: ${DOWNLOAD_SPEED} Mbit/s"
    echo "Upload: ${UPLOAD_SPEED} Mbit/s"
fi
echo ""

# Calculate expected download time
echo -e "${CYAN}📊 Download size estimates:${NC}"
echo "  BertUI dependencies: ~154MB (bun binaries + packages)"
echo "  Vite dependencies: ~40MB (node_modules)"
echo "  Expected time at ${DOWNLOAD_SPEED}Mbps: ~4-5 minutes (BertUI), ~1 minute (Vite)"
echo ""

# Ask user about cache state
echo -e "${YELLOW}⚠️  CACHE CHECK${NC}"
echo "Have you already warmed up the cache (run 'bun install' once before)?"
echo "If this is your FIRST install after clearing cache, it will take 4-5 minutes."
echo ""
read -p "Continue? (y/n): " -n 1 -r
echo ""
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Test cancelled."
    exit 0
fi

# Create test directory
TEST_DIR="$HOME/speed-test-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$TEST_DIR"
cd "$TEST_DIR"

RESULTS_FILE="$TEST_DIR/results.md"

# Initialize results file
cat > "$RESULTS_FILE" << EOF
# BertUI vs Vite Speed Test Results

**Date:** $(date)
**Machine:** $(lscpu | grep 'Model name' | cut -d':' -f2 | xargs)
**RAM:** $(free -h | awk '/^Mem:/ {print $2}')
**CPU Cores:** $(nproc)
**Internet:** ${DOWNLOAD_SPEED} Mbps Down / ${UPLOAD_SPEED} Mbps Up

---

EOF

echo -e "${GREEN}=== TEST 1: Project Creation + Package Install (COLD CACHE) ===${NC}"
echo "This test measures first-time installation including downloads"
echo ""

# BertUI - Project creation
echo -e "${BLUE}Testing BertUI project creation...${NC}"
echo "⏱️  Starting timer..."
START=$(date +%s.%N)

# Show progress indicator
bunx create-bertui bertui-cold --yes 2>&1 | tee bertui-cold-install.log &
BUN_PID=$!

# Simple progress indicator
while kill -0 $BUN_PID 2>/dev/null; do
    echo -n "."
    sleep 2
done
wait $BUN_PID
BUN_EXIT=$?

END=$(date +%s.%N)
BERTUI_COLD=$(echo "$END - $START" | bc)

if [ $BUN_EXIT -ne 0 ]; then
    echo -e "${RED}✗ BertUI installation failed${NC}"
    echo "Check bertui-cold-install.log"
else
    echo -e "${GREEN}✓ BertUI cold install: ${BERTUI_COLD}s${NC}"
fi
echo ""

# Vite - Project creation
echo -e "${BLUE}Testing Vite project creation...${NC}"
echo "⏱️  Starting timer..."
START=$(date +%s.%N)

# Create Vite project - answer "No" to auto-install prompt
echo -e "n\n" | npm create vite@latest vite-cold -- --template react 2>&1 | tee vite-cold-create.log

# Manually install dependencies
cd vite-cold
npm install 2>&1 | tee ../vite-cold-install.log
cd ..

END=$(date +%s.%N)
VITE_COLD=$(echo "$END - $START" | bc)
echo -e "${GREEN}✓ Vite cold install: ${VITE_COLD}s${NC}"
echo ""

# Write cold cache results
cat >> "$RESULTS_FILE" << EOF
## Test 1: Project Creation + Package Install (COLD CACHE)

**What this measures:** First-time installation including all package downloads from npm registry.

| Framework | Time | Notes |
|-----------|------|-------|
| BertUI | ${BERTUI_COLD}s | Downloads ~154MB (includes bun platform binaries) |
| Vite | ${VITE_COLD}s | Downloads ~40MB (standard node_modules) |

**Winner:** $(if (( $(echo "$BERTUI_COLD < $VITE_COLD" | bc -l) )); then echo "BertUI ⚡"; else echo "Vite"; fi)

**Note:** BertUI downloads platform-specific bun binaries (~100MB) on first install. This is a one-time cost.

---

EOF

echo -e "${GREEN}=== TEST 2: Project Creation (WARM CACHE) ===${NC}"
echo "This test measures real-world speed after initial setup"
echo ""

# BertUI - Warm cache
echo -e "${BLUE}Testing BertUI with warm cache...${NC}"
START=$(date +%s.%N)
bunx create-bertui bertui-warm --yes 2>&1 | tee bertui-warm-install.log
END=$(date +%s.%N)
BERTUI_WARM=$(echo "$END - $START" | bc)
echo -e "${GREEN}✓ BertUI warm install: ${BERTUI_WARM}s${NC}"
echo ""

# Vite - Warm cache
echo -e "${BLUE}Testing Vite with warm cache...${NC}"
START=$(date +%s.%N)

# Create without auto-start
echo -e "n\n" | npm create vite@latest vite-warm -- --template react 2>&1 | tee vite-warm-create.log
cd vite-warm
npm install 2>&1 | tee ../vite-warm-install.log
cd ..

END=$(date +%s.%N)
VITE_WARM=$(echo "$END - $START" | bc)
echo -e "${GREEN}✓ Vite warm install: ${VITE_WARM}s${NC}"
echo ""

cat >> "$RESULTS_FILE" << EOF
## Test 2: Project Creation (WARM CACHE)

**What this measures:** Real-world project creation speed after packages are cached.

| Framework | Time | Speedup from Cold |
|-----------|------|-------------------|
| BertUI | ${BERTUI_WARM}s | $(echo "scale=1; $BERTUI_COLD / $BERTUI_WARM" | bc)x faster |
| Vite | ${VITE_WARM}s | $(echo "scale=1; $VITE_COLD / $VITE_WARM" | bc)x faster |

**Winner:** $(if (( $(echo "$BERTUI_WARM < $VITE_WARM" | bc -l) )); then echo "BertUI ⚡"; else echo "Vite"; fi)

---

EOF

echo -e "${GREEN}=== TEST 3: Dev Server Cold Start ===${NC}"
echo "Testing dev server startup (3 runs, using warm cache projects)"
echo ""

# BertUI cold starts
BERTUI_STARTS=()
cd bertui-warm
for i in 1 2 3; do
    echo -e "${BLUE}BertUI run $i/3...${NC}"
    START=$(date +%s.%N)
    timeout 10 bun run dev > /dev/null 2>&1 || true
    sleep 2
    END=$(date +%s.%N)
    TIME=$(echo "$END - $START" | bc)
    BERTUI_STARTS+=($TIME)
    echo "  Time: ${TIME}s"
    pkill -f "bun run dev" || true
    sleep 1
done
cd ..

# Vite cold starts  
VITE_STARTS=()
cd vite-warm
for i in 1 2 3; do
    echo -e "${BLUE}Vite run $i/3...${NC}"
    START=$(date +%s.%N)
    timeout 10 npm run dev > /dev/null 2>&1 || true
    sleep 2
    END=$(date +%s.%N)
    TIME=$(echo "$END - $START" | bc)
    VITE_STARTS+=($TIME)
    echo "  Time: ${TIME}s"
    pkill -f "npm run dev" || true
    pkill -f "vite" || true
    sleep 1
done
cd ..

# Calculate averages
BERTUI_AVG=$(printf "%.3f" $(echo "(${BERTUI_STARTS[0]} + ${BERTUI_STARTS[1]} + ${BERTUI_STARTS[2]}) / 3" | bc -l))
VITE_AVG=$(printf "%.3f" $(echo "(${VITE_STARTS[0]} + ${VITE_STARTS[1]} + ${VITE_STARTS[2]}) / 3" | bc -l))

echo ""
echo -e "${GREEN}BertUI Average: ${BERTUI_AVG}s${NC}"
echo -e "${GREEN}Vite Average: ${VITE_AVG}s${NC}"
echo ""

cat >> "$RESULTS_FILE" << EOF
## Test 3: Dev Server Cold Start (Average of 3 runs)

| Framework | Run 1 | Run 2 | Run 3 | Average |
|-----------|-------|-------|-------|---------|
| BertUI | ${BERTUI_STARTS[0]}s | ${BERTUI_STARTS[1]}s | ${BERTUI_STARTS[2]}s | ${BERTUI_AVG}s |
| Vite | ${VITE_STARTS[0]}s | ${VITE_STARTS[1]}s | ${VITE_STARTS[2]}s | ${VITE_AVG}s |

**Winner:** $(if (( $(echo "$BERTUI_AVG < $VITE_AVG" | bc -l) )); then echo "BertUI ⚡"; else echo "Vite"; fi)

---

EOF

echo -e "${GREEN}=== TEST 4: Production Build ===${NC}"
echo ""

# BertUI build
echo -e "${BLUE}Building BertUI...${NC}"
cd bertui-warm
START=$(date +%s.%N)
bertui build 2>&1 | tee ../bertui-build.log
END=$(date +%s.%N)
BERTUI_BUILD=$(echo "$END - $START" | bc)
BERTUI_SIZE=$(du -sh dist 2>/dev/null | cut -f1 || echo "N/A")
echo -e "${GREEN}✓ BertUI build: ${BERTUI_BUILD}s (size: ${BERTUI_SIZE})${NC}"
cd ..
echo ""

# Vite build
echo -e "${BLUE}Building Vite...${NC}"
cd vite-warm
START=$(date +%s.%N)
npm run build 2>&1 | tee ../vite-build.log
END=$(date +%s.%N)
VITE_BUILD=$(echo "$END - $START" | bc)
VITE_SIZE=$(du -sh dist 2>/dev/null | cut -f1 || echo "N/A")
echo -e "${GREEN}✓ Vite build: ${VITE_BUILD}s (size: ${VITE_SIZE})${NC}"
cd ..
echo ""

cat >> "$RESULTS_FILE" << EOF
## Test 4: Production Build

| Framework | Build Time | Bundle Size |
|-----------|------------|-------------|
| BertUI | ${BERTUI_BUILD}s | ${BERTUI_SIZE} |
| Vite | ${VITE_BUILD}s | ${VITE_SIZE} |

**Winner:** $(if (( $(echo "$BERTUI_BUILD < $VITE_BUILD" | bc -l) )); then echo "BertUI ⚡"; else echo "Vite"; fi)

---

EOF

# Final Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   FINAL RESULTS${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo "📦 Cold Cache Install (first time):"
echo "   BertUI: ${BERTUI_COLD}s"
echo "   Vite:   ${VITE_COLD}s"
echo ""
echo "⚡ Warm Cache Install (cached):"
echo "   BertUI: ${BERTUI_WARM}s"
echo "   Vite:   ${VITE_WARM}s"
echo ""
echo "🚀 Dev Server Start:"
echo "   BertUI: ${BERTUI_AVG}s"
echo "   Vite:   ${VITE_AVG}s"
echo ""
echo "🏗️  Production Build:"
echo "   BertUI: ${BERTUI_BUILD}s (${BERTUI_SIZE})"
echo "   Vite:   ${VITE_BUILD}s (${VITE_SIZE})"
echo ""
echo -e "${GREEN}Results saved to: ${RESULTS_FILE}${NC}"
echo -e "${GREEN}All logs saved to: ${TEST_DIR}/${NC}"
echo ""

cat >> "$RESULTS_FILE" << EOF
## Summary

### Winner by Category:

**Cold Cache (First Install):**
- $(if (( $(echo "$BERTUI_COLD < $VITE_COLD" | bc -l) )); then echo "✅ BertUI (${BERTUI_COLD}s vs ${VITE_COLD}s)"; else echo "✅ Vite (${VITE_COLD}s vs ${BERTUI_COLD}s)"; fi)

**Warm Cache (Subsequent Installs):**
- $(if (( $(echo "$BERTUI_WARM < $VITE_WARM" | bc -l) )); then echo "✅ BertUI (${BERTUI_WARM}s vs ${VITE_WARM}s)"; else echo "✅ Vite (${VITE_WARM}s vs ${BERTUI_WARM}s)"; fi)

**Dev Server Speed:**
- $(if (( $(echo "$BERTUI_AVG < $VITE_AVG" | bc -l) )); then echo "✅ BertUI (${BERTUI_AVG}s vs ${VITE_AVG}s)"; else echo "✅ Vite (${VITE_AVG}s vs ${BERTUI_AVG}s)"; fi)

**Build Speed:**
- $(if (( $(echo "$BERTUI_BUILD < $VITE_BUILD" | bc -l) )); then echo "✅ BertUI (${BERTUI_BUILD}s vs ${VITE_BUILD}s)"; else echo "✅ Vite (${VITE_BUILD}s vs ${BERTUI_BUILD}s)"; fi)

---

### Key Findings:

1. **First-time setup:** BertUI downloads larger binaries (~154MB vs Vite's ~40MB) but this is one-time
2. **After cache warm-up:** Both frameworks are significantly faster
3. **Real-world usage:** Dev server and build speeds matter most for daily work
4. **Network impact:** On 5Mbps connection, initial downloads significantly affect cold cache results

**Test completed:** $(date)
EOF

echo -e "${YELLOW}✅ Test complete! Check results.md for full report.${NC}"