// =========================
// APP CONFIGURATION
// TRADESCAN AI V3
// =========================

const APP_CONFIG = {

  // =========================
  // APP INFO
  // =========================

  APP_NAME: "TradeScan AI",

  APP_SUBTITLE:
    "Multi-Mode Trading Assistant",

  VERSION: "3.0.0",

  // =========================
  // MODES
  // =========================

  MODES: {

    NEW: "new",

    WATCHLIST: "watchlist",

    ACTIVE: "active"

  },

  // =========================
  // TIMEFRAMES
  // =========================

  TIMEFRAMES: {

    DAILY: "Daily",

    EXECUTION: "15 Min"

  },

  // =========================
  // SETUPS
  // =========================

  SETUP_NAMES: {

    CB: "Continuation Breakout",

    PC: "Pullback Continuation"

  },

  // =========================
  // NEW SCAN VERDICTS
  // =========================

  NEW_SCAN_VERDICTS: {

    BUY: "BUY",

    WATCH: "WATCH",

    AVOID: "AVOID"

  },

  // =========================
  // WATCHLIST VERDICTS
  // =========================

  WATCHLIST_VERDICTS: {

    READY: "READY",

    MONITOR: "MONITOR",

    REMOVE: "REMOVE"

  },

  // =========================
  // ACTIVE TRADE VERDICTS
  // =========================

  ACTIVE_TRADE_VERDICTS: {

    HOLD:
      "CONTINUE HOLDING",

    TRAIL:
      "TRAIL STOP LOSS",

    PARTIAL:
      "PARTIAL EXIT",

    EXIT:
      "FULL EXIT"

  },

  // =========================
  // GRADES
  // =========================

  GRADES: {

    A_PLUS: "A+",

    A: "A",

    B: "B",

    C: "C",

    D: "D"

  },

  // =========================
  // CONFIDENCE
  // =========================

  CONFIDENCE: {

    HIGH: 90,

    GOOD: 85,

    MODERATE: 65,

    LOW: 25

  },

  // =========================
  // RSI
  // =========================

  RSI: {

    STRONG_MIN: 60,

    HEALTHY_MIN: 55,

    REVERSAL_MIN: 48,

    OVERBOUGHT: 78,

    WEAK: 45

  },

  // =========================
  // MOMENTUM
  // =========================

  MOMENTUM: {

    STRONG: 80,

    MODERATE: 60,

    WEAK: 40

  },

  // =========================
  // SETUP SCORE
  // =========================

  SETUP_SCORE: {

    STRONG: 80,

    MODERATE: 60,

    WEAK: 40

  },

  // =========================
  // RISK MANAGEMENT
  // =========================

  RISK_MANAGEMENT: {

    DEFAULT_RISK_PERCENT: 1,

    MAX_RISK_PERCENT: 2

  },

  // =========================
  // UI
  // =========================

  UI: {

    DEFAULT_MODE: "new",

    DEFAULT_TIMEFRAME: "Daily"

  }

};
