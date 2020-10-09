class Game {
    constructor(canvasId) {
        this.keyPress = (ev) => {
            console.log(`Key ${ev.key} has been pressed`);
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        this.title = new TextBlock(cx, 70, "Hangman, the game");
        this.word = new TextBlock(cx, 220, "_ _ _ _ _ _ _ _");
        this.base = new Rectangle(cx - 300, cy * 1.75, 600, 50);
        this.base.fillStyle = "brown";
        this.drawCanvas();
        window.addEventListener("keypress", this.keyPress);
    }
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);
        this.base.drawRectangle(this.ctx);
    }
}
let game = null;
window.addEventListener('load', function () {
    game = new Game(document.getElementById('canvas'));
});
class Line {
    constructor(x1, y1, x2, y2) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }
    drawLine(ctx) {
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.stroke();
    }
}
class Rectangle {
    constructor(x, y, width, height) {
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
    drawRectangle(ctx) {
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
    }
}
class TextBlock {
    constructor(xCoordinate, yCoordinate, text) {
        this.font = "Edmunds";
        this.fontSize = 60;
        this.fillStyle = "white";
        this.textAlign = "center";
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.text = text;
    }
    drawText(ctx) {
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.xCoordinate, this.yCoordinate);
    }
}
//# sourceMappingURL=app.js.map