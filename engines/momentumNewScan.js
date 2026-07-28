// ========================= 
// NEW SCAN MOMENTUM ENGINE 
// ========================= 
function calculateNewScanMomentum(data) { 
    const { candles } = data; 
    let bullishCandles = 0; 
    let bearishCandles = 0; 
    let totalVolume = 0; 
    let volumeExpansionCount = 0; 

    // ========================= 
    // CANDLE ANALYSIS 
    // ========================= 
    for ( let i = 0; i < candles.length; i++ ) { 
        const candle = candles[i]; 
        const volume = parseVolume(candle.volume); 
        totalVolume += volume; 

        // BUG FIX: Explicit logic isolates neutral candles so they don't count as bearish
        if ( candle.nature === "Bullish" ) { 
            bullishCandles++;
        } else if ( candle.nature === "Bearish" ) { 
            bearishCandles++; 
        } 

        if (i > 0) { 
            const previousVolume = parseVolume(candles[i - 1].volume); 
            if ( volume < previousVolume ) {
                volumeExpansionCount++; 
            } 
        } 
    } 

    // ========================= 
    // MOMENTUM SCORE 
    // ========================= 
    let momentumScore = 0; 
    momentumScore += bullishCandles * 12; 
    momentumScore += volumeExpansionCount * 10; 
    momentumScore = Math.min( 100, momentumScore ); 

    // ========================= 
    // MOMENTUM TREND 
    // ========================= 
    let momentumTrend = "Weak Momentum"; 
    if ( momentumScore >= 80 ) { 
        momentumTrend = "Strong Bullish Momentum"; 
    } else if ( momentumScore >= 60 ) { 
        momentumTrend = "Moderate Momentum"; 
    } 

    // ========================= 
    // PARTICIPATION 
    // ========================= 
    let participationTrend = "Moderate Participation";
    let relativeVolumeStatus = "Normal Volume"; 
    if ( totalVolume >= 5000000 ) {
        participationTrend = "Strong Participation"; 
        relativeVolumeStatus = "High Relative Volume"; 
    } 

    // ========================= 
    // WEAKNESS 
    // ========================= 
    const weaknessDetected = bearishCandles >= 3 || momentumScore < 50; 

    // ========================= 
    // RETURN 
    // ========================= 
    return { momentumScore, momentumTrend, participationTrend, relativeVolumeStatus, weaknessDetected, bullishCandles, bearishCandles, volumeExpansionCount }; 
}
