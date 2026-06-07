import type { HEXColor } from "../../Types/Color";
import type { Game } from "../Game";
import { Button } from "./Button";

export class TechBtn extends Button {
    private LineHeight: number = 30;
    private Disabled: boolean = false;
    private Number: number;

    constructor(repo: Game, color: HEXColor, text: string, x: number, y: number, width: number, height: number, event: Function, number: number){
        super(repo, color, text, x, y, width, height, event);
        this.Number = number;
        this.TextY -= this.LineHeight/2;
    }

    update(){
        this.Disabled = !this.Repo.Techs[this.Number].IsAvailable;
        if (!this.Disabled) {
            const mx = this.Repo.MouseX;
            const my = this.Repo.MouseY;
            if (this.Repo.MouseDown &&
                mx > this.X && mx < this.X+this.Width &&
                my > this.Y && my < this.Y+this.Height) {
                this.Event();
            }
        }
    }

    draw(){
        const ctx = this.Repo.Ctx;

        if (this.Disabled) {
            ctx.globalAlpha = 0.5;
        }
        ctx.fillStyle = this.Color
        ctx.fillRect(this.X, this.Y, this.Width, this.Height);
        ctx.strokeRect(this.X, this.Y, this.Width, this.Height);
        
        ctx.fillStyle = this.Repo.DarkColor;
        ctx.font = `${this.Repo.FontSize}px Arial`;
        ctx.textAlign = "center";
        const lines = this.Text.split('\n')
        for (let i = 0; i < lines.length; i++) {
            ctx.fillText(lines[i], this.X + this.Width/2, this.TextY+(i*this.LineHeight), this.Width);
        }
        ctx.globalAlpha = 1;
    }
}