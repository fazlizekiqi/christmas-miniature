import * as THREE from "three";

export default class WinterHouse {

  constructor(scene, winterHouse) {
    const pointLight = WinterHouse.#createPointLight();
    scene.add(pointLight)

    winterHouse.scene.scale.setX(0.75)
    winterHouse.scene.scale.setZ(0.75)
    scene.add(winterHouse.scene);

  }


  static #createPointLight() {
    const pointLight = new THREE.PointLight('#ff7d46', 5, 4.5)
    pointLight.position.set(-1, 2, -2.3)
    return pointLight;
  };

};
