import type { HEXColor } from "../../Types/Color.ts";
import { Game } from "../Game.ts";

export class Button {
    protected Repo: Game;
    protected Width: number;
    protected Height: number;
    protected Color: HEXColor;
    public Text: string;
    protected X: number;
    protected Y: number;
    public TextY: number;
    protected Event: Function;

    constructor(repo: Game, color: HEXColor, text: string, x: number, y: number, width: number, height: number, event: Function) {
        this.Repo = repo;
        this.Width = width;
        this.Height = height;
        this.Color = color;
        this.Text = text;
        this.X = x;
        this.Y = y;
        this.TextY = this.Y + this.Height/2+(this.Repo.FontSize/3);
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

        ctx.fillStyle = this.Color
        ctx.fillRect(this.X, this.Y, this.Width, this.Height);
        ctx.strokeRect(this.X, this.Y, this.Width, this.Height);
        
        ctx.fillStyle = this.Repo.DarkColor;
        ctx.font = `${this.Repo.FontSize}px Arial`;
        ctx.textAlign = "center";
        ctx.fillText(this.Text, this.X + this.Width/2, this.TextY, this.Width);
    }
}