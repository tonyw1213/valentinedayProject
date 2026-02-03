// Get elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const questionScreen = document.getElementById('question-screen');
const successScreen = document.getElementById('success-screen');

// When Yes button is clicked
yesBtn.addEventListener('click', () => {
    questionScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');

    // Create confetti effect
    createConfetti();
});

// Make No button run away from cursor
noBtn.addEventListener('mouseover', () => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    // Calculate safe boundaries (keeping button visible and within screen)
    const maxX = windowWidth - btnWidth - 20;
    const maxY = windowHeight - btnHeight - 20;

    // Generate random position
    let randomX = Math.floor(Math.random() * maxX);
    let randomY = Math.floor(Math.random() * maxY);

    // Ensure minimum distance from current position
    const currentX = noBtn.offsetLeft;
    const currentY = noBtn.offsetTop;
    const minDistance = 100;

    while (Math.abs(randomX - currentX) < minDistance && Math.abs(randomY - currentY) < minDistance) {
        randomX = Math.floor(Math.random() * maxX);
        randomY = Math.floor(Math.random() * maxY);
    }

    // Move the button
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

// Also run away when trying to click
noBtn.addEventListener('mousedown', (e) => {
    e.preventDefault();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const btnWidth = noBtn.offsetWidth;
    const btnHeight = noBtn.offsetHeight;

    const maxX = windowWidth - btnWidth - 20;
    const maxY = windowHeight - btnHeight - 20;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
});

// Confetti effect function
function createConfetti() {
    const colors = ['#ff69b4', '#ff1493', '#ffc0cb', '#ff6b9d', '#c71585'];
    const confettiCount = 50;

    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.opacity = '1';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';

            document.body.appendChild(confetti);

            // Animate confetti falling
            let pos = -10;
            let opacity = 1;
            const fallSpeed = 2 + Math.random() * 3;
            const drift = (Math.random() - 0.5) * 2;
            let leftPos = parseFloat(confetti.style.left);

            const fall = setInterval(() => {
                pos += fallSpeed;
                leftPos += drift;
                opacity -= 0.01;

                confetti.style.top = pos + 'px';
                confetti.style.left = leftPos + 'px';
                confetti.style.opacity = opacity;

                if (pos > window.innerHeight || opacity <= 0) {
                    clearInterval(fall);
                    confetti.remove();
                }
            }, 20);
        }, i * 30);
    }
}

// Make Yes button grow slightly on each No button movement to encourage clicking Yes
let yesBtnScale = 1;
noBtn.addEventListener('mouseover', () => {
    yesBtnScale += 0.05;
    if (yesBtnScale > 1.3) yesBtnScale = 1.3;
    yesBtn.style.transform = `scale(${yesBtnScale})`;
});
