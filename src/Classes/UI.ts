import type { HEXColor } from "../Types/Color.ts";
import type { Game } from "./Game.ts";

export class UI{
    private Repo: Game;
    private Width: number;
    private ResourceHeight: number;
    private TerraHeight: number;
    private Resources: string[] = ['Kreditek:', 'Alapanyagok:', 'Techpontok:', 'Terraformálás:'];
    private Levels: number[];
    private Terra0: HEXColor = '#6b2d2d';
    private Terra1: HEXColor = '#b93f3f';
    private Terra2: HEXColor = '#d76b3c';
    private Terra3: HEXColor = '#d69f3d';
    private Terra4: HEXColor = '#5a9e4e';

    constructor(repo: Game){
        this.Repo = repo;
        this.Width = this.Repo.QuarterWidth;
        this.ResourceHeight = this.Repo.OneTwelfthHeight;
        this.TerraHeight = this.Repo.OneSixthHeight;
        this.Levels = [this.Repo.Credit, this.Repo.Material, this.Repo.TechPoint, this.Repo.TerraLvl];
    }
    
    update(){
        this.Levels = [this.Repo.Credit, this.Repo.Material, this.Repo.TechPoint, this.Repo.TerraLvl];
    }

    draw(){
        const ctx = this.Repo.Ctx;
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.Repo.DarkColor;
        ctx.textAlign = "left";
        
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = this.Repo.LightColor;
            ctx.fillRect(0+i*this.Width, 0, this.Width, this.ResourceHeight);
            ctx.strokeRect(0+i*this.Width, 0, this.Width, this.ResourceHeight);

            ctx.fillStyle = this.Repo.DarkColor;
            ctx.fillText(`${this.Resources[i]} ${this.Levels[i].toLocaleString('hu-HU')}`, 0+i*this.Width + this.Width/12, 0 + this.ResourceHeight/2+(this.Repo.FontSize/3));
        }
        
        ctx.fillStyle = this.Repo.LightColor;
        ctx.fillRect(3*this.Width, 0, this.Width, this.TerraHeight);
        ctx.strokeRect(3*this.Width, 0, this.Width, this.TerraHeight);

        ctx.fillStyle = this.Repo.DarkColor;
        ctx.fillText(this.Resources[3], 3*this.Width + this.Width/12, 0 + this.TerraHeight/2+(this.Repo.FontSize/3));

        const x = this.avg(3.5*this.Width, 4*this.Width);
        const y = this.TerraHeight/2;
        const r = (this.TerraHeight/2)*0.8;
        ctx.fillStyle = this.Terra0;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.fill()
        ctx.stroke();

        ctx.beginPath();
        switch (this.Levels[3]) {
            case 1:
                ctx.moveTo(x, y);
                ctx.lineTo(x, y-r);
                ctx.arc(x, y, r, Math.PI*1.5, 0);
                ctx.closePath();
                ctx.fillStyle = this.Terra1;
                ctx.fill()
                break
            case 2:
                ctx.moveTo(x, y);
                ctx.lineTo(x, y-r);
                ctx.arc(x, y, r, Math.PI*1.5, Math.PI/2);
                ctx.closePath();
                ctx.fillStyle = this.Terra2;
                ctx.fill()
                break
            case 3:
                ctx.moveTo(x, y);
                ctx.lineTo(x, y-r);
                ctx.arc(x, y, r, Math.PI*1.5, Math.PI);
                ctx.closePath();
                ctx.fillStyle = this.Terra3;
                ctx.fill()
                break
            case 4:
                ctx.moveTo(x, y);
                ctx.lineTo(x, y-r);
                ctx.arc(x, y, r, Math.PI*1.5, Math.PI*3.5);
                ctx.closePath();
                ctx.fillStyle = this.Terra4;
                ctx.fill()
                break
        }
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2*Math.PI);
        ctx.moveTo(x, y-r);
        ctx.lineTo(x, y+r);
        ctx.moveTo(x-r, y);
        ctx.lineTo(x+r, y);
        ctx.stroke();
    }

    avg(a: number, b: number): number{
        return (a+b)/2;
    }
}