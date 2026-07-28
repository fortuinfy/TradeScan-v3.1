// =========================
// WATCHLIST REASONING ENGINE
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

  if (

    ltp > ema20 &&
    ema20 > ema50

  ) {

    reasons.push(
      "Trend structure remains bullish with price above EMA20 and EMA50."
    );

  }

  else {

    reasons.push(
      "Trend structure has weakened and requires caution."
    );

  }

  // =========================
  // TRIGGER ANALYSIS
  // =========================

  if (

    ltp > previousTriggerHigh

  ) {

    reasons.push(
      "Price has crossed the trigger zone indicating potential execution readiness."
    );

  }

  else if (

    ltp >= previousTriggerLow

  ) {

    reasons.push(
      "Price is interacting with the trigger zone and should be monitored closely."
    );

  }

  else {

    reasons.push(
      "Price remains below the trigger zone."
    );

  }

  // =========================
  // STOP LOSS ANALYSIS
  // =========================

  if (

    ltp < previousSL

  ) {

    reasons.push(
      "Price has moved below the planned stop loss level."
    );

  }

  // =========================
  // RSI
  // =========================

  if (

    rsi >= 55 &&
    rsi <= 75

  ) {

    reasons.push(
      "RSI continues to support bullish participation."
    );

  }

  else if (

    rsi >= 45

  ) {

    reasons.push(
      "RSI remains neutral and requires additional confirmation."
    );

  }

  else {

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

  if (

    setupScore >= 80

  ) {

    reasons.push(
      "Setup quality remains strong."
    );

  }

  else if (

    setupScore >= 60

  ) {

    reasons.push(
      "Setup quality remains acceptable but needs confirmation."
    );

  }

  else {

    reasons.push(
      "Setup quality has deteriorated."
    );

  }

  // =========================
  // ADVANCED MOMENTUM
  // =========================

  if (advancedEnabled) {

    reasons.push(
      "Watchlist momentum analysis included."
    );

    reasons.push(
      "Readiness Score: " +
      readinessScore
    );

    reasons.push(
      "Trigger Pressure: " +
      triggerPressure
    );

    reasons.push(
      "Volume Expansion: " +
      volumeExpansion
    );

    if (

      weaknessDetected

    ) {

      reasons.push(
        "Weakness detected in execution readiness."
      );

    }

  }

  // =========================
  // FINAL VERDICT
  // =========================

  if (

    verdict === "READY"

  ) {

    reasons.push(
      "Conditions support execution readiness."
    );

  }

  if (

    verdict === "MONITOR"

  ) {

    reasons.push(
      "Stock remains valid but requires further confirmation."
    );

  }

  if (

    verdict === "REMOVE"

  ) {

    reasons.push(
      "Current conditions no longer justify keeping this stock on the watchlist."
    );

  }

  return reasons;

}
