import * as THREE from "three";

const createPointLight = () => {
  const pointLight = new THREE.PointLight('#ff7d46', 5, 4.5)
  pointLight.position.set(-1, 2, -2.3)
  return pointLight;
};

export const WinterHouse = (scene, winterHouse) => {

  const pointLight = createPointLight();

  winterHouse.scene.scale.setX(0.75)
  winterHouse.scene.scale.setZ(0.75)

  scene.add(pointLight)
  scene.add(winterHouse.scene);

};
