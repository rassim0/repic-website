const canvas = document.getElementById('repicCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Letter class
class Letter {
    constructor(char, x, y) {
        this.char = char;
        this.x = x;
        this.y = y;
        this.vx = (Math.random() * 4 - 2); // Random velocity -2 to 2
        this.vy = (Math.random() * 4 - 2);
        this.size = 50; // Font size for letters
    }

    update() {
        // Move letter
        this.x += this.vx;
        this.y += this.vy;

        // Bounce off edges
        if (this.x < this.size / 2 || this.x > canvas.width - this.size / 2) {
            this.vx *= -1;
            this.x = Math.max(this.size / 2, Math.min(canvas.width - this.size / 2, this.x));
        }
        if (this.y < this.size || this.y > canvas.height - this.size / 2) {
            this.vy *= -1;
            this.y = Math.max(this.size, Math.min(canvas.height - this.size / 2, this.y));
        }
    }

    draw() {
        ctx.font = `${this.size}px Poppins`;
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(this.char, this.x, this.y);
    }
}

// Initialize 11 sets of R E P I C
const letterSets = [];
const numSets = 11;
for (let i = 0; i < numSets; i++) {
    const set = [
        new Letter('R', Math.random() * canvas.width, Math.random() * canvas.height),
        new Letter('E', Math.random() * canvas.width, Math.random() * canvas.height),
        new Letter('P', Math.random() * canvas.width, Math.random() * canvas.height),
        new Letter('I', Math.random() * canvas.width, Math.random() * canvas.height),
        new Letter('C', Math.random() * canvas.width, Math.random() * canvas.height)
    ];
    letterSets.push(set);
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw each set
    letterSets.forEach(set => {
        // Update and draw letters
        set.forEach(letter => {
            letter.update();
            letter.draw();
        });

        // Draw green light line for this set
        ctx.beginPath();
        ctx.strokeStyle = '#137345';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#137345';
        ctx.moveTo(set[0].x, set[0].y);
        for (let i = 1; i < set.length; i++) {
            ctx.lineTo(set[i].x, set[i].y);
        }
        ctx.stroke();
        ctx.shadowBlur = 0; // Reset shadow
    });

    requestAnimationFrame(animate);
}

animate();