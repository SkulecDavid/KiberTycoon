import { UI } from "./UI.ts";
import { Button } from "./Button.ts";
import { BG } from "./BG.ts";
import { Menu } from "./Menu.ts";
import type { HEXColor } from "../Types/Color.ts";
import type { MenuType } from "../Types/MenuType.ts";


export class Game{
    private Canvas: HTMLCanvasElement;
    public CanvasWidth: number;
    public CanvasHeight: number;
    public Ctx: CanvasRenderingContext2D;

    public LightColor: HEXColor = '#e3c09d';
    public DarkColor: HEXColor = '#451804';
    public MainBtnColor: HEXColor = '#dd6345';
    public FontSize: number = 20;
    public OneFourthWidth: number;
    public OneTwentyfourthHeight: number;
    public OneTwelfthHeight: number;
    public OneNinthHeight: number
    public OneSixthHeight: number;
    public BtnPositionX: number;
    public BtnPositionY: number;

    public MouseDown: boolean = false;
    public MouseX: number = 0;
    public MouseY: number = 0;

    private MineBtn: Button;
    private MarketBtn: Button;
    private TechBtn: Button;
    private StatBtn: Button;
    private BackBtn: Button;

    private Ui: UI = new UI(this);
    private Bg: BG = new BG(this, 'mars-img');
    public CurrentMenu: MenuType = 'main';
    private MenuBg: Menu = new Menu(this);

    constructor(canvas: HTMLCanvasElement){
        this.Canvas = canvas;
        this.CanvasWidth = this.Canvas.width;
        this.CanvasHeight = this.Canvas.height;
        this.Ctx = this.Canvas.getContext('2d')!;

        this.OneFourthWidth = this.CanvasWidth/4;
        this.OneSixthHeight = this.CanvasHeight/6;
        this.OneNinthHeight = this.CanvasHeight/9;
        this.OneTwelfthHeight = this.OneSixthHeight/2
        this.OneTwentyfourthHeight = this.OneTwelfthHeight/2
        
        this.BtnPositionX = this.CanvasWidth-this.OneFourthWidth;
        this.BtnPositionY = this.CanvasHeight-this.OneNinthHeight;

        this.MineBtn = new Button(this, this.MainBtnColor, 'Bányák', this.BtnPositionX, this.BtnPositionY-this.OneNinthHeight*3, ()=>{this.CurrentMenu = 'mine'});
        this.MarketBtn = new Button(this, this.MainBtnColor, 'Piac', this.BtnPositionX, this.BtnPositionY-this.OneNinthHeight*2, ()=>{this.CurrentMenu = 'market'});
        this.TechBtn = new Button(this, this.MainBtnColor, 'Kutatás', this.BtnPositionX, this.BtnPositionY-this.OneNinthHeight, ()=>{this.CurrentMenu = 'tech'});
        this.StatBtn = new Button(this, this.MainBtnColor, 'Statisztika', this.BtnPositionX, this.BtnPositionY, ()=>{this.CurrentMenu = 'stat'});
        this.BackBtn = new Button(this, this.MainBtnColor, 'Vissza', this.BtnPositionX, this.BtnPositionY, ()=>{this.CurrentMenu = 'main'});

        this.clickInput();
    }

    update(){
        this.MenuBg.update();
        
        if (this.CurrentMenu == 'main') {
            this.MineBtn.update();
            this.MarketBtn.update();
            this.TechBtn.update();
            this.StatBtn.update();
        } else {
            this.BackBtn.update();
        }
    }

    draw(){      
        this.Bg.draw();
        this.MenuBg.draw();
        this.Ui.draw();
        
        if (this.CurrentMenu == 'main') {
            this.MineBtn.draw();
            this.MarketBtn.draw();
            this.TechBtn.draw();
            this.StatBtn.draw();
        } else {
            this.BackBtn.draw();
        }
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