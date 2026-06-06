import type { MineIF } from "../Types/MineIF.ts";
import { Button } from "./Button.ts";
import type { Game } from "./Game.ts";

export class Mine {
    private Repo: Game;
    public Stats: MineIF;
    public Level: 0 | 1 | 2 = 0; // DEFAULT 0
    public IsAvailable: boolean = false; // DEFAULT false
    private Cap: number = 20;
    public Load: number = 0;
    private Materials: string[] = ['Szén', 'Réz', 'Vas', 'Arany'];
    public TimerStop: number;
    private TimerValue: number = 0;
    private BuyBtn?: Button;
    private UpgradeBtn?: Button;
    private CollectBtn?: Button;

    constructor(repo: Game, stats: MineIF) {
        this.Repo = repo;
        this.Stats = stats;
        this.TimerStop = Math.round(60/this.Stats.speed*60*2);
    }

    update(){
        if (this.BuyBtn) {
            this.BuyBtn.update();
        }
        if (this.UpgradeBtn) {
            this.UpgradeBtn.update();
        }
        if (this.CollectBtn) {
            this.CollectBtn.update();
        }
        if (this.Level != 0) {
            if (this.Load < this.Cap) {
                if (this.TimerValue == this.TimerStop) {
                    this.Load++;
                    this.TimerValue = 0;
                    this.Repo.Material += this.Stats.material;
                    this.Repo.TechPoint += this.Stats.tech;
                } else {
                    this.TimerValue++;
                }
            }
        }
    }

    draw(){
        const ctx = this.Repo.Ctx;
        ctx.fillStyle = this.Repo.DarkColor;
        ctx.textAlign = 'center';
        const TextX = this.avg(this.Repo.SmallDivX, this.Repo.SmallDivX+this.Repo.SmallDivWidth)+this.Repo.QuarterWidth*this.Stats.type;
        const x = this.avg(this.Repo.SmallDivX+this.Repo.QuarterWidth*this.Stats.type, this.Repo.SmallDivX+this.Repo.QuarterWidth*this.Stats.type+this.Repo.SmallDivWidth-this.Repo.SmallBtnWidth);
        const y = this.avg(this.Repo.SmallDivY+this.Repo.SmallDivHeight*this.Stats.number, this.Repo.SmallDivY+this.Repo.SmallDivHeight*this.Stats.number+this.Repo.SmallDivHeight-this.Repo.SmallBtnHeight);

        if (this.IsAvailable) {
            const width = this.Repo.SmallBtnWidth;
            const height = this.Repo.SmallBtnHeight;
            const btnOffset = this.Repo.SmallBtnHeight/2+(this.Repo.SmallDivWidth-this.Repo.SmallBtnWidth)/2;

            if (this.Level == 0) {
                this.BuyBtn = new Button(this.Repo, this.Repo.MainBtnColor, `${this.Materials[this.Stats.type]}bánya ${this.Stats.number+1}: ${this.Stats.price} KR`, x, y, width, height, ()=>{this.buyMine()})
                this.BuyBtn.draw();

            } else {
                if (this.Level == 1) {
                    this.UpgradeBtn = new Button(this.Repo, this.Repo.MainBtnColor, `Fejlesztés: ${this.Stats.upgrade} KR`, x, y+this.Repo.SmallDivHeight/4-btnOffset, width, height, ()=>{this.upgradeMine()})
                    this.UpgradeBtn.draw();
                }

                ctx.fillText(`${this.Materials[this.Stats.type]}bánya ${this.Stats.number+1} (LVL ${this.Level})`, TextX, y-this.Repo.SmallDivHeight/4);
                ctx.fillText(`${this.Cap}/${this.Load}   ~${this.Stats.speed}/perc`, TextX, y-this.Repo.SmallDivHeight/16);

                this.CollectBtn = new Button(this.Repo, this.Repo.MainBtnColor, "Begyűjtés", x, y+this.Repo.SmallDivHeight/2-btnOffset, width, height, ()=>{this.collectMine()})
                this.CollectBtn.draw();
            }

        } else {
            ctx.fillText("Nem elérhető", TextX, this.avg(this.Repo.SmallDivY, this.Repo.SmallDivY+this.Repo.SmallDivHeight)+this.Repo.SmallDivHeight*this.Stats.number);
        }
    }

    buyMine(){
        if (this.Repo.Credit >= this.Stats.price) {
            this.Repo.Credit -= this.Stats.price;
            this.Level = 1;
        }
    }

    upgradeMine(){
        if (this.Repo.Credit >= this.Stats.upgrade) {
            this.Repo.Credit -= this.Stats.upgrade;
            this.Level = 2;
            this.Stats.material *= 1.5;
            this.Stats.tech *= 1.5;
            this.Stats.speed *= 1.5;
        }
    }

    collectMine(){
        const storaged = this.Repo.RawMaterials[this.Stats.type]
        if (storaged < this.Repo.FullCap) {
            if (storaged + this.Load <= this.Repo.FullCap) {
                this.Repo.RawMaterials[this.Stats.type] += this.Load;
                this.Load = 0;
            } else {
                this.Load -= this.Repo.FullCap - storaged;
                this.Repo.RawMaterials[this.Stats.type] = this.Repo.FullCap;
            }
        }
    }

    avg(a: number, b: number): number{
        return (a+b)/2;
    }
}