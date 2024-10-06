document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById('progress-bar');
    const video = document.getElementById('background-video');
    const muteButton = document.getElementById('mute-button');
    const exploreJourney = document.getElementById('explore-journey');
    const scenarioStories = {
    "public-transport": {
        title: "Using Public Transport",
        description: `
            <p>Using public transport significantly reduces greenhouse gas emissions compared to private vehicles. Here’s how:</p>
            <ul>
                <li><strong>Lower Emissions:</strong> Public transport produces 45% less carbon dioxide per mile than private cars.</li>
                <li><strong>Reduced Traffic:</strong> More people using buses and trains means less traffic congestion and lower overall emissions.</li>
            </ul>`
    },
    "meat-consumption": {
        title: "Reducing Meat Consumption",
        description: `
            <p>A plant-based diet can lower your carbon footprint significantly:</p>
            <ul>
                <li><strong>Greenhouse Gas Emissions:</strong> Livestock farming is responsible for approximately 14.5% of global greenhouse gas emissions.</li>
                <li><strong>Health Benefits:</strong> Reducing meat consumption can improve health by lowering the risk of heart disease and certain cancers.</li>
            </ul>`
    },
    "renewable-energy": {
        title: "Switching to Renewable Energy",
        description: `
            <p>Using renewable energy sources can drastically reduce greenhouse gas emissions:</p>
            <ul>
                <li><strong>Solar and Wind Energy:</strong> Clean and sustainable alternatives to fossil fuels.</li>
                <li><strong>Lower Energy Bills:</strong> Investing in renewable energy can save you money on electricity bills.</li>
            </ul>`
    },
    "recycle-compost": {
        title: "Recycle & Compost",
        description: `
            <p>Recycling and composting reduce the amount of waste sent to landfills, lower greenhouse gas emissions, and conserve natural resources:</p>
            <ul>
                <li><strong>Reduce Waste:</strong> Recycling prevents waste from being dumped in landfills and oceans.</li>
                <li><strong>Composting:</strong> Organic materials can be composted to enrich soil and sequester carbon.</li>
            </ul>`
    },
    "conserve-water": {
        title: "Conserve Water",
        description: `
            <p>Water is a precious resource. Conserve it to reduce your environmental impact:</p>
            <ul>
                <li><strong>Shorter Showers:</strong> Save gallons of water by reducing shower time.</li>
                <li><strong>Fix Leaks:</strong> Fixing leaks can save a significant amount of water over time.</li>
            </ul>`
    }
};


    // Mute/Unmute functionality
    let isMuted = true;
    muteButton.addEventListener('click', () => {
        if (isMuted) {
            video.muted = false;
            muteButton.textContent = '🔊'; // Change icon to sound on
        } else {
            video.muted = true;
            muteButton.textContent = '🔇'; // Change icon to sound off
        }
        isMuted = !isMuted;
    });

    // Hide the button and start journey
    exploreJourney.addEventListener('click', () => {
        exploreJourney.style.display = 'none'; // Hide button
    });

    // Progress bar on scroll
    window.onscroll = function () {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercentage = (scrollTop / scrollHeight) * 100;
        progressBar.style.width = scrollPercentage + "%";
    };

    // Chart.js example for CO2 chart
    const ctx = document.getElementById('co2Chart').getContext('2d');
    const co2Chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['2000', '2005', '2010', '2015', '2020'],
            datasets: [{
                label: 'CO2 Emissions (Gt)',
                data: [29, 31, 33, 35, 37],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
});
