// =========================
// TRADE REASONING ENGINE
// =========================

function generateTradeReasons(data) {

  const reasons = [];

  const {

    tradeVerdict,

    tradeHealth,

    pnlPercent,

    momentumHealth,

    participationTrend,

    weaknessDetected,

    exhaustionDetected,

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
      "Price remains above EMA20 and EMA50 indicating a healthy trend structure."
    );

  }

  else if (

    ltp > ema20

  ) {

    reasons.push(
      "Price remains above EMA20 but broader trend alignment has weakened."
    );

  }

  else {

    reasons.push(
      "Price has moved below EMA20 indicating deterioration in trend structure."
    );

  }

  // =========================
  // RSI ANALYSIS
  // =========================

  if (

    rsi >= 60

  ) {

    reasons.push(
      "RSI continues to support bullish momentum."
    );

  }

  else if (

    rsi >= 45

  ) {

    reasons.push(
      "RSI is neutral and requires monitoring."
    );

  }

  else {

    reasons.push(
      "RSI has weakened significantly."
    );

  }

  // =========================
  // PROFITABILITY
  // =========================

  if (

    pnlPercent > 0

  ) {

    reasons.push(
      "Trade remains profitable with current gain of " +
      pnlPercent.toFixed(2) +
      "%."
    );

  }

  else {

    reasons.push(
      "Trade is currently under pressure and requires careful monitoring."
    );

  }

  // =========================
  // TRADE HEALTH
  // =========================

  reasons.push(
    "Trade Health: " +
    tradeHealth
  );

  // =========================
  // ADVANCED MOMENTUM
  // =========================

  if (advancedEnabled) {

    reasons.push(
      "Advanced trade momentum analysis included."
    );

    reasons.push(
      "Momentum Health: " +
      momentumHealth
    );

    reasons.push(
      "Participation Trend: " +
      participationTrend
    );

    if (

      weaknessDetected

    ) {

      reasons.push(
        "Weakness has been detected in recent candle participation."
      );

    }

    if (

      exhaustionDetected

    ) {

      reasons.push(
        "Momentum exhaustion signals have emerged."
      );

    }

  }

  // =========================
  // FINAL VERDICT
  // =========================

  if (

    tradeVerdict ===
    "CONTINUE HOLDING"

  ) {

    reasons.push(
      "Trend and momentum continue to support holding the position."
    );

  }

  if (

    tradeVerdict ===
    "TRAIL STOP LOSS"

  ) {

    reasons.push(
      "Trade has progressed sufficiently to justify protecting profits."
    );

  }

  if (

    tradeVerdict ===
    "PARTIAL EXIT"

  ) {

    reasons.push(
      "Momentum is slowing near target and partial profit booking is advised."
    );

  }

  if (

    tradeVerdict ===
    "FULL EXIT"

  ) {

    reasons.push(
      "Current conditions no longer support maintaining the position."
    );

  }

  return reasons;

}
