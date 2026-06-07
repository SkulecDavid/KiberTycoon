import type { Game } from "../Game";

export class Stat {
    private Repo: Game;
    private X: number;
    private Y: number;

    constructor(repo: Game){
        this.Repo = repo;
        this.X = this.Repo.SmallDivX+this.Repo.FontSize/4;
        this.Y = this.Repo.SmallDivY+this.Repo.FontSize;
    }

    draw(){
        const ctx = this.Repo.Ctx;
        ctx.fillStyle = this.Repo.DarkColor;
        ctx.textAlign = 'left';
        const x = this.X;
        const y = this.Y;
        const a = this.Repo.QuarterWidth;
        const b = this.Repo.FontSize*1.1;
        
        ctx.fillText(`Kreditek: ${this.Repo.Credit.toLocaleString('hu-HU')}`, x, y);
        ctx.fillText(`Alapanyagok: ${this.Repo.Material.toLocaleString('hu-HU')}`, x, y+b);
        ctx.fillText(`Techpontok: ${this.Repo.TechPoint.toLocaleString('hu-HU')}`, x, y+b*2);
        ctx.fillText(`Terrapontok: ${this.Repo.TerraPoint.toLocaleString('hu-HU')}`, x, y+b*3);
        ctx.fillText(`Terra szint: ${this.Repo.TerraLvl}`, x, y+b*4);
        ctx.fillText(`Raktár kapacitás: ${this.Repo.FullCap}`, x, y+b*5);

        ctx.fillText(`Szénérc: ${this.Repo.RawMaterials[0]}`, x+a, y);
        ctx.fillText(`Rézérc: ${this.Repo.RawMaterials[1]}`, x+a, y+b);
        ctx.fillText(`Vasérc: ${this.Repo.RawMaterials[2]}`, x+a, y+b*2);
        ctx.fillText(`Aranyérc: ${this.Repo.RawMaterials[3]}`, x+a, y+b*3);

        ctx.fillText(`Szén: ${this.Repo.Materials[0]}`, x+a, y+b*4);
        ctx.fillText(`Réz: ${this.Repo.Materials[1]}`, x+a, y+b*5);
        ctx.fillText(`Vas: ${this.Repo.Materials[2]}`, x+a, y+b*6);
        ctx.fillText(`Arany: ${this.Repo.Materials[3]}`, x+a, y+b*7);

        ctx.fillText(`Kábel: ${this.Repo.Items[0]}`, x+a, y+b*8);
        ctx.fillText(`Acél: ${this.Repo.Items[1]}`, x+a, y+b*9);
        ctx.fillText(`Chip: ${this.Repo.Items[2]}`, x+a, y+b*10);
        ctx.fillText(`Elektronika: ${this.Repo.Items[3]}`, x+a, y+b*11);

        ctx.fillText(`Szerzett:`, x+a*2, y);
        ctx.fillText(`-Kreditek: ${this.Repo.SpentCredits}`, x+a*2, y+b);
        ctx.fillText(`-Alapanyagok: ${this.Repo.SpentMaterials}`, x+a*2, y+b*2);
        ctx.fillText(`-Techpontok: ${this.Repo.SpentTechPoints}`, x+a*2, y+b*3);

        ctx.fillText(`Elköltött:`, x+a*2, y+b*5);
        ctx.fillText(`-Kreditek: ${this.Repo.EarnedCredits}`, x+a*2, y+b*6);
        ctx.fillText(`-Alapanyagok: ${this.Repo.EarnedMaterials}`, x+a*2, y+b*7);
        ctx.fillText(`-Techpontok: ${this.Repo.EarnedTechPoints}`, x+a*2, y+b*8);

        ctx.fillText(`Bányászott:`, x+a*2, y+b*10);
        ctx.fillText(`-Szén: ${this.Repo.MinedCoal}`, x+a*2, y+b*11);
        ctx.fillText(`-Réz: ${this.Repo.MinedCopper}`, x+a*2, y+b*12);
        ctx.fillText(`-Vas: ${this.Repo.MinedIron}`, x+a*2, y+b*13);
        ctx.fillText(`-Arany: ${this.Repo.MinedGold}`, x+a*2, y+b*14);

        const time = this.Repo.CurrentTime.getTime() - this.Repo.StartTime.getTime()
        ctx.fillText(`Eltelt idő: ${new Date(time).toISOString().slice(11, 19)}`, x+a*3, y);

        ctx.fillText(`Épületek: ${this.Repo.BuiltBuildings}`, x+a*3, y+b*2);
        ctx.fillText(`Bányák: ${this.Repo.BoughtMines}`, x+a*3, y+b*3);
        ctx.fillText(`Terjeszkedések: ${this.Repo.BoughtExpansions}`, x+a*3, y+b*4);
        ctx.fillText(`Technológiák: ${this.Repo.BoughtTechs}`, x+a*3, y+b*5);
        ctx.fillText(`Fejlesztett:`, x+a*3, y+b*7);
        ctx.fillText(`-Bányák: ${this.Repo.UpgradedMines}`, x+a*3, y+b*8);
        ctx.fillText(`-Épületek: ${this.Repo.UpgradedBuildings}`, x+a*3, y+b*9);
    }
}