// ========================= 
// NEW SCAN ENGINE // 
// ========================= 
function analyzeNewScan(data) { 
    const { timeframe, setup, setupScore, momentumScore = 0, weaknessDetected = false, ltp, ema20, ema50, rsi, advancedEnabled = false } = data; 
    
    // ========================= 
    // CONDITIONS 
    // ========================= 
    const strongTrend = ltp > ema20 && ema20 > ema50; 
    const healthyRSI = rsi >= 55 && rsi <= 75; 
    
    // ========================= 
    // DEFAULTS 
    // ========================= 
    let verdict = "WATCH"; 
    let confidence = 65; 
    let setupGrade = "B"; 
    let riskLevel = "MEDIUM"; 
    let workflowAction = "Continue Watchlist"; 
    const badges = []; 
    
    // ========================= 
    // BADGES 
    // ========================= 
    if (strongTrend) { badges.push( "Strong Trend" ); } 
    if (healthyRSI) { badges.push( "Healthy RSI" ); } 
    if ( advancedEnabled && momentumScore >= 80 ) { badges.push( "Momentum Expansion" ); } 
    
    // ========================= 
    // AVOID 
    // ========================= 
    // BUG FIX: Strict check for weakness or low momentum overriding the setup
    if ( setupScore < 60 || ltp < ema20 || ema20 < ema50 || rsi < 45 || (advancedEnabled && weaknessDetected) || (advancedEnabled && momentumScore < 50) ) { 
        verdict = "AVOID"; 
        confidence = 25; 
        setupGrade = "D"; 
        riskLevel = "HIGH"; 
    } 
    // ========================= 
    // BUY 
    // ========================= 
    // BUG FIX: Requires momentum >= 60 if advanced momentum is turned on
    else if ( setupScore >= 80 && strongTrend && rsi >= 50 && (!advancedEnabled || momentumScore >= 60) ) { 
        verdict = "BUY"; 
        confidence = setupScore >= 90 ? 90 : 85; 
        setupGrade = setupScore >= 90 ? "A+" : "A"; 
        riskLevel = "LOW"; 
    } 
    // ========================= 
    // WATCH 
    // ========================= 
    else { 
        verdict = "WATCH"; 
        confidence = 65; 
        setupGrade = setupScore >= 70 ? "B" : "C"; 
        riskLevel = "MEDIUM"; 
    } 
    
    // ========================= 
    // ADVANCED MOMENTUM BOOST 
    // ========================= 
    if ( advancedEnabled && momentumScore >= 80 && verdict === "BUY" ) { 
        confidence = Math.min( 95, confidence + 5 ); 
        badges.push( "High Conviction" ); 
    } 
    
    // ========================= 
    // WORKFLOW ACTION 
    // ========================= 
    if ( timeframe === "Daily" ) { 
        if ( verdict === "BUY" ) { workflowAction = "Add To Watchlist"; } 
        else if ( verdict === "WATCH" ) { workflowAction = "Continue Watchlist"; } 
        else { workflowAction = "Ignore"; } 
    } 
    // ========================= 
    // EXECUTION TIMEFRAME 
    // ========================= 
    else if ( timeframe === "15 Min" ) { 
        if ( verdict === "BUY" ) { workflowAction = "Ready For Execution"; } 
        else if ( verdict === "WATCH" ) { workflowAction = "Continue Watchlist"; } 
        else { workflowAction = "Ignore"; } 
    } 
    
    return { verdict, confidence, setupGrade, riskLevel, workflowAction, badges }; 
}
