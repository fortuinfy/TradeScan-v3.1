// utils/validationUtils.js 
// ========================= // SAFE NUMBER // ========================= 
function safeNumber(value) { 
    const num = parseFloat(value); 
    if ( isNaN(num) || !isFinite(num) ) { return 0; } 
    return num; 
} 

// ========================= // BASIC INPUT VALIDATION // ========================= 
function validateBasicInputs(data) { 
    const { stockName, ltp, ema20, ema50, rsi } = data; 
    if ( !stockName || stockName.trim() === "" ) { 
        return { valid: false, message: "Stock Name is required." }; 
    } 
    if ( safeNumber(ltp) <= 0 || safeNumber(ema20) <= 0 || safeNumber(ema50) <= 0 || safeNumber(rsi) <= 0 ) { 
        return { valid: false, message: "Please enter valid market data." }; 
    } 
    return { valid: true, message: "Inputs Valid" }; 
} 

// ========================= // WATCHLIST VALIDATION // ========================= 
function validateWatchlistInputs(data) { 
    const { previousTriggerLow, previousTriggerHigh, previousSL, previousTarget } = data; 
    
    if ( safeNumber(previousTriggerLow) <= 0 || safeNumber(previousTriggerHigh) <= 0 || safeNumber(previousSL) <= 0 || safeNumber(previousTarget) <= 0 ) { 
        return { valid: false, message: "Previous Trigger Zone, Stop Loss, and Target are all required." }; 
    } 
    if ( safeNumber(previousTriggerHigh) <= safeNumber(previousTriggerLow) ) { 
        return { valid: false, message: "Trigger High must be greater than Trigger Low." }; 
    } 
    return { valid: true, message: "Watchlist Inputs Valid" }; 
} 

// ========================= // ACTIVE TRADE VALIDATION // ========================= 
function validateActiveTradeInputs(data) { 
    const { ltp, executedEntry, currentSL, currentTarget, quantity } = data; 
    
    if ( safeNumber(ltp) <= 0 || safeNumber(executedEntry) <= 0 || safeNumber(currentSL) <= 0 || safeNumber(currentTarget) <= 0 || safeNumber(quantity) <= 0 ) { 
        return { valid: false, message: "Please complete all active trade inputs." }; 
    } 
    return { valid: true, message: "Active Trade Inputs Valid" }; 
} 

// ========================= // ADVANCED CANDLE VALIDATION // ========================= 
function validateCandleInputs(candles) { 
    if ( !candles || !Array.isArray(candles) ) { 
        return { valid: false, message: "Candles missing." }; 
    } 
    let validCandles = 0; 
    candles.forEach(candle => { 
        if ( safeNumber(candle.close) > 0 && parseVolume(candle.volume) > 0 ) { 
            validCandles++; 
        } 
    }); 
    return { 
        valid: validCandles >= 5, 
        message: validCandles >= 5 ? "Candles Valid" : "Please fill all 5 candles correctly." 
    }; 
}
