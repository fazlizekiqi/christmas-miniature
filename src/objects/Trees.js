import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

export const Trees = (scene) => {

  const totalTrees = 30;
  const loader = new GLTFLoader();

  loader.load('models/scene.gltf', gltf => {

      for (let i = 0; i < totalTrees; i++) {
        const clone = gltf.scene.clone();

        const angles = Math.random() * Math.PI * 2;
        const radius = 3 + Math.random() * 4.2;

        const x = Math.sin(angles) * radius
        const z = Math.cos(angles) * radius

        clone.position.setX(x)
        clone.position.setZ(z)

        clone.scale.setY(Math.random() + 1.2)
        scene.add(clone)
      }
    },
    (xhr) => console.log(`Trees ${xhr.loaded / xhr.total * 100}% loaded`),
    (error) => console.error(error),
  );
};
