import * as THREE from "three";
import gsap from "gsap";

const radius = 7.5;
const radialSegments = 240;

export default class SnowGround {

  constructor(scene, textures) {

    this.hemisphereMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      map: textures.hemisphereColorTexture,
      aoMap: textures.hemisphereAmbientOcclusionTexture,
      displacementMap: textures.hemiSphereHeightTexture,
      displacementScale: 0.01,
      normalMap: textures.hemiSphereNormalTexture,
      metalnessMap: textures.hemiSphereMetalnessTexture,
      roughnessMap: textures.hemiSphereRoughnessTexture,
    });

    this.hemisphereGeometry = new THREE.SphereBufferGeometry(radius, radialSegments, Math.round(radialSegments / 4), 0, Math.PI * 2, 0, Math.PI * 0.5);
    this.hemisphereGeometry.setAttribute(
      'uv2',
      new THREE.Float32BufferAttribute(this.hemisphereGeometry.attributes.uv.array, 2)
    );

    this.hemiSphere = new THREE.Mesh(this.hemisphereGeometry, this.hemisphereMaterial);

    this.snowGroundGeometry = new THREE.CircleBufferGeometry(radius, radialSegments);
    this.snowGroundGeometry.computeVertexNormals();
    this.snowGroundGeometry.setAttribute(
      'uv2',
      new THREE.Float32BufferAttribute(this.snowGroundGeometry.attributes.uv.array, 2),
    );

    this.snowGroundMaterial = new THREE.MeshStandardMaterial({
      transparent: true,
      map: textures.hemisphereColorTexture,
      aoMap: textures.hemisphereAmbientOcclusionTexture,
      displacementScale: 0.9,
      normalMap: textures.hemiSphereNormalTexture,
      roughnessMap: textures.hemiSphereRoughnessTexture,
    });

    this.snowGround = new THREE.Mesh(this.snowGroundGeometry, this.snowGroundMaterial);
    this.snowGround.rotateX(Math.PI * 0.5)

    this.hemiSphere.add(this.snowGround);
    this.hemiSphere.rotateX(Math.PI);
    scene.add(this.hemiSphere)
  }


};
