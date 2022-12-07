import { AcaciaTreeType } from './AcaciaTreeType.mjs';
import { PalmTreeType } from './PalmTreeType.mjs';

class TreeFactory {
    
    treeTypes;

    constructor() {

        this.treeTypes = {};

        this.treeTypes.acacia = new AcaciaTreeType();
        this.treeTypes.palm = new PalmTreeType();

    }

    getTreeType(name) {

        if (name == "random") {
            let type = Math.floor(Math.random() * 2);
            return this.treeTypes[Object.keys(this.treeTypes)[type]];
        } else {
            return this.treeTypes[name];
        }
    }

}

export { TreeFactory }