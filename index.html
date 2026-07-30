<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TradeScan AI v3.0</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <header class="top-header">
            <div class="brand-section">
                <h1>TradeScan AI <span style="font-size: 18px; color: #3b82f6;">v3.0</span></h1>
                <p>Professional Multi-Timeframe Trading Assistant</p>
            </div>
            <div class="header-actions">
                <div class="timestamp-box">
                    <span style="font-size: 10px; color: #94a3b8;">Current Time</span>
                    <span id="dateTime"></span>
                </div>
                <button class="help-btn">?</button>
            </div>
        </header>

        <div class="card">
            <div class="mode-selector">
                <button class="mode-btn active-mode" data-mode="new">New Scan</button>
                <button class="mode-btn" data-mode="watchlist">Watchlist Follow-Up</button>
                <button class="mode-btn" data-mode="active">Active Trade Follow-Up</button>
            </div>
        </div>

        <div class="mode-banner">
            <h2 id="modeTitle">New Scan</h2>
            <p id="modeDescription">Scan a stock and evaluate whether it deserves watchlist consideration.</p>
        </div>

        <div class="card">
            <div class="section-header">
                <h3>Core Technical Inputs</h3>
                <p>Enter the base metrics for setup evaluation.</p>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>Stock Name / Ticker</label>
                    <input type="text" id="stockName" placeholder="e.g., RELIANCE">
                </div>
                <div class="input-group">
                    <label>Timeframe</label>
                    <select id="timeframe">
                        <option value="Daily">Daily</option>
                        <option value="15 Min">15 Min</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>LTP (Last Traded Price)</label>
                    <input type="number" id="ltp" step="0.01">
                </div>
                <div class="input-group">
                    <label>EMA 20</label>
                    <input type="number" id="ema20" step="0.01">
                </div>
                <div class="input-group">
                    <label>EMA 50</label>
                    <input type="number" id="ema50" step="0.01">
                </div>
                <div class="input-group">
                    <label>RSI (14)</label>
                    <input type="number" id="rsi" step="0.01">
                </div>
            </div>
        </div>

        <div id="watchlistSection" class="card hidden">
            <div class="section-header">
                <h3>Watchlist Parameters</h3>
                <p>Enter the original trade plan metrics generated during the EOD scan.</p>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>Original Setup</label>
                    <select id="previousSetupWatchlist">
                        <option value="CB">Continuation Breakout (CB)</option>
                        <option value="PC">Pullback Continuation (PC)</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Previous Trigger Low</label>
                    <input type="number" id="previousTriggerLow" step="0.01">
                </div>
                <div class="input-group">
                    <label>Previous Trigger High</label>
                    <input type="number" id="previousTriggerHigh" step="0.01">
                </div>
                <div class="input-group">
                    <label>Previous Stop Loss</label>
                    <input type="number" id="previousSL" step="0.01">
                </div>
                <div class="input-group">
                    <label>Previous Target</label>
                    <input type="number" id="previousTarget" step="0.01">
                </div>
            </div>
        </div>

        <div id="activeTradeSection" class="card hidden">
            <div class="section-header">
                <h3>Active Trade Parameters</h3>
                <p>Enter your open position details.</p>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>Original Setup</label>
                    <select id="previousSetupActive">
                        <option value="CB">Continuation Breakout (CB)</option>
                        <option value="PC">Pullback Continuation (PC)</option>
                    </select>
                </div>
                <div class="input-group">
                    <label>Executed Entry Price</label>
                    <input type="number" id="executedEntry" step="0.01">
                </div>
                <div class="input-group">
                    <label>Current Stop Loss</label>
                    <input type="number" id="currentSL" step="0.01">
                </div>
                <div class="input-group">
                    <label>Current Target</label>
                    <input type="number" id="currentTarget" step="0.01">
                </div>
                <div class="input-group">
                    <label>Quantity</label>
                    <input type="number" id="quantity">
                </div>
            </div>
        </div>

        <div class="card">
            <div class="advanced-top">
                <div>
                    <h3>Advanced Momentum Analysis</h3>
                    <p>Enable to evaluate the last 5 candles for strength and volume expansion.</p>
                </div>
                <label class="switch">
                    <input type="checkbox" id="advancedToggle">
                    <span class="slider"></span>
                </label>
            </div>

            <div id="momentumSection" class="hidden">
                <div id="candlesContainer"></div>
            </div>
        </div>

        <div class="action-section">
            <button id="analyzeBtn" class="primary-btn">Run Analysis</button>
            <button id="resetBtn" class="secondary-btn">Reset All</button>
        </div>

        <div id="resultsContainer"></div>

        <div id="positionSizeCard" class="card hidden">
            <div class="section-header">
                <h3>Position Size Calculator</h3>
                <p>Determine exact sizing based on your risk rules.</p>
            </div>
            <div class="input-grid">
                <div class="input-group">
                    <label>Actual Entry Price (₹)</label>
                    <input type="number" id="entryPriceInput" placeholder="Enter filled price" step="0.01">
                </div>
                <div class="input-group">
                    <label>Trading Capital (₹)</label>
                    <input type="number" id="capitalInput" placeholder="50000">
                </div>
                <div class="input-group">
                    <label>Max Risk (%)</label>
                    <input type="number" id="riskPercentInput" value="1" step="0.1">
                </div>
            </div>
            <button id="calculatePositionBtn" class="primary-btn" style="margin-top: 20px;">Calculate Position Size</button>
            <div id="positionResult"></div>
        </div>

        <footer>
            <p>&copy; 2026 TradeScan AI V3. All Rights Reserved. Use deterministically.</p>
        </footer>
    </div>

    <script src="utils/validationUtils.js"></script>
    <script src="utils/volumeParser.js"></script>
    <script src="engines/setupEngine.js"></script>
    <script src="engines/momentumNewScan.js"></script>
    <script src="engines/momentumWatchlist.js"></script>
    <script src="engines/momentumTrade.js"></script>
    <script src="engines/newScanEngine.js"></script>
    <script src="engines/watchlistEngine.js"></script>
    <script src="engines/tradeManagementEngine.js"></script>
    <script src="engines/tradePlanEngine.js"></script>
    <script src="engines/reasoningNewScan.js"></script>
    <script src="engines/reasoningWatchlist.js"></script>
    <script src="engines/reasoningTrade.js"></script>
    <script src="engines/positionSizeEngine.js"></script>
    <script src="engines/analysisEngine.js"></script>
    <script src="script.js"></script>
</body>
</html>
