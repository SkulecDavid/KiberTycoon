export interface MineIF {
    type: 'Szén' | 'Réz' | 'Vas' | 'Arany';
    number: 1 | 2;
    price: number;
    upgrade: number;
    speed: number;
}