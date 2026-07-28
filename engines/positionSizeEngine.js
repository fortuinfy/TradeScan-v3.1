// =========================
// POSITION SIZE ENGINE
// =========================

function calculatePositionSize(data) {

  const {

    capital,

    riskPercent,

    entryPrice,

    stopLoss

  } = data;

  if (

    !capital ||
    !riskPercent ||
    !entryPrice ||
    !stopLoss

  ) {

    return {

      quantity: 0,

      riskAmount: 0,

      positionValue: 0,

      perShareRisk: 0,

      warning:
        "Incomplete Inputs"

    };

  }

  // =========================
  // RISK AMOUNT
  // =========================

  const riskAmount =

    (
      capital *
      riskPercent
    ) / 100;

  // =========================
  // PER SHARE RISK
  // =========================

  const perShareRisk =

    Math.abs(
      entryPrice -
      stopLoss
    );

  if (

    perShareRisk <= 0

  ) {

    return {

      quantity: 0,

      riskAmount,

      positionValue: 0,

      perShareRisk,

      warning:
        "Invalid Stop Loss"

    };

  }

  // =========================
  // QUANTITY
  // =========================

  let quantity =

    Math.floor(
      riskAmount /
      perShareRisk
    );

  // =========================
  // CAPITAL CHECK
  // =========================

  const maxQuantity =

    Math.floor(
      capital /
      entryPrice
    );

  if (

    quantity > maxQuantity

  ) {

    quantity =
      maxQuantity;

  }

  // =========================
  // POSITION VALUE
  // =========================

  const positionValue =

    quantity *
    entryPrice;

  return {

    quantity,

    riskAmount:
      riskAmount.toFixed(2),

    positionValue:
      positionValue.toFixed(2),

    perShareRisk:
      perShareRisk.toFixed(2),

    warning: "",

    message:
      "Position Size Calculated"

  };

}
