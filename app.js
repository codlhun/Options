const fetchOptionsData = async (symbol) => {
    const apiKey = "UZFB4jqfuaDsDFKfwN4PCokemAXBwqLM"; // Your Polygon.io API key

    try {
        // Fetch options snapshot data for the symbol
        const response = await fetch(`https://api.polygon.io/v3/snapshot/options/${symbol}?apiKey=${apiKey}`);
        const data = await response.json();
        
        if (data.results) {
            processOptionsData(data.results, symbol);
        } else {
            console.log(`No options data found for ${symbol}`);
        }
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
    }
};

const processOptionsData = (data, symbol) => {
    const alertsDiv = document.getElementById("alerts");
    
    // Add a header for the symbol if data is available
    const symbolHeader = document.createElement("h2");
    symbolHeader.textContent = `Alerts for ${symbol}`;
    alertsDiv.appendChild(symbolHeader);

    data.forEach(option => {
        if (isHighProbability(option)) {
            const alert = document.createElement("div");
            alert.textContent = `${symbol} - Target: ${option.target} | Stop Loss: ${option.stop}`;
            alertsDiv.appendChild(alert);
        }
    });
};

const isHighProbability = (option) => {
    // Define high-probability criteria, for example, delta > 0.5 and high open interest
    return option.greeks.delta > 0.5 && option.open_interest > 100; // Adjust criteria as needed
};

// Fetch data for both SPY and QQQ at intervals
setInterval(() => {
    document.getElementById("alerts").innerHTML = ""; // Clear previous alerts
    fetchOptionsData("SPY");
    fetchOptionsData("QQQ");
}, 60000); // Refresh every minute
