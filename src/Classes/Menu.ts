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
            ctx.textAlign = "center";
            ctx.fillRect(0, 0, this.Repo.CanvasWidth, this.Repo.CanvasHeight);
            ctx.fillStyle = this.Repo.DarkColor;

            switch (this.Repo.CurrentMenu) {
                case 'mine':
                    const mines = ['Szénbányák', 'Rézbányák', 'Vasbányák', 'Aranybányák'];
                    for (let i = 1; i < 4; i++) {
                        ctx.beginPath();
                        ctx.moveTo(this.Width*i, this.Height);
                        ctx.lineTo(this.Width*i, 0);
                        ctx.stroke();

                        ctx.fillText(mines[i-1], this.avg(this.Width*(i-1), this.Width*i), this.Repo.OneTwelfthHeight*1.5, this.Width);
                    }
                    ctx.fillText(mines[3], this.avg(this.Width*3, this.Width*4), this.Repo.OneSixthHeight*1.2, this.Width);

                    this.Width = this.Repo.OneTwelfthHeight*4;
                    this.Height = this.Repo.OneTwentyfourthHeight*8;
                    for (let i = 0; i < 4; i++) {
                        const x = this.Repo.OneFourthWidth*i+this.Repo.OneTwentyfourthHeight*1.33;
                        const y = this.Repo.OneSixthHeight+this.Repo.OneTwentyfourthHeight;
                        ctx.strokeRect(x, y, this.Width, this.Height);
                    }
                    for (let i = 0; i < 4; i++) {
                        const x = this.Repo.OneFourthWidth*i+this.Repo.OneTwentyfourthHeight*1.33;
                        const y = this.Repo.OneSixthHeight+this.Repo.OneTwentyfourthHeight+this.Height;
                        ctx.strokeRect(x, y, this.Width, this.Height);
                    }
                    break

                case 'market':
                    const items = ['Szén', 'Réz', 'Vas', 'Arany', 'Kábel', 'Acél', 'Chip', 'Elektronika'];
                    const prices = [1, 2, 3, 4, 4, 8, 12, 26];
                    for (let i = 0; i < 4; i++) {
                        const x = this.Repo.OneFourthWidth*i+this.Repo.OneTwentyfourthHeight*1.33;
                        const y = this.Repo.OneSixthHeight+this.Repo.OneTwentyfourthHeight;
                        ctx.strokeRect(x, y, this.Width, this.Height);
                        ctx.fillText(items[i], this.avg(x, x+this.Width), y+this.Height/5, this.Width);
                        ctx.fillText(prices[i].toString()+'KR / db', this.avg(x, x+this.Width), y+(this.Height/5)*2, this.Width);
                    }
                    for (let i = 0; i < 4; i++) {
                        const x = this.Repo.OneFourthWidth*i+this.Repo.OneTwentyfourthHeight*1.33;
                        const y = this.Repo.OneSixthHeight+this.Repo.OneTwentyfourthHeight+this.Height;
                        ctx.strokeRect(x, y, this.Width, this.Height);
                        ctx.fillText(items[4+i], this.avg(x, x+this.Width), y+this.Height/5, this.Width);
                        ctx.fillText(prices[4+i].toString()+'KR / db', this.avg(x, x+this.Width), y+(this.Height/5)*2, this.Width);
                    }
                    break

                case 'tech':
                    ctx.beginPath();
                    const topY = this.Repo.OneSixthHeight*1.25;
                    const bottomY = this.Repo.CanvasHeight-this.Repo.OneTwelfthHeight;
                    ctx.moveTo(this.Width/2, topY);
                    ctx.lineTo(this.Width/2, bottomY);
                    ctx.lineTo(this.avg(this.Width, this.Width*2), bottomY);
                    ctx.lineTo(this.avg(this.Width, this.Width*2), topY);
                    ctx.lineTo(this.avg(this.Width*2, this.Width*3), topY);
                    ctx.lineTo(this.avg(this.Width*2, this.Width*3), bottomY);
                    ctx.lineTo(this.avg(this.Width*3, this.Width*4), bottomY-this.Repo.OneSixthHeight);
                    ctx.lineTo(this.avg(this.Width*3, this.Width*4), topY+this.Repo.OneSixthHeight);
                    ctx.stroke();

                    for (let i = 1; i < 4; i++) {
                        ctx.beginPath();
                        ctx.moveTo(this.Width*i, this.Height);
                        ctx.lineTo(this.Width*i, 0);
                        ctx.stroke();

                        ctx.fillText(i+'. Szint', this.avg(this.Width*(i-1), this.Width*i), this.Repo.OneTwelfthHeight*1.5, this.Width);
                    }
                    ctx.fillText('4. Szint', this.avg(this.Width*3, this.Width*4), this.Repo.OneSixthHeight*1.25, this.Width);
                    break

                case 'stat':
                    for (let i = 0; i < 4; i++) {
                        ctx.strokeRect(this.Repo.OneFourthWidth*i+this.Repo.OneTwentyfourthHeight*1.33, this.Repo.OneSixthHeight+this.Repo.OneTwentyfourthHeight, this.Width, this.Height);
                    }
                    break
            }
        }
    }

    avg(a: number, b: number): number{
        return (a+b)/2;
    }
}