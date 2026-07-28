// =========================
// TRADE PLAN ENGINE
// =========================

function generateTradePlan(data) {

  const {

    ltp,

    setup = "CB"

  } = data;

  // =========================
  // TRIGGER ZONE
  // =========================

  const triggerLow =

    parseFloat(

      (ltp * 1.0025)

        .toFixed(2)

    );

  const triggerHigh =

    parseFloat(

      (ltp * 1.0075)

        .toFixed(2)

    );

  // =========================
  // STOP LOSS
  // =========================

  const stopLoss =

    parseFloat(

      (ltp * 0.97)

        .toFixed(2)

    );

  // =========================
  // EXECUTION PRICE
  // =========================

  const executionPrice =

    triggerHigh;

  // =========================
  // RISK PER SHARE
  // =========================

  const riskPerShare =

    executionPrice -

    stopLoss;

  // =========================
  // PARTIAL EXIT
  // RR = 1 : 1
  // =========================

  const partialExit =

    parseFloat(

      (

        executionPrice +

        riskPerShare

      ).toFixed(2)

    );

  // =========================
  // TARGET
  // RR = 1 : 2
  // =========================

  const target =

    parseFloat(

      (

        executionPrice +

        (riskPerShare * 2)

      ).toFixed(2)

    );

  // =========================
  // RISK LEVEL
  // =========================

  let riskLevel =

    "MEDIUM";

  if (

    riskPerShare <= 10

  ) {

    riskLevel =

      "LOW";

  }

  if (

    riskPerShare >= 20

  ) {

    riskLevel =

      "HIGH";

  }

  // =========================
  // RETURN
  // =========================

  return {

    triggerLow,

    triggerHigh,

    stopLoss,

    partialExit,

    target,

    executionPrice,

    riskPerShare,

    riskLevel,

    setup

  };

}
