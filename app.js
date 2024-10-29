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
    
    // Temporary sample data for testing layout
    const sampleOption = { target: '450', stop: '440' };
    const symbolHeader = document.createElement("h2");
    symbolHeader.textContent = `Alerts for ${symbol}`;
    alertsDiv.appendChild(symbolHeader);

    const alert = document.createElement("div");
    alert.textContent = `${symbol} - Target: ${sampleOption.target} | Stop Loss: ${sampleOption.stop}`;
    alertsDiv.appendChild(alert);
};
