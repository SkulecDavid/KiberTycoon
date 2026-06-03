import type { MineIF } from "../Types/MineIF";
import { Button } from "./Button";
import type { Game } from "./Game";

export class Mine {
    private Repo: Game;
    private X: number;
    private Y: number;
    public Stats: MineIF;
    private Level: 0 | 1 | 2 = 0
    private Cap: number = 20;
    public Load: number = 0;
    private IsAvailable: boolean = true; 

    constructor(repo: Game, x: number, y: number, stats: MineIF) {
        this.Repo = repo;
        this.X = x;
        this.Y = y;
        this.Stats = stats;
    }

    draw(){
        if (this.IsAvailable) {
            const width = this.Repo.SmallBtnWidth;
            const height = this.Repo.SmallBtnHeight;
            switch (this.Level) {
                case 0:
                    const buyBtn = new Button(this.Repo, this.Repo.MainBtnColor, `${this.Stats.type}bánya ${this.Stats.number}: ${this.Stats.price} KR`, this.X, this.Y, width, height, ()=>{console.log('ok')})
                    buyBtn.draw();
                    buyBtn.update();
                    break
                case 1:
                    break
                case 2:
                    break
            }
        } else {

        }
    }
}