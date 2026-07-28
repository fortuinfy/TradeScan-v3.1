// ========================= 
// WATCHLIST MOMENTUM ENGINE 
// ========================= 
function calculateWatchlistMomentum(data) { 
    const { candles, ltp, previousTriggerLow, previousTriggerHigh } = data; 
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
    // TRIGGER ANALYSIS 
    // ========================= 
    let triggerPressure = 0;
    if ( ltp >= previousTriggerLow ) { triggerPressure += 30; } 
    if ( ltp >= previousTriggerHigh ) { triggerPressure += 40; } 

    // ========================= 
    // READINESS SCORE 
    // ========================= 
    let readinessScore = 0;
    readinessScore += bullishCandles * 8; 
    readinessScore += volumeExpansionCount * 8; 
    readinessScore += triggerPressure; 
    readinessScore = Math.min( 100, readinessScore ); 

    // ========================= 
    // READINESS STATUS 
    // =========================
    let readinessStatus = "MONITOR"; 
    if ( readinessScore >= 80 ) { 
        readinessStatus = "READY"; 
    } else if ( readinessScore < 50 ) { 
        readinessStatus = "REMOVE"; 
    } 

    // ========================= 
    // VOLUME STATUS 
    // ========================= 
    let volumeExpansion = "Normal"; 
    if ( volumeExpansionCount >= 3 ) { 
        volumeExpansion = "Strong"; 
    } 

    // ========================= 
    // WEAKNESS 
    // ========================= 
    const weaknessDetected = bearishCandles >= 3 || readinessScore < 50; 

    // ========================= 
    // RETURN 
    // ========================= 
    return { readinessScore, readinessStatus, triggerPressure, volumeExpansion, weaknessDetected, bullishCandles, bearishCandles, volumeExpansionCount, totalVolume }; 
}
