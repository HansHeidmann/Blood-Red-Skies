import ViewController from './modules/ViewController.mjs';

import MenuView from './modules/Views/MenuView.mjs';
import GameView from './modules/Views/GameView.mjs';

//
// Top Down Survival Shooter
// 
// Hans Heidmann & Peter Loden
//
//

// DEBUG
// console.log('pixi:');
// console.log(PIXI);
// console.log(Game);


////////////////////////////////////////////////////////////////

const viewController = new ViewController();
// sceneController.goto('game');

const menu = new MenuView(viewController);

const game = new GameView(viewController);
game.load();




// DEBUG
//window.game = game;
//window.sceneController = viewController;
