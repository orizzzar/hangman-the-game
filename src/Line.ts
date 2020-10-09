/**
 * Responsible for drawing a line to the canvas.
 */
class Line {

    public x1: number;

    public y1: number;

    public x2: number;

    public y2: number;

    /**
     * Sets the thickness of lines for this rectangle.
     * 
     * @see [CanvasRenderingContext2D.lineWidth](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineWidth)
     */
    public lineWidth: number = 1;


    /**
     * The strokeStyle of this rectangle. Can be set to a color or some other 
     * style.
     * 
     * @see [CanvasRenderingContext2D.strokeStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle)
     */
    public strokeStyle: string | CanvasGradient | CanvasPattern = "white";


    public constructor(x1: number, y1: number, x2: number, y2: number) {
        this.x1 = x1;
        this.y1 = y1;
        this.x2 = x2;
        this.y2 = y2;
    }

    /**
     * Draws the current line with the current settings to the specified
     * CanvasRenderingContext2D.
     * 
     * @param {CanvasRenderingContext2D} ctx - The renderingcontext to draw on 
     */
    public drawLine(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();              // Start a new path
        ctx.moveTo(this.x1, this.y1); // Move the pen to (x1, y1)
        ctx.lineTo(this.x2, this.y2); // Draw a line to (x1, y2)
        ctx.stroke();                 // Render the path
    }
}