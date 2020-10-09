/**
 * Responsible for drawing a rectangle on the canvas.
 */
class Rectangle {

    public x: number;
    

    public y: number;
    

    public width: number;
    

    public height: number;

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

    /**
     * If `true`, the rectangle will be filled, using the current fillStyle.
     * Otherwise it will be stroked with the current lineWidth and strokeStyle.
     */
    public fill: boolean = true;

    /**
     * The fillStyle of this text. Can be set to a color or some other style.
     * 
     * @see [CanvasRenderingContext2D.fillStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
     */
    public fillStyle: string | CanvasGradient | CanvasPattern = "white";


    /**
     * constructor
     */
    public constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /**
     * Draws the current rectangle with the current settings to the specified
     * CanvasRenderingContext2D.
     * 
     * @param {CanvasRenderingContext2D} ctx - The renderingcontext to draw on 
     */
    public drawRectangle(ctx: CanvasRenderingContext2D) {
        ctx.rect(this.x, this.y, this.width, this.height);
        if (this.fill) {
            ctx.fillStyle = this.fillStyle;
            ctx.fill();
        } else {
            ctx.lineWidth = this.lineWidth;
            ctx.strokeStyle = this.strokeStyle;
            ctx.stroke();
        }
    }

}