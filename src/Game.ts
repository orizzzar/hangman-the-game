class Game {

    /**
     * @internal Holds the canvas HTML element where this game should draw on. 
     * This variable knows the screen's size.
     * 
     * @see [HTMLCanvasElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement)
     */
    private readonly canvas: HTMLCanvasElement;
    
    
    /**
     * @internal attribute that holds the RenderContext to draw on. This will
     * be used in the `draw()` method.
     * 
     * @see [CanvasRenderingContext2D](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D)
     */
    private readonly ctx: CanvasRenderingContext2D;

    // The game screen components
    private title: TextString;
    private word: TextString;

    // The hangman parts
    private base: Rectangle;
    private frameVertical: Line;
    private frameHorizontal: Line;
    private loop: Line;
    private head: Ellipse;
    private body: Line;
    private legs: {left: Line, right: Line} = {left: undefined, right: undefined};
    private arms: {left: Line, right: Line} = {left: undefined, right: undefined};

    // List of words for guessing
    private words: string[];

    // Other
    private knownLetters: string[] = ['a', 'o'];
    private wordToGuess: string;
    private attempts: number;

    /**
     * Construct a new Game.
     * 
     * @param {HTMLCanvasElement} canvasId 
     */
    public constructor(canvasId: HTMLCanvasElement) {
        // Construct all of the canvas
        this.canvas = canvasId;
        // Resize the canvas to fit the entire window
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        // Set the context of the canvas
        this.ctx = this.canvas.getContext('2d');

        // Initialize the game items
        const cx = this.canvas.width / 2;
        const cy = this.canvas.height / 2;
        this.attempts = 6;

        // Word list
        this.words = [
            "apple", "tomato", "carpet", "window"
        ]

        this.loadRandomWord();
        this.guessLetter(this.wordToGuess.charAt(Math.floor(Math.random() * this.wordToGuess.length)));
        this.title = new TextString(cx, 70, "Hangman, the game");
        this.word = new TextString(cx, 220, this.getFormattedWord());
        
        // Hangman
        // (6/6) - the base of the hangman
        this.base = new Rectangle(cx - 300, cy * 1.75, 600, 50);
        this.base.fillStyle = "brown";
        // (5/6) - vertical (first) frame part
        this.frameVertical = new Line(cx - 110, cy * 1.75, cx - 100, cy * 1.00);
        this.frameVertical.strokeStyle = "Orange";
        this.frameVertical.lineWidth = 15;
        // (4/6) - horizontal (second) frame part
        this.frameHorizontal = new Line(cx - 125, cy * 1.00, cx + 80, cy * 1.00);
        this.frameHorizontal.strokeStyle = "Orange";
        this.frameHorizontal.lineWidth = 12;
        // (3/6) - loop
        this.loop = new Line(cx + 72, cy * 1.00, cx + 70, cy * 1.1);
        this.loop.strokeStyle = "brown";
        this.loop.lineWidth = 7;
        // (3/6) - head
        this.head = new Ellipse(cx + 70, cy * 1.1 + 20, 30, 20);
        this.head.fillStyle = "Aqua";
        // (2/6) - body
        this.body = new Line(cx + 70, cy * 1.1 + 40, cx + 70, cy * 1.5);
        this.body.strokeStyle = "Aqua";
        this.body.lineWidth = 7;
        // (1/6) - arms
        this.arms.left = new Line(cx + 70, cy * 1.25, cx + 20, cy * 1.2);
        this.arms.right = new Line(cx + 70, cy * 1.25, cx + 120, cy * 1.2);
        this.arms.left.strokeStyle = this.arms.right.strokeStyle = "Aqua";
        this.arms.left.lineWidth = this.arms.right.lineWidth = 4;
        // (0/6) - legs
        this.legs.left = new Line(cx + 70, cy * 1.5, cx + 20, cy * 1.55);
        this.legs.right = new Line(cx + 70, cy * 1.5, cx + 120, cy * 1.55);
        this.legs.left.strokeStyle = this.legs.right.strokeStyle = "Aqua";
        this.legs.left.lineWidth = this.legs.right.lineWidth = 5;

        // Draw the canvas
        this.drawCanvas();

        // Attach an eventlistener to the keyUp event
        window.addEventListener("keypress", this.keyPress);
    }


    /**
     * (Re)draws the canvas.
     */
    private drawCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.title.drawText(this.ctx);
        this.word.drawText(this.ctx);

        // Draw the hangman
        this.base.drawRectangle(this.ctx);
        if (this.attempts <= 5) this.frameVertical.drawLine(this.ctx);
        if (this.attempts <= 3) this.loop.drawLine(this.ctx);
        if (this.attempts <= 4) this.frameHorizontal.drawLine(this.ctx);
        if (this.attempts <= 2) this.body.drawLine(this.ctx);
        if (this.attempts <= 3) this.head.drawCircle(this.ctx);
        if (this.attempts <= 1) this.arms.left.drawLine(this.ctx);
        if (this.attempts <= 1) this.arms.right.drawLine(this.ctx);
        if (this.attempts <= 0) this.legs.left.drawLine(this.ctx);
        if (this.attempts <= 0) this.legs.right.drawLine(this.ctx);

        // TODO draw the other parts of the hangman
    }

    private loadRandomWord() {
        this.wordToGuess = this.words[Math.floor(this.words.length * Math.random())];
    }

    private getFormattedWord(): string {
        let formattedWord = "";
        for (const letterInWord of this.wordToGuess) {
            if (this.knownLetters.includes(letterInWord)) {
                formattedWord += letterInWord;
            } else {
                formattedWord += "_";
            }
        }
        formattedWord = formattedWord.split('').join(' ');
        return formattedWord;
    }

    /**
     * 
     * 
     * @param letter 
     */
    private guessLetter(letter: string): boolean {
        for (const letterInWord of this.wordToGuess) {
            if (letter === letterInWord) {
                this.knownLetters.push(letter);
                return true;
            }
        }
        return false;
    }



    

    /**
     * @internal Arrow method that catches keyup events
     * WARNING: DO NOT USE OR REMOVE THIS METHOD
     */
    private keyPress = (ev: KeyboardEvent) => {
        // TODO handle key pressed events
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
                // TODO win
                this.lose();
            }
        } else {
            this.attempts--;
            this.drawCanvas();
            if (this.attempts === 0) {
                this.lose();
            }
        }
    }

    private lose() {
        // TODO
        this.canvas.style.filter = "blur(4px) grayscale(80%)";
    }


}

// DO NOT CHANGE THE CODE BELOW!

// Declare the game object as global variable for debugging purposes
let game = null;

// Add EventListener to load the game whenever the browser is ready
window.addEventListener('load', function () {
    game = new Game(<HTMLCanvasElement>document.getElementById('canvas'));
});
