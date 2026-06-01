import type { HEXColor } from "../Types/Color.ts";
import { Game } from "./Game.ts";

export class Button {
    private Repo: Game;
    private Width: number;
    private Height: number;
    private LightColor: HEXColor;
    private Text: string;
    private X: number;
    private Y: number;
    private Event: Function;

    constructor(repo: Game, text: string, x: number, y: number, event: Function) {
        this.Repo = repo;
        this.Width = this.Repo.OneFourthWidth;
        this.Height = this.Repo.OneNinthHeight;
        this.LightColor = '#dd6345';
        this.Text = text;
        this.X = x;
        this.Y = y;
        this.Event = event;
    }

    update(){
        const mx = this.Repo.MouseX;
        const my = this.Repo.MouseY;
        if (this.Repo.MouseDown &&
            mx > this.X && mx < this.X+this.Width &&
            my > this.Y && my < this.Y+this.Height) {
            this.Event();
            
        }
    }

    draw(){
        const ctx = this.Repo.Ctx;
        
        ctx.fillStyle = this.LightColor;
        ctx.fillRect(this.X, this.Y, this.Width, this.Height);
        ctx.strokeRect(this.X, this.Y, this.Width, this.Height);
        
        ctx.fillStyle = this.Repo.DarkColor;
        ctx.font = `${this.Repo.FontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(this.Text, this.X + this.Width/2, this.Y + this.Height/2+(this.Repo.FontSize/3), this.Width);
    }
}