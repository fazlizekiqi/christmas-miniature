import * as THREE from "three";

const radius = 7.5;
const radialSegments = 240;

export const SnowGround = (scene, textures) => {

  const hemisphereMaterial = new THREE.MeshStandardMaterial({
    transparent: true,
    map: textures.hemisphereColorTexture,
    aoMap: textures.hemisphereAmbientOcclusionTexture,
    displacementMap: textures.hemiSphereHeightTexture,
    displacementScale: 0.01,
    normalMap: textures.hemiSphereNormalTexture,
    metalnessMap: textures.hemiSphereMetalnessTexture,
    roughnessMap: textures.hemiSphereRoughnessTexture,
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
    map: textures.hemisphereColorTexture,
    aoMap: textures.hemisphereAmbientOcclusionTexture,
    displacementScale: 0.9,
    normalMap: textures.hemiSphereNormalTexture,
    roughnessMap: textures.hemiSphereRoughnessTexture,
  });

  const snowGround = new THREE.Mesh(snowGroundGeometry, snowGroundMaterial);
  snowGround.rotateX(Math.PI * 0.5)

  hemiSphere.add(snowGround);
  hemiSphere.rotateX(Math.PI);
  scene.add(hemiSphere)


};
