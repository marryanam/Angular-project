import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';

@Component({
  selector: 'app-front-page',
  standalone: true,
  imports: [],
  templateUrl: './front-page.component.html',
  styleUrls: ['./front-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FrontPageComponent implements OnInit{
  gui!: dat.GUI;
  canvas!: HTMLCanvasElement;
  scene!: THREE.Scene;
  geometry!: THREE.SphereGeometry;
  material!: THREE.MeshStandardMaterial;
  sphere!: THREE.Mesh;
  pointLight!: THREE.PointLight;
  pointLightExtra!: THREE.PointLight;
  pointLightSecondary!: THREE.PointLight;
  sizes!: { width: number; height: number };
  camera!: THREE.PerspectiveCamera;
  renderer!: THREE.WebGLRenderer;
  clock!: THREE.Clock;
  tick!: () => void;
  textureLoader!: THREE.TextureLoader;
  normalTexture!: THREE.Texture;
  displacementTexture!: THREE.Texture;
  pointLightHelper!: THREE.PointLightHelper;
  onDocumentMouseMove!: (event: MouseEvent) => void;
  mouseX!: number;
  mouseY!: number;
  targetX!: number;
  targetY!: number;
  lastMouseMoveTime: number = 0;
  mouseMoveTimeout: number = 2000; 

  constructor() {
    
   }

  ngOnInit(): void {
    this.setInitialData();
    this.resize();
    this.move();
    this.runTick();
  }

  setInitialData() {
    // this.gui = new dat.GUI();
    this.canvas = document.querySelector('canvas.main') as HTMLCanvasElement;
    this.scene = new THREE.Scene();

    this.setGeometry();
    this.setLight();

    // this.guiData();

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
    this.camera.position.set(0, 0, 2);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.clock = new THREE.Clock();
  }

  setGeometry(){
    this.textureLoader  = new THREE.TextureLoader();
    this.normalTexture = this.textureLoader.load("../../../assets/texture-1.jpg");
    this.displacementTexture =  this.textureLoader.load("../../../assets/Obsidian_002_ambientOcclusion.png");


    this.geometry = new THREE.SphereGeometry(.4, 64,64);

    this.material = new THREE.MeshStandardMaterial();
    this.material.metalness = 0.22;
    this.material.roughness = 0.39;
    this.material.color = new THREE.Color(0x292929);
    this.material.normalMap = this.normalTexture;
    this.material.displacementMap = this.displacementTexture;
    this.material.displacementScale = 0.3; 

    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.sphere);
  }

  setLight(){
    this.pointLight = new THREE.PointLight(0xffffff, 2);
    this.pointLight.intensity =  3.26;
    this.pointLight.position.set(0.95, -1.69, -0.07);

    this.scene.add(this.pointLight);

    this.pointLightExtra = new THREE.PointLight(0xff0000, 3);
    this.pointLightExtra.intensity = 3.06;
    this.pointLightExtra.position.set(-1.08, 0.71, 0.19);
    this.scene.add(this.pointLightExtra);

    this.pointLightSecondary = new THREE.PointLight(0x15dddd, 3);
    this.pointLightSecondary.intensity = 2.89;
    this.pointLightSecondary.position.set(0.28, -0.11, 1.08);
    this.scene.add(this.pointLightSecondary);
  }

  resize() {
    window.addEventListener('resize', () => {
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });
  }

guiData() {
  this.pointLightHelper = new THREE.PointLightHelper(this.pointLightSecondary, 0.5);
  this.scene.add(this.pointLightHelper);

  // Controls for Light1
  const light1 = this.gui.addFolder('Light1');
  light1.add(this.pointLight.position, 'x').min(-10).max(10).step(0.01).name('Position X');
  light1.add(this.pointLight.position, 'y').min(-10).max(10).step(0.01).name('Position Y');
  light1.add(this.pointLight.position, 'z').min(-10).max(10).step(0.01).name('Position Z');
  light1.add(this.pointLight, 'intensity').min(0).max(10).step(0.01).name('Intensity');

  // Controls for Light2
  const light2 = this.gui.addFolder('Light2');
  light2.add(this.pointLightExtra.position, 'x').min(-10).max(10).step(0.01).name('Position X');
  light2.add(this.pointLightExtra.position, 'y').min(-10).max(10).step(0.01).name('Position Y');
  light2.add(this.pointLightExtra.position, 'z').min(-10).max(10).step(0.01).name('Position Z');
  light2.add(this.pointLightExtra, 'intensity').min(0).max(10).step(0.01).name('Intensity');

  // Controls for Light3
  const light3 = this.gui.addFolder('Light3');
  light3.add(this.pointLightSecondary.position, 'x').min(-10).max(10).step(0.01).name('Position X');
  light3.add(this.pointLightSecondary.position, 'y').min(-10).max(10).step(0.01).name('Position Y');
  light3.add(this.pointLightSecondary.position, 'z').min(-10).max(10).step(0.01).name('Position Z');
  light3.add(this.pointLightSecondary, 'intensity').min(0).max(10).step(0.01).name('Intensity');

  // Controls for Material properties
  const materialFolder = this.gui.addFolder('Material');
  materialFolder.add(this.material, 'metalness').min(0).max(1).step(0.01).name('Metalness');
  materialFolder.add(this.material, 'roughness').min(0).max(1).step(0.01).name('Roughness');
  materialFolder.addColor({ color: this.material.color.getHex() }, 'color').onChange((value) => {
    this.material.color.set(value);
  }).name('Color');
  materialFolder.add(this.material, 'displacementScale').min(0).max(1).step(0.01).name('Displacement Scale');

  // Update textures using GUI
  const displacementFolder = this.gui.addFolder('Displacement Map');
  displacementFolder.add({ update: () => this.material.displacementMap = this.displacementTexture }, 'update').name('Update Displacement Map');

  const normalFolder = this.gui.addFolder('Normal Map');
  normalFolder.add({ update: () => this.material.normalMap = this.normalTexture }, 'update').name('Update Normal Map');
}
  runTick() {
    this.tick = () => {
      const elapsedTime = this.clock.getElapsedTime();

      // Check if enough time has passed since the last mouse move
      const currentTime = Date.now();
      const timeSinceLastMove = currentTime - this.lastMouseMoveTime;

      if (timeSinceLastMove > this.mouseMoveTimeout) {
        this.sphere.rotation.y = .5 * elapsedTime;
      }
      this.targetX = this.mouseX * .001;
      this.targetY = this.mouseY * .001;

      this.sphere.rotation.y = .5 * elapsedTime;
      this.sphere.rotation.y += .5 * (this.targetX - this.sphere.rotation.y);
      this.sphere.rotation.x += .5 * (this.targetY - this.sphere.rotation.x);
      this.sphere.rotation.z += .5 * (this.targetY - this.sphere.rotation.x);
      this.renderer.render(this.scene, this.camera);

      window.requestAnimationFrame(this.tick);
    };

    this.tick();
  }

  move(){
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetX = 0;
    this.targetY = 0;
    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    this.onDocumentMouseMove = (event:any) =>{
      this.mouseX = (event.clientX - windowHalfX);
      this.mouseY = (event.clientY - windowHalfY);
      this.lastMouseMoveTime = Date.now(); // Update last mouse move time
    }

    document.addEventListener('mousemove', this.onDocumentMouseMove);
  }


}
