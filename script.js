const containers = document.querySelectorAll('.before-after-container');

containers.forEach((box) => {
    const afterImg = box.querySelector('.after-img');
    const slider = box.querySelector('.slider');
    let isDragging = false;

    box.addEventListener('mousedown', () => isDragging = true);
    box.addEventListener('mouseup', () => isDragging = false);
    box.addEventListener('mouseleave', () => isDragging = false);
    box.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const boxRect = box.getBoundingClientRect();
        let offsetX = e.clientX - boxRect.left;
        if (offsetX < 0) offsetX = 0;
        if (offsetX > box.offsetWidth) offsetX = box.offsetWidth;
        const percent = (offsetX / box.offsetWidth) * 100;
        afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        slider.style.left = `${percent}%`;
    });

    box.addEventListener('touchstart', () => isDragging = true);
    box.addEventListener('touchend', () => isDragging = false);
    box.addEventListener('touchcancel', () => isDragging = false);
    box.addEventListener('touchmove', (e) => {
        const touch = e.touches[0];
        const boxRect = box.getBoundingClientRect();
        let offsetX = touch.clientX - boxRect.left;
        if (offsetX < 0) offsetX = 0;
        if (offsetX > box.offsetWidth) offsetX = box.offsetWidth;
        const percent = (offsetX / box.offsetWidth) * 100;
        afterImg.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
        slider.style.left = `${percent}%`;
    });
});

let currentSlide = 0;

    function updateCarousel() {
        const track = document.getElementById('antesDepoisCarouselTrack');
        const slideWidth = track.clientWidth;
        track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    function antesDepoisPrevSlide() {
        const totalSlides = document.querySelectorAll('.antesDepois-carousel-item').length;
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }

    function antesDepoisNextSlide() {
        const totalSlides = document.querySelectorAll('.antesDepois-carousel-item').length;
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    // Atualiza ao redimensionar a tela
    window.addEventListener('resize', updateCarousel);