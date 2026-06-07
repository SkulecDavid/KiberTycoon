import { Button } from "../UI/Button";
import type { Game } from "../Game";

export class Market {
    private Repo: Game;
    private Buttons: Button[];
    private Prices: number[] = [2, 4, 6, 8, 8, 16, 24, 52];
    private X: number;
    private Y: number;

    constructor(repo: Game){
        this.Repo = repo;
        this.Buttons = new Array();
        this.X = this.Repo.SmallDivX;
        this.Y = this.Repo.SmallDivY+this.Repo.SmallDivHeight;

        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 4; col++) {
                this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, 'Eladás', this.avg(this.X, this.X+this.Repo.SmallDivWidth)-this.Repo.SmallBtnWidth/2+col*this.Repo.QuarterWidth, this.Y-this.Repo.SmallBtnHeight-(this.Repo.SmallDivWidth-this.Repo.SmallBtnWidth)/2+this.Repo.SmallDivHeight*row, this.Repo.SmallBtnWidth, this.Repo.SmallBtnHeight, ()=>{this.sell(row, col)}))
            }
        }
    }

    update(){
        this.Buttons.forEach(btn => {
            btn.update();
        });
    }

    draw(){
        this.Buttons.forEach(btn => {
            btn.draw();
        });

        const ctx = this.Repo.Ctx;
        ctx.fillStyle = this.Repo.DarkColor;
        ctx.textAlign = 'center';
        for (let row = 0; row < 2; row++) {
            for (let col = 0; col < 4; col++) {
                if (row == 0){
                    ctx.fillText(`Raktáron: ${this.Repo.Materials[col]}`, this.avg(this.X, this.X+this.Repo.SmallDivWidth)+col*this.Repo.QuarterWidth, this.Y-this.Repo.SmallBtnHeight*1.5+this.Repo.SmallDivHeight*row, this.Repo.SmallDivWidth);
                } else {
                    ctx.fillText(`Raktáron: ${this.Repo.Items[col]}`, this.avg(this.X, this.X+this.Repo.SmallDivWidth)+col*this.Repo.QuarterWidth, this.Y-this.Repo.SmallBtnHeight*1.5+this.Repo.SmallDivHeight*row, this.Repo.SmallDivWidth);
                }
            }
        }
    }

    sell(row: number, col: number){
        if (row == 0){
            if (this.Repo.Materials[col] > 0){
            this.Repo.Materials[col]--;
            this.Repo.EarnedCredits += this.Prices[col];
            this.Repo.Credit += this.Prices[col];
            }
        } else {
            if (this.Repo.Items[col] > 0){
            this.Repo.Items[col]--;
            this.Repo.EarnedCredits += this.Prices[col+4];
            this.Repo.Credit += this.Prices[col+4];
            }
        }
    }

    avg(a: number, b: number): number{
        return (a+b)/2;
    }
}