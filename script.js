// ========================= 
// TRADESCAN V3.1 
// PHASE 1 INITIALIZATION 
// ========================= 
let currentMode = "new";

// ========================= 
// DOM SAFE EXTRACTORS (CRASH PREVENTION)
// ========================= 
function safeGetValue(ids, defaultVal = "") {
    if (!Array.isArray(ids)) ids = [ids];
    for (let id of ids) {
        const el = document.getElementById(id);
        if (el && el.value !== undefined && el.value !== "") return el.value;
    }
    return defaultVal;
}

function safeGetNumber(ids) {
    if (!Array.isArray(ids)) ids = [ids];
    for (let id of ids) {
        const el = document.getElementById(id);
        if (el && el.value !== "") {
            const num = parseFloat(el.value);
            if (!isNaN(num) && isFinite(num)) return num;
        }
    }
    return 0;
}

// ========================= 
// CLOCK 
// ========================= 
function updateDateTime() { 
    const now = new Date(); 
    const dtEl = document.getElementById("dateTime");
    if (dtEl) dtEl.innerText = now.toLocaleString("en-IN");
} 
setInterval(updateDateTime, 1000); 
updateDateTime(); 
 
// ========================= 
// MODE SELECTOR (FRESH START MECHANIC)
// ========================= 
const modeButtons = document.querySelectorAll(".mode-btn"); 
modeButtons.forEach(btn => { 
   btn.addEventListener("click", () => { 
       modeButtons.forEach(b => b.classList.remove("active-mode"));
       btn.classList.add("active-mode"); 
       currentMode = btn.dataset.mode;
       resetApplication(); 
    }); 
});
 
// ========================= 
// MODE UI 
// ========================= 
function updateModeUI() { 
    const title = document.getElementById("modeTitle"); 
    const description = document.getElementById("modeDescription"); 
    const watchlistSection = document.getElementById("watchlistSection"); 
    const activeTradeSection = document.getElementById("activeTradeSection"); 
    
    if (watchlistSection) watchlistSection.classList.add("hidden");
    if (activeTradeSection) activeTradeSection.classList.add("hidden");
 
    if (currentMode === "new") { 
       if (title) title.innerText = "New Scan";
       if (description) description.innerText = "Scan a stock and evaluate whether it deserves watchlist consideration.";
    } 
    if (currentMode === "watchlist") { 
       if (title) title.innerText = "Watchlist Follow-Up";
       if (description) description.innerText = "Monitor previously shortlisted opportunities.";
       if (watchlistSection) watchlistSection.classList.remove("hidden");
    } 
    if (currentMode === "active") {
       if (title) title.innerText = "Active Trade Follow-Up"; 
       if (description) description.innerText = "Manage existing open positions."; 
       if (activeTradeSection) activeTradeSection.classList.remove("hidden"); 
    } 
} 
 
// ========================= 
// ADVANCED MOMENTUM (CLEAN SLATE MECHANIC)
// ========================= 
const advancedToggle = document.getElementById("advancedToggle");
if (advancedToggle) {
    advancedToggle.addEventListener("change", () => { 
        const momSec = document.getElementById("momentumSection");
        if (momSec) momSec.classList.toggle("hidden", !advancedToggle.checked); 
        buildMomentumInputs();
    }); 
}
 
// =========================
// CANDLE INPUT BUILDER (UPDATED UI)
// ========================= 
function buildMomentumInputs() { 
    const container = document.getElementById("candlesContainer"); 
    if (!container) return;
    container.innerHTML = "";
    
    for (let i = 1; i <= 5; i++) {
       container.innerHTML += `
        <div class="candle-block">
           <h3>Candle ${i}</h3>
            <div class="input-grid">
               <div class="input-group">
                  <label>Close Price</label>
                   <input type="number" id="close${i}" step="0.01">
               </div>
               <div class="input-group">
                   <label>Nature</label>
                   <select id="nature${i}">
                       <option value="Bullish">Bullish</option>
                       <option value="Neutral">Neutral</option>
                       <option value="Bearish">Bearish</option>
                   </select>
               </div>
              <div class="input-group">
                   <label>Volume</label>
                   <div style="display: flex; gap: 8px;">
                       <input type="number" id="volume${i}" placeholder="1.5" step="0.01" style="width: 60%;">
                        <select id="volumeMulti${i}" style="width: 40%;">
                           <option value="">-</option>
                           <option value="K">K</option>
                           <option value="L">L</option>
                            <option value="M">M</option>
                           <option value="Cr">Cr</option>
                           <option value="B">B</option>
                           <option value="T">T</option>
                       </select>
                   </div>
               </div>
           </div>
        </div>`;
    }
}
 
// ========================= 
// ANALYZE BUTTON EXECUTION 
// ========================= 
const analyzeBtn = document.getElementById("analyzeBtn");
if (analyzeBtn) analyzeBtn.addEventListener("click", runAnalysis); 
 
function runAnalysis() { 
    try {
        // ========================= 
        // SAFE GATHER CORE INPUTS 
        // ========================= 
        const stockName = safeGetValue("stockName").trim(); 
        const timeframe = safeGetValue("timeframe", "Daily"); 
        const ltp = safeGetNumber("ltp");
        const ema20 = safeGetNumber("ema20"); 
        const ema50 = safeGetNumber("ema50");
        const rsi = safeGetNumber("rsi"); 
        
        const advancedToggleEl = document.getElementById("advancedToggle");
        const advancedEnabled = advancedToggleEl ? advancedToggleEl.checked : false;
        
        // ========================= 
        // BASIC VALIDATION 
        // ========================= 
        if (typeof validateBasicInputs === "function") {
            const validation = validateBasicInputs({ stockName, ltp, ema20, ema50, rsi });
            if (!validation.valid) { 
               alert(validation.message); 
                return; 
            } 
        }
     
        // ========================= 
        // MOMENTUM DATA 
        // =========================
        let candles = []; 
        if (advancedEnabled) { 
            candles = collectCandles(); 
            if (typeof validateCandleInputs === "function") {
                const candleValidation = validateCandleInputs(candles);
                if (!candleValidation.valid) { 
                   alert(candleValidation.message); 
                    return; 
                } 
            }
        } 
     
        // ========================= 
        // ROUTING 
        // ========================= 
        let result = null;
     
        // ===================== 
        // NEW SCAN 
        // ===================== 
        if (currentMode === "new") { 
            result = analyzeNewScanMode({ stockName, timeframe, ltp, ema20, ema50, rsi, advancedEnabled, candles }); 
        } 
        // ===================== 
        // WATCHLIST 
        // ===================== 
        else if (currentMode === "watchlist") { 
            const previousSetupWatchlist = safeGetValue(["previousSetupWatchlist", "previousSetup", "setupWatchlist"], "CB");
            const previousTriggerLow = safeGetNumber(["previousTriggerLow", "triggerLow", "wlTriggerLow"]);
            const previousTriggerHigh = safeGetNumber(["previousTriggerHigh", "triggerHigh", "wlTriggerHigh"]);
            const previousSL = safeGetNumber(["previousSL", "stopLoss", "wlStopLoss"]);
            const previousTarget = safeGetNumber(["previousTarget", "target", "wlTarget"]);
            
            // EXPLICIT CHECK added to bypass missing file errors
            if (typeof validateWatchlistInputs === "function") {
                const wlVal = validateWatchlistInputs({ previousTriggerLow, previousTriggerHigh, previousSL, previousTarget });
                if (!wlVal.valid) {
                    alert(wlVal.message);
                    return;
                }
            } else {
                if (previousTriggerLow <= 0 || previousTriggerHigh <= 0 || previousSL <= 0 || previousTarget <= 0) {
                    alert("Please enter all Watchlist Plan inputs (Trigger Zone, SL, and Target).");
                    return;
                }
            }
            
            result = analyzeWatchlistMode({ stockName, timeframe, ltp, ema20, ema50, rsi, previousSetup: previousSetupWatchlist, previousTriggerLow, previousTriggerHigh, previousSL, previousTarget, advancedEnabled, candles }); 
        } 
        // ===================== 
        // ACTIVE TRADE 
        // =====================
        else if (currentMode === "active") { 
            const previousSetupActive = safeGetValue(["previousSetupActive", "previousSetup", "activeSetup"], "CB");
            const executedEntry = safeGetNumber(["executedEntry", "entryPrice"]);
            const currentSL = safeGetNumber(["currentSL", "activeSL"]);
            const currentTarget = safeGetNumber(["currentTarget", "activeTarget"]);
            const quantity = safeGetNumber(["quantity", "positionSize", "tradeQuantity"]); 
            
            if (typeof validateActiveTradeInputs === "function") {
                const activeValidation = validateActiveTradeInputs({ ltp, executedEntry, currentSL, currentTarget, quantity }); 
                if (!activeValidation.valid) { 
                   alert(activeValidation.message); 
                    return; 
                } 
            } else {
                if (executedEntry <= 0 || currentSL <= 0 || currentTarget <= 0) {
                    alert("Please complete all active trade inputs.");
                    return;
                }
            }
            
            result = analyzeActiveTrade({ stockName, timeframe, ltp, ema20, ema50, rsi, previousSetup: previousSetupActive, executedEntry, currentSL, currentTarget, quantity, advancedEnabled, candles });
        } 
     
        // ========================= 
        // DISPLAY 
        // ========================= 
        if (result) {
           result.stockName = stockName !== "" ? stockName : "Unknown Asset";
           result.timeframe = timeframe;
           result.timestamp = new Date().toLocaleString("en-IN");
            
           window.lastAnalysisResult = result;
           renderResults(result); 
            
           const screenshotContainer = document.getElementById('screenshotContainer');
           if (screenshotContainer) screenshotContainer.classList.remove('hidden');
        }

    } catch (error) {
        alert("Engine Error: " + error.message + "\n\nThis usually happens if an old script line is left over or a file isn't linked correctly. (But we caught it safely!)");
        console.error("TradeScan AI Execution Error: ", error);
    }
} 
 
// ========================= 
// COLLECT CANDLES (MERGE DATA)
// =========================
function collectCandles() { 
    const candles = []; 
    for (let i = 1; i <= 5; i++) {
        const volNum = safeGetValue(`volume${i}`).trim();
        const volMulti = safeGetValue(`volumeMulti${i}`);
        const finalVolume = volNum ? volNum + volMulti : "";
 
        candles.push({
            close: safeGetNumber(`close${i}`), 
            nature: safeGetValue(`nature${i}`, "Neutral"), 
            volume: finalVolume 
        });
    } 
    return candles; 
} 
 
// =========================
// RESULT RENDERER
// ========================= 
function renderResults(result) {
    const container = document.getElementById("resultsContainer");
    if (!container) return;
    container.innerHTML = "";
 
    // MASTER 0: ANALYSIS OVERVIEW
    container.innerHTML += `
    <div class="card">
        <div class="card-header"><h3>Analysis Overview</h3></div>
        <div class="sub-card-grid">
            <div class="sub-card">
               <h4>Asset</h4>
               <p>${result.stockName}</p>
           </div>
            <div class="sub-card">
               <h4>Timeframe</h4>
               <p>${result.timeframe}</p>
            </div>
            <div class="sub-card">
               <h4>Time Evaluated</h4>
                <p style="font-size: 15px;">${result.timestamp}</p>
           </div>
        </div>
    </div>`;
 
    // ACTIVE TRADE DISPLAY
    if (currentMode === "active") {
       container.innerHTML += `
        <div class="card">
            <div class="card-header"><h3>Active Trade Verdict</h3></div>
            <div class="sub-card-grid">
                <div class="sub-card">
                   <h4>Verdict</h4>
                   <p class="${result.tradeVerdict.replace(/\s+/g, '-').toLowerCase()}">${result.tradeVerdict}</p>
               </div>
               <div class="sub-card">
                   <h4>Priority Level</h4>
                   <p>${result.priority}</p>
               </div>
               <div class="sub-card">
                   <h4>Trade Health</h4>
                   <p>${result.tradeHealth}</p>
                </div>
           </div>
        </div>`;
 
       container.innerHTML += `
        <div class="card">
            <div class="card-header"><h3>Trade Metrics</h3></div>
            <div class="sub-card-grid">
               <div class="sub-card">
                    <h4>Current PNL</h4>
                   <p>${result.pnlPercent.toFixed(2)}%</p>
               </div>
               <div class="sub-card">
                   <h4>Suggested SL</h4>
                   <p>₹${result.suggestedSL}</p>
                </div>
               <div class="sub-card">
                   <h4>Target</h4>
                   <p>₹${result.suggestedTarget}</p>
               </div>
           </div>
        </div>`;
 
        if (result.tradeMomentumScore !== undefined) { 
           container.innerHTML += `
            <div class="card">
               <div class="card-header"><h3>Momentum Analysis</h3></div>
               <div class="sub-card-grid">
                    <div class="sub-card">
                       <h4>Momentum Score</h4>
                       <p>${result.tradeMomentumScore}</p>
                   </div>
                   <div class="sub-card">
                       <h4>Momentum Health</h4>
                       <p>${result.momentumHealth}</p>
                   </div>
                   <div class="sub-card">
                       <h4>Participation</h4>
                       <p>${result.participationTrend}</p>
                   </div>
               </div>
           </div>`;
        }
 
        // PARTIAL EXIT PLAN CARD
        if (result.partialExitPlan) {
           container.innerHTML += `
            <div class="card" style="border-left: 4px solid #f59e0b;">
               <div class="card-header"><h3 style="color: #f59e0b;">Partial Execution Plan</h3></div>
               <div class="sub-card-grid">
                   <div class="sub-card">
                       <h4>Action Required</h4>
                       <p style="color: #f59e0b; font-weight: bold;">${result.partialExitPlan.actionText}</p>
                   </div>
                   <div class="sub-card">
                        <h4>Shares to Sell</h4>
                       <p>${result.partialExitPlan.exitQuantity} shares @ ₹${result.partialExitPlan.exitPrice}</p>
                   </div>
                   <div class="sub-card">
                       <h4>Realized P&L</h4>
                       <p class="${result.partialExitPlan.realizedPnL >= 0 ? 'bullish' : 'bearish'}">
                           ₹${result.partialExitPlan.realizedPnL > 0 ? '+' : ''}${result.partialExitPlan.realizedPnL}
                       </p>
                  </div>
               </div>
           </div>`;
        }
        
       renderReasons(result.reasons, result.badges); 
       hidePositionSize(); 
        return; 
    } 
 
    // NEW SCAN / WATCHLIST DISPLAY
   container.innerHTML += `
    <div class="card">
        <div class="card-header"><h3>Final Verdict</h3></div>
        <div class="sub-card-grid">
            <div class="sub-card">
               <h4>Verdict</h4>
                <p class="${result.verdict.toLowerCase()}">${result.verdict}</p>
               <span class="workflow-badge">${result.workflowAction}</span>
           </div>
            <div class="sub-card">
                <h4>Confidence</h4>
               <p>${result.confidence}%</p>
           </div>
            <div class="sub-card">
               <h4>Setup Grade</h4>
               <p>${result.setupGrade}</p>
           </div>
        </div>
    </div>`;
 
    container.innerHTML += `
    <div class="card">
        <div class="card-header"><h3>Setup Analysis</h3></div>
        <div class="sub-card-grid">
            <div class="sub-card">
               <h4>Setup</h4>
               <p>${result.setup}</p>
           </div>
            <div class="sub-card">
               <h4>Setup Score</h4>
               <p>${result.setupScore}</p>
           </div>
            <div class="sub-card">
               <h4>Risk Level</h4>
               <p>${result.riskLevel}</p>
           </div>
        </div>
    </div>`;
 
    if (result.cbScore !== undefined) { 
       container.innerHTML += `
        <div class="card">
            <div class="card-header"><h3>Setup Scores</h3></div>
            <div class="sub-card-grid">
               <div class="sub-card">
                   <h4>CB Score</h4>
                   <p>${result.cbScore}%</p>
               </div>
               <div class="sub-card">
                   <h4>PC Score</h4>
                   <p>${result.pcScore}%</p>
               </div>
               <div class="sub-card">
                   <h4>Dominant Setup</h4>
                   <p>${result.setup}</p>
               </div>
           </div>
        </div>`;
    }
 
    if (currentMode === "new" && result.momentumScore !== undefined && result.verdict !== "AVOID") {
       container.innerHTML += `
        <div class="card">
            <div class="card-header"><h3>Momentum Analysis</h3></div>
            <div class="sub-card-grid">
               <div class="sub-card">
                   <h4>Momentum Score</h4>
                   <p>${result.momentumScore}</p>
               </div>
               <div class="sub-card">
                   <h4>Trend Direction</h4>
                   <p>${result.momentumTrend || "N/A"}</p>
               </div>
               <div class="sub-card">
                   <h4>Participation</h4>
                   <p>${result.participationTrend || "N/A"}</p>
               </div>
            </div>
        </div>`;
    } else if (currentMode === "watchlist" && result.readinessScore !== undefined && result.verdict !== "REMOVE") {
       container.innerHTML += `
        <div class="card">
            <div class="card-header"><h3>Execution Readiness</h3></div>
            <div class="sub-card-grid">
               <div class="sub-card">
                   <h4>Readiness Score</h4>
                   <p>${result.readinessScore}</p>
               </div>
               <div class="sub-card">
                   <h4>Trigger Pressure</h4>
                   <p>${result.triggerPressure}</p>
               </div>
               <div class="sub-card">
                   <h4>Volume Expansion</h4>
                  <p>${result.volumeExpansion}</p>
               </div>
           </div>
        </div>`;
    }
 
    // DYNAMIC TRADE PLAN CARD
    const tp = currentMode === "watchlist" ? result.lockedTradePlan : result.tradePlan;
    const cardTitle = currentMode === "watchlist" ? "Original Trade Plan" : "Trade Plan";
 
    // Ensure all critical trade plan pieces exist before rendering
    if (tp && tp.triggerLow && result.verdict !== "AVOID" && result.verdict !== "REMOVE") {
       container.innerHTML += `
        <div class="card">
            <div class="card-header"><h3>${cardTitle}</h3></div>
            <div class="sub-card-grid">
               <div class="sub-card">
                   <h4>Entry Zone</h4>
                   <p>${tp.triggerLow} - ${tp.triggerHigh}</p>
               </div>
               <div class="sub-card">
                   <h4>Stop Loss</h4>
                   <p>${tp.stopLoss}</p>
               </div>
               <div class="sub-card">
                   <h4>Target</h4>
                    <p>${tp.target || "N/A"}</p>
               </div>
           </div>
        </div>`;
    }
 
   renderReasons(result.reasons, result.badges); 
   handlePositionSizeVisibility(result);
} 
 
// ========================= 
// REASONS CARD 
// ========================= 
function renderReasons(reasons, badges) { 
    const container = document.getElementById("resultsContainer");
    if (!container || !reasons || reasons.length === 0) return; 
    
    let html = `
    <div class="card reason-box">
        <div class="card-header"><h3>Analysis Reasons</h3></div>
    `;
    
    if (badges && badges.length > 0) {
        html += `<div class="badge-container">`;
       badges.forEach(badge => {
            html += `<span class="badge badge-blue">${badge}</span>`;
        });
        html += `</div>`;
    }
 
    html += `<ul>`;
   reasons.forEach(reason => { 
        html += `<li>${reason}</li>`; 
    }); 
    html += `</ul></div>`;
    
    container.innerHTML += html;
} 
 
// ========================= 
// POSITION SIZE VISIBILITY 
// =========================
function handlePositionSizeVisibility(result) { 
    const card = document.getElementById("positionSizeCard");
    if (!card) return;
    
    let showCard = false;
    if (currentMode === "new") showCard = (result.verdict === "BUY"); 
    if (currentMode === "watchlist") showCard = (result.verdict === "READY");
    
    if (showCard) card.classList.remove("hidden");
    else card.classList.add("hidden");
} 
 
function hidePositionSize() { 
   const card = document.getElementById("positionSizeCard");
   if (card) card.classList.add("hidden");
} 
 
// ========================= 
// POSITION SIZE BUTTON
// ========================= 
const calcPosBtn = document.getElementById("calculatePositionBtn");
if (calcPosBtn) calcPosBtn.addEventListener("click", calculatePosition);
 
function calculatePosition() { 
    const capital = safeGetNumber("capitalInput"); 
    const riskPercent = safeGetNumber("riskPercentInput"); 
    const entryPrice = safeGetNumber("entryPriceInput");
    
    const triggerHighElement = document.querySelector("#resultsContainer"); 
    if (!triggerHighElement) return;
    
    if (!window.lastAnalysisResult || (!window.lastAnalysisResult.tradePlan && !window.lastAnalysisResult.lockedTradePlan)) { 
       alert("Run analysis first.");
        return; 
    } 
 
    if (entryPrice <= 0) {
       alert("Please enter a valid Actual Entry Price.");
        return;
    }
    
    let stopLoss = 0;
    if (currentMode === "watchlist" && window.lastAnalysisResult.lockedTradePlan) {
        stopLoss = window.lastAnalysisResult.lockedTradePlan.stopLoss;
    } else if (currentMode === "new" && window.lastAnalysisResult.tradePlan) {
        stopLoss = window.lastAnalysisResult.tradePlan.stopLoss;
    } else {
       alert("Trade plan missing.");
        return;
    }
    
    if (typeof calculatePositionSize === "function") {
        const positionResult = calculatePositionSize({ 
            capital, riskPercent, entryPrice, stopLoss 
        }); 
        renderPositionResult(positionResult);
    }
} 
 
// ========================= 
// POSITION RESULT RENDERER
// ========================= 
function renderPositionResult(result) { 
    const container = document.getElementById("positionResult"); 
    if (!container) return;
    
   container.innerHTML = `
    <div class="sub-card-grid" style="margin-top: 24px;">
        <div class="sub-card">
          <h4>Suggested Quantity</h4>
           <p>${result.quantity}</p>
        </div>
        <div class="sub-card">
           <h4>Total Risk</h4>
           <p>₹${result.riskAmount}</p>
        </div>
        <div class="sub-card">
            <h4>Position Value</h4>
           <p>₹${result.positionValue}</p>
        </div>
    </div>
    `;
} 
 
// ========================= 
// APP RESET 
// =========================
const resetBtn = document.getElementById("resetBtn");
if (resetBtn) resetBtn.addEventListener("click", resetApplication); 
 
function resetApplication() { 
   document.querySelectorAll("input").forEach(input => { 
        if (input.type === "checkbox") input.checked = false; 
        else input.value = ""; 
    });
    
   document.querySelectorAll("select").forEach(select => { 
       select.selectedIndex = 0; 
    }); 
    
   const resContainer = document.getElementById("resultsContainer");
   if (resContainer) resContainer.innerHTML = ""; 
   
   const posResult = document.getElementById("positionResult");
   if (posResult) posResult.innerHTML = ""; 
   
    hidePositionSize();
    
   const momSec = document.getElementById("momentumSection");
   if (momSec) momSec.classList.add("hidden");
   
   buildMomentumInputs(); 
   updateModeUI(); 
   window.lastAnalysisResult = null;
 
    const screenshotContainer = document.getElementById('screenshotContainer');
    if (screenshotContainer) screenshotContainer.classList.add('hidden');
} 
 
// ========================= 
// INITIALIZE & SCREENSHOT
// =========================
window.lastAnalysisResult = null; 
updateModeUI(); 
buildMomentumInputs();
 
const scriptHtml2Canvas = document.createElement('script');
scriptHtml2Canvas.src = "https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js";
document.head.appendChild(scriptHtml2Canvas);
 
setTimeout(() => {
    const screenshotContainer = document.createElement('div');
   screenshotContainer.id = "screenshotContainer";
   screenshotContainer.classList.add("hidden");
   screenshotContainer.style.marginTop = "40px";
   screenshotContainer.style.paddingBottom = "40px";
    screenshotContainer.style.textAlign = "center";
   screenshotContainer.innerHTML = `
        <button id="screenshotBtn" style="background: linear-gradient(135deg, #10b981, #059669); width: 100%; max-width: 350px; margin: 0 auto; display: block; border-radius: 14px; padding: 16px 28px; font-weight: 700; color: white; cursor: pointer; border: none; font-size: 16px; box-shadow: 0 8px 20px rgba(16, 185, 129, 0.35); transition: 0.25s;">
            📸 Grab a Screenshot
       </button>
    `;
    
    const mainContainer = document.querySelector('.container');
    if (mainContainer) {
       mainContainer.appendChild(screenshotContainer);
    }
 
    const screenshotBtn = document.getElementById('screenshotBtn');
    if (screenshotBtn) {
       screenshotBtn.addEventListener('click', () => {
            const btnContainer = document.getElementById('screenshotContainer');
           btnContainer.classList.add('hidden'); 
            
           document.querySelectorAll('input').forEach(input => {
                if (input.type === 'checkbox' || input.type === 'radio') {
                    if (input.checked) input.setAttribute('checked', 'checked');
                   else input.removeAttribute('checked');
                } else {
                   input.setAttribute('value', input.value);
                }
            });
           document.querySelectorAll('select').forEach(select => {
                const options = Array.from(select.options);
               options.forEach(opt => {
                    if (opt.selected) opt.setAttribute('selected', 'selected');
                   else opt.removeAttribute('selected');
                });
            });
 
           setTimeout(() => {
               html2canvas(document.querySelector('.container'), {
                   backgroundColor: "#111827",
                   scale: window.devicePixelRatio || 2, 
                   useCORS: true
               }).then(canvas => {
                   const imgData = canvas.toDataURL('image/png');
                   const link = document.createElement('a');
                   link.download = `TradeScan-v3.1-Result-${new Date().getTime()}.png`;
                   link.href = imgData;
                   try {
                       link.click();
                    } catch (e) {
                       const win = window.open();
                       win.document.write('<img src="' + imgData + '" style="width:100%; height:auto;" />');
                    }
                   btnContainer.classList.remove('hidden'); 
               }).catch(err => {
                   console.error("Screenshot failed:", err);
                   btnContainer.classList.remove('hidden');
                });
            }, 150);
        });
    }
}, 500);
