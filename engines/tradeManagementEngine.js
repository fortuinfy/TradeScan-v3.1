// ========================= 
// ACTIVE TRADE ENGINE 
// ========================= 
function manageActiveTrade(data) { 
    // Brought in 'quantity' to calculate the exit math
    const { ltp, executedEntry, currentSL, currentTarget, quantity = 0, momentumScore = 0, weaknessDetected = false, rsi, ema20, ema50, advancedEnabled = false } = data; 
    
    let tradeVerdict = "CONTINUE HOLDING"; 
    let priority = "LOW"; 
    let suggestedSL = currentSL; 
    let suggestedTarget = currentTarget; 
    let tradeHealth = "Healthy"; 
    const tradeReasons = []; 
    let partialExitPlan = null; // New container for dynamic exit data

    // ========================= 
    // CALCULATIONS
    // ========================= 
    const pnlPercent = ( ( ltp - executedEntry ) / executedEntry ) * 100; 
    const bullishTrend = ltp > ema20 && ema20 > ema50; 
    const distanceToTarget = ( ( currentTarget - ltp ) / ltp ) * 100; 
    const distanceFromEMA20 = ( ( ltp - ema20 ) / ema20 ) * 100;

    // ========================= 
    // WEAKNESS TRIGGERS
    // ========================= 
    const isStructuralBreakdown = distanceFromEMA20 <= -1.5 || ltp < ema50;
    const isMomentumDead = (advancedEnabled && (momentumScore < 40 || weaknessDetected)) || rsi < 45;

    // ========================= 
    // PRIORITY 1: HARD EXITS (STOP LOSS OR TARGET HIT)
    // ========================= 
    if ( ltp <= currentSL ) { 
        tradeVerdict = "FULL EXIT"; 
        priority = "URGENT"; 
        tradeHealth = "Broken (SL Hit)"; 
        tradeReasons.push( "Price has hit or breached the hard Stop Loss." ); 
    } 
    else if ( ltp >= currentTarget ) {
        tradeVerdict = "FULL EXIT"; 
        priority = "HIGH"; 
        tradeHealth = "Target Achieved"; 
        tradeReasons.push( "Price has successfully reached the final target level. Book full profits." ); 
    }
    // ========================= 
    // PRIORITY 2A: HIGH RISK (DEFENSIVE 75% EXIT)
    // ========================= 
    else if ( isStructuralBreakdown && isMomentumDead ) { 
        tradeVerdict = "PARTIAL EXIT"; 
        priority = "HIGH"; 
        tradeHealth = "Critical Weakness"; 
        tradeReasons.push( "Confluence of structural breakdown and momentum failure. Aggressively reduce risk." ); 
        
        partialExitPlan = buildPartialExit(quantity, 0.75, "High Risk", ltp, executedEntry);

        if (currentSL < ema50 && ltp > ema50) {
            suggestedSL = parseFloat(ema50.toFixed(2));
            tradeReasons.push( "Suggested tightening Stop Loss to EMA50 for the remaining runner." );
        }
    } 
    // ========================= 
    // PRIORITY 3: NORMAL RISK (OFFENSIVE 25% EXIT)
    // BUG FIX: Shifted above Medium Risk. Target proximity overrides generic momentum weakness.
    // ========================= 
    else if ( distanceToTarget <= 3 && advancedEnabled && momentumScore < 65 ) { 
        tradeVerdict = "PARTIAL EXIT"; 
        priority = "LOW"; 
        tradeHealth = "Extended"; 
        tradeReasons.push( "Price is very near target but momentum is slowing. Offensively secure partial profits." ); 
        
        partialExitPlan = buildPartialExit(quantity, 0.25, "Normal Risk", ltp, executedEntry);
    } 
    // ========================= 
    // PRIORITY 2B: MEDIUM RISK (DEFENSIVE 50% EXIT)
    // ========================= 
    else if ( isStructuralBreakdown || isMomentumDead ) { 
        tradeVerdict = "PARTIAL EXIT"; 
        priority = "MEDIUM"; 
        tradeHealth = "Weakening"; 
        tradeReasons.push( "Singular failure in either structure or momentum. Consider balancing risk." ); 
        
        partialExitPlan = buildPartialExit(quantity, 0.50, "Medium Risk", ltp, executedEntry);

        if (currentSL < ema50 && ltp > ema50) {
            suggestedSL = parseFloat(ema50.toFixed(2));
            tradeReasons.push( "Suggested tightening Stop Loss to EMA50 for the remaining balance." );
        }
    } 
    // ========================= 
    // PRIORITY 4: PROFIT PROTECTION (TRAIL STOP LOSS)
    // ========================= 
    else if ( pnlPercent >= 5 && bullishTrend ) { 
        tradeVerdict = "TRAIL STOP LOSS"; 
        priority = "HIGH"; 
        
        if (ema20 > currentSL) {
            suggestedSL = parseFloat(ema20.toFixed(2));
        }
        
        tradeHealth = "Profitable"; 
        tradeReasons.push( "Trade is well in profit. Trail stop loss to protect capital." ); 
    } 
    // ========================= 
    // DEFAULT: HOLD / PULLBACK TOLERANCE
    // ========================= 
    else { 
        tradeVerdict = "CONTINUE HOLDING"; 
        priority = "LOW"; 
        
        if (ltp < ema20 && distanceFromEMA20 > -1.5) {
            tradeHealth = "Pullback";
            tradeReasons.push( "Price is experiencing a normal pullback near the 20 EMA. Trend remains structurally intact." );
        } else {
            tradeHealth = "Stable"; 
            tradeReasons.push( "Trade is progressing normally within risk parameters. Hold position." ); 
        }
    } 

    // ========================= 
    // RETURN 
    // ========================= 
    return { tradeVerdict, priority, suggestedSL, suggestedTarget, tradeHealth, tradeReasons, pnlPercent, partialExitPlan }; 
}

// ========================= 
// FRACTIONAL EXIT CALCULATOR 
// ========================= 
function buildPartialExit(totalQuantity, fraction, riskLabel, ltp, executedEntry) {
    // Math.round ensures we never suggest fractional shares (e.g., 99 * 0.75 = 74.25 -> 74)
    const safeTotalQuantity = parseFloat(totalQuantity) || 0;
    const exitQuantity = Math.round(safeTotalQuantity * fraction);
    const realizedPnL = (ltp - executedEntry) * exitQuantity;
    
    return {
        actionText: `Sell ${fraction * 100}% (${riskLabel})`,
        exitQuantity: exitQuantity,
        exitPrice: ltp,
        realizedPnL: parseFloat(realizedPnL.toFixed(2))
    };
}
