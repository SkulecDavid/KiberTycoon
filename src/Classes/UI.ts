import { hide } from "@popperjs/core";
import type { HEXColor } from "../Types/Color";
import type { Game } from "./Game";

export class UI{
    private Repo: Game;
    private Width: number;
    private ResourceHeight: number;
    private TerraHeight: number;
    private Color: HEXColor;
    private Resources: string[];

    constructor(repo: Game){
        this.Repo = repo;
        this.Width = this.Repo.OneFourthWidth;
        this.ResourceHeight = this.Repo.OneTwelfthHeight;
        this.TerraHeight = this.Repo.OneSixthHeight;
        this.Color = '#e3c09d';
        this.Resources = ['Kreditek:', 'Alapanyagok:', 'Techpontok:', 'Terraformálás:']
    }

    draw(){
        const ctx = this.Repo.Ctx;
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.Repo.DarkColor;
        ctx.textAlign = "left";
        
        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = this.Color;
            ctx.fillRect(0+i*this.Width, 0, this.Width, this.ResourceHeight);
            ctx.strokeRect(0+i*this.Width, 0, this.Width, this.ResourceHeight);

            ctx.fillStyle = this.Repo.DarkColor;
            ctx.fillText(this.Resources[i], 0+i*this.Width + this.Width/12, 0 + this.ResourceHeight/2+(this.Repo.FontSize/3));
        }
        
        ctx.fillStyle = this.Color;
        ctx.fillRect(3*this.Width, 0, this.Width, this.TerraHeight);
        ctx.strokeRect(3*this.Width, 0, this.Width, this.TerraHeight);

        ctx.fillStyle = this.Repo.DarkColor;
        ctx.fillText(this.Resources[3], 3*this.Width + this.Width/12, 0 + this.TerraHeight/2+(this.Repo.FontSize/3));
    }
}