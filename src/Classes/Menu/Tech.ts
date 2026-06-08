import type { TechStat } from "../../Types/TechStat.ts";
import type { Game } from "../Game.ts";
import { TechBtn } from "../UI/TechBtn.ts";

export class Tech {
    private Repo: Game;
    private Stats: TechStat;
    private X: number;
    private Y: number;
    private Titles: string[] = ['Rézbányászat', 'Kábelek', 'Szén - 2-es szint', 'Oxigéntermelés',
        'Terraformálás 1', 'Vasbányászat', 'Acélgyártás', 'Réz - 2-es szint', 'Üvegházalás',
        'Terraformálás 2', 'Aranybányászat', 'Okos chipek', 'Vas - 2-es szint', 'Légkörjavítás',
        'Terraformálás 3', 'Elektronika', 'Arany - 2-es szint', 'Állattenyésztés', 'Terraformálás 4'];
    public IsAvailable: boolean = true;
    private Bought: boolean = false;
    private Btn: TechBtn;

    constructor(repo: Game, stats: TechStat){
        this.Repo = repo;
        this.Stats = stats;
        this.X = this.Repo.TechBtnX;
        this.Y = this.Repo.TechBtnY;
        
        if (this.Stats.number != 0) {
            this.IsAvailable = this.Repo.Technologies[this.Stats.number-1];
        }
        
        const num = this.Stats.number;
        switch (true) {
            case num < 5:
                this.Y += this.Repo.OneSixthHeight*num;
                break
            case num < 10:
                this.Y += this.Repo.OneSixthHeight*4;
                this.Y -= this.Repo.OneSixthHeight*(num-5);
                this.X += this.Repo.QuarterWidth;
                break
            case num < 15:
                this.Y += this.Repo.OneSixthHeight*(num-10);
                this.X += this.Repo.QuarterWidth*2;
                break
            default:
                this.Y += this.Repo.OneSixthHeight*3+this.Repo.OneSixthHeight/2;
                this.Y -= this.Repo.OneSixthHeight*(num-15);
                this.X += this.Repo.QuarterWidth*3;
                break
        }

        const text = `${this.Titles[this.Stats.number]}\n${this.Stats.materials} AL + ${this.Stats.techPoints} TP${this.Stats.terraPoints ? ' + '+this.Stats.terraPoints+' Ter' : ''}`;
        this.Btn = new TechBtn(this.Repo, this.Repo.TechBtnColor, text, this.X, this.Y, this.Repo.TechBtnWidth, this.Repo.TechBtnHeight, ()=>{this.use()}, this.Stats.number);
    }

    update(){
        if (!this.Bought) {
            this.Btn.update();
        }
    }

    draw(){
        this.Btn.draw();
    }

    use(){
        if (this.Repo.Material >= this.Stats.materials &&
            this.Repo.TechPoint >= this.Stats.techPoints){
            if (this.Stats.terraPoints){
                if (this.Repo.TerraPoint >= this.Stats.terraPoints) {
                    this.Repo.TerraLvl++;
                    this.Repo.SpentMaterials += this.Stats.materials;
                    this.Repo.Material -= this.Stats.materials;
                    this.Repo.SpentTechPoints += this.Stats.techPoints;
                    this.Repo.TechPoint -= this.Stats.techPoints;
                    this.Repo.BoughtTechs++;
                    this.Repo.Technologies[this.Stats.number] = true;
                    if (this.Stats.number < this.Repo.Techs.length-1) {
                        this.Repo.Techs[this.Stats.number+1].IsAvailable = true;
                    }
                    this.Bought = true;
                }
            } else {
                this.Repo.SpentMaterials += this.Stats.materials;
                this.Repo.Material -= this.Stats.materials;
                this.Repo.SpentTechPoints += this.Stats.techPoints;
                this.Repo.TechPoint -= this.Stats.techPoints;
                this.Repo.BoughtTechs++;
                this.Repo.Technologies[this.Stats.number] = true;
                if (this.Stats.number < this.Repo.Techs.length-1) {
                    this.Repo.Techs[this.Stats.number+1].IsAvailable = true;
                }
                this.Bought = true;
                }
        }
    }
}