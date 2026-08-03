// =========================
// WATCHLIST REASONING ENGINE // TRADESCAN V3.1
// =========================
function generateWatchlistReasons(data) {
  const reasons = [];

  const {
    verdict,
    setup,
    setupScore,
    readinessScore = 0,
    triggerPressure = 0,
    volumeExpansion = "Normal",
    weaknessDetected = false,
    ltp,
    ema20,
    ema50,
    rsi,
    previousTriggerLow,
    previousTriggerHigh,
    previousSL,
    advancedEnabled
  } = data;

  // =========================
  // TREND STRUCTURE
  // =========================
  if (ltp > ema20 && ema20 > ema50) {
    reasons.push(
      "Trend structure remains bullish with price above EMA20 and EMA50."
    );
  } else {
    reasons.push(
      "Trend structure has weakened and requires caution."
    );
  }

  // =========================
  // TRIGGER ANALYSIS
  // =========================
  if (ltp > previousTriggerHigh) {
    reasons.push(
      "Price has crossed the trigger zone indicating potential execution readiness."
    );
  } else if (ltp >= previousTriggerLow) {
    reasons.push(
      "Price is interacting with the trigger zone and should be monitored closely."
    );
  } else {
    reasons.push(
      "Price remains below the trigger zone."
    );
  }

  // =========================
  // STOP LOSS ANALYSIS
  // =========================
  if (ltp < previousSL) {
    reasons.push(
      "Price has moved below the planned stop loss level."
    );
  }

  // =========================
  // RSI
  // =========================
  if (rsi >= 55 && rsi <= 75) {
    reasons.push(
      "RSI continues to support bullish participation."
    );
  } else if (rsi >= 45) {
    reasons.push(
      "RSI remains neutral and requires additional confirmation."
    );
  } else {
    reasons.push(
      "RSI has weakened significantly."
    );
  }

  // =========================
  // SETUP
  // =========================
  if (setup === "CB") {
    reasons.push(
      "Continuation Breakout structure remains active."
    );
  }
  if (setup === "PC") {
    reasons.push(
      "Pullback Continuation structure remains active."
    );
  }
  // RB logic removed

  // =========================
  // SETUP SCORE
  // =========================
  if (setupScore >= 80) {
    reasons.push(
      "Setup quality remains strong."
    );
  } else if (setupScore >= 60) {
    reasons.push(
      "Setup quality remains acceptable but needs confirmation."
    );
  } else {
    reasons.push(
      "Setup quality has deteriorated."
    );
  }

  // =========================
  // ADVANCED MOMENTUM
  // =========================
  if
