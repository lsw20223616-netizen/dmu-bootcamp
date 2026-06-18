document.addEventListener('DOMContentLoaded', () => {
    // Gallery Slider Implementation
    const sliderWrapper = document.getElementById('gallerySlider');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');
    
    let currentIndex = 0;
    const totalSlides = slides.length;

    // Create dots dynamically
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    function updateDots() {
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    function goToSlide(index) {
        currentIndex = index;
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        updateDots();
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        goToSlide(currentIndex);
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        goToSlide(currentIndex);
    }

    // Event Listeners for arrows
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto sliding
    let slideInterval = setInterval(nextSlide, 4000);

    // Pause on hover
    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('mouseenter', () => clearInterval(slideInterval));
        sliderContainer.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 4000);
        });
    }

    // Authentication Status Checking
    const btnLogin = document.querySelector('.btn-login');
    if (btnLogin) {
        const currentUser = localStorage.getItem('dmu_user');
        if (currentUser) {
            btnLogin.innerHTML = '<i class="fas fa-sign-out-alt"></i> 로그아웃 (' + currentUser + '님)';
            btnLogin.href = '#';
            btnLogin.style.backgroundColor = '#1d1d1f';
            btnLogin.style.color = '#fff';
            btnLogin.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('dmu_user');
                alert('성공적으로 로그아웃 되었습니다.');
                window.location.reload();
            });
        }
    }
});
