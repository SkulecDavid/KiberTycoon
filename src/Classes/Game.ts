export class Game{
    private Canvas: HTMLCanvasElement;
    private CanvasWidth: number;
    private CanvasHeight: number;
    private Ctx: CanvasRenderingContext2D;
    constructor(canvas: HTMLCanvasElement){
        // CANVAS
        this.Canvas = canvas;
        this.CanvasWidth = this.Canvas.width;
        this.CanvasHeight = this.Canvas.height;
        this.Ctx = this.Canvas.getContext('2d')!;

        this.clickInput();
    }

    update(): void {

    }

    draw(): void {

    }

    loop(): void {
        this.Ctx.clearRect(0, 0, this.CanvasWidth, this.CanvasHeight);
        this.update();
        this.draw();
    }

    start(): void {
        this.loop()
    }

    clickInput(): void {
        window.addEventListener('click', (e)=>{
            console.log(e.x - (window.innerWidth - this.CanvasWidth) / 2, e.y - (20+28+20+20+5));
        })
    }
}