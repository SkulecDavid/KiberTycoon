import { UI } from "./UI.ts";
import { Button } from "./Button.ts";
import type { HEXColor } from "../Types/Color.ts";

export class Game{
    private Canvas: HTMLCanvasElement;
    public CanvasWidth: number;
    public CanvasHeight: number;
    public Ctx: CanvasRenderingContext2D;

    public DarkColor: HEXColor;
    public FontSize: number;
    public OneFourthWidth: number;
    public OneTwelfthHeight: number;
    public OneNinthHeight: number
    public OneSixthHeight: number;
    public BtnPositionX: number;
    public BtnPositionY: number;

    public MouseDown: boolean
    public MouseX: number;
    public MouseY: number;

    //private TestBtn: Button;
    private MineBtn: Button;
    private MarketBtn: Button;
    private TechBtn: Button;
    private StatBtn: Button;

    private Ui: UI;

    constructor(canvas: HTMLCanvasElement){
        // CANVAS
        this.Canvas = canvas;
        this.CanvasWidth = this.Canvas.width;
        this.CanvasHeight = this.Canvas.height;
        this.Ctx = this.Canvas.getContext('2d')!;

        this.DarkColor = '#451804';
        this.FontSize = 20;
        this.OneFourthWidth = this.CanvasWidth/4;
        this.OneTwelfthHeight = this.CanvasHeight/12;
        this.OneNinthHeight = this.CanvasHeight/9;
        this.OneSixthHeight = this.CanvasHeight/6;
        this.BtnPositionX = this.CanvasWidth-this.OneFourthWidth;
        this.BtnPositionY = this.CanvasHeight-this.OneNinthHeight;

        this.clickInput();
        this.MouseDown = false;
        this.MouseX = 0;
        this.MouseY = 0;

        //this.TestBtn = new Button(this, 'Teszt', 100, 50, ()=>console.log('ok'));
        this.MineBtn = new Button(this, 'Bányák', this.BtnPositionX, this.BtnPositionY-this.OneNinthHeight*3, ()=>console.log('Bánya'));
        this.MarketBtn = new Button(this, 'Piac', this.BtnPositionX, this.BtnPositionY-this.OneNinthHeight*2, ()=>console.log('Piac'));
        this.TechBtn = new Button(this, 'Kutatás', this.BtnPositionX, this.BtnPositionY-this.OneNinthHeight, ()=>console.log('Kutat'));
        this.StatBtn = new Button(this, 'Statisztika', this.BtnPositionX, this.BtnPositionY, ()=>console.log('Stat'));


        this.Ui = new UI(this);
    }

    update(){
        //this.TestBtn.update();
        this.MineBtn.update();
        this.MarketBtn.update();
        this.TechBtn.update();
        this.StatBtn.update();
    }

    draw(){
        this.Ui.draw();
        //this.TestBtn.draw();
        this.MineBtn.draw();
        this.MarketBtn.draw();
        this.TechBtn.draw();
        this.StatBtn.draw();
    }

    loop(){
        this.Ctx.clearRect(0, 0, this.CanvasWidth, this.CanvasHeight);
        this.update();
        this.draw();
        this.MouseDown = false;
        requestAnimationFrame(() => this.loop());
    }

    start(){
        this.loop()
    }

    clickInput(){
        window.addEventListener('click', (e)=>{
            this.MouseX = Math.floor(e.x - (window.innerWidth - this.CanvasWidth) / 2);
            this.MouseY = e.y - (20+20+28+20+5) // div margin + 2x h1 margin + hi font-size + canvas border
            this.MouseDown = true;
        })
    }
}