// =========================
// NEW SCAN REASONING ENGINE
// =========================

function generateNewScanReasons(data) {

  const reasons = [];

  const {

    verdict,

    setup,

    setupScore,

    momentumScore,

    momentumTrend,

    participationTrend,

    relativeVolumeStatus,

    weaknessDetected,

    ltp,
    ema20,
    ema50,
    rsi,

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
      "Price is trading above EMA20 and EMA50 indicating a healthy bullish trend structure."
    );

  }

  else if (

    ltp > ema20

  ) {

    reasons.push(
      "Price is above EMA20 but broader trend alignment remains incomplete."
    );

  }

  else {

    reasons.push(
      "Price is below key moving averages indicating weak trend structure."
    );

  }

  // =========================
  // RSI ANALYSIS
  // =========================

  if (

    rsi >= 60 &&
    rsi <= 75

  ) {

    reasons.push(
      "RSI is positioned in a healthy bullish momentum zone."
    );

  }

  else if (

    rsi >= 50

  ) {

    reasons.push(
      "RSI remains neutral and requires additional confirmation."
    );

  }

  else {

    reasons.push(
      "RSI is weak and does not support aggressive bullish positioning."
    );

  }

  // =========================
  // SETUP DETECTED
  // =========================

  if (setup === "CB") {

    reasons.push(
      "Continuation Breakout structure detected."
    );

  }

  if (setup === "PC") {

    reasons.push(
      "Pullback Continuation structure detected."
    );

  }

  // RB logic removed

  // =========================
  // SETUP QUALITY
  // =========================

  if (

    setupScore >= 80

  ) {

    reasons.push(
      "Setup quality is strong based on the scoring engine."
    );

  }

  else if (

    setupScore >= 60

  ) {

    reasons.push(
      "Setup quality is moderate and may require additional confirmation."
    );

  }

  else {

    reasons.push(
      "Setup quality is weak and currently lacks conviction."
    );

  }

  // =========================
  // ADVANCED MOMENTUM
  // =========================

  if (advancedEnabled) {

    reasons.push(
      "Advanced momentum analysis has been included."
    );

    reasons.push(
      "Momentum Trend: " +
      momentumTrend
    );

    reasons.push(
      "Participation Trend: " +
      participationTrend
    );

    reasons.push(
      "Relative Volume: " +
      relativeVolumeStatus
    );

    if (

      momentumScore >= 80

    ) {

      reasons.push(
        "Momentum expansion supports bullish continuation."
      );

    }

    if (

      weaknessDetected

    ) {

      reasons.push(
        "Weakness has been detected in recent candle participation."
      );

    }

  }

  // =========================
  // FINAL VERDICT
  // =========================

  if (

    verdict === "BUY"

  ) {

    reasons.push(
      "Current conditions support a bullish opportunity."
    );

  }

  if (

    verdict === "WATCH"

  ) {

    reasons.push(
      "Further confirmation is required before execution."
    );

  }

  if (

    verdict === "AVOID"

  ) {

    reasons.push(
      "Current conditions do not justify fresh positioning."
    );

  }

  return reasons;

}
