#!/bin/bash

# ─────────────────────────────────────────────
#  Saros Vadi — Start Script
#  Runs both the promotional and reservation apps
# ─────────────────────────────────────────────

set -e

PROMO_PORT=3000
RES_PORT=3001
PROMO_DIR="$(cd "$(dirname "$0")/promotional" && pwd)"
RES_DIR="$(cd "$(dirname "$0")/reservation" && pwd)"

# ── Colors ──────────────────────────────────
GOLD='\033[0;33m'
GREEN='\033[0;32m'
RED='\033[0;31m'
CYAN='\033[0;36m'
DIM='\033[2m'
RESET='\033[0m'
BOLD='\033[1m'

# ── Banner ───────────────────────────────────
echo ""
echo -e "${GOLD}${BOLD}"
echo "  ███████╗ █████╗ ██████╗  ██████╗ ███████╗"
echo "  ██╔════╝██╔══██╗██╔══██╗██╔═══██╗██╔════╝"
echo "  ███████╗███████║██████╔╝██║   ██║███████╗"
echo "  ╚════██║██╔══██║██╔══██╗██║   ██║╚════██║"
echo "  ███████║██║  ██║██║  ██║╚██████╔╝███████║"
echo "  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝"
echo -e "${RESET}"
echo -e "  ${DIM}Saros Vadi — Mediterranean Boutique Resort${RESET}"
echo -e "  ${DIM}──────────────────────────────────────────${RESET}"
echo ""

# ── Check Node.js ────────────────────────────
if ! command -v node &> /dev/null; then
  echo -e "${RED}✗ Node.js is not installed.${RESET}"
  echo -e "  Download it from: ${CYAN}https://nodejs.org${RESET}"
  exit 1
fi

NODE_VERSION=$(node -v)
echo -e "  ${GREEN}✓${RESET} Node.js ${NODE_VERSION} detected"

# ── Check npm ────────────────────────────────
if ! command -v npm &> /dev/null; then
  echo -e "${RED}✗ npm is not installed.${RESET}"
  exit 1
fi

echo ""

# ── Install dependencies ─────────────────────
install_if_needed() {
  local dir="$1"
  local name="$2"
  if [ ! -d "$dir/node_modules" ]; then
    echo -e "  ${GOLD}→${RESET} Installing dependencies for ${BOLD}${name}${RESET}..."
    (cd "$dir" && npm install --silent)
    echo -e "  ${GREEN}✓${RESET} ${name} dependencies installed"
  else
    echo -e "  ${GREEN}✓${RESET} ${name} dependencies already installed"
  fi
}

install_if_needed "$PROMO_DIR" "Promotional App"
install_if_needed "$RES_DIR"   "Reservation App"

echo ""

# ── Kill any existing processes on our ports ─
kill_port() {
  local port="$1"
  local pid
  pid=$(lsof -ti tcp:"$port" 2>/dev/null || true)
  if [ -n "$pid" ]; then
    echo -e "  ${DIM}Stopping process on port ${port}...${RESET}"
    kill "$pid" 2>/dev/null || true
    sleep 1
  fi
}

kill_port $PROMO_PORT
kill_port $RES_PORT

# ── Start servers ────────────────────────────
echo -e "  ${GOLD}→${RESET} Starting ${BOLD}Promotional App${RESET} on port ${PROMO_PORT}..."
(cd "$PROMO_DIR" && npm run dev -- -p $PROMO_PORT > /tmp/sarosvadi-promo.log 2>&1) &
PROMO_PID=$!

echo -e "  ${GOLD}→${RESET} Starting ${BOLD}Reservation App${RESET} on port ${RES_PORT}..."
(cd "$RES_DIR" && npm run dev -- -p $RES_PORT > /tmp/sarosvadi-res.log 2>&1) &
RES_PID=$!

# ── Wait for servers to be ready ─────────────
echo ""
echo -e "  ${DIM}Waiting for servers to start...${RESET}"

wait_for_port() {
  local port="$1"
  local name="$2"
  local attempts=0
  until curl -s "http://localhost:$port" > /dev/null 2>&1; do
    attempts=$((attempts + 1))
    if [ $attempts -ge 30 ]; then
      echo -e "  ${RED}✗ ${name} failed to start. Check logs at /tmp/sarosvadi-promo.log${RESET}"
      exit 1
    fi
    sleep 1
  done
  echo -e "  ${GREEN}✓${RESET} ${name} is ready"
}

wait_for_port $PROMO_PORT "Promotional App"
wait_for_port $RES_PORT   "Reservation App"

# ── Success ───────────────────────────────────
echo ""
echo -e "  ${GOLD}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo -e "  ${GREEN}${BOLD}  Both apps are running!${RESET}"
echo -e "  ${GOLD}${BOLD}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}"
echo ""
echo -e "  ${BOLD}Promotional Page${RESET}   →  ${CYAN}http://localhost:${PROMO_PORT}${RESET}"
echo -e "  ${BOLD}Reservation Page${RESET}   →  ${CYAN}http://localhost:${RES_PORT}${RESET}"
echo ""
echo -e "  ${DIM}Press Ctrl+C to stop both servers${RESET}"
echo ""

# ── Cleanup on exit ───────────────────────────
cleanup() {
  echo ""
  echo -e "  ${GOLD}→${RESET} Shutting down servers..."
  kill $PROMO_PID 2>/dev/null || true
  kill $RES_PID   2>/dev/null || true
  # Also kill any child processes on those ports
  lsof -ti tcp:$PROMO_PORT 2>/dev/null | xargs kill 2>/dev/null || true
  lsof -ti tcp:$RES_PORT   2>/dev/null | xargs kill 2>/dev/null || true
  echo -e "  ${GREEN}✓${RESET} All servers stopped. Goodbye!"
  echo ""
  exit 0
}

trap cleanup SIGINT SIGTERM

# ── Keep script alive ─────────────────────────
wait $PROMO_PID $RES_PID
