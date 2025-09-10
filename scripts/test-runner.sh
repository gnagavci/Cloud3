#!/bin/bash
echo "🐳 Docker-Based Testing for Movie App"
echo "======================================"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

run_test() {
    local test_name=$1
    local command=$2
    
    echo -e "${BLUE}Running $test_name...${NC}"
    if eval $command; then
        echo -e "${GREEN}✅ $test_name passed${NC}"
        return 0
    else
        echo -e "${RED}❌ $test_name failed${NC}"
        return 1
    fi
}

mkdir -p test-results/backend test-results/frontend

echo -e "${YELLOW}🔧 Backend Unit Tests${NC}"
run_test "Backend Unit Tests" "docker-compose -f docker-compose.test.yml run --rm backend-test npm test"

echo -e "${YELLOW}�� Frontend Component Tests${NC}"
run_test "Frontend Component Tests" "docker-compose -f docker-compose.test.yml run --rm frontend-test npm test"

echo -e "${GREEN}🎉 All Docker tests completed!${NC}"
