import type { HEXColor } from "../Types/Color";
import type { Game } from "./Game";

export class Area {
    private Repo: Game;
    private Size: number;
    private X: number;
    private Y: number;
    private Color: HEXColor = '#000'
    public Status: 'locked' | 'empty' | 'used' = 'locked';

    constructor(repo: Game, x: number, y: number){
        this.Repo = repo;
        this.Size = this.Repo.OneSixthHeight;
        this.X = x;
        this.Y = y;
    }

    draw(){
        const ctx = this.Repo.Ctx;

        if (this.Status == 'locked') {
            ctx.fillStyle = this.Color;
            ctx.globalAlpha = 0.4;
            ctx.fillRect(this.X, this.Y, this.Size, this.Size);
            ctx.globalAlpha = 1;
            ctx.strokeRect(this.X, this.Y, this.Size, this.Size);
        }
        if (this.Status == 'empty') {
            ctx.fillStyle = this.Color;
            ctx.globalAlpha = 0.3;
            ctx.fillRect(this.X, this.Y, this.Size, this.Size);
            ctx.globalAlpha = 1;
            ctx.strokeRect(this.X, this.Y, this.Size, this.Size);
        } 
    }
}