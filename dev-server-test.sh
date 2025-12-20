#!/bin/bash

# Accurate Dev Server Startup Test
# Measures REAL startup time from console output

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   Dev Server Startup Speed Test${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if projects exist
if [ ! -d "bertui-warm" ] || [ ! -d "vite-warm" ]; then
    echo -e "${RED}Error: bertui-warm or vite-warm directories not found${NC}"
    echo "Please run the full speed-test.sh first to create these projects"
    exit 1
fi

TEST_DIR=$(pwd)
RESULTS_FILE="$TEST_DIR/dev-server-results.md"

cat > "$RESULTS_FILE" << EOF
# Dev Server Startup Speed Test

**Date:** $(date)
**Test Method:** Parse actual "ready" time from console output

---

EOF

echo -e "${GREEN}=== TEST: Dev Server Startup Time (5 runs each) ===${NC}"
echo ""

# Function to test BertUI
test_bertui() {
    local run=$1
    echo -e "${BLUE}BertUI Run $run/5...${NC}"
    
    cd bertui-warm
    
    # Start dev server and capture output
    timeout 15 bun run dev > ../bertui-run-${run}.log 2>&1 &
    DEV_PID=$!
    
    # Wait for "ready" message
    local start_time=$(date +%s%3N)
    local ready_time=""
    
    for i in {1..150}; do
        if grep -q "Server running" ../bertui-run-${run}.log 2>/dev/null; then
            ready_time=$(date +%s%3N)
            break
        fi
        sleep 0.1
    done
    
    # Kill the dev server
    kill $DEV_PID 2>/dev/null || true
    pkill -P $DEV_PID 2>/dev/null || true
    sleep 1
    
    cd ..
    
    if [ -z "$ready_time" ]; then
        echo -e "${RED}  Failed to detect startup${NC}"
        echo "TIMEOUT"
        return
    fi
    
    local elapsed=$((ready_time - start_time))
    local seconds=$(echo "scale=3; $elapsed / 1000" | bc)
    echo -e "${GREEN}  Time: ${seconds}s${NC}"
    echo "$seconds"
}

# Function to test Vite
test_vite() {
    local run=$1
    echo -e "${BLUE}Vite Run $run/5...${NC}"
    
    cd vite-warm
    
    # Start dev server and capture output
    timeout 15 npm run dev > ../vite-run-${run}.log 2>&1 &
    DEV_PID=$!
    
    # Wait for "ready" message
    local start_time=$(date +%s%3N)
    local ready_time=""
    
    for i in {1..150}; do
        if grep -q "ready in" ../vite-run-${run}.log 2>/dev/null; then
            ready_time=$(date +%s%3N)
            break
        fi
        sleep 0.1
    done
    
    # Kill the dev server
    kill $DEV_PID 2>/dev/null || true
    pkill -P $DEV_PID 2>/dev/null || true
    pkill -f "vite" 2>/dev/null || true
    sleep 1
    
    cd ..
    
    if [ -z "$ready_time" ]; then
        echo -e "${RED}  Failed to detect startup${NC}"
        echo "TIMEOUT"
        return
    fi
    
    local elapsed=$((ready_time - start_time))
    local seconds=$(echo "scale=3; $elapsed / 1000" | bc)
    echo -e "${GREEN}  Time: ${seconds}s${NC}"
    echo "$seconds"
}

# Run BertUI tests
echo -e "${CYAN}Testing BertUI...${NC}"
BERTUI_TIMES=()
for i in 1 2 3 4 5; do
    TIME=$(test_bertui $i)
    if [ "$TIME" != "TIMEOUT" ]; then
        BERTUI_TIMES+=($TIME)
    fi
done
echo ""

# Run Vite tests
echo -e "${CYAN}Testing Vite...${NC}"
VITE_TIMES=()
for i in 1 2 3 4 5; do
    TIME=$(test_vite $i)
    if [ "$TIME" != "TIMEOUT" ]; then
        VITE_TIMES+=($TIME)
    fi
done
echo ""

# Calculate averages
if [ ${#BERTUI_TIMES[@]} -gt 0 ]; then
    BERTUI_SUM=0
    for time in "${BERTUI_TIMES[@]}"; do
        BERTUI_SUM=$(echo "$BERTUI_SUM + $time" | bc)
    done
    BERTUI_AVG=$(echo "scale=3; $BERTUI_SUM / ${#BERTUI_TIMES[@]}" | bc)
else
    BERTUI_AVG="N/A"
fi

if [ ${#VITE_TIMES[@]} -gt 0 ]; then
    VITE_SUM=0
    for time in "${VITE_TIMES[@]}"; do
        VITE_SUM=$(echo "$VITE_SUM + $time" | bc)
    done
    VITE_AVG=$(echo "scale=3; $VITE_SUM / ${#VITE_TIMES[@]}" | bc)
else
    VITE_AVG="N/A"
fi

# Display results
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}   RESULTS${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "${YELLOW}BertUI Times:${NC}"
for i in "${!BERTUI_TIMES[@]}"; do
    echo "  Run $((i+1)): ${BERTUI_TIMES[$i]}s"
done
echo -e "${GREEN}  Average: ${BERTUI_AVG}s${NC}"
echo ""
echo -e "${YELLOW}Vite Times:${NC}"
for i in "${!VITE_TIMES[@]}"; do
    echo "  Run $((i+1)): ${VITE_TIMES[$i]}s"
done
echo -e "${GREEN}  Average: ${VITE_AVG}s${NC}"
echo ""

# Write to markdown
cat >> "$RESULTS_FILE" << EOF
## Results (5 runs each)

### BertUI
| Run | Time |
|-----|------|
EOF

for i in "${!BERTUI_TIMES[@]}"; do
    echo "| Run $((i+1)) | ${BERTUI_TIMES[$i]}s |" >> "$RESULTS_FILE"
done

cat >> "$RESULTS_FILE" << EOF
| **Average** | **${BERTUI_AVG}s** |

### Vite
| Run | Time |
|-----|------|
EOF

for i in "${!VITE_TIMES[@]}"; do
    echo "| Run $((i+1)) | ${VITE_TIMES[$i]}s |" >> "$RESULTS_FILE"
done

cat >> "$RESULTS_FILE" << EOF
| **Average** | **${VITE_AVG}s** |

---

## Winner

EOF

if [ "$BERTUI_AVG" != "N/A" ] && [ "$VITE_AVG" != "N/A" ]; then
    if (( $(echo "$BERTUI_AVG < $VITE_AVG" | bc -l) )); then
        DIFF=$(echo "$VITE_AVG - $BERTUI_AVG" | bc)
        SPEEDUP=$(echo "scale=2; $VITE_AVG / $BERTUI_AVG" | bc)
        cat >> "$RESULTS_FILE" << EOF
**🏆 BertUI wins!**

- BertUI: ${BERTUI_AVG}s
- Vite: ${VITE_AVG}s
- Difference: ${DIFF}s faster
- Speedup: ${SPEEDUP}x

EOF
        echo -e "${GREEN}🏆 BertUI wins by ${DIFF}s (${SPEEDUP}x faster)!${NC}"
    else
        DIFF=$(echo "$BERTUI_AVG - $VITE_AVG" | bc)
        SPEEDUP=$(echo "scale=2; $BERTUI_AVG / $VITE_AVG" | bc)
        cat >> "$RESULTS_FILE" << EOF
**🏆 Vite wins!**

- Vite: ${VITE_AVG}s
- BertUI: ${BERTUI_AVG}s
- Difference: ${DIFF}s faster
- Speedup: ${SPEEDUP}x

EOF
        echo -e "${GREEN}🏆 Vite wins by ${DIFF}s (${SPEEDUP}x faster)!${NC}"
    fi
fi

echo ""
echo -e "${CYAN}Results saved to: ${RESULTS_FILE}${NC}"
echo -e "${CYAN}Log files: bertui-run-*.log, vite-run-*.log${NC}"