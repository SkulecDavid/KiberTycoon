import { Button } from "../Button.ts";
import type { Game } from "../Game.ts";
import { Building } from "./Building.ts";

export class StorageBuild extends Building {
    private Cap: number = 50; // DEFAULT 50
    private RawMaterials: number[] = [0, 0, 0, 0];
    private Materials: number[] = [0, 0, 0, 0];
    private Items: number[] = [0, 0, 0, 0];

    constructor(repo: Game, position: [number, number]){
        super(repo, position, ()=>this.actions());
        this.Color = '#d69f3d';
        this.UpgradePrice = 50;
        this.MaxLevel = 3;

        const techs = this.Repo.Technologies;
        if (techs[2]){
            this.TechUnlocked++;
            if (techs[7]) {
                this.TechUnlocked++;
            if (techs[12]) {
                this.TechUnlocked++;
        }}}

        this.Repo.FullCap += this.Cap;
    }

    actions(){
        const btnX = this.Repo.OneSixthHeight*(this.Position[1]+1);
        const btnY = this.Repo.OneSixthHeight*(this.Position[0]+2);
        this.Buttons = new Array();
        this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, this.Level < this.MaxLevel ? 'Fejleszt' : 'MAX', btnX, btnY, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.upgrade()}));
        this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, 'Töröl', btnX, btnY+this.Repo.OneSixthHeight/3, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.delete()}));
    }

    upgrade(){
        if (this.Level < this.MaxLevel && this.Level < this.TechUnlocked &&
            confirm(`Akarod ezt a raktárat fejleszteni ${this.Level+2}-re/-ra (${this.UpgradePrice} KR)?`) ) {
            if (this.Repo.Credit >= this.UpgradePrice) {
                this.Level++;
                this.Repo.Credit -= this.UpgradePrice;
                this.Cap *= 2;
                this.UpgradePrice *= 2;
                this.Repo.FullCap += this.Cap - this.Cap/2;
                this.Buttons = undefined;
            }
        }
    }

    delete(){
        if (confirm(`Biztosan ki akarod törölni ezt a raktárat (minden termék elveszik)?`)) {
            for (let i = 0; i < 4; i++) {
                this.Repo.RawMaterials[i] -= this.RawMaterials[i];
            }
            for (let i = 0; i < 4; i++) {
                this.Repo.Materials[i] -= this.Materials[i];
            }
            for (let i = 0; i < 4; i++) {
                this.Repo.Items[i] -= this.Items[i];
            }
            this.Repo.FullCap -= this.Cap;
            this.Repo.BuildAreas[this.Position[0]][this.Position[1]].Status = 'empty';
            this.Repo.BuildAreas[this.Position[0]][this.Position[1]].Build = undefined;
        }
    }
}