// --- 1. DOM Elements ---
const startBtn = document.getElementById('start-btn');
const introScreen = document.getElementById('intro-screen');
const countdownScreen = document.getElementById('countdown-screen');
const mainScreen = document.getElementById('main-screen');
const timerElement = document.getElementById('timer');
const bgMusic = document.getElementById('bg-music');
const sky = document.getElementById('sky');
const celebrationContainer = document.getElementById('celebration-container');
const giftContainer = document.getElementById('gift-container');
const letterModal = document.getElementById('letter-modal');
const closeLetterBtn = document.getElementById('close-letter');
const typedTextElement = document.getElementById('typed-text');
const slideshowImage = document.getElementById('slideshow-image');
const flame = document.getElementById('flame');

// --- 2. Night Sky with Twinkling Stars ---
function createStars() {
    const numStars = 150;
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}vw`;
        star.style.top = `${Math.random() * 100}vh`;
        star.style.animationDuration = `${Math.random() * 2 + 1}s`;
        sky.appendChild(star);
    }
}

// --- 3. Start Sequence & Countdown Timer ---
startBtn.addEventListener('click', () => {
    bgMusic.play().catch(error => console.log("Music play blocked:", error));
    introScreen.classList.add('hidden');
    countdownScreen.classList.remove('hidden');
    startCountdown();
});

function startCountdown() {
    let timeLeft = 5;
    const countdownInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(countdownInterval);
            triggerReveal();
        }
    }, 1000);
}

// --- 4. Main Reveal & Celebration (Fireworks, Balloons, Hearts, Confetti) ---
function triggerReveal() {
    countdownScreen.classList.add('hidden');
    mainScreen.classList.remove('hidden');
    celebrationContainer.classList.remove('hidden');
    
    launchCelebration();
    startSlideshow();
}

function launchCelebration() {
    createBalloons(12);
    createHearts(12);
    createConfetti(80);
    
    setInterval(() => {
        createFirework();
    }, 1500);
}

function createBalloons(amount) {
    const colors = ['#ff69b4', '#ffd700', '#00ffff', '#ff1493', '#ff4500'];
    for (let i = 0; i < amount; i++) {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        const color = colors[Math.floor(Math.random() * colors.length)];
        balloon.style.backgroundColor = color;
        balloon.style.left = `${Math.random() * 90}vw`;
        balloon.style.animationDuration = `${Math.random() * 4 + 6}s`;
        balloon.style.animationDelay = `${Math.random() * 5}s`;
        celebrationContainer.appendChild(balloon);
    }
}

function createHearts(amount) {
    const heartEmojis = ['❤️', '💖', '✨', '💕'];
    for (let i = 0; i < amount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
        heart.style.left = `${Math.random() * 95}vw`;
        heart.style.animationDuration = `${Math.random() * 3 + 5}s`;
        heart.style.animationDelay = `${Math.random() * 4}s`;
        celebrationContainer.appendChild(heart);
    }
}

function createConfetti(amount) {
    const colors = ['#ff69b4', '#ffd700', '#00ffff', '#ffffff'];
    for (let i = 0; i < amount; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.animationDelay = `${Math.random() * 5}s`;
        celebrationContainer.appendChild(confetti);
    }
}

function createFirework() {
    const firework = document.createElement('div');
    firework.classList.add('firework');
    firework.style.left = `${20 + Math.random() * 60}vw`;
    firework.style.top = `${10 + Math.random() * 40}vh`;
    celebrationContainer.appendChild(firework);
    
    setTimeout(() => {
        firework.remove();
    }, 2000);
}

// --- 5. Birthday Cake Candle Interaction ---
flame.addEventListener('click', () => {
    flame.classList.toggle('out');
});

// --- 6. Gift Box & Personalized Friendship Letter ---
const letterMessage = `Happy Birthday! \n\nYou are such an incredible friend and you deserve the absolute best today. I hope this little surprise brings a smile to your face. \n\nWishing you a year filled with joy, success, and amazing memories. Let's celebrate! \n\nBest, \nAbdihakiim`;

let hasTyped = false;

giftContainer.addEventListener('click', () => {
    letterModal.classList.remove('hidden');
    setTimeout(() => {
        letterModal.classList.add('show');
    }, 10);
    
    if (!hasTyped) {
        typeLetter();
    }
});

closeLetterBtn.addEventListener('click', () => {
    letterModal.classList.show = false;
    letterModal.classList.remove('show');
    setTimeout(() => {
        letterModal.classList.add('hidden');
    }, 500);
});

function typeLetter() {
    hasTyped = true;
    typedTextElement.innerHTML = '';
    let i = 0;
    const typingSpeed = 45;

    function typeWriter() {
        if (i < letterMessage.length) {
            if (letterMessage.charAt(i) === '\n') {
                typedTextElement.innerHTML += '<br>';
            } else {
                typedTextElement.innerHTML += letterMessage.charAt(i);
            }
            i++;
            setTimeout(typeWriter, typingSpeed);
        }
    }
    setTimeout(typeWriter, 400);
}

// --- 7. Photo Slideshow ---
const photos = ['photo1.jpeg', 'photo2.jpeg', 'photo3.jpeg'];
let currentPhotoIndex = 0;

function startSlideshow() {
    if (photos.length === 0) return;

    setInterval(() => {
        slideshowImage.classList.add('fade-out');
        setTimeout(() => {
            currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
            slideshowImage.src = photos[currentPhotoIndex];
            slideshowImage.classList.remove('fade-out');
        }, 1000);
    }, 4000);
}

// --- Initialize Sky Stars on Load ---
createStars();
