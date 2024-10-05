document.addEventListener("DOMContentLoaded", () => {
    const playButton = document.getElementById('play-button');
    const muteButton = document.getElementById('mute-button');
    const backgroundVideo = document.getElementById('background-video');

    // Play video on button click
    playButton.addEventListener('click', () => {
        backgroundVideo.play(); // Start playing the video
        playButton.style.display = 'none'; // Hide the play button
    });

    // Mute/Unmute functionality
    let isMuted = false; // State variable for mute status

    muteButton.addEventListener('click', () => {
        if (isMuted) {
            backgroundVideo.muted = false; // Unmute
            muteButton.textContent = 'Mute'; // Change button text
        } else {
            backgroundVideo.muted = true; // Mute
            muteButton.textContent = 'Unmute'; // Change button text
        }
        isMuted = !isMuted; // Toggle mute state
    });

    const scenarios = document.querySelectorAll('.scenario');
    const storyContent = document.getElementById('story-content');
    const storyTitle = document.getElementById('story-title');
    const storyDescription = document.getElementById('story-description');
    const backButton = document.getElementById('back-button');

    scenarios.forEach(scenario => {
        scenario.addEventListener('click', () => {
            const selectedScenario = scenario.getAttribute('data-scenario');
            showStory(selectedScenario);
        });
    });

    backButton.addEventListener('click', () => {
        storyContent.classList.add('hidden');
        scenarios.forEach(scenario => scenario.classList.remove('hidden'));
    });

    function showStory(scenario) {
        scenarios.forEach(scenario => scenario.classList.add('hidden'));
        storyContent.classList.remove('hidden');

        switch (scenario)  {
            case "public-transport":
                storyTitle.textContent = "Using Public Transport";
                storyDescription.innerHTML = `
                    <p>Using public transport significantly reduces greenhouse gas emissions compared to private vehicles. Here’s how:</p>
                    <ul>
                        <li><strong>Lower Emissions:</strong> Public transport produces 45% less carbon dioxide per mile than private cars.</li>
                        <li><strong>Reduced Traffic:</strong> More people using buses and trains means less traffic congestion and lower overall emissions.</li>
                        <li><strong>Community Benefits:</strong> Efficient public transport systems can boost local economies and provide access to jobs and services.</li>
                    </ul>
                    <p><strong>Tips:</strong></p>
                    <ul>
                        <li>Use public transport whenever possible to reduce your carbon footprint.</li>
                        <li>Encourage friends and family to join you in using public transport.</li>
                    </ul>
                `;
                break;
            case "meat-consumption":
                storyTitle.textContent = "Reducing Meat Consumption";
                storyDescription.innerHTML = `
                    <p>A plant-based diet can lower your carbon footprint significantly:</p>
                    <ul>
                        <li><strong>Resource Intensive:</strong> Meat production requires large amounts of water and land, leading to deforestation and habitat loss.</li>
                        <li><strong>Greenhouse Gas Emissions:</strong> Livestock farming is responsible for approximately 14.5% of global greenhouse gas emissions.</li>
                        <li><strong>Health Benefits:</strong> Reducing meat consumption can also improve health by lowering the risk of heart disease and certain cancers.</li>
                    </ul>
                    <p><strong>Tips:</strong></p>
                    <ul>
                        <li>Try "Meatless Mondays" or incorporate more plant-based meals into your diet.</li>
                        <li>Explore local vegetarian and vegan restaurants.</li>
                    </ul>
                `;
                break;
            case "energy-efficient":
                storyTitle.textContent = "Energy-Efficient Appliances";
                storyDescription.innerHTML = `
                    <p>Energy-efficient appliances help reduce electricity usage, saving money and decreasing your carbon footprint:</p>
                    <ul>
                        <li><strong>Lower Consumption:</strong> These appliances use less energy while providing the same service.</li>
                        <li><strong>Environmental Impact:</strong> Reduced energy usage means fewer greenhouse gas emissions.</li>
                        <li><strong>Long-Term Savings:</strong> Although they may cost more upfront, they save money on energy bills over time.</li>
                    </ul>
                    <p><strong>Tips:</strong></p>
                    <ul>
                        <li>Look for ENERGY STAR rated appliances when making a purchase.</li>
                        <li>Unplug appliances when not in use to save energy.</li>
                    </ul>
                `;
                break;
            case "support-local":
                storyTitle.textContent = "Supporting Local Produce";
                storyDescription.innerHTML = `
                    <p>Buying local reduces the carbon footprint associated with transporting food long distances:</p>
                    <ul>
                        <li><strong>Freshness:</strong> Local produce is often fresher and more flavorful.</li>
                        <li><strong>Community Support:</strong> Your purchases help local farmers and boost the local economy.</li>
                        <li><strong>Seasonal Variety:</strong> Eating what's in season is both economical and sustainable.</li>
                    </ul>
                    <p><strong>Tips:</strong></p>
                    <ul>
                        <li>Shop at local farmers' markets for fresh produce.</li>
                        <li>Join a local farm share or co-op.</li>
                    </ul>
                `;
                break;
            case "planting-trees":
                storyTitle.textContent = "Planting Trees";
                storyDescription.innerHTML = `
                    <p>Trees absorb CO₂ and improve air quality:</p>
                    <ul>
                        <li><strong>Carbon Sequestration:</strong> One mature tree can absorb about 48 pounds of CO₂ per year.</li>
                        <li><strong>Habitat Creation:</strong> Trees provide shelter and food for wildlife.</li>
                        <li><strong>Community Benefits:</strong> Trees enhance local aesthetics and can improve mental well-being.</li>
                    </ul>
                    <p><strong>Tips:</strong></p>
                    <ul>
                        <li>Participate in local tree-planting events.</li>
                        <li>Consider planting native trees in your backyard.</li>
                    </ul>
                `;
                break;
            case "renewable-energy":
                storyTitle.textContent = "Using Renewable Energy";
                storyDescription.innerHTML = `
                    <p>Switching to renewable energy sources can drastically cut down on greenhouse gas emissions:</p>
                    <ul>
                        <li><strong>Sustainable Sources:</strong> Solar and wind energy are clean and sustainable alternatives to fossil fuels.</li>
                        <li><strong>Lower Bills:</strong> Investing in renewable energy can save you money on electricity bills over time.</li>
                        <li><strong>Energy Independence:</strong> Using local renewable sources can reduce reliance on imported fuels.</li>
                    </ul>
                    <p><strong>Tips:</strong></p>
                    <ul>
                        <li>Consider installing solar panels on your home.</li>
                        <li>Choose a green energy plan from your utility provider if available.</li>
                    </ul>
                `;
                break;
        }
    }
});
