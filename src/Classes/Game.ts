import { UI } from "./UI.ts";
import { Button } from "./Button.ts";
import { BG } from "./BG.ts";
import { Menu } from "./Menu.ts";
import type { HEXColor } from "../Types/Color.ts";
import type { MenuType } from "../Types/MenuType.ts";
import type { Terra } from "../Types/Terra.ts";
import { Area } from "./Area.ts";
import { Mine } from "./Mine.ts";
import { Building } from "./Building/Building.ts";


export class Game{
    private Canvas: HTMLCanvasElement;
    public CanvasWidth: number;
    public CanvasHeight: number;
    public Ctx: CanvasRenderingContext2D;

    public LightColor: HEXColor = '#e3c09d';
    public DarkColor: HEXColor = '#451804';
    public MainBtnColor: HEXColor = '#dd6345';
    public FontSize: number = 20;
    public QuarterWidth: number;
    public OneTwelfthHeight: number;
    public OneSixthHeight: number;
    public BtnPositionX: number;
    public BtnPositionY: number;
    public TerraTextHeight: number;
    public MenuTextHeight: number;
    public SmallDivX: number;
    public SmallDivY: number;
    public SmallDivHeight: number;
    public LargeDivHeight: number;
    public SmallDivWidth: number;
    public MainBtnHeight: number;
    public SmallBtnHeight: number;
    public SmallBtnWidth: number;
    public BuildingSize: number;

    public MouseDown: boolean = false;
    public MouseX: number = 0;
    public MouseY: number = 0;

    private MineBtn: Button;
    private MarketBtn: Button;
    private TechBtn: Button;
    private StatBtn: Button;
    private BackBtn: Button;

    private MainUi: UI;
    private MainBg: BG;
    private MenuBg: Menu;
    public CurrentMenu: MenuType = 'main';

    //private MineMenu: Mine;
    //private Build: Building;

    private Mines: Mine[];

    private BuildAreas: Area[][];

    public Credit: number = 225; // DEFAULT 225
    public Material: number = 0; // DEFAULT 0
    public TechPoint: number = 0;
    public TerraLvl: Terra = 0;

    public RawCoal: number = 0;
    public RawCopper: number = 0;
    public RawIron: number = 0;
    public RawGold: number = 0;

    constructor(canvas: HTMLCanvasElement){
        this.Canvas = canvas;
        this.CanvasWidth = this.Canvas.width;
        this.CanvasHeight = this.Canvas.height;
        this.Ctx = this.Canvas.getContext('2d')!;

        this.QuarterWidth = this.CanvasWidth/4;
        this.OneSixthHeight = this.CanvasHeight/6;
        this.OneTwelfthHeight = this.OneSixthHeight/2;
        this.TerraTextHeight = this.OneSixthHeight*1.2;
        this.MenuTextHeight = this.OneTwelfthHeight*1.5;
        this.SmallDivX = (this.OneTwelfthHeight/2)*1.33;
        this.SmallDivY = this.OneSixthHeight+this.SmallDivX;
        this.SmallDivHeight = (this.OneTwelfthHeight/2)*8;
        this.LargeDivHeight = this.OneTwelfthHeight*7;
        this.SmallDivWidth = this.OneTwelfthHeight*4;
        this.MainBtnHeight = this.CanvasHeight/9;
        this.SmallBtnHeight = this.MainBtnHeight*0.75;
        this.SmallBtnWidth = this.OneTwelfthHeight*3.5;
        this.BuildingSize = this.OneSixthHeight/2;
        
        this.BtnPositionX = this.CanvasWidth-this.QuarterWidth;
        this.BtnPositionY = this.CanvasHeight-this.MainBtnHeight;

        this.MineBtn = new Button(this, this.MainBtnColor, 'Bányák', this.BtnPositionX, this.BtnPositionY-this.MainBtnHeight*3, this.QuarterWidth, this.MainBtnHeight, ()=>{this.CurrentMenu = 'mine'});
        this.MarketBtn = new Button(this, this.MainBtnColor, 'Piac', this.BtnPositionX, this.BtnPositionY-this.MainBtnHeight*2, this.QuarterWidth, this.MainBtnHeight, ()=>{this.CurrentMenu = 'market'});
        this.TechBtn = new Button(this, this.MainBtnColor, 'Kutatás', this.BtnPositionX, this.BtnPositionY-this.MainBtnHeight, this.QuarterWidth, this.MainBtnHeight, ()=>{this.CurrentMenu = 'tech'});
        this.StatBtn = new Button(this, this.MainBtnColor, 'Statisztika', this.BtnPositionX, this.BtnPositionY, this.QuarterWidth, this.MainBtnHeight, ()=>{this.CurrentMenu = 'stat'});
        this.BackBtn = new Button(this, this.MainBtnColor, 'Vissza', this.BtnPositionX, this.BtnPositionY, this.QuarterWidth, this.MainBtnHeight, ()=>{this.CurrentMenu = 'main'});

        this.clickInput();
        this.MainUi = new UI(this);
        this.MainBg = new BG(this, 'mars-img');
        this.MenuBg = new Menu(this);

        /*this.MineMenu = new Mine(this, {type: 1, number: 0, price: 200, upgrade: 100, speed: 64})
        this.MineMenu.IsAvailable = true;
        this.MineMenu.Level = 1;*/
        //this.Build = new Building(this, [0,0], ()=>{console.log('ok')})
        
        this.Mines = new Array();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 2; j++) {
                this.Mines.push(new Mine(this, {type: i, number: j, price: 200*(2**(i)), upgrade: (200*(2**(i)))/2, speed: 64-(16*i), material:(i+1)*2, tech:(i+1)*4}));
                if (i == 0) {
                    this.Mines[j].IsAvailable = true;
                }
            }
        }
        console.log(this.Mines);
        
        

        this.BuildAreas = new Array(4);
        for (let row = 0; row < 4; row++) {
            this.BuildAreas[row] = new Array(5);
            for (let col = 0; col < 5; col++) {
                this.BuildAreas[row][col] = new Area(this, [row, col]);
            }
        }
        for (let row = 1; row < 3; row++) {
            for (let col = 1; col < 4; col++) {
                this.BuildAreas[row][col].Status = 'empty';
            }
        }
    }

    update(){
        this.MenuBg.update();
        this.MainUi.update();
        
        if (this.CurrentMenu == 'main') {
            this.MineBtn.update();
            this.MarketBtn.update();
            this.TechBtn.update();
            this.StatBtn.update();

            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 5; col++) {
                    this.BuildAreas[row][col].update();
                }
            }

            //this.Build.update();
        } else {
            if (this.CurrentMenu == 'mine') {
                //this.MineMenu.update();
                this.Mines.forEach(mine => {
                    //mine.IsAvailable = true;
                    mine.update();
                });
            }
            this.BackBtn.update();
        }
    }

    draw(){      
        this.MainBg.draw();
        this.MenuBg.draw();
        this.MainUi.draw();
        
        if (this.CurrentMenu == 'main') {
            this.MineBtn.draw();
            this.MarketBtn.draw();
            this.TechBtn.draw();
            this.StatBtn.draw();

            for (let row = 0; row < 4; row++) {
                for (let col = 0; col < 5; col++) {
                    this.BuildAreas[row][col].draw();
                }
            }

            //this.Build.draw();
        } else {
            if (this.CurrentMenu == 'mine') {
                //this.MineMenu.draw();
                this.Mines.forEach(mine => {
                    mine.draw();
                });
            }
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

    avg(a: number, b: number): number{
        return (a+b)/2;
    }
}