import type { Game } from "../Game.ts";
import { Building } from "./Building.ts";

export class StorageBuild extends Building {
    private UpgradePrices: number[] = [25, 50, 100];
    private Cap: number = 250;
    private RawMaterials: number[] = [0, 0, 0, 0];
    private Materials: number[] = [0, 0, 0, 0];
    private Items: number[] = [0, 0, 0, 0];

    constructor(repo: Game, position: [number, number], event: Function){
        super(repo, position, event);
        this.Color = '#d69f3d';
    }
}