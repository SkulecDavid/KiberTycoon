import type { BtnType } from "../Types/BtnType.ts";
import type { HEXColor } from "../Types/Color.ts";
import type { MenuType } from "../Types/MenuType.ts";
import { Game } from "./Game.ts";

export class Button {
    private Repo: Game;
    private Type: BtnType;
    private Width: number;
    private Height: number;
    private Color: HEXColor;
    private Text: string;
    private X: number;
    private Y: number;
    private Event: Function;

    constructor(repo: Game, type: BtnType, color: HEXColor, text: string, x: number, y: number, event: Function) {
        this.Repo = repo;
        this.Type = type;
        this.Width = this.Repo.OneFourthWidth;
        this.Height = this.Repo.OneNinthHeight;
        this.Color = color;
        this.Text = text;
        this.X = x;
        this.Y = y;
        this.Event = event;
    }

    update(){
        if ((this.Type == 'main' && this.Repo.CurrentMenu == 'main') || (this.Type == 'back' && this.Repo.CurrentMenu != 'main')) {
            const mx = this.Repo.MouseX;
            const my = this.Repo.MouseY;
            if (this.Repo.MouseDown &&
                mx > this.X && mx < this.X+this.Width &&
                my > this.Y && my < this.Y+this.Height) {
                    console.log(this.Repo);
                    
                this.Event();
            }
        }
    }

    draw(){
        if ((this.Type == 'main' && this.Repo.CurrentMenu == 'main') || (this.Type == 'back' && this.Repo.CurrentMenu != 'main')) {
            const ctx = this.Repo.Ctx;

            ctx.fillStyle = this.Color
            ctx.fillRect(this.X, this.Y, this.Width, this.Height);
            ctx.strokeRect(this.X, this.Y, this.Width, this.Height);
            
            ctx.fillStyle = this.Repo.DarkColor;
            ctx.font = `${this.Repo.FontSize}px Arial`;
            ctx.textAlign = "center";
            ctx.fillText(this.Text, this.X + this.Width/2, this.Y + this.Height/2+(this.Repo.FontSize/3), this.Width);
        }
    }
}