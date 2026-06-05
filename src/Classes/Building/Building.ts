import type { HEXColor } from "../../Types/Color.ts";
import type { Game } from "../Game.ts";

export class Building{
    protected Repo: Game;
    protected Position: [row: number, col: number];
    protected Color: HEXColor = '#fff';
    protected Size: number;
    protected Event: Function;
    protected X: number;
    protected Y: number;
    protected Level: number = 0;

    constructor(repo: Game, position: [number, number], event: Function) {
        this.Repo = repo;
        this.Position = position;
        this.Size = this.Repo.BuildingSize;
        this.Event = event;
        this.X = this.Repo.OneSixthHeight*(this.Position[1]+1)+this.Size/2;
        this.Y = this.Repo.OneSixthHeight*(this.Position[0]+1)+this.Size/2;
    }

    update(){
        const mx = this.Repo.MouseX;
        const my = this.Repo.MouseY;
        if (this.Repo.MouseDown &&
            mx > this.X && mx < this.X+this.Size &&
            my > this.Y && my < this.Y+this.Size) {
            this.Event();
        }
    }

    draw() {
        const ctx = this.Repo.Ctx;
        ctx.fillStyle = this.Color;
        ctx.fillRect(this.X, this.Y, this.Size, this.Size)
    }
}