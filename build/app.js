class Ellipse {
    constructor(x, y, radiusX, radiusY) {
        this.rotation = 0;
        this.startAngle = 0;
        this.endAngle = 2 * Math.PI;
        this.clockwise = false;
        this.lineWidth = 1;
        this.strokeStyle = "white";
        this.fill = true;
        this.fillStyle = "white";
        this.x = x;
        this.y = y;
        this.radiusX = radiusX;
        this.radiusY = (radiusY ? radiusY : radiusX);
    }
    drawCircle(ctx) {
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radiusX, this.radiusY, this.rotation, this.startAngle, this.endAngle);
        if (this.fill) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class Game {
    constructor(canvasId) {
        this.legs = { left: undefined, right: undefined };
        this.arms = { left: undefined, right: undefined };
        this.knownLetters = ['a', 'o'];
        this.keyPress = (ev) => {
            let key = ev.key;
            let alphabet = "abcdefghijklmnopqrstuvwxyz";
            console.log(`Key ${key} has been pressed`);
            key = key.toLowerCase();
            if (!alphabet.includes(key) || this.knownLetters.includes(key)) {
                return;
            }
            if (this.guessLetter(key)) {
                this.word.text = this.getFormattedWord();
                this.drawCanvas();
                if (!this.word.text.includes("_")) {
                    this.lose();
                }
            }
            else {
                this.attempts--;
                this.drawCanvas();
                if (this.attempts === 0) {
                    this.lose();
                }
            }
        };
        this.canvas = canvasId;
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.ctx = this.canvas.getContext('2d');
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        this.attempts = 6;
        this.words = [
            "apple", "tomato", "carpet", "window"
        ];
        this.loadRandomWord();
        this.guessLetter(this.wordToGuess.charAt(Math.floor(Math.random() * this.wordToGuess.length)));
        this.title = new TextString(cx, 70, "Hangman, the game");
        this.word = new TextString(cx, 220, this.getFormattedWord());
        this.base = new Rectangle(cx - 300, cy * 1.75, 600, 50);
        this.base.fillStyle = "brown";
        this.frameVertical = new Line(cx - 110, cy * 1.75, cx - 100, cy * 1.00);
        this.frameVertical.strokeStyle = "Orange";
        this.frameVertical.lineWidth = 15;
        this.frameHorizontal = new Line(cx - 125, cy * 1.00, cx + 80, cy * 1.00);
        this.frameHorizontal.strokeStyle = "Orange";
        this.frameHorizontal.lineWidth = 12;
        this.loop = new Line(cx + 72, cy * 1.00, cx + 70, cy * 1.1);
        this.loop.strokeStyle = "brown";
        this.loop.lineWidth = 7;
        this.head = new Ellipse(cx + 70, cy * 1.1 + 20, 30, 20);
        this.head.fillStyle = "Aqua";
        this.body = new Line(cx + 70, cy * 1.1 + 40, cx + 70, cy * 1.5);
        this.body.strokeStyle = "Aqua";
        this.body.lineWidth = 7;
        this.arms.left = new Line(cx + 70, cy * 1.25, cx + 20, cy * 1.2);
        this.arms.right = new Line(cx + 70, cy * 1.25, cx + 120, cy * 1.2);
        this.arms.left.strokeStyle = this.arms.right.strokeStyle = "Aqua";
        this.arms.left.lineWidth = this.arms.right.lineWidth = 4;
        this.legs.left = new Line(cx + 70, cy * 1.5, cx + 20, cy * 1.55);
        this.legs.right = new Line(cx + 70, cy * 1.5, cx + 120, cy * 1.55);
        this.legs.left.strokeStyle = this.legs.right.strokeStyle = "Aqua";
        this.legs.left.lineWidth = this.legs.right.lineWidth = 5;
        this.drawCanvas();
        window.addEventListener("keypress", this.keyPress);
    }
    drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);
        this.base.drawRectangle(this.ctx);
        if (this.attempts <= 5)
            this.frameVertical.drawLine(this.ctx);
        if (this.attempts <= 3)
            this.loop.drawLine(this.ctx);
        if (this.attempts <= 4)
            this.frameHorizontal.drawLine(this.ctx);
        if (this.attempts <= 2)
            this.body.drawLine(this.ctx);
        if (this.attempts <= 3)
            this.head.drawCircle(this.ctx);
        if (this.attempts <= 1)
            this.arms.left.drawLine(this.ctx);
        if (this.attempts <= 1)
            this.arms.right.drawLine(this.ctx);
        if (this.attempts <= 0)
            this.legs.left.drawLine(this.ctx);
        if (this.attempts <= 0)
            this.legs.right.drawLine(this.ctx);
    }
    loadRandomWord() {
        this.wordToGuess = this.words[Math.floor(this.words.length * Math.random())];
    }
    getFormattedWord() {
        let formattedWord = "";
        for (const letterInWord of this.wordToGuess) {
            if (this.knownLetters.includes(letterInWord)) {
                formattedWord += letterInWord;
            }
            else {
                formattedWord += "_";
            }
        }
        formattedWord = formattedWord.split('').join(' ');
        return formattedWord;
    }
    guessLetter(letter) {
        for (const letterInWord of this.wordToGuess) {
            if (letter === letterInWord) {
                this.knownLetters.push(letter);
                return true;
            }
        }
        return false;
    }
    lose() {
        this.canvas.style.filter = "blur(4px) grayscale(80%)";
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
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(this.x1, this.y1);
        ctx.lineTo(this.x2, this.y2);
        ctx.lineWidth = this.lineWidth;
        ctx.strokeStyle = this.strokeStyle;
        ctx.stroke();
        ctx.restore();
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
        ctx.save();
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            console.log(this.fillStyle);
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        }
        else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
        ctx.restore();
    }
}
class TextString {
    constructor(x, y, text) {
        this.font = "Edmunds";
        this.fontSize = 60;
        this.fillStyle = "white";
        this.textAlign = "center";
        this.textBaseline = "alphabetic";
        this.x = x;
        this.y = y;
        this.text = text;
    }
    drawText(ctx) {
        ctx.save();
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlign;
        ctx.textBaseline = this.textBaseline;
        ctx.fillText(this.text, this.x, this.y);
        ctx.restore();
    }
}
//# sourceMappingURL=app.js.map