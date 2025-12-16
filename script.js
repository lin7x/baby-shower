// ===== Baby Shower Invitation - JavaScript =====

// Countdown Timer
function initCountdown() {
    const eventDate = new Date('January 17, 2026 17:30:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }

    // Update immediately
    updateCountdown();

    // Update every second
    setInterval(updateCountdown, 1000);
}

// Scroll Reveal Animation
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.parents-card, .detail-card, .message-card, .countdown-item');

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    function checkReveal() {
        const windowHeight = window.innerHeight;

        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const revealPoint = 150;

            if (elementTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    // Check on scroll
    window.addEventListener('scroll', checkReveal);

    // Check on load
    checkReveal();
}

// Parallax Effect for Floating Elements
function initParallax() {
    const floatingElements = document.querySelectorAll('.bee, .honey-pot, .balloon');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        floatingElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            const yPos = scrollY * speed;
            el.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Honey Drip Animation on Scroll (disabled - kept for reference)
function initHoneyDrip() {
    // Effect removed to keep hero visible during scroll
}

// Smooth Scroll for Internal Links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Floating RSVP Button Visibility
function initFloatingButton() {
    const floatingBtn = document.getElementById('floating-rsvp-btn');
    const rsvpSection = document.getElementById('rsvp');

    if (!floatingBtn || !rsvpSection) return;

    function checkFloatingBtnVisibility() {
        const rsvpRect = rsvpSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Hide floating button when RSVP section is visible in viewport
        if (rsvpRect.top < windowHeight - 100 && rsvpRect.bottom > 100) {
            floatingBtn.classList.add('hidden');
        } else {
            floatingBtn.classList.remove('hidden');
        }
    }

    window.addEventListener('scroll', checkFloatingBtnVisibility);
    checkFloatingBtnVisibility();
}

// YouTube Player - Hidden video, only audio
let ytPlayer = null;
let isYTPlaying = false;

// Load YouTube IFrame API
function loadYouTubeAPI() {
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
}

// Called by YouTube API when ready
function onYouTubeIframeAPIReady() {
    ytPlayer = new YT.Player('youtube-player', {
        height: '1',
        width: '1',
        videoId: 'gR6hJ2JGIRg', // The Little Prince - Beautiful Instrumental
        playerVars: {
            'autoplay': 0,
            'controls': 0,
            'loop': 1,
            'playlist': 'gR6hJ2JGIRg' // Required for loop to work
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.setVolume(50); // 50% volume
    console.log('🎵 YouTube player ready');
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        ytPlayer.playVideo(); // Loop
    }
}

// Music Toggle with YouTube
function initMusicToggle() {
    const musicBtn = document.getElementById('music-toggle-btn');
    const musicIcon = document.getElementById('music-icon');

    if (!musicBtn) return;

    // Load YouTube API
    loadYouTubeAPI();

    musicBtn.addEventListener('click', () => {
        if (!ytPlayer) {
            console.log('YouTube player not ready yet');
            return;
        }

        if (isYTPlaying) {
            ytPlayer.pauseVideo();
            musicIcon.textContent = '🎶';
            musicBtn.classList.remove('playing');
            musicBtn.title = 'Activar música';
        } else {
            ytPlayer.playVideo();
            musicIcon.textContent = '🎵';
            musicBtn.classList.add('playing');
            musicBtn.title = 'Pausar música';
        }
        isYTPlaying = !isYTPlaying;
    });
}

// Make YouTube API callback global
window.onYouTubeIframeAPIReady = onYouTubeIframeAPIReady;

// Add Sparkle Effect on Click
function initSparkles() {
    document.body.addEventListener('click', (e) => {
        createSparkle(e.clientX, e.clientY);
    });

    function createSparkle(x, y) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '✨';
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: 1.5rem;
            pointer-events: none;
            z-index: 9999;
            animation: sparkle 0.8s ease-out forwards;
        `;

        document.body.appendChild(sparkle);

        // Add the animation keyframes if not already added
        if (!document.getElementById('sparkle-style')) {
            const style = document.createElement('style');
            style.id = 'sparkle-style';
            style.textContent = `
                @keyframes sparkle {
                    0% {
                        opacity: 1;
                        transform: scale(0) rotate(0deg);
                    }
                    50% {
                        opacity: 1;
                        transform: scale(1.5) rotate(180deg);
                    }
                    100% {
                        opacity: 0;
                        transform: scale(0) rotate(360deg) translateY(-50px);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        setTimeout(() => sparkle.remove(), 800);
    }
}

// ===== RSVP Form Handler =====
// IMPORTANTE: Para usar esta funcionalidad, necesitas:
// 1. Crear una hoja de cálculo de Google
// 2. Ir a Extensiones > Apps Script
// 3. Pegar el código de google-apps-script.js
// 4. Implementar como aplicación web
// 5. Reemplazar la URL abajo con tu URL de implementación

const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyf8VBWipYk0OLFcmw090uyY8y37KVI_sFC7GCYCPV0VNBXp2HdTE7jE7tUwiSLeMUc6Q/exec';

function initRSVPForm() {
    const form = document.getElementById('rsvp-form');
    const formMessage = document.getElementById('form-message');
    const submitBtn = document.getElementById('submit-btn');
    const guestCountSelect = document.getElementById('guest-count');
    const step1 = document.getElementById('step-1');
    const step2 = document.getElementById('step-2');
    const guestsContainer = document.getElementById('guests-container');

    if (!form || !guestCountSelect) return;

    // Handle guest count selection
    guestCountSelect.addEventListener('change', function () {
        const count = parseInt(this.value);

        if (count > 0) {
            // Generate guest rows
            generateGuestRows(count);

            // Show step 2 and submit button
            step2.style.display = 'block';
            submitBtn.style.display = 'flex';

            // Smooth scroll to step 2
            setTimeout(() => {
                step2.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        } else {
            step2.style.display = 'none';
            submitBtn.style.display = 'none';
            guestsContainer.innerHTML = '';
        }
    });

    function generateGuestRows(count) {
        guestsContainer.innerHTML = '';

        for (let i = 1; i <= count; i++) {
            const row = document.createElement('div');
            row.className = 'guest-row';
            row.innerHTML = `
                <div class="guest-row-header">
                    <span>⭐</span> Invitado ${i}
                </div>
                <div class="guest-row-fields">
                    <div class="form-group">
                        <label for="guest-name-${i}">
                            <span class="label-icon">👤</span>
                            Nombre completo
                        </label>
                        <input type="text" id="guest-name-${i}" name="nombre_${i}" placeholder="Nombre completo" required>
                    </div>
                    <div class="form-group">
                        <label for="guest-dni-${i}">
                            <span class="label-icon">🪪</span>
                            DNI
                        </label>
                        <input type="text" id="guest-dni-${i}" name="dni_${i}" placeholder="12345678" maxlength="8" pattern="[0-9]{8}" required>
                    </div>
                </div>
            `;
            guestsContainer.appendChild(row);
        }
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();

        // Collect all guests data
        const guestCount = parseInt(guestCountSelect.value);
        const guests = [];
        const generalPhone = document.getElementById('guest-phone').value.trim();

        // Validate phone
        if (!generalPhone) {
            showMessage('error', 'Por favor, ingresa un teléfono de contacto.');
            return;
        }

        for (let i = 1; i <= guestCount; i++) {
            const name = document.getElementById(`guest-name-${i}`).value.trim();
            const dni = document.getElementById(`guest-dni-${i}`).value.trim();

            if (!name || !dni) {
                showMessage('error', `Por favor, completa los datos del invitado ${i}.`);
                return;
            }

            guests.push({ nombre: name, dni: dni, telefono: generalPhone });
        }

        // Create formData for each guest
        const fecha = new Date().toLocaleString('es-PE');
        const allGuestsData = guests.map((g, index) => ({
            nombre: g.nombre,
            dni: g.dni,
            telefono: g.telefono,
            fecha: fecha
        }));

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-icon">⏳</span> Enviando...';
        showMessage('loading', 'Enviando tu confirmación...');

        try {
            // Check if Google Script URL is configured
            if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
                // Demo mode - simulate successful submission
                await new Promise(resolve => setTimeout(resolve, 1500));

                // Save to localStorage as backup
                saveToLocalStorage({ guests: allGuestsData });

                showMessage('success', '🎉 ¡Gracias por confirmar tu asistencia! Te esperamos el 17 de enero. ⭐🌙');
                showCalendarSection();
                resetFormCompletely();
            } else {
                // Real submission to Google Sheets - send all guests
                const response = await fetch(GOOGLE_SCRIPT_URL, {
                    method: 'POST',
                    mode: 'no-cors',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ guests: allGuestsData })
                });

                // Save to localStorage as backup
                saveToLocalStorage({ guests: allGuestsData });

                showMessage('success', '🎉 ¡Gracias por confirmar tu asistencia! Te esperamos el 17 de enero. ⭐🌙');
                showCalendarSection();
                resetFormCompletely();
            }
        } catch (error) {
            console.error('Error:', error);

            // Save to localStorage even on error
            saveToLocalStorage({ guests: allGuestsData });

            showMessage('error', 'Hubo un problema al enviar. Por favor, intenta nuevamente.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<span class="btn-icon">⭐</span> Confirmar Asistencia';
        }
    });

    function resetFormCompletely() {
        form.reset();
        step2.style.display = 'none';
        submitBtn.style.display = 'none';
        guestsContainer.innerHTML = '';
    }

    function showMessage(type, text) {
        formMessage.className = 'form-message ' + type;
        formMessage.textContent = text;
        formMessage.style.display = 'block';

        if (type === 'success') {
            // Don't auto-hide on success so user can see calendar option
        }
    }

    function showCalendarSection() {
        const calendarSection = document.getElementById('calendar-section');
        const downloadBtn = document.getElementById('download-calendar-btn');
        const googleCalendarLink = document.getElementById('google-calendar-link');

        if (calendarSection) {
            calendarSection.style.display = 'block';

            // Set up Google Calendar link
            const googleCalUrl = generateGoogleCalendarUrl();
            if (googleCalendarLink) {
                googleCalendarLink.href = googleCalUrl;
            }

            // Set up ICS download
            if (downloadBtn) {
                downloadBtn.addEventListener('click', downloadICSFile);
            }
        }
    }

    function generateGoogleCalendarUrl() {
        const eventTitle = 'Baby Shower de Oliver Alessandro ⭐';
        const eventLocation = 'Condominios Villa Los Molles, Comas, Lima';
        const eventDescription = '¡No olvides el Baby Shower de Oliver Alessandro! Nos vemos en este día tan especial. 🌙⭐';
        const startDate = '20260117T173000'; // Jan 17, 2026 5:30 PM
        const endDate = '20260117T213000';   // Jan 17, 2026 9:30 PM

        const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(eventDescription)}&location=${encodeURIComponent(eventLocation)}`;

        return url;
    }

    function downloadICSFile() {
        const icsContent = [
            'BEGIN:VCALENDAR',
            'VERSION:2.0',
            'PRODID:-//Baby Shower Oliver Alessandro//ES',
            'CALSCALE:GREGORIAN',
            'METHOD:PUBLISH',
            'BEGIN:VEVENT',
            'UID:babyshower-oliver-2026@invitation',
            'DTSTAMP:' + formatICSDate(new Date()),
            'DTSTART:20260117T173000',
            'DTEND:20260117T213000',
            'SUMMARY:Baby Shower de Oliver Alessandro',
            'DESCRIPTION:No olvides el Baby Shower de Oliver Alessandro! Nos vemos en este dia tan especial.',
            'LOCATION:Condominios Villa Los Molles\\, Comas\\, Lima',
            'STATUS:CONFIRMED',
            'BEGIN:VALARM',
            'TRIGGER:-P1D',
            'ACTION:DISPLAY',
            'DESCRIPTION:Recordatorio: Manana es el Baby Shower de Oliver Alessandro',
            'END:VALARM',
            'BEGIN:VALARM',
            'TRIGGER:-PT2H',
            'ACTION:DISPLAY',
            'DESCRIPTION:Recordatorio: El Baby Shower es en 2 horas',
            'END:VALARM',
            'END:VEVENT',
            'END:VCALENDAR'
        ].join('\r\n');

        const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'baby-shower-oliver.ics';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    }

    function formatICSDate(date) {
        return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
    }

    function saveToLocalStorage(data) {
        try {
            const existingData = JSON.parse(localStorage.getItem('rsvp_submissions') || '[]');
            existingData.push(data);
            localStorage.setItem('rsvp_submissions', JSON.stringify(existingData));
            console.log('📋 RSVP guardado en localStorage:', data);
        } catch (e) {
            console.warn('No se pudo guardar en localStorage');
        }
    }
}

// Function to export localStorage data (useful for manual backup)
function exportRSVPData() {
    const data = JSON.parse(localStorage.getItem('rsvp_submissions') || '[]');
    console.table(data);
    return data;
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initScrollReveal();
    initParallax();
    initHoneyDrip();
    initSmoothScroll();
    initFloatingButton();
    initMusicToggle();
    initSparkles();
    initRSVPForm();

    console.log('🧸 Baby Shower Invitation for Oliver Alessandro loaded successfully! 🍯');
});

// Add some festive console styling
console.log('%c 🧸 Welcome to Oliver Alessandro\'s Baby Shower! 🍯',
    'background: linear-gradient(to right, #FFD93D, #F5A623); color: #4A3728; font-size: 20px; padding: 10px 20px; border-radius: 10px; font-family: cursive;');

