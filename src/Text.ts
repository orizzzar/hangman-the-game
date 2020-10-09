/**
 * Responsible for drawing a piece of text to the canvas.
 */
class TextBlock {

    /**
     * The X-coordinate in pixels of this TextItem
     */
    public xCoordinate: number;

    /**
     * The Y-coordinate of this TextItem
     */
    public yCoordinate: number;

    /**
     * The text that this TextItem will draw
     */
    public text: string;

    /**
     * The font of this text
     */
    public font: string = "Edmunds";

    /**
     * The font size in pixels of this text
     */
    public fontSize: number = 60;

    /**
     * The fillStyle of this text. Can be set to a color or some other style.
     * 
     * @see [CanvasRenderingContext2D.fillStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
     */
    public fillStyle: string | CanvasGradient | CanvasPattern = "white";

    /**
     * The text alignment of this text
     * 
     * @see [CanvasRenderingContext2D.textAlign](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/textAlign)
     */
    public textAlign: CanvasTextAlign = "center";

    /**
     * Constructs a new TextItem.
     * 
     * @param {number} xCoordinate - Horizontal coordinate in pixels
     * @param {number} yCoordinate - Vertical coordinate in pixels
     * @param {string} text - Text to write
     */
    public constructor(xCoordinate: number, yCoordinate: number, text: string) {
        this.xCoordinate = xCoordinate;
        this.yCoordinate = yCoordinate;
        this.text = text;
    }


    /**
     * Draws the current text with the current settings to the specified
     * CanvasRenderingContext2D.
     * 
     * @param {CanvasRenderingContext2D} ctx - The renderingcontext to draw on 
     */
    public drawText(ctx: CanvasRenderingContext2D) {
        ctx.font = `${this.fontSize}px ${this.font}`;
        ctx.fillStyle = this.fillStyle;
        ctx.textAlign = this.textAlign;
        ctx.fillText(this.text, this.xCoordinate, this.yCoordinate);
    }

}