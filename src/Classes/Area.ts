import type { HEXColor } from "../Types/Color.ts";
import { Building } from "./Building/Building.ts";
import { RefineBuild } from "./Building/RefineBuild.ts";
import { StorageBuild } from "./Building/StorageBuild.ts";
import { Button } from "./Button.ts";
import type { Game } from "./Game.ts";

export class Area {
    private Repo: Game;
    private Size: number;
    private X: number;
    private Y: number;
    private Position: [row: number, col: number];
    private Color: HEXColor = '#000'
    public Status: 'locked' | 'empty' | 'used' = 'locked';
    public Build?: Building;
    private Buttons?: Button[] = undefined
    private BuildingPrices: number[] = [25, 100, 150, 250, 500, 200, 350, 550, 800, 30, 60, 90, 120]
        // 0-storage 1-4-refinery 5-8-factory 9-12-terraform

    constructor(repo: Game, position: [number, number]){
        this.Repo = repo;
        this.Size = this.Repo.OneSixthHeight;
        this.Position = position;
        this.X = this.Repo.OneSixthHeight*(this.Position[1]+1);
        this.Y = this.Repo.OneSixthHeight*(this.Position[0]+1);
    }

    update(){
        if (this.Buttons) {
            this.Buttons.forEach(btn => {
                btn.update();
            });
        }

        if (this.Status == 'empty'){
            const mx = this.Repo.MouseX;
            const my = this.Repo.MouseY;
            if (this.Repo.MouseDown) {
                if (mx > this.X && mx < this.X+this.Size &&
                    my > this.Y && my < this.Y+this.Size) {
                    if (!this.Buttons) {
                        this.buyBuilding();
                    }
                } else {
                    this.Buttons = undefined;
                }
            }
        } else {
            this.Buttons = undefined
        }


        if (this.Build) {
            this.Build.update();
        }
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

        if (this.Build){
            this.Build.draw();
        }

        if (this.Buttons) {
            this.Buttons.forEach(btn => {
                btn.draw();
            });
        }
    }

    buyBuilding(){
        const mx = this.Repo.MouseX;
            const my = this.Repo.MouseY;
            if (this.Repo.MouseDown) {
                if (mx > this.X && mx < this.X+this.Size &&
                    my > this.Y && my < this.Y+this.Size) {
                    this.Buttons = new Array();
                    this.Buttons.push(new Button(this.Repo, '#d69f3d', 'Rakt.', this.X, this.Y, this.Size/2, this.Size/2, ()=>{this.storageBtn()}));
                    this.Buttons.push(new Button(this.Repo, '#d76b3c', 'Feld.', this.X+this.Size/2, this.Y, this.Size/2, this.Size/2, ()=>{this.refineryBtn()}));
                    this.Buttons.push(new Button(this.Repo, '#b93f3f', 'Gyár', this.X, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{console.log('gyar')}));
                    this.Buttons.push(new Button(this.Repo, '#5a9e4e', 'Terr.', this.X+this.Size/2, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{console.log('terra')}));
                } else {
                    this.Buttons = undefined;
                }
            }
    }

    storageBtn(){
        if (confirm(`Akarsz egy raktárat építeni (${this.BuildingPrices[0]} KR)?`)) {
            if (this.Repo.Credit >= this.BuildingPrices[0]) {
                this.Status = 'used';
                this.Repo.Credit -= this.BuildingPrices[0];
                this.Build = new StorageBuild(this.Repo, this.Position);
            }
        } else {
            this.Buttons = undefined;
        }
    }

    refineryBtn(){
        //this.Buttons = undefined;
        this.Buttons = new Array();
        this.Buttons.push(new Button(this.Repo, '#d76b3c', 'Szén', this.X, this.Y, this.Size/2, this.Size/2, ()=>{this.newRefine(0)}));
        this.Buttons.push(new Button(this.Repo, '#d76b3c', 'Réz', this.X+this.Size/2, this.Y, this.Size/2, this.Size/2, ()=>{this.newRefine(1)}));
        this.Buttons.push(new Button(this.Repo, '#d76b3c', 'Vas', this.X, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{this.newRefine(2)}));
        this.Buttons.push(new Button(this.Repo, '#d76b3c', 'Arany', this.X+this.Size/2, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{this.newRefine(4)}));
    }

    newRefine(type: number){
        if (confirm(`Akarsz egy feldolgozót építeni (${this.BuildingPrices[0+type]} KR)?`)) {
            if (this.Repo.Credit >= this.BuildingPrices[1+type]) {
                this.Status = 'used';
                this.Repo.Credit -= this.BuildingPrices[0+type];
                this.Build = new RefineBuild(this.Repo, this.Position, 0+type);
            }
        } else {
            this.Buttons = undefined
        }
    }
}