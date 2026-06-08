import type { HEXColor } from "../../Types/Color.ts";
import { Building } from "../Building/Building.ts";
import { FactoryBuild } from "../Building/FactoryBuild.ts";
import { RefineBuild } from "../Building/RefineBuild.ts";
import { StorageBuild } from "../Building/StorageBuild.ts";
import { TerraBuild } from "../Building/TerraBuild.ts";
import { Button } from "./Button.ts";
import type { Game } from "../Game.ts";

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
    private BuildingPrices: number[] = [50, 100, 150, 250, 500, 200, 350, 550, 800, 30, 60, 90, 120]
        // 0-storage 1-4-refinery 5-8-factory 9-12-terraform
    private UnlockNumbers: number[] = [0, 5, 10, 1, 6, 11, 15, 3, 8, 12, 17];
        // 0-2-refinery 3-6-factory 7-10-terraform
    public TerraNames: string[] = ['oxigéntartályt', 'üvegházat', 'légkörjavítót', 'állatfarmot'];
    private ExpansionPrice: number = 25;

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

        if (this.Status == 'locked'){
            const mx = this.Repo.MouseX;
            const my = this.Repo.MouseY;
            if (this.Repo.MouseDown) {
                if (mx > this.X && mx < this.X+this.Size &&
                    my > this.Y && my < this.Y+this.Size) {
                    if (!this.Buttons) {
                        this.buyExpansion();
                    }
                } else {
                    this.Buttons = undefined;
                }
            }
        }


        if (this.Build) {
            this.Build.update();
        }
    }

    draw(){
        const ctx = this.Repo.Ctx;

        if (this.Status == 'locked') {
            ctx.fillStyle = this.Color;
            ctx.globalAlpha = 0.5;
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

    buyExpansion(){
        if (confirm(`Akarsz itt terjeszkedni (${this.ExpansionPrice*(this.Repo.BoughtExpansions-5)} KR)?`)) {
            if (this.Repo.Credit >= this.ExpansionPrice*(this.Repo.BoughtExpansions-5)) {
                this.Status = 'empty';
                this.Repo.SpentCredits += this.ExpansionPrice*(this.Repo.BoughtExpansions-5);
                this.Repo.Credit -= this.ExpansionPrice*(this.Repo.BoughtExpansions-5);
                this.Repo.BoughtExpansions++;
            }
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
                    this.Buttons.push(new Button(this.Repo, '#b93f3f', 'Gyár', this.X, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{this.factoryBtn()}));
                    this.Buttons.push(new Button(this.Repo, '#5a9e4e', 'Terr.', this.X+this.Size/2, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{this.terraBtn()}));
                } else {
                    this.Buttons = undefined;
                }
            }
    }

    storageBtn(){
        if (confirm(`Akarsz egy raktárat építeni (${this.BuildingPrices[0]} alapanyag)?`)) {
            if (this.Repo.Material >= this.BuildingPrices[0]) {
                this.Status = 'used';
                this.Repo.SpentMaterials += this.BuildingPrices[0];
                this.Repo.Material -= this.BuildingPrices[0];
                this.Repo.BuiltBuildings++;
                this.Build = new StorageBuild(this.Repo, this.Position);
            }
        } else {
            this.Buttons = undefined;
        }
    }

    refineryBtn(){
        this.Buttons = new Array();
        this.Buttons.push(new Button(this.Repo, '#d76b3c', 'Szén', this.X, this.Y, this.Size/2, this.Size/2, ()=>{this.newRefine(0)}));
        this.Buttons.push(new Button(this.Repo, '#d76b3c', 'Réz', this.X+this.Size/2, this.Y, this.Size/2, this.Size/2, ()=>{this.newRefine(1)}));
        this.Buttons.push(new Button(this.Repo, '#d76b3c', 'Vas', this.X, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{this.newRefine(2)}));
        this.Buttons.push(new Button(this.Repo, '#d76b3c', 'Arany', this.X+this.Size/2, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{this.newRefine(3)}));
    }

    newRefine(type: number){
        if ((type == 0 || this.Repo.Technologies[this.UnlockNumbers[type-1]]) &&
            confirm(`Akarsz egy feldolgozót építeni (${this.BuildingPrices[1+type]} alapanyag)?`)) {
            if (this.Repo.Material >= this.BuildingPrices[1+type]) {
                this.Status = 'used';
                this.Repo.SpentMaterials += this.BuildingPrices[1+type];
                this.Repo.Material -= this.BuildingPrices[1+type];
                this.Repo.BuiltBuildings++;
                this.Build = new RefineBuild(this.Repo, this.Position, type);
            }
        } else {
            this.Buttons = undefined;
        }
    }

    factoryBtn(){
        this.Buttons = new Array();
        this.Buttons.push(new Button(this.Repo, '#b93f3f', 'Kábel', this.X, this.Y, this.Size/2, this.Size/2, ()=>{this.newFactory(0)}));
        this.Buttons.push(new Button(this.Repo, '#b93f3f', 'Acél', this.X+this.Size/2, this.Y, this.Size/2, this.Size/2, ()=>{this.newFactory(1)}));
        this.Buttons.push(new Button(this.Repo, '#b93f3f', 'Chip', this.X, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{this.newFactory(2)}));
        this.Buttons.push(new Button(this.Repo, '#b93f3f', 'Elektro', this.X+this.Size/2, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{this.newFactory(3)}));
    }

    newFactory(type: number){
        if (this.Repo.Technologies[this.UnlockNumbers[type+3-1]] &&
            confirm(`Akarsz egy gyárat építeni (${this.BuildingPrices[5+type]} alapanyag)?`)) {
            if (this.Repo.Material >= this.BuildingPrices[5+type]) {
                this.Status = 'used';
                this.Repo.SpentMaterials += this.BuildingPrices[5+type];
                this.Repo.Material -= this.BuildingPrices[5+type];
                this.Repo.BuiltBuildings++;
                this.Build = new FactoryBuild(this.Repo, this.Position, type);
            }
        } else {
            this.Buttons = undefined;
        }
    }

    terraBtn(){
        this.Buttons = new Array();
        this.Buttons.push(new Button(this.Repo, '#5a9e4e', 'O2', this.X, this.Y, this.Size/2, this.Size/2, ()=>{this.newTerra(0)}));
        this.Buttons.push(new Button(this.Repo, '#5a9e4e', 'Üvegh.', this.X+this.Size/2, this.Y, this.Size/2, this.Size/2, ()=>{this.newTerra(1)}));
        this.Buttons.push(new Button(this.Repo, '#5a9e4e', 'Légk.', this.X, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{this.newTerra(2)}));
        this.Buttons.push(new Button(this.Repo, '#5a9e4e', 'Állat', this.X+this.Size/2, this.Y+this.Size/2, this.Size/2, this.Size/2, ()=>{this.newTerra(3)}));
    }

    newTerra(type: number){
        if (this.Repo.Technologies[this.UnlockNumbers[type+7-1]] &&
            confirm(`Akarsz egy ${this.TerraNames[type]} építeni (${this.BuildingPrices[9+type]} alapanyag)?`)) {
            if (this.Repo.Material >= this.BuildingPrices[9+type]) {
                this.Status = 'used';
                this.Repo.SpentMaterials += this.BuildingPrices[9+type];
                this.Repo.Material -= this.BuildingPrices[9+type];
                this.Repo.BuiltBuildings++;
                this.Build = new TerraBuild(this.Repo, this.Position, type);
            }
        } else {
            this.Buttons = undefined;
        }
    }
}