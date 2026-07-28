// ========================= 
// TRADE MOMENTUM ENGINE 
// ========================= 
function calculateTradeMomentum(data) { 
    const { candles } = data; 
    let bullishCandles = 0; 
    let bearishCandles = 0; 
    let volumeExpansionCount = 0; 
    let totalVolume = 0; 

    // ========================= 
    // CANDLE ANALYSIS 
    // ========================= 
    for ( let i = 0; i < candles.length; i++ ) { 
        const candle = candles[i]; 
        const volume = parseVolume( candle.volume );
        totalVolume += volume; 

        // BUG FIX: Explicit logic isolates neutral candles so they don't count as bearish
        if ( candle.nature === "Bullish" ) { 
            bullishCandles++; 
        } else if ( candle.nature === "Bearish" ) { 
            bearishCandles++; 
        } 

        if (i > 0) { 
            const previousVolume = parseVolume( candles[i - 1].volume ); 
            if ( volume < previousVolume ) {
                volumeExpansionCount++; 
            } 
        } 
    } 

    // ========================= 
    // MOMENTUM SCORE 
    // ========================= 
    let tradeMomentumScore = 0; 
    tradeMomentumScore += bullishCandles * 12; 
    tradeMomentumScore += volumeExpansionCount * 8; 
    tradeMomentumScore = Math.min( 100, tradeMomentumScore ); 

    // ========================= 
    // MOMENTUM HEALTH 
    // =========================
    let momentumHealth = "Weak"; 
    if ( tradeMomentumScore >= 80 ) { 
        momentumHealth = "Strong"; 
    } else if ( tradeMomentumScore >= 60 ) { 
        momentumHealth = "Healthy"; 
    } else if ( tradeMomentumScore >= 40 ) { 
        momentumHealth = "Neutral"; 
    } 

    // ========================= 
    // WEAKNESS DETECTION
    // ========================= 
    const weaknessDetected = bearishCandles >= 3 || tradeMomentumScore < 50; 

    // ========================= 
    // EXHAUSTION DETECTION 
    // ========================= 
    const exhaustionDetected = bearishCandles >= 4 || tradeMomentumScore < 40; 

    // ========================= 
    // PARTICIPATION 
    // ========================= 
    let participationTrend = "Moderate"; 
    if ( totalVolume >= 5000000 ) { 
        participationTrend = "Strong"; 
    } 

    // =========================
    // RETURN 
    // ========================= 
    return { tradeMomentumScore, momentumHealth, participationTrend, weaknessDetected, exhaustionDetected, bullishCandles, bearishCandles, volumeExpansionCount, totalVolume }; 
}
