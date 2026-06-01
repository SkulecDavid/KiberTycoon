import '../assets/css/style.css';
import { Game } from './Classes/Game.ts';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

canvas.width = 1280;
canvas.height = 720;

window.addEventListener('load', ()=>{
    const game = new Game(canvas);
    game.start();
})