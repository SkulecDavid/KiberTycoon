import { UI } from "./UI/UI.ts";
import { Button } from "./UI/Button.ts";
import { BG } from "./UI/BG.ts";
import { Menu } from "./Menu/Menu.ts";
import type { HEXColor } from "../Types/Color.ts";
import type { MenuType } from "../Types/MenuType.ts";
import type { Terra } from "../Types/Terra.ts";
import { Area } from "./UI/Area.ts";
import { Mine } from "./Menu/Mine.ts";
import { Market } from "./Menu/Market.ts";
import { Tech } from "./Menu/Tech.ts";
import { Stat } from "./Menu/Stat.ts";


export class Game{
    private Canvas: HTMLCanvasElement;
    public CanvasWidth: number;
    public CanvasHeight: number;
    public Ctx: CanvasRenderingContext2D;

    public Images: HTMLImageElement[];
        // 0-3-refinery 4-7-factory 8-11-terraform 12-14-Resources 15-storage

    public LightColor: HEXColor = '#e3c09d';
    public DarkColor: HEXColor = '#451804';
    public MainBtnColor: HEXColor = '#dd6345';
    public TechBtnColor: HEXColor = '#e39776'
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
    public TechBtnHeight: number;
    public TechBtnWidth: number;
    public TechBtnX: number;
    public TechBtnY: number;

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

    public Mines: Mine[];
    private MarketMenu: Market;
    public Techs: Tech[];
    private Stats: Stat;

    public BuildAreas: Area[][];
    public Technologies: boolean[] = [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]

    public Credit: number = 200000; // DEFAULT 200
    public Material: number = 500000; // DEFAULT 50
    public TechPoint: number = 999999; // DEFAULT 0
    public TerraPoint: number = 9999; // DEFAULT 0
    public TerraLvl: Terra = 0;

    public FullCap: number = 0;
    public RawMaterials: number[] = [0, 0, 0, 0];
    public Materials: number[] = [0, 0, 0, 0];
    public Items: number[] = [0, 0, 0, 0];


    public SpentCredits: number = 0;
    public SpentMaterials: number = 0;
    public SpentTechPoints: number = 0;

    public EarnedCredits: number = 0;
    public EarnedMaterials: number = 0;
    public EarnedTechPoints: number = 0;

    public MinedCoal: number = 0;
    public MinedCopper: number = 0;
    public MinedIron: number = 0;
    public MinedGold: number = 0;

    public BuiltBuildings: number = 0;
    public BoughtMines: number = 0;
    public BoughtTechs: number = 0;
    public BoughtExpansions: number = 6;
    public UpgradedMines: number = 0;
    public UpgradedBuildings: number = 0;

    public StartTime: Date = new Date();
    public CurrentTime: Date = new Date();

    constructor(canvas: HTMLCanvasElement){
        this.Canvas = canvas;
        this.CanvasWidth = this.Canvas.width;
        this.CanvasHeight = this.Canvas.height;
        this.Ctx = this.Canvas.getContext('2d')!;

        this.Images = new Array();
        for (let i = 0; i < 16; i++) {
            switch (true) {
                case i < 4:
                    this.Images.push(document.getElementById(`ref${i+1}`) as HTMLImageElement);
                    break
                case i < 8:
                    this.Images.push(document.getElementById(`fac${i+1-4}`) as HTMLImageElement);
                    break
                case i < 12:
                    this.Images.push(document.getElementById(`ter${i+1-8}`) as HTMLImageElement);
                    break
                case i < 15:
                    this.Images.push(document.getElementById(`res${i+1-12}`) as HTMLImageElement);
                    break
                default:
                    this.Images.push(document.getElementById('store') as HTMLImageElement);
                    break
            }
        }

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
        this.TechBtnHeight = this.OneSixthHeight*0.8;
        this.TechBtnWidth = this.SmallDivWidth;
        this.TechBtnX = this.SmallDivX
        this.TechBtnY = this.OneSixthHeight;
        
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
        
        this.Mines = new Array();
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 2; j++) {
                this.Mines.push(new Mine(this, {type: i, number: j, price: 200*(2**(i)), upgrade: (200*(2**(i)))/2, speed: 64-(16*i), material:(i+1)*4, tech:(i+1)*2}));
            }
        }
        this.MarketMenu = new Market(this)
        this.Techs = new Array();
        for (let i = 0; i < this.Technologies.length; i++) {
            this.Techs.push(new Tech(this, {number: i, materials: 100+(i*50), techPoints: 100+(i*75), terraPoints: (i % 5 == 4 && i > 0) || i == this.Technologies.length-1 ? 100*((i+1)/5) : undefined}));
        }
        this.Stats = new Stat(this);

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
        this.CurrentTime = new Date();
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

        } else {
            if (this.CurrentMenu == 'mine') {
                this.Mines.forEach(mine => {
                    mine.update();
                });
            }
            if (this.CurrentMenu == 'market') {
                this.MarketMenu.update();
            }
            if (this.CurrentMenu == 'tech') {
                this.Techs.forEach(tech => {
                    tech.update();
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

            for (let row = 3; row >= 0; row--) {
                for (let col = 4; col >= 0; col--) {
                    this.BuildAreas[row][col].draw();
                }
            }

        } else {
            if (this.CurrentMenu == 'mine') {
                this.Mines.forEach(mine => {
                    mine.draw();
                });
            }
            if (this.CurrentMenu == 'market') {
                this.MarketMenu.draw();
            }
            if (this.CurrentMenu == 'tech') {
                this.Techs.forEach(tech => {
                    tech.draw();
                });
            }
            if (this.CurrentMenu == 'stat') {
                this.Stats.draw();
            }
            this.BackBtn.draw();
        }
    }

    loop(){
        this.Ctx.clearRect(0, 0, this.CanvasWidth, this.CanvasHeight);
        this.draw();
        this.update();
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