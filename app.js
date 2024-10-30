const fetchOptionsData = async (symbol) => {
    const apiKey = "UZFB4jqfuaDsDFKfwN4PCokemAXBwqLM"; // Your API key

    try {
        // Fetch options snapshot data for the symbol
        const response = await fetch(`https://api.polygon.io/v3/snapshot/options/${symbol}?apiKey=${apiKey}`);
        const data = await response.json();
        
        console.log(`Data for ${symbol}:`, data); // Log data for debugging
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
    alertsDiv.innerHTML = ""; // Clear previous alerts

    // Add a header for the symbol if data is available
    const symbolHeader = document.createElement("h2");
    symbolHeader.textContent = `Alerts for ${symbol}`;
    alertsDiv.appendChild(symbolHeader);

    // Check if there are high-probability options and add alerts
    let alertsGenerated = false;
    data.forEach(option => {
        if (isHighProbability(option)) {
            const alert = document.createElement("div");
            alert.textContent = `${symbol} - Target: ${option.target || 'N/A'} | Stop Loss: ${option.stop || 'N/A'}`;
            alertsDiv.appendChild(alert);
            alertsGenerated = true;
        }
    });

    // Show message if no high-probability options are found
    if (!alertsGenerated) {
        const noAlertMessage = document.createElement("div");
        noAlertMessage.textContent = `No high-probability options found for ${symbol}`;
        alertsDiv.appendChild(noAlertMessage);
    }
};

const isHighProbability = (option) => {
    // Define high-probability criteria, for example, delta > 0.5 and high open interest
    return option.greeks && option.greeks.delta > 0.5 && option.open_interest > 100; // Adjust criteria as needed
};

// Fetch data for both SPY and QQQ at intervals
setInterval(() => {
    document.getElementById("alerts").innerHTML = ""; // Clear previous alerts
    fetchOptionsData("SPY");
    fetchOptionsData("QQQ");
}, 60000); // Refresh every minute

// Initial fetch to load data immediately
fetchOptionsData("SPY");
fetchOptionsData("QQQ");
/* */
