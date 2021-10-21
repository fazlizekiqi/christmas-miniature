import * as THREE from "three";

const totalSnowFlakes = 1000;
const textureLoader = new THREE.TextureLoader();
const snowflakeTexture = textureLoader.load('textures/snowflake2.png');
const snowFlakeGeometry = new THREE.BufferGeometry();
const snowFlakePositionArray = new Float32Array(totalSnowFlakes * 3);
const positionAttribute = new THREE.BufferAttribute(snowFlakePositionArray, 3);

const updateSnowFlakes = ( ) => {
  let snowFlakeSpeed = 0.015;
  for (let i = 0; i < totalSnowFlakes; i++) {
    const i3 = i * 3;
    snowFlakeGeometry.attributes.position.array[i3 + 1] -= snowFlakeSpeed;
    if(snowFlakeGeometry.attributes.position.array[i3 + 1] <= -4) {
      snowFlakeGeometry.attributes.position.array[i3 + 1] = Math.random() * 10;
    }
  }
};

export const SnowFlakes = (scene) => {

  snowFlakeGeometry.setAttribute('position', positionAttribute);

  for (let i = 0; i < snowFlakePositionArray.length; i++) {
    snowFlakePositionArray[i] = 13.5 * Math.sin(Math.random() - 0.5);
  }

  const snowFlakeMaterial = new THREE.PointsMaterial({
    size: 0.15,
    color: 0xffffff,
    map: snowflakeTexture,
    vertexColors: false,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.4,
    fog: true,
    depthWrite: false
  })

  const snowFlakePoint = new THREE.Points(snowFlakeGeometry, snowFlakeMaterial,);
  scene.add(snowFlakePoint);

  return {updateSnowFlakes, snowFlakeGeometry};


};

