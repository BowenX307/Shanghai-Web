/**
 * Landmark Reveal Component
 * Juxtaposition/Reveal feature for landmarks
 */

// ============================================================================
// Data Structure
// ============================================================================

/**
 * @typedef {Object} LandmarkState
 * @property {string} title
 * @property {string} subtitle
 * @property {string} description
 * @property {string} imageSrc
 * @property {string} themeColor
 * @property {string} [quote] - Optional quote for stateB
 */

/**
 * @typedef {Object} LandmarkData
 * @property {string} id
 * @property {LandmarkState} stateA - Surface view (modern, high-contrast)
 * @property {LandmarkState} stateB - Shadow view (archive/cyberpunk)
 */

/** @type {LandmarkData[]} */
const landmarksData = [
    {
        id: 'bund',
        stateA: {
            title: 'THE BUND',
            subtitle: 'Colonial Grandeur',
            description: 'Colonial grandeur meets neon dreams. The iconic waterfront where history and modernity converge.',
            imageSrc: 'shanghaiphoto/thebundnew.jpg',
            themeColor: '#d97706' // Amber/Gold
        },
        stateB: {
            title: 'THE BUND',
            subtitle: 'ARCHIVE_ACCESS_GRANTED',
            description: 'CLASSIFIED RECORD: The Bund stands as a testament to colonial architecture and economic transformation. Once the financial heart of foreign concessions, it now serves as a symbol of Shanghai\'s dual identity—preserving historical facades while embracing global commerce. The waterfront promenade witnessed the city\'s transition from treaty port to international metropolis.',
            imageSrc: 'shanghaiphoto/thebundold.webp',
            themeColor: '#0ff', // Cyan for cyberpunk
            quote: '"The past is never dead. It\'s not even past."'
        }
    },
    {
        id: 'lujiazui',
        stateA: {
            title: 'LUJIAZUI',
            subtitle: 'Vertical Velocity',
            description: 'From mudflats to vertical velocity. The skyline that redefined Shanghai\'s ambition.',
            imageSrc: 'shanghaiphoto/lujiazuinew.jpg',
            themeColor: '#06b6d4' // Cyan
        },
        stateB: {
            title: 'LUJIAZUI',
            subtitle: 'ARCHIVE_ACCESS_GRANTED',
            description: 'CLASSIFIED RECORD: Lujiazui represents the most radical urban transformation in modern history. What was once agricultural land and fishing villages became a vertical city within three decades. The financial district embodies China\'s economic miracle—a landscape of steel and glass that replaced organic communities with corporate towers. Beneath the gleaming facades lies the displacement of thousands who called this place home.',
            imageSrc: 'shanghaiphoto/lujiazuiold.jpg',
            themeColor: '#f0f', // Magenta for cyberpunk
            quote: '"Progress demands sacrifice. But at what cost?"'
        }
    },
    {
        id: 'peoplesquare',
        stateA: {
            title: 'PEOPLE SQUARE',
            subtitle: 'Public Space',
            description: 'Consumerism across the century. Where tradition meets commerce in the heart of the city.',
            imageSrc: 'shanghaiphoto/peoplesquarenew.jpg',
            themeColor: '#d946ef' // Fuchsia
        },
        stateB: {
            title: 'PEOPLE SQUARE',
            subtitle: 'ARCHIVE_ACCESS_GRANTED',
            description: 'CLASSIFIED RECORD: People\'s Square has been continuously reimagined—from colonial racecourse to revolutionary gathering place to commercial hub. Each transformation erased layers of social memory. The underground shopping malls and modern infrastructure replaced the organic street life that once defined this space. The square now serves multiple masters: commerce, transportation, and spectacle, while the voices of those who remember its past grow fainter.',
            imageSrc: 'shanghaiphoto/peoplesquareold.jpg',
            themeColor: '#0ff', // Cyan for cyberpunk
            quote: '"Memory is the only thing that cannot be demolished."'
        }
    }
];

// ============================================================================
// Component Initialization
// ============================================================================

function initLandmarkReveal() {
    // Wait for landmarks to be rendered
    setTimeout(() => {
        landmarksData.forEach(landmark => {
            const card = document.querySelector(`[data-landmark="${landmark.id}"]`);
            if (!card) {
                console.warn(`Landmark card not found: ${landmark.id}`);
                return;
            }

            // Create reveal button if it doesn't exist
            let revealBtn = card.querySelector('.landmark-reveal-btn');
            if (!revealBtn) {
                revealBtn = createRevealButton(landmark.id);
                const imageContainer = card.querySelector('.landmark-image-container');
                if (imageContainer) {
                    imageContainer.appendChild(revealBtn);
                } else {
                    console.warn(`Image container not found for: ${landmark.id}`);
                }
            }

            // Setup click handler
            revealBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playRevealSound();
                toggleLandmarkState(card, landmark);
            });

            // Initialize with stateA (don't update content, just ensure button exists)
            // Content is already in HTML, we just need the button
        });
    }, 500); // Wait for page to fully load
}

// ============================================================================
// Component Creation
// ============================================================================

/**
 * Creates the UNVEIL button
 * @param {string} landmarkId
 * @returns {HTMLElement}
 */
function createRevealButton(landmarkId) {
    const btn = document.createElement('button');
    btn.className = 'landmark-reveal-btn';
    btn.setAttribute('data-landmark-id', landmarkId);
    btn.innerHTML = '<span class="reveal-btn-text">TARGET_LOCKED</span>';
    return btn;
}

// ============================================================================
// State Management
// ============================================================================

/**
 * Toggles between stateA and stateB
 * @param {HTMLElement} card
 * @param {LandmarkData} landmark
 */
function toggleLandmarkState(card, landmark) {
    const isStateB = card.classList.contains('glitch-active');
    
    // Trigger glitch animation
    card.classList.add('glitch-transition');
    
    setTimeout(() => {
        if (isStateB) {
            // Switch to stateA
            card.classList.remove('glitch-active');
            updateLandmarkContent(card, landmark.stateA, false);
        } else {
            // Switch to stateB
            card.classList.add('glitch-active');
            updateLandmarkContent(card, landmark.stateB, true);
        }
        
        // Remove transition class after animation
        setTimeout(() => {
            card.classList.remove('glitch-transition');
        }, 300);
    }, 150);
}

/**
 * Updates the landmark card content
 * @param {HTMLElement} card
 * @param {LandmarkState} state
 * @param {boolean} isStateB
 */
function updateLandmarkContent(card, state, isStateB) {
    // Update image - switch between modern and old based on state
    const modernImage = card.querySelector('.landmark-image.modern');
    const oldImage = card.querySelector('.landmark-image.old');
    
    if (isStateB) {
        // Show old image in stateB
        if (oldImage) {
            oldImage.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        }
        if (modernImage) {
            modernImage.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
        }
    } else {
        // Show modern image in stateA
        if (modernImage) {
            modernImage.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        }
        if (oldImage) {
            oldImage.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
        }
    }
    
    // Update text content
    const nameEl = card.querySelector('.landmark-name');
    const descEl = card.querySelector('.landmark-desc');
    const statusText = card.querySelector('.status-text');
    
    if (nameEl) {
        nameEl.textContent = state.title;
    }
    
    if (descEl) {
        // Clear and set new description with typewriter effect
        descEl.textContent = '';
        if (isStateB) {
            // Typewriter effect for stateB
            typeWriter(descEl, state.description, 30);
        } else {
            descEl.textContent = state.description;
        }
    }
    
    if (statusText) {
        statusText.textContent = isStateB ? 'ARCHIVE_ACCESSED' : 'TARGET_LOCKED';
    }
    
    // Update reveal button
    const revealBtn = card.querySelector('.landmark-reveal-btn');
    if (revealBtn) {
        const btnText = revealBtn.querySelector('.reveal-btn-text');
        if (btnText) {
            btnText.textContent = isStateB ? 'LOCK_TARGET' : 'UNVEIL';
        }
    }
    
    // Add/remove quote if in stateB
    let quoteEl = card.querySelector('.landmark-quote');
    if (isStateB && state.quote) {
        if (!quoteEl) {
            quoteEl = document.createElement('div');
            quoteEl.className = 'landmark-quote';
            const textContainer = card.querySelector('.landmark-text');
            if (textContainer && descEl) {
                textContainer.insertBefore(quoteEl, descEl.nextSibling);
            }
        }
        quoteEl.textContent = '';
        setTimeout(() => {
            typeWriter(quoteEl, state.quote, 40);
        }, 2000);
        quoteEl.style.display = 'block';
    } else if (quoteEl) {
        quoteEl.style.display = 'none';
        quoteEl.textContent = '';
    }
    
    // Update theme color
    if (state.themeColor) {
        card.style.setProperty('--landmark-theme', state.themeColor);
    }
}

/**
 * Typewriter effect for text
 * @param {HTMLElement} element
 * @param {string} text
 * @param {number} speed - milliseconds per character
 */
function typeWriter(element, text, speed = 30) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// ============================================================================
// Audio (Placeholder)
// ============================================================================

function playRevealSound() {
    // Placeholder for audio effect
    // const audio = new Audio('path/to/sound.mp3');
    // audio.play().catch(e => console.log('Audio play failed:', e));
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLandmarkReveal);
} else {
    initLandmarkReveal();
}
