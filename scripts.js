document.addEventListener("DOMContentLoaded", () => {
    const heroText = `Step Up, Become Earth's Guardian Against Climate Change!`;
    const heroElement = document.getElementById("heroic-word");
    const readyButton = document.getElementById("ready-button");
    const audio = document.getElementById("background-audio");
    const soundToggle = document.getElementById("sound-toggle");
    const startExperienceButton = document.getElementById("start-experience-button");
    const clickOverlay = document.getElementById("click-overlay");
    const heroSection = document.getElementById("hero-section");
    const backgroundVideo = document.getElementById("background-video");

    let soundMuted = true; // Start with sound muted

    // Function to animate text letter by letter with a cinematic feel
    function animateText() {
        heroElement.innerHTML = '';  // Clear previous content
        const splitText = heroText.split(" "); // Split text by spaces
        splitText.forEach((word, wordIndex) => {
            const wordContainer = document.createElement('span');
            wordContainer.classList.add('text-word'); // Add a class for each word
            wordContainer.id = `word-${wordIndex}`; // Assign a unique ID to each word
            word.split("").forEach((char, charIndex) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.classList.add('heroic-letter');
                span.style.animationDelay = `${(wordIndex * 1.2 + charIndex * 0.1)}s`;  // Delay each letter for cinematic effect
                wordContainer.appendChild(span);
            });
            heroElement.appendChild(wordContainer); // Add word container
            heroElement.appendChild(document.createTextNode(' ')); // Add extra space between words
        });
    }

    // Function to start the background video, audio, and other content
    function startExperience() {
        audio.play().then(() => {
            audio.muted = false; // Unmute the audio after play starts
        }).catch(error => {
            console.error("Error playing audio:", error); // Log any audio playback issues
            alert("Audio playback failed. Please check your audio settings.");
        });

        backgroundVideo.play().catch(error => {
            console.error("Error playing video:", error); // Log any video playback issues
            alert("Video playback failed. Please check your video settings.");
        });

        heroSection.classList.remove("hidden"); // Show the hero section
        soundToggle.classList.remove("hidden"); // Show sound control icon
        clickOverlay.classList.add("hidden"); // Hide the click-to-start overlay
        setTimeout(animateText, 2000); // Start animating the text after a short delay for dramatic effect

        // Show the "I'm Ready" button after text animation (adjusted timing to 7s)
        setTimeout(() => {
            readyButton.classList.remove("hidden");
            readyButton.style.opacity = 1;  // Make the button fully visible
        }, 13000);  // Delayed for better sync with text animation
    }

    // Event listener for the click-to-start button
    startExperienceButton.addEventListener("click", () => {
        startExperience(); // Trigger the experience when clicked
    });

    // Handle sound icon click to toggle mute/unmute
    soundToggle.addEventListener("click", () => {
        if (soundMuted) {
            audio.muted = false; // Unmute the audio
            soundToggle.textContent = "🔇"; // Change icon to indicate sound is on
        } else {
            audio.muted = true; // Mute the audio
            soundToggle.textContent = "🔊"; // Change icon to indicate sound is off
        }
        soundMuted = !soundMuted; // Toggle the muted state
    });

    // Redirect to another page when "I'm Ready" is clicked
    readyButton.addEventListener("click", () => {
        window.location.href = "Homepage.html"; // Replace with the desired URL or page
    });

    // Add aria-label for accessibility
    soundToggle.setAttribute('aria-label', 'Toggle sound');
});
