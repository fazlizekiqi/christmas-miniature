import * as THREE from "three";


export default class SnowFlakes {

  constructor(scene, items) {
    this.totalSnowFlakes = 1000;
    this.snowFlakePositionArray = new Float32Array(this.totalSnowFlakes * 3);
    this.positionAttribute = new THREE.BufferAttribute(this.snowFlakePositionArray, 3);
    this.snowFlakeGeometry = new THREE.BufferGeometry();
    this.snowFlakeGeometry.setAttribute('position', this.positionAttribute);
    this.#positionSnowFlakes()

    this.snowFlakeMaterial = new THREE.PointsMaterial({
      size: 0.15,
      color: 0xffffff,
      map: items.snowFlakeTexture,
      vertexColors: false,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.4,
      fog: true,
      depthWrite: false
    })

    const snowFlakePoint = new THREE.Points(this.snowFlakeGeometry, this.snowFlakeMaterial);
    scene.add(snowFlakePoint);
  }

  #positionSnowFlakes() {
    for (let i = 0; i < this.snowFlakePositionArray.length; i++) {
      this.snowFlakePositionArray[i] = 13.5 * Math.sin(Math.random() - 0.5);
    }
  }


  update() {
    let snowFlakeSpeed = 0.015;
    for (let i = 0; i < this.totalSnowFlakes; i++) {
      const i3 = i * 3;
      this.snowFlakeGeometry.attributes.position.array[i3 + 1] -= snowFlakeSpeed;
      if(this.snowFlakeGeometry.attributes.position.array[i3 + 1] <= -4) {
        this.snowFlakeGeometry.attributes.position.array[i3 + 1] = Math.random() * 10;
      }
    }
    this.snowFlakeGeometry.attributes.position.needsUpdate = true
  };

};

