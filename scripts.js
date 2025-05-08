


// hadi t5li tehata y5rjo blwahd 
const sections = document.querySelectorAll('.about, .about-intro, .about-mission, .about-values, .about-activities, .about-structure, .about-team');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(section);
});


// Target date: March 15, 2025, 00:00:00
const eventDate = new Date("april 22, 2025 00:00:00").getTime();

// Update the countdown every second
const countdown = setInterval(() => {
    // Current time
    const now = new Date().getTime();

    // Time difference
    const distance = eventDate - now;

    // Calculate days, hours, minutes, seconds
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Display the result in the #timer div
    document.getElementById("timer").innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

    // If the countdown is over, display a message
    if (distance < 0) {
        clearInterval(countdown);
        document.getElementById("timer").innerHTML = "Event Started!";
    }
}, 1000); // Update every 1 second