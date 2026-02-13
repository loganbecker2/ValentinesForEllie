const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const questionScreen = document.getElementById('questionScreen');
const successScreen = document.getElementById('successScreen');

// Handle Yes button click
yesBtn.addEventListener('click', () => {
    questionScreen.classList.add('hidden');
    successScreen.classList.remove('hidden');
});

// Handle No button hover/approach
noBtn.addEventListener('mouseenter', () => {
    moveNoButton();
});

// Also handle when mouse gets close (for better effect)
document.addEventListener('mousemove', (e) => {
    if (questionScreen.classList.contains('hidden')) return;
    
    const noBtnRect = noBtn.getBoundingClientRect();
    const noBtnCenterX = noBtnRect.left + noBtnRect.width / 2;
    const noBtnCenterY = noBtnRect.top + noBtnRect.height / 2;
    
    const distanceX = e.clientX - noBtnCenterX;
    const distanceY = e.clientY - noBtnCenterY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
    
    // If mouse is within 100px of the button, move it
    if (distance < 100) {
        moveNoButton();
    }
});

function moveNoButton() {
    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();
    const yesBtnRect = yesBtn.getBoundingClientRect();
    
    // Get random position within the container
    const maxX = containerRect.width - noBtn.offsetWidth;
    const maxY = containerRect.height - noBtn.offsetHeight;
    
    // Generate random position, avoiding collision with Yes button
    let randomX, randomY;
    let attempts = 0;
    const maxAttempts = 50;
    
    do {
        randomX = Math.random() * maxX;
        randomY = Math.random() * maxY;
        attempts++;
        
        // Calculate absolute position of No button
        const noLeft = containerRect.left + randomX;
        const noRight = noLeft + noBtn.offsetWidth;
        const noTop = containerRect.top + randomY;
        const noBottom = noTop + noBtn.offsetHeight;
        
        // Add 20px buffer around Yes button to prevent collision
        const buffer = 20;
        const yesLeft = yesBtnRect.left - buffer;
        const yesRight = yesBtnRect.right + buffer;
        const yesTop = yesBtnRect.top - buffer;
        const yesBottom = yesBtnRect.bottom + buffer;
        
        // Check if there's no overlap
        const noOverlap = noRight < yesLeft || 
                         noLeft > yesRight || 
                         noBottom < yesTop || 
                         noTop > yesBottom;
        
        if (noOverlap || attempts >= maxAttempts) {
            break;
        }
    } while (true);
    
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
}

// Set initial position of No button
window.addEventListener('load', () => {
    const container = document.querySelector('.button-container');
    const containerRect = container.getBoundingClientRect();
    const maxX = containerRect.width - noBtn.offsetWidth;
    const maxY = containerRect.height - noBtn.offsetHeight;
    
    // Start on the right side
    noBtn.style.left = (maxX * 0.7) + 'px';
    noBtn.style.top = (maxY / 2) + 'px';
});