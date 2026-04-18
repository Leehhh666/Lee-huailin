const canvas = document.getElementById('canvas-bg');
const ctx = canvas.getContext('2d');
let points = [];

function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    points = [];
    for(let i=0; i<40; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8
        });
    }
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
    ctx.strokeStyle = '#2997ff';
    ctx.lineWidth = 0.5;
    points.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if(p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        points.forEach(p2 => {
            let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if(dist < 150) {
                ctx.globalAlpha = 1 - dist/150;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y); ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
        });
    });
    requestAnimationFrame(draw);
}

window.addEventListener('resize', init);
init(); draw();