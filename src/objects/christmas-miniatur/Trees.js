export default class Trees {

  totalTrees;

  constructor(scene, treeModel, totalTrees= 10) {
    this.totalTrees = totalTrees;
    this.generateMultipleTree(treeModel, scene);
  }

  generateMultipleTree(treeModel, scene) {
    for (let i = 0; i < this.totalTrees; i++) {
      const tree = treeModel.scene.clone();
      const clonedTree = this.cloneTree(tree);
      scene.add(clonedTree)
    }
  }

  cloneTree(tree) {

    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 4.2;

    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    tree.position.setX(x)
    tree.position.setZ(z)

    tree.scale.setY(Math.random() + 1.2)
    return tree;
  }
};
