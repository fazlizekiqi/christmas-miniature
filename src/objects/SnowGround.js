import * as THREE from "three";

const textureLoader = new THREE.TextureLoader();
const radius = 7.5;
const radialSegments = 240;

export const SnowGround = (scene) =>{

  const hemiSphereColorTexture = textureLoader.load('/textures/snow-ground/color.jpeg');
  const hemiSphereAmbientOcclusionTexture = textureLoader.load('/textures/snow-ground/ambientOcclusion.jpeg');
  const hemiSphereHeightTexture = textureLoader.load('/textures/snow-ground/height.jpeg');
  const hemiSphereNormalTexture = textureLoader.load('/textures/snow-ground/normal.jpeg');
  const hemiSphereMetalnessTexture = textureLoader.load('/textures/snow-ground/metalness.jpeg');
  const hemiSphereRoughnessTexture = textureLoader.load('/textures/snow-ground/roughness.jpeg');

  const hemisphereMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    map: hemiSphereColorTexture,
    aoMap: hemiSphereAmbientOcclusionTexture,
    displacementMap: hemiSphereHeightTexture,
    displacementScale: 0.01,
    normalMap: hemiSphereNormalTexture,
    metalnessMap: hemiSphereMetalnessTexture,
    roughnessMap: hemiSphereRoughnessTexture,
  });


  const hemisphereGeometry = new THREE.SphereBufferGeometry(radius, radialSegments, Math.round(radialSegments / 4), 0, Math.PI * 2, 0, Math.PI * 0.5);
  hemisphereGeometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(hemisphereGeometry.attributes.uv.array, 2)
  );

  const hemiSphere = new THREE.Mesh(hemisphereGeometry, hemisphereMaterial);

  const snowGroundGeometry = new THREE.CircleBufferGeometry(radius, radialSegments);
  snowGroundGeometry.computeVertexNormals();
  snowGroundGeometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(snowGroundGeometry.attributes.uv.array, 2),
  );

  const snowGroundMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    map: hemiSphereColorTexture,
    aoMap: hemiSphereAmbientOcclusionTexture,
    displacementScale: 0.9,
    normalMap: hemiSphereNormalTexture,
    roughnessMap: hemiSphereRoughnessTexture,
  });

  const snowGround = new THREE.Mesh(snowGroundGeometry, snowGroundMaterial);
  snowGround.rotateX(Math.PI * 0.5)

  hemiSphere.add(snowGround);
  hemiSphere.rotateX(Math.PI);
  scene.add(hemiSphere)


};
