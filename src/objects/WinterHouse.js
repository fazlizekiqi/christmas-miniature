import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const createPointLight = () => {
  const pointLight = new THREE.PointLight('#ff7d46', 5, 4.5)
  pointLight.position.set(-1, 2, -2.3)
  return pointLight;
};

export const WinterHouse = (scene) =>{

  const loader = new GLTFLoader();

  loader.load('models/winter-house.glb', (winterHouse) => {
      const pointLight = createPointLight();

      winterHouse.scene.scale.setX(0.75)
      winterHouse.scene.scale.setZ(0.75)

      scene.add(pointLight)
      scene.add(winterHouse.scene);
    },
    (xhr) => console.log(`Winter house - ${xhr.loaded / xhr.total * 100}% loaded`),
    (error) => console.error(error),
  );
};
