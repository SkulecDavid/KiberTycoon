import type { Game } from "./Game.ts";

export class Menu{
    private Repo: Game;
    private Width: number;
    private Height: number;

    constructor(repo: Game,){
        this.Repo = repo;
        switch (this.Repo.CurrentMenu) {
            case 'mine':
                this.Width = this.Repo.OneFourthWidth;
                this.Height = this.Repo.CanvasHeight;
                break
            case 'market':
                this.Width = this.Repo.OneTwelfthHeight*4;
                this.Height = this.Repo.OneTwentyfourthHeight*7;
                break
            case 'tech':
                this.Width = this.Repo.OneFourthWidth;
                this.Height = this.Repo.CanvasHeight;
                break
            case 'stat':
                this.Width = this.Repo.OneTwelfthHeight*4;
                this.Height = this.Repo.OneTwelfthHeight*7;
                break
            default:
                this.Width = 0;
                this.Height = 0;
                break
        }
    }

    draw(){
        const ctx = this.Repo.Ctx;
        ctx.fillStyle = this.Repo.LightColor;
        ctx.lineWidth = 5;
        ctx.strokeStyle = this.Repo.DarkColor;
        ctx.textAlign = "left";

        if (this.Repo.CurrentMenu != 'main') {
            ctx.fillRect(0, 0, this.Repo.CanvasWidth, this.Repo.CanvasHeight);
        }
    }
}