import { Button } from "../Button.ts";
import type { Game } from "../Game.ts";
import { Building } from "./Building.ts";

export class RefineBuild extends Building {
    private Type: number; // 0,1,2,3 coal,copper,iron,gold
    private TimerStop: number;
    private TimerValue: number = 0;

    constructor(repo: Game, position: [number, number], type: number){
        super(repo, position, ()=>this.actions());
        this.Color = '#d76b3c';
        this.MaxLevel = 1;
        this.Type = type;
        this.UpgradePrice = this.Repo.Mines[this.Type*2].Stats.price/2;
        this.TimerStop = this.Repo.Mines[this.Type].TimerStop;

        const techs = this.Repo.Technologies;
        if (techs[2]){
            this.TechUnlocked++;
        }
    }

    actions(){
        const btnX = this.Repo.OneSixthHeight*(this.Position[1]+1);
        const btnY = this.Repo.OneSixthHeight*(this.Position[0]+2);
        this.Buttons = new Array();
        this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, this.Repo.Materials[this.Type] == this.Repo.FullCap ? 'MEGTELT' : this.Repo.RawMaterials[this.Type] < 2 ? 'KEVÉS' : 'Termel', btnX, btnY, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.produce()}));
        this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, this.Level < this.MaxLevel ? 'Fejleszt' : 'MAX', btnX, btnY+this.Repo.OneSixthHeight/3, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.upgrade()}));
        this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, 'Töröl', btnX, btnY+this.Repo.OneSixthHeight/3*2, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.delete()}));
    }

    produce(){
        const raws = this.Repo.RawMaterials[this.Type] ;
        const refineds = this.Repo.Materials[this.Type];
        if (refineds != this.Repo.FullCap) {
            if (raws >= 2) {
                while (true) {
                    if (this.TimerValue == this.TimerStop) {
                        this.Repo.Materials[this.Type]++;
                        this.TimerValue = 0;
                        console.log('Done');
                        break;
                    } else {
                        this.TimerValue++;
                    }
                }
            }
        }
    }

    upgrade(){
        if (this.Level < this.MaxLevel && confirm(`Akarod ezt a feldolgozót fejleszteni ${this.Level+2}-re/-ra (${this.UpgradePrice} KR)?`)) {
            if (this.Repo.Credit >= this.UpgradePrice) {
                this.Level++;
                this.Repo.Credit -= this.UpgradePrice;
                this.Buttons = undefined
            }
        }
    }

    delete(){
        if (confirm(`Biztosan ki akarod törölni ezt a feldolgozót?`)) {
            this.Repo.BuildAreas[this.Position[0]][this.Position[1]].Status = 'empty';
            this.Repo.BuildAreas[this.Position[0]][this.Position[1]].Build = undefined;
        }
    }
}