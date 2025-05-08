document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleSidebar');
    const sidebar = document.querySelector('.sidebar');

    if (toggleButton && sidebar) {
        toggleButton.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
        });
    }

    // ta3 slides 
    const sliders = document.querySelectorAll('.slider');
    const sliderStates = Array.from(sliders).map(() => ({ currentIndex: 0 }));

    function initializeSlider(slider, sliderIndex) {
       const slides = slider.querySelector('.slides');
       const images = slides.querySelectorAll('img');
        const prev = slider.querySelector('.prev');
        const next = slider.querySelector('.next');

       function updateSlider() {
           slides.style.transform = `translateX(-${sliderStates[sliderIndex].currentIndex * 100}%)`;
       }

       next.addEventListener('click', () => {
            sliderStates[sliderIndex].currentIndex = (sliderStates[sliderIndex].currentIndex + 1) % images.length;
            updateSlider();
          });

       prev.addEventListener('click', () => {
          sliderStates[sliderIndex].currentIndex = (sliderStates[sliderIndex].currentIndex - 1 + images.length) % images.length;
           updateSlider();
     });

// tbdel whdha kol 10s
        setInterval(() => {
            sliderStates[sliderIndex].currentIndex = (sliderStates[sliderIndex].currentIndex + 1) % images.length;
            updateSlider();
        }, 10000);
    }

    sliders.forEach((slider, index) => initializeSlider(slider, index));
});