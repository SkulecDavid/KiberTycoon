import { Button } from "../UI/Button";
import type { Game } from "../Game";
import { Building } from "./Building";

export class TerraBuild extends Building {
    private TerraPoint: number;
    private Type: number;

    constructor(repo: Game, position: [number, number], type: number){
        super(repo, position, ()=>this.actions());
        this.Color = '#5a9e4e';
        this.Type = type;
        this.Image = this.Repo.Images[8+this.Type]
        this.MaxLevel = this.Type == 3 ? 0 : 1;
        this.UpgradePrice = 30*(this.Type+1);
        this.TerraPoint = 30+(this.Type*40);

        const techs = this.Repo.Technologies;
        if (techs[7]){
            this.TechUnlocked++;
            if (techs[12]) {
                this.TechUnlocked++;
            if (techs[16]) {
                this.TechUnlocked++;
        }}}

        this.Repo.TerraPoint += this.TerraPoint;
    }

    actions(){
        const btnX = this.Repo.OneSixthHeight*(this.Position[1]+1);
        const btnY = this.Repo.OneSixthHeight*(this.Position[0]+2);
        this.Buttons = new Array();
        this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, this.Level < this.MaxLevel ? 'Fejleszt' : 'MAX', btnX, btnY, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.upgrade()}));
        this.Buttons.push(new Button(this.Repo, this.Repo.MainBtnColor, 'Töröl', btnX, btnY+this.Repo.OneSixthHeight/3, this.Repo.OneSixthHeight, this.Repo.OneSixthHeight/3, ()=>{this.delete()}));
    }

    upgrade(){
        if (this.Level < this.MaxLevel && this.Level+this.Type < this.TechUnlocked &&
            confirm(`Akarod ezt a(z) ${this.Repo.BuildAreas[0][0].TerraNames[this.Type]} fejleszteni ${this.Level+2}-re/-ra (${this.UpgradePrice} alapanyag)?`)) {
            if (this.Repo.Material >= this.UpgradePrice) {
                this.Level++;
                this.Repo.UpgradedBuildings++;
                this.Repo.TerraPoint -= this.TerraPoint;
                this.TerraPoint *= 2;
                this.Repo.TerraPoint += this.TerraPoint;
                this.Repo.SpentMaterials += this.UpgradePrice;
                this.Repo.Material -= this.UpgradePrice;
                this.Buttons = undefined
            }
        }
    }

    delete(){
        if (confirm(`Biztosan ki akarod törölni ezt a(z) ${this.Repo.BuildAreas[0][0].TerraNames[this.Type]}?`)) {
            this.Repo.TerraPoint -= this.TerraPoint;
            this.Repo.UpgradedBuildings -= this.Level;
            this.Repo.BuiltBuildings--;
            this.Repo.BuildAreas[this.Position[0]][this.Position[1]].Status = 'empty';
            this.Repo.BuildAreas[this.Position[0]][this.Position[1]].Build = undefined;
        }
    }
}