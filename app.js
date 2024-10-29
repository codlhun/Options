const fetchOptionsData = async (symbol) => {
    const apiKey = "YOUR_API_KEY"; // Replace with your API key

    try {
        const response = await fetch(`https://api.example.com/options/${symbol}?apikey=${apiKey}`);
        const data = await response.json();
        processOptionsData(data, symbol);
    } catch (error) {
        console.error(`Error fetching data for ${symbol}:`, error);
    }
};

const processOptionsData = (data, symbol) => {
    const alertsDiv = document.getElementById("alerts");
    
    // Clear previous alerts for this symbol
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
    // Define high-probability criteria (e.g., delta, volume, etc.)
    return option.probability > 0.7; // Example criteria
};

// Fetch data for both SPY and QQQ at intervals
setInterval(() => {
    document.getElementById("alerts").innerHTML = ""; // Clear previous alerts
    fetchOptionsData("SPY");
    fetchOptionsData("QQQ");
}, 60000); // Refresh every minute
