import { TreeFactory } from './TreeFactory.mjs';
import { Tree } from './Tree.mjs';

class Forest {

    factory;
    trees;

    constructor() {

        this.factory = new TreeFactory();
        this.trees = [] // hold Tree objects

    }

    plantTree(x, y, name) {

        let type = this.factory.getTreeType(name);
        this.trees.push(new Tree(x, y, type));
        
    }

    draw(gameView) {

        for (let tree in this.trees) {
            this.trees[tree].draw(gameView);
        }

    }


}

export { Forest }