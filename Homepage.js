document.addEventListener("DOMContentLoaded", () => {
    const progressBar = document.getElementById('progress-bar');
    const video = document.getElementById('background-video');
    const muteButton = document.getElementById('mute-button');
    const exploreJourney = document.getElementById('explore-journey');

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
