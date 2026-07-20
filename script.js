// Intersection Observer for Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    // Trigger once on load
    revealOnScroll();


    // --- Countdown Timer Logic ---
    // Target Date: August 16, 2026 12:00 PM (as specified by user's prompt of 'Agosto 16 12:00am' which could mean noon or midnight. Assuming noon for an event, adjust if needed)

    // Get the current year to ensure it sets correctly for the future event.
    // If we assume it's for this year (2026), we use 2026.
    const targetDate = new Date("August 16, 2026 12:00:00").getTime();

    const updateCountdown = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        // If the countdown is over
        if (distance < 0) {
            document.getElementById("countdown").innerHTML = "<h3 style='color: white; font-size: 2rem; text-align:center;'>¡El gran día ha llegado!</h3>";
            return;
        }

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result with padding for single digits
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerText = seconds.toString().padStart(2, '0');
    };

    // Update every second
    setInterval(updateCountdown, 1000);
    // Initial call
    updateCountdown();

    // --- Envelope Overlay Logic ---
    const envelopeBtn = document.getElementById('envelope-btn');
    const envelopeGraphic = document.getElementById('envelope-graphic');
    const envelopeOverlay = document.getElementById('envelope-overlay');

    if (envelopeBtn) {
        envelopeBtn.addEventListener('click', () => {
            // 1. Open the flap and hide the seal
            envelopeGraphic.classList.add('open');
            envelopeBtn.classList.add('open');

            // 2. Wait a moment, then slide the whole overlay up
            setTimeout(() => {
                envelopeOverlay.classList.add('slide-up');

                // 3. Remove overlay from DOM and allow scrolling
                setTimeout(() => {
                    envelopeOverlay.style.display = 'none';
                    document.body.classList.remove('no-scroll');

                    // Re-trigger scroll reveal so page elements pop in correctly
                    revealOnScroll();
                }, 1000); // matches the CSS transition of .slide-up

            }, 800); // Wait 0.8s for flap to open and card to pop up
        });
    }

    // --- Carousel Logic ---
    const carouselImages = document.querySelectorAll('.photo-placeholder img');
    if (carouselImages.length > 0) {
        let currentImageIndex = 0;
        
        setInterval(() => {
            carouselImages[currentImageIndex].classList.remove('active');
            currentImageIndex = (currentImageIndex + 1) % carouselImages.length;
            carouselImages[currentImageIndex].classList.add('active');
        }, 3000); // Change image every 3 seconds
    }

    // --- WhatsApp Button Logic ---
    const waBtn = document.getElementById('whatsapp-btn');
    if (waBtn) {
        waBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const phone = "14126892477";
            const message = "Gracias por la invitacion, confirmo mi asistencia al BabyShower de Marlyn Montoya";
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
            window.open(url, '_blank');
        });
    }
});
