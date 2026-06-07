import type { Game } from "../Game.ts";

export class BG{
    private Repo: Game
    private Image: HTMLCanvasElement;

    constructor(repo: Game, image: string){
        this.Repo = repo;
        this.Image = document.getElementById(image) as HTMLCanvasElement;
    }

    draw(){
        this.Repo.Ctx.drawImage(this.Image, 0, 0, this.Repo.CanvasWidth, this.Repo.CanvasHeight);
    }
}