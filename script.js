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

let index = 0;
const track = document.getElementById('carouselTrack');
const items = document.querySelectorAll('.carousel-item');

function mudarSlide(direcao) {
    index += direcao;

    if (index < 0) index = items.length - 1;
    if (index >= items.length) index = 0;

    const offset = -index * 100;
    track.style.transform = `translateX(${offset}%)`;
}

const perguntas = document.querySelectorAll('.faq-item');

perguntas.forEach(item => {
    const btn = item.querySelector('.faq-pergunta');
    btn.addEventListener('click', () => {
        item.classList.toggle('ativo');
    });
});




function mostrarPlanos(tipo) {
    document.getElementById('planos-online').style.display = tipo === 'online' ? 'flex' : 'none';
    document.getElementById('planos-presencial').style.display = tipo === 'presencial' ? 'flex' : 'none';

    const botoes = document.querySelectorAll('.planos-toggle-buttons button');
    botoes.forEach(btn => btn.classList.remove('active'));
    if (tipo === 'online') botoes[0].classList.add('active');
    else botoes[1].classList.add('active');
}

  let scrollPos = 0;

  function rolarCarrossel(direcao) {
    const faixa = document.getElementById('faixaCarrossel');
    const larguraItem = faixa.querySelector('img').offsetWidth + 20; // img + gap
    scrollPos += direcao * larguraItem;
    faixa.scrollTo({ left: scrollPos, behavior: 'smooth' });
  }