/* ===========================
   Navigation Functions
   =========================== */

// Navigate to a specific page
function navigateTo(page) {
    window.location.href = page;
}

// Navigate to Mingle page with heart falling effect
function navigateToMingle() {
    createFallingHearts();
    setTimeout(function() {
        window.location.href = 'mingle.html';
    }, 1500);
}

// Navigate to Single page with skull falling effect
function navigateToSingle() {
    createFallingSkulls();
    setTimeout(function() {
        window.location.href = 'single.html';
    }, 1500);
}

// Go back to home/landing page
function goBack() {
    window.location.href = 'index.html';
}

/* ===========================
   Background Music Control
   =========================== */

document.addEventListener('DOMContentLoaded', function() {
    const backgroundMusic = document.getElementById('backgroundMusic');
    const musicToggle = document.getElementById('musicToggle');

    if (backgroundMusic && musicToggle) {
        // Load music state from localStorage
        const isMusicOn = localStorage.getItem('musicOn') !== 'false';
        
        if (isMusicOn) {
            // Try to play music
            let playPromise = backgroundMusic.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    updateMusicToggleBtn(true);
                }).catch(() => {
                    // Auto-play was prevented, music is muted but toggle is ready
                    updateMusicToggleBtn(false);
                });
            }
        } else {
            backgroundMusic.pause();
            updateMusicToggleBtn(false);
        }

        // Toggle music on button click
        musicToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (backgroundMusic.paused) {
                backgroundMusic.play().then(() => {
                    updateMusicToggleBtn(true);
                    localStorage.setItem('musicOn', 'true');
                }).catch(() => {
                    // Handle autoplay policy errors
                    console.log('Autoplay was prevented');
                });
            } else {
                backgroundMusic.pause();
                updateMusicToggleBtn(false);
                localStorage.setItem('musicOn', 'false');
            }
        });

        // Update button text when audio ends (for loop control feedback)
        backgroundMusic.addEventListener('ended', function() {
            updateMusicToggleBtn(true);
        });
    }

    function updateMusicToggleBtn(isPlaying) {
        const musicToggle = document.getElementById('musicToggle');
        if (musicToggle) {
            if (isPlaying) {
                musicToggle.textContent = '🔊';
                musicToggle.classList.add('playing');
                musicToggle.classList.remove('muted');
                musicToggle.title = 'Music is On - Click to Mute';
            } else {
                musicToggle.textContent = '🔇';
                musicToggle.classList.remove('playing');
                musicToggle.classList.add('muted');
                musicToggle.title = 'Music is Off - Click to Play';
            }
        }
    }
});

/* ===========================
   Falling Hearts Effect
   =========================== */

function createFallingHearts() {
    const heartCount = 20;
    
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.className = 'falling-heart';
        heart.innerHTML = '💖';
        
        // Random horizontal position
        const randomX = Math.random() * window.innerWidth;
        heart.style.left = randomX + 'px';
        heart.style.top = '-50px';
        
        // Random animation duration between 2-3 seconds
        const duration = 2 + Math.random();
        heart.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 0.3;
        heart.style.animationDelay = delay + 's';
        
        document.body.appendChild(heart);
        
        // Remove element after animation completes
        setTimeout(function() {
            heart.remove();
        }, (duration + delay) * 1000);
    }
}

/* ===========================
   Falling Skulls Effect
   =========================== */

function createFallingSkulls() {
    const skullCount = 20;
    
    for (let i = 0; i < skullCount; i++) {
        const skull = document.createElement('div');
        skull.className = 'falling-skull';
        skull.innerHTML = '💀';
        
        // Random horizontal position
        const randomX = Math.random() * window.innerWidth;
        skull.style.left = randomX + 'px';
        skull.style.top = '-50px';
        
        // Random animation duration between 2-3 seconds
        const duration = 2 + Math.random();
        skull.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 0.3;
        skull.style.animationDelay = delay + 's';
        
        document.body.appendChild(skull);
        
        // Remove element after animation completes
        setTimeout(function() {
            skull.remove();
        }, (duration + delay) * 1000);
    }
}

/* ===========================
   Continuous Effects Controls
   =========================== */

function startContinuousHearts(intervalMs = 600) {
    // If already running, don't start another
    if (window._heartInterval) return;
    // Create a burst immediately then at intervals
    createFallingHearts();
    window._heartInterval = setInterval(createFallingHearts, intervalMs);
}

function stopContinuousHearts() {
    if (window._heartInterval) {
        clearInterval(window._heartInterval);
        window._heartInterval = null;
    }
}

function startContinuousSkulls(intervalMs = 700) {
    if (window._skullInterval) return;
    createFallingSkulls();
    window._skullInterval = setInterval(createFallingSkulls, intervalMs);
}

function stopContinuousSkulls() {
    if (window._skullInterval) {
        clearInterval(window._skullInterval);
        window._skullInterval = null;
    }
}

/* Move-away behavior for the No button on the Valentine page */
function enableNoButtonEvade() {
    const noBtn = document.getElementById('noBtn');
    if (!noBtn) return;

    noBtn.addEventListener('mouseenter', function() {
        // Move to a random position within the viewport
        const maxX = Math.max(window.innerWidth - noBtn.offsetWidth - 40, 40);
        const maxY = Math.max(window.innerHeight - noBtn.offsetHeight - 40, 40);
        const randX = Math.floor(Math.random() * maxX) - (maxX / 2);
        const randY = Math.floor(Math.random() * maxY) - (maxY / 2);

        // Use transform to visually move the button
        noBtn.style.transition = 'transform 0.25s ease';
        noBtn.style.transform = `translate(${randX}px, ${randY}px)`;
    });
    
    // Prevent clicking: on click/tap, move away and stop the click
    noBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();

        const maxX = Math.max(window.innerWidth - noBtn.offsetWidth - 40, 40);
        const maxY = Math.max(window.innerHeight - noBtn.offsetHeight - 40, 40);
        const randX = Math.floor(Math.random() * maxX) - (maxX / 2);
        const randY = Math.floor(Math.random() * maxY) - (maxY / 2);

        noBtn.style.transition = 'transform 0.18s ease';
        noBtn.style.transform = `translate(${randX}px, ${randY}px)`;
    });

    // Support touch interactions on mobile
    noBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        const maxX = Math.max(window.innerWidth - noBtn.offsetWidth - 40, 40);
        const maxY = Math.max(window.innerHeight - noBtn.offsetHeight - 40, 40);
        const randX = Math.floor(Math.random() * maxX) - (maxX / 2);
        const randY = Math.floor(Math.random() * maxY) - (maxY / 2);

        noBtn.style.transition = 'transform 0.18s ease';
        noBtn.style.transform = `translate(${randX}px, ${randY}px)`;
    });
}

/* ===========================
   Auto-start continuous effects on relevant pages
   =========================== */
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname.toLowerCase();

    if (path.endsWith('mingle.html')) {
        // Start continuous hearts on mingle registration page
        startContinuousHearts();
    }

    if (path.endsWith('single.html')) {
        // Start continuous skulls on single registration page
        startContinuousSkulls();
    }

    if (path.endsWith('valentine.html')) {
        // Start hearts and enable the evasive 'No' button
        startContinuousHearts(500);
        enableNoButtonEvade();
    }
});

/* ===========================
   Form Handling - Single Page
   =========================== */

// Handle form submission for single users
document.addEventListener('DOMContentLoaded', function() {
    const singleForm = document.getElementById('singleForm');
    
    if (singleForm) {
        singleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSingleFormSubmit();
        });
    }

    // Handle form submission for mingle users
    const mingleForm = document.getElementById('mingleForm');
    
    if (mingleForm) {
        mingleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleMingleFormSubmit();
        });
    }
});

// Handle Single User Form Submission
function handleSingleFormSubmit() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const singleStreak = document.getElementById('singleStreak').value;
    const bio = document.getElementById('bio').value;

    // Validate form data
    if (!name || !age || !singleStreak) {
        alert('Please fill in all required fields!');
        return;
    }

    // Validate age
    if (age < 18) {
        alert('You must be at least 18 years old to register!');
        return;
    }

    // Create user object
    const singleUserData = {
        name: name,
        age: parseInt(age),
        singleStreak: parseFloat(singleStreak),
        bio: bio,
        registrationType: 'single',
        registrationDate: new Date().toLocaleDateString()
    };

    // Save to localStorage
    localStorage.setItem('singleUserData', JSON.stringify(singleUserData));

    // Display success message
    showSuccessMessage();

    // Log the data (for development purposes)
    console.log('Single User Registered:', singleUserData);

    // Reset form and redirect after 3 seconds
    setTimeout(function() {
        document.getElementById('singleForm').reset();
        // After registering as single, go to the Black Day page
        navigateTo('black_day.html');
    }, 3000);
}

// Handle Mingle User Form Submission
function handleMingleFormSubmit() {
    const name = document.getElementById('name').value;
    const partnerName = document.getElementById('partnerName').value;
    const age = document.getElementById('age').value;
    const partnerAge = document.getElementById('partnerAge').value;
    const relationshipStreak = document.getElementById('relationshipStreak').value;
    const bio = document.getElementById('bio').value;

    // Validate form data
    if (!name || !partnerName || !age || !partnerAge || !relationshipStreak) {
        alert('Please fill in all required fields!');
        return;
    }

    // Validate age
    if (age < 18 || partnerAge < 18) {
        alert('Both partners must be at least 18 years old to register!');
        return;
    }

    // Create user object
    const mingleUserData = {
        name: name,
        partnerName: partnerName,
        age: parseInt(age),
        partnerAge: parseInt(partnerAge),
        relationshipStreak: parseFloat(relationshipStreak),
        bio: bio,
        registrationType: 'mingle',
        registrationDate: new Date().toLocaleDateString()
    };

    // Save to localStorage
    localStorage.setItem('mingleUserData', JSON.stringify(mingleUserData));

    // Display success message
    showSuccessMessage();

    // Log the data (for development purposes)
    console.log('Mingle User Registered:', mingleUserData);

    // Reset form and redirect after 3 seconds
    setTimeout(function() {
        const form = document.getElementById('mingleForm');
        if (form) form.reset();
        navigateTo('valentine.html');
    }, 3000);
}

/* ===========================
   Single Survival Meter
   =========================== */

// Update the Single Survival Meter based on years
function updateSingleSurvivalMeter() {
    const streakInput = document.getElementById('singleStreak');
    const progressFill = document.getElementById('progressFill');
    const progressPercentage = document.getElementById('progressPercentage');
    const meterBadge = document.getElementById('meterBadge');

    if (!streakInput || !progressFill || !progressPercentage || !meterBadge) {
        return;
    }

    const years = parseFloat(streakInput.value);

    // Handle empty input
    if (!years || years < 0) {
        progressFill.style.width = '0%';
        progressPercentage.textContent = '0%';
        meterBadge.textContent = 'Enter your years';
        meterBadge.className = 'meter-badge';
        return;
    }

    // Calculate progress percentage
    let percentage = 0;
    let badge = '';
    let badgeClass = 'meter-badge';

    if (years >= 5) {
        // 5+ years = 100% = Legendary Single
        percentage = 100;
        badge = 'Legendary Single 🏆';
        badgeClass = 'meter-badge legendary';
    } else if (years >= 3) {
        // 3-5 years = Strong Independent
        percentage = Math.round((years / 5) * 100);
        badge = 'Strong Independent 💪';
        badgeClass = 'meter-badge independent';
    } else if (years >= 1) {
        // 1-2 years = Still Hopeful
        percentage = Math.round((years / 5) * 100);
        badge = 'Still Hopeful 💙';
        badgeClass = 'meter-badge hopeful';
    } else {
        // Less than 1 year
        percentage = Math.round((years / 5) * 100);
        badge = 'Just getting started 🌱';
        badgeClass = 'meter-badge';
    }

    // Update progress bar
    progressFill.style.width = percentage + '%';
    progressPercentage.textContent = percentage + '%';

    // Update badge
    meterBadge.textContent = badge;
    meterBadge.className = badgeClass;
}

// Initialize meter event listeners
document.addEventListener('DOMContentLoaded', function() {
    const streakInput = document.getElementById('singleStreak');
    
    if (streakInput) {
        // Update meter on input change
        streakInput.addEventListener('input', updateSingleSurvivalMeter);
        
        // Update meter on page load if value exists
        if (streakInput.value) {
            updateSingleSurvivalMeter();
        }
    }

    // Initialize relationship meter on mingle page
    const relationshipStreakInput = document.getElementById('relationshipStreak');
    
    if (relationshipStreakInput) {
        // Update meter on input change
        relationshipStreakInput.addEventListener('input', updateRelationshipStrengthMeter);
        
        // Update meter on page load if value exists
        if (relationshipStreakInput.value) {
            updateRelationshipStrengthMeter();
        }
    }
});

/* ===========================
   Relationship Strength Meter
   =========================== */

// Update the Relationship Strength Meter based on years
function updateRelationshipStrengthMeter() {
    const streakInput = document.getElementById('relationshipStreak');
    const progressFill = document.getElementById('relationshipProgressFill');
    const progressPercentage = document.getElementById('relationshipProgressPercentage');
    const meterBadge = document.getElementById('relationshipMeterBadge');

    if (!streakInput || !progressFill || !progressPercentage || !meterBadge) {
        return;
    }

    const years = parseFloat(streakInput.value);

    // Handle empty input
    if (!years || years < 0) {
        progressFill.style.width = '0%';
        progressPercentage.textContent = '0%';
        meterBadge.textContent = 'Enter your years';
        meterBadge.className = 'meter-badge';
        return;
    }

    // Calculate progress percentage and stage
    let percentage = 0;
    let badge = '';
    let badgeClass = 'meter-badge';

    if (years >= 5) {
        // 5+ years = 100% = Legendary Love
        percentage = 100;
        badge = 'Legendary Love 🏆';
        badgeClass = 'meter-badge legendary-love';
    } else if (years >= 4) {
        // 4-5 years = 83% = Serious Goals
        percentage = Math.round((years / 6) * 100);
        badge = 'Serious Goals 🌹';
        badgeClass = 'meter-badge seriousgoals';
    } else if (years >= 3) {
        // 3-4 years = 67% = Power Couple
        percentage = Math.round((years / 6) * 100);
        badge = 'Power Couple ⚡';
        badgeClass = 'meter-badge powercouple';
    } else if (years >= 2) {
        // 2-3 years = 50% = Strong Bond
        percentage = Math.round((years / 6) * 100);
        badge = 'Strong Bond 🔒';
        badgeClass = 'meter-badge strongbond';
    } else if (years >= 1) {
        // 1-2 years = 33% = Comfort Zone Activated
        percentage = Math.round((years / 6) * 100);
        badge = 'Comfort Zone Activated 😌';
        badgeClass = 'meter-badge comfort';
    } else {
        // 0-1 year = 17% = Butterfly Phase
        percentage = Math.round((years / 6) * 100);
        badge = 'Butterfly Phase 🦋';
        badgeClass = 'meter-badge butterfly';
    }

    // Update progress bar
    progressFill.style.width = percentage + '%';
    progressPercentage.textContent = percentage + '%';

    // Update badge
    meterBadge.textContent = badge;
    meterBadge.className = badgeClass;
}


function showValentineSection() {
    const section = document.getElementById('valentineSection');
    if (!section) return;
    section.style.display = 'flex';
    section.style.alignItems = 'center';
    section.style.justifyContent = 'center';

    // Start hearts and enable evade behavior
    startContinuousHearts(500);
    enableNoButtonEvade();
}

/* When on index with hash, display the valentine section */
document.addEventListener('DOMContentLoaded', function() {
    try {
        if (window.location.hash && window.location.hash.toLowerCase() === '#valentine') {
            showValentineSection();
            // Clean the hash so refresh won't duplicate behavior
            history.replaceState(null, '', window.location.pathname);
        }
    } catch (e) {
        console.error(e);
    }
});

// Show success message after form submission
function showSuccessMessage() {
    const successMessage = document.getElementById('successMessage');
    
    if (successMessage) {
        successMessage.classList.remove('hidden');
        
        // Hide success message after 3 seconds
        setTimeout(function() {
            successMessage.classList.add('hidden');
        }, 3000);
    }
}

/* ===========================
   Additional Utility Functions
   =========================== */

// Retrieve saved single user data
function getSingleUserData() {
    const data = localStorage.getItem('singleUserData');
    return data ? JSON.parse(data) : null;
}

// Retrieve saved mingle user data
function getMingleUserData() {
    const data = localStorage.getItem('mingleUserData');
    return data ? JSON.parse(data) : null;
}

// Clear all saved user data
function clearAllData() {
    localStorage.removeItem('singleUserData');
    localStorage.removeItem('mingleUserData');
    console.log('All user data cleared');
}

/* ===========================
   Valentine Countdown
   =========================== */

// Initialize a countdown to a target date string like '2026-02-14T00:00:00'
function initValentineCountdown(targetDateStr) {
    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMinutes = document.getElementById('cdMinutes');
    const cdSeconds = document.getElementById('cdSeconds');

    if (!cdDays || !cdHours || !cdMinutes || !cdSeconds) return;

    const target = new Date(targetDateStr);

    function update() {
        const now = new Date();
        let diff = Math.max(0, target - now);

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        diff -= days * (1000 * 60 * 60 * 24);

        const hours = Math.floor(diff / (1000 * 60 * 60));
        diff -= hours * (1000 * 60 * 60);

        const minutes = Math.floor(diff / (1000 * 60));
        diff -= minutes * (1000 * 60);

        const seconds = Math.floor(diff / 1000);

        cdDays.textContent = String(days);
        cdHours.textContent = String(hours).padStart(2, '0');
        cdMinutes.textContent = String(minutes).padStart(2, '0');
        cdSeconds.textContent = String(seconds).padStart(2, '0');
    }

    update();
    const iv = setInterval(function() {
        update();
        // Stop interval when reached
        if (new Date() >= target) clearInterval(iv);
    }, 1000);
}

// Auto-init countdown when on valentine page
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith('valentine.html')) {
        // Target: 14 Feb 2026 at 00:00 local time
        initValentineCountdown('2026-02-14T00:00:00');
    }
});



