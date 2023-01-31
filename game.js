function setup() {
    createCanvas(window.innerWidth, window.innerHeight)
    frameRate(30)
    initGame()
}

const pl = {}

function initGame() {
    pl.x = 140
    pl.y = 470
    pl.r = 20
    pl.movex = 0
    pl.movey = 0
    pl.ready = false
}

const squares = [
    { x: 0, y: 0, w: window.innerWidth, h: 10 },
    { x: 0, y: window.innerHeight - 10, w: window.innerWidth, h: 10 },
    { x: 0, y: 0, w: 10, h: window.innerHeight },
    { x: window.innerWidth - 10, y: 0, w: 10, h: window.innerHeight },

    { x: 80, y: 10, w: 10, h: 18 },
    { x: 220, y: 10, w: 10, h: 18 },
    { x: 150, y: 62, w: 10, h: 20 },
    { x: 300, y: 10, w: 10, h: 10 },
    { x: 300, y: 70, w: 10, h: 15 },
    { x: 70, y: 80, w: 3000, h: 10 },
    { x: 0, y: 130, w: 30, h: 10 },
    { x: 70, y: 180, w: 30, h: 10 },
    { x: 80, y: 90, w: 10, h: 100 },
    { x: 146, y: 137, w: 120, h: 30 },
    { x: 0, y: 240, w: 300, h: 10 },
    { x: 100, y: 300, w: 100, h: 10 },
    { x: 300, y: 150, w: 10, h: 200 },
    { x: 200, y: 300, w: 10, h: 60 },
    { x: 100, y: 400, w: 4000, h: 10 },
    { x: 100, y: 400, w: 10, h: 100 },
    { x: 170, y: 480, w: 10, h: 20 },
    { x: 250, y: 400, w: 10, h: 40 },
    { x: 100, y: 500, w: 160, h: 10 },
    { x: 100, y: 500, w: 160, h: 10 },

    { x: 350, y: 20, w: 50, h: 50, victory: true },
]

function draw() {
    pl.x += pl.movex * 5
    pl.y -= pl.movey * 5
    if (!pl.ready && (pl.movex || pl.movey)) {
        pl.ready = true
        pl.start = new Date
    }
    // if (mouseX) {
    //     pl.x = mouseX
    //     pl.y = mouseY
    // }

    const hit = getCollision()

    background(0);

    squares.forEach(s => {
        let color = intersects(pl, s) ? '#f00' : '#f40'
        if (s.victory) color = '#0ff'
        fill(color)
        stroke(color)
        // stroke('#000')
        rect(s.x, s.y, s.w, s.h)
    })

    fill(hit ? 'red' : '#0f0')
    stroke('#000')
    circle(pl.x, pl.y, pl.r * 2)

    if (hit && !int) {
        int = setTimeout(() => {
            if (hit.victory) {
                pl.end = new Date
                alert('Hai vinto!!\nTempo: ' + ((pl.end - pl.start) / 1000).toFixed(2)+'s')
            } else {
                alert('You lose :(')
                initGame()
                int = 0
            }
        }, 500)
    }


    if (pl.ready) {
        fill('white')
        text((((pl.end ?? new Date) - pl.start) / 1000).toFixed(2) + 's', 125, 485)
    }
}

let int = 0



window.onload = () => {
    document.getElementById('l').onmousedown = document.getElementById('l').ontouchstart = () => { pl.movex = -1 }
    document.getElementById('l').onmouseup = document.getElementById('l').ontouchend = () => { pl.movex = 0 }
    document.getElementById('r').onmousedown = document.getElementById('r').ontouchstart = () => { pl.movex = 1 }
    document.getElementById('r').onmouseup = document.getElementById('r').ontouchend = () => { pl.movex = 0 }
    document.getElementById('b').onmousedown = document.getElementById('b').ontouchstart = () => { pl.movey = -1 }
    document.getElementById('b').onmouseup = document.getElementById('b').ontouchend = () => { pl.movey = 0 }
    document.getElementById('t').onmousedown = document.getElementById('t').ontouchstart = () => { pl.movey = 1 }
    document.getElementById('t').onmouseup = document.getElementById('t').ontouchend = () => { pl.movey = 0 }
}
function getCollision() {
    return squares.find(s => intersects(pl, s))
}
function intersects(circle, rect) {
    var distX = Math.abs(circle.x - rect.x - rect.w / 2);
    var distY = Math.abs(circle.y - rect.y - rect.h / 2);

    if (distX > (rect.w / 2 + circle.r)) { return false; }
    if (distY > (rect.h / 2 + circle.r)) { return false; }

    if (distX <= (rect.w / 2)) { return true; }
    if (distY <= (rect.h / 2)) { return true; }

    var dx = distX - rect.w / 2;
    var dy = distY - rect.h / 2;
    return (dx * dx + dy * dy <= (circle.r * circle.r));
}

