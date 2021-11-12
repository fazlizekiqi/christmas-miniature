export const Trees = (scene, items) => {


  const totalTrees = 30;

  for (let i = 0; i < totalTrees; i++) {
    const clone = items.treeModel.scene.clone();

    const angles = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 4.2;

    const x = Math.sin(angles) * radius
    const z = Math.cos(angles) * radius

    clone.position.setX(x)
    clone.position.setZ(z)

    clone.scale.setY(Math.random() + 1.2)
    scene.add(clone)
  }


};
