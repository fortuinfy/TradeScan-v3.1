// ========================= 
// ANALYSIS ENGINE // V2 MASTER ROUTER 
// ========================= 

// ========================= 
// NEW SCAN 
// ========================= 
function analyzeNewScanMode(data) { 
    const { stockName, timeframe, ltp, ema20, ema50, rsi, advancedEnabled = false, candles = [] } = data; 
    
    // SETUP 
    const setupResult = calculateSetupScores({ ltp, ema20, ema50, rsi, timeframe }); 
    
    // MOMENTUM 
    let momentumResult = { momentumScore: 0, momentumTrend: "Not Available", participationTrend: "Not Available", relativeVolumeStatus: "Not Available", weaknessDetected: false }; 
    if ( advancedEnabled && candles.length >= 5 ) { 
        momentumResult = calculateNewScanMomentum({ candles }); 
    } 
    
    // VERDICT 
    const verdictResult = analyzeNewScan({ timeframe, setup: setupResult.setup, setupScore: setupResult.setupScore, momentumScore: momentumResult.momentumScore, weaknessDetected: momentumResult.weaknessDetected, ltp, ema20, ema50, rsi, advancedEnabled }); 
    
    // TRADE PLAN 
    const tradePlan = generateTradePlan({ ltp, setup: setupResult.setup }); 
    
    // REASONS 
    const reasons = generateNewScanReasons({ verdict: verdictResult.verdict, setup: setupResult.setup, setupScore: setupResult.setupScore, momentumScore: momentumResult.momentumScore, momentumTrend: momentumResult.momentumTrend, participationTrend: momentumResult.participationTrend, relativeVolumeStatus: momentumResult.relativeVolumeStatus, weaknessDetected: momentumResult.weaknessDetected, ltp, ema20, ema50, rsi, advancedEnabled }); 
    
    return { stockName, mode: "new", timeframe, ...verdictResult, setup: setupResult.setup, setupScore: setupResult.setupScore, cbScore: setupResult.cbPercent, pcScore: setupResult.pcPercent, momentumScore: momentumResult.momentumScore, momentumTrend: momentumResult.momentumTrend, participationTrend: momentumResult.participationTrend, tradePlan, reasons }; 
} 

// ========================= 
// WATCHLIST 
// ========================= 
function analyzeWatchlistMode(data) { 
    // BUG FIX: Extract previousSetup to pass to the setup engine
    const { stockName, timeframe, ltp, ema20, ema50, rsi, previousSetup, previousTriggerLow, previousTriggerHigh, previousSL, previousTarget, advancedEnabled = false, candles = [] } = data; 
    
    // SETUP - Passing the locked setup to prevent "Setup Drift"
    const setupResult = calculateSetupScores({ ltp, ema20, ema50, rsi, timeframe, lockedSetup: previousSetup }); 
    
    // TRADE PLAN
    const lockedTradePlan = { triggerLow: previousTriggerLow, triggerHigh: previousTriggerHigh, stopLoss: previousSL, target: previousTarget }; 
    
    // MOMENTUM 
    let momentumResult = { readinessScore: 0, readinessStatus: "Not Available", triggerPressure: 0, volumeExpansion: "Not Available", weaknessDetected: false }; 
    if ( advancedEnabled && candles.length >= 5 ) { 
        momentumResult = calculateWatchlistMomentum({ candles, ltp, previousTriggerLow, previousTriggerHigh }); 
    } 
    
    // VERDICT 
    const verdictResult = analyzeWatchlist({ timeframe, setup: setupResult.setup, setupScore: setupResult.setupScore, momentumScore: momentumResult.readinessScore, weaknessDetected: momentumResult.weaknessDetected, ltp, ema20, ema50, rsi, previousTriggerLow, previousTriggerHigh, previousSL, advancedEnabled }); 
    
    // REASONS 
    const reasons = generateWatchlistReasons({ verdict: verdictResult.verdict, setup: setupResult.setup, setupScore: setupResult.setupScore, readinessScore: momentumResult.readinessScore, triggerPressure: momentumResult.triggerPressure, volumeExpansion: momentumResult.volumeExpansion, weaknessDetected: momentumResult.weaknessDetected, ltp, ema20, ema50, rsi, previousTriggerLow, previousTriggerHigh, previousSL, advancedEnabled }); 
    
    return { stockName, mode: "watchlist", timeframe, ...verdictResult, setup: setupResult.setup, setupScore: setupResult.setupScore, cbScore: setupResult.cbPercent, pcScore: setupResult.pcPercent, readinessScore: momentumResult.readinessScore, triggerPressure: momentumResult.triggerPressure, volumeExpansion: momentumResult.volumeExpansion, lockedTradePlan, reasons }; 
} 

// ========================= 
// ACTIVE TRADE 
// ========================= 
function analyzeActiveTrade(data) { 
    // BUG FIX: Extract previousSetup for reason generation
    const { previousSetup } = data;

    let momentumResult = { tradeMomentumScore: 0, momentumHealth: "Not Available", participationTrend: "Not Available", weaknessDetected: false, exhaustionDetected: false }; 
    
    if ( data.advancedEnabled && data.candles && data.candles.length >= 5 ) { 
        momentumResult = calculateTradeMomentum({ candles: data.candles }); 
    } 
    
    const tradeResult = manageActiveTrade({ ...data, momentumScore: momentumResult.tradeMomentumScore, weaknessDetected: momentumResult.weaknessDetected }); 
    
    const reasons = generateTradeReasons({ tradeVerdict: tradeResult.tradeVerdict, tradeHealth: tradeResult.tradeHealth, pnlPercent: tradeResult.pnlPercent, momentumHealth: momentumResult.momentumHealth, participationTrend: momentumResult.participationTrend, weaknessDetected: momentumResult.weaknessDetected, exhaustionDetected: momentumResult.exhaustionDetected, setup: previousSetup, ...data }); 
    
    return { ...tradeResult, ...momentumResult, setup: previousSetup, reasons }; 
}
