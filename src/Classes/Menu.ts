import type { Game } from "./Game.ts";

export class Menu{
    private Repo: Game;
    private Width: number = 0;
    private Height: number = 0;

    constructor(repo: Game){
        this.Repo = repo;
    }

    update(){
        switch (this.Repo.CurrentMenu) {
            case 'mine':
                this.Width = this.Repo.OneFourthWidth;
                this.Height = this.Repo.CanvasHeight;
                break
            case 'market':
                this.Width = this.Repo.OneTwelfthHeight*4;
                this.Height = this.Repo.OneTwentyfourthHeight*8;
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
        if (this.Repo.CurrentMenu != 'main') {
            const ctx = this.Repo.Ctx;
            ctx.fillStyle = this.Repo.LightColor;
            ctx.lineWidth = 5;
            ctx.strokeStyle = this.Repo.DarkColor;
            ctx.textAlign = "left";
            ctx.fillRect(0, 0, this.Repo.CanvasWidth, this.Repo.CanvasHeight);

            switch (this.Repo.CurrentMenu) {
                case 'mine':
                for (let i = 1; i < 4; i++) {
                    ctx.beginPath();
                    ctx.moveTo(this.Width*i, this.Height);
                    ctx.lineTo(this.Width*i, 0);
                    ctx.stroke();
                }
                break
            case 'market':
                for (let i = 0; i < 4; i++) {
                    ctx.strokeRect(this.Repo.OneFourthWidth*i+this.Repo.OneTwentyfourthHeight*1.33, this.Repo.OneSixthHeight+this.Repo.OneTwentyfourthHeight, this.Width, this.Height);
                }
                for (let i = 0; i < 4; i++) {
                    ctx.strokeRect(this.Repo.OneFourthWidth*i+this.Repo.OneTwentyfourthHeight*1.33, this.Repo.OneSixthHeight+this.Repo.OneTwentyfourthHeight+this.Height, this.Width, this.Height);
                }
                break
            case 'tech':
                for (let i = 1; i < 4; i++) {
                    ctx.beginPath();
                    ctx.moveTo(this.Width*i, this.Height);
                    ctx.lineTo(this.Width*i, 0);
                    ctx.stroke();
                }
                break
            case 'stat':
                for (let i = 0; i < 4; i++) {
                    ctx.strokeRect(this.Repo.OneFourthWidth*i+this.Repo.OneTwentyfourthHeight*1.33, this.Repo.OneSixthHeight+this.Repo.OneTwentyfourthHeight, this.Width, this.Height);
                }
                break
            }
        }
    }
}