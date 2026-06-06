import { Button } from "../Button.ts";
import type { Game } from "../Game.ts";
import { Building } from "./Building.ts";

export class FactoryBuild extends Building {
    private Type: number; // 0,1,2,3 wire,steel,chip,electronics
    private TimerStop: number;
    private TimerValue: number = 0;
    private UpgradePrices: number[] = [100, 175, 225, 400];
    private Timers: number[] = [28, 18, 10, 6]

    constructor(repo: Game, position: [number, number], type: number){
        super(repo, position, ()=>this.actions());
        this.Color = '#b93f3f';
        this.Type = type;
        this.MaxLevel = this.Type == 3 ? 0 : 1;
        this.UpgradePrice = this.UpgradePrices[this.Type];
        this.TimerStop = Math.round(60/this.Timers[this.Type]*60*2);

        const techs = this.Repo.Technologies;
        if (techs[7]){
            this.TechUnlocked++;
            if (techs[12]){
                this.TechUnlocked++;
            if (techs[16]){
                this.TechUnlocked++;
        }}}
    }

    actions(){
        const btnX = this.Repo.OneSixthHeight*(this.Position[1]+1);
        const btnY = this.Repo.OneSixthHeight*(this.Position[0]+2);
        this.Buttons = new Array();
        if (this.Type != 3) {
            this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, this.Repo.Items[this.Type] == this.Repo.FullCap ? 'MEGTELT' : this.Repo.Materials[this.Type] < 2 || this.Repo.Materials[this.Type+1] < 2 ? 'KEVÉS' : 'Termel', btnX, btnY, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.produce()}));
        } else {
            this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, this.Repo.Items[this.Type] == this.Repo.FullCap ? 'MEGTELT' : this.Repo.Items[0] < 2 || this.Repo.Items[1] < 2 || this.Repo.Items[2] < 2 ? 'KEVÉS' : 'Termel', btnX, btnY, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.produce()}));
        }
        this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, this.Level < this.MaxLevel ? 'Fejleszt' : 'MAX', btnX, btnY+this.Repo.OneSixthHeight/3, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.upgrade()}));
        this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, 'Töröl', btnX, btnY+this.Repo.OneSixthHeight/3*2, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.delete()}));
    }

    produce(){
        if (this.Type != 3) {
            const matA = this.Repo.Materials[this.Type];
            const matB = this.Repo.Materials[this.Type+1];
            const items = this.Repo.Items[this.Type];
            if (items != this.Repo.FullCap) {
                if (matA >= 1 && matB >= 1) {
                    while (true) {
                        if (this.TimerValue == this.TimerStop) {
                            this.Repo.Materials[this.Type]--;
                            this.Repo.Materials[this.Type+1]--;
                            this.Repo.Items[this.Type]++;
                            this.TimerValue = 0;
                            console.log('Done');
                            break;
                        } else {
                            this.TimerValue++;
                        }
                    }
                }
            }
        } else {
            const a = this.Repo.Materials[0];
            const b = this.Repo.Materials[1];
            const c = this.Repo.Materials[2];
            const items = this.Repo.Items[3];
            if (items != this.Repo.FullCap) {
                if (a >= 1 && b >= 1 && c >= 1) {
                    while (true) {
                        if (this.TimerValue == this.TimerStop) {
                            this.Repo.Materials[0]--;
                            this.Repo.Materials[1]--;
                            this.Repo.Materials[2]--;
                            this.Repo.Items[3]++;
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
    }

    upgrade(){
        if (this.Level < this.MaxLevel && this.Level+this.Type < this.TechUnlocked &&
            confirm(`Akarod ezt a gyárat fejleszteni ${this.Level+2}-re/-ra (${this.UpgradePrice} alapanyag)?`)) {
            if (this.Repo.Material >= this.UpgradePrice) {
                this.Level++;
                this.Repo.Material -= this.UpgradePrice;
                this.Buttons = undefined
            }
        }
    }

    delete(){
        if (confirm(`Biztosan ki akarod törölni ezt a gyárat?`)) {
            this.Repo.BuildAreas[this.Position[0]][this.Position[1]].Status = 'empty';
            this.Repo.BuildAreas[this.Position[0]][this.Position[1]].Build = undefined;
        }
    }
}