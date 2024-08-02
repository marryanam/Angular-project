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
  gui: any;
  canvas: any;
  scene: any;
  geometry: any;
  material: any;
  sphere: any;
  pointLight: any;
  pointLightExtra:any;
  pointLightSecondary:any;
  sizes: any;
  camera: any;
  renderer: any;
  clock: any;
  tick: any;
  textureLoader:any;
  normalTexture:any;
  pointLightHelper:any;
  onDocumentMouseMove:any;
  mouseX:any;
  mouseY:any;
  targetX:any;
  targetY:any;

  constructor() { }

  ngOnInit(): void {
    this.setInitialData();
    this.resize();
    this.move();
    this.runTick();
  }

  setInitialData() {
    this.gui = new dat.GUI();
    this.canvas = document.querySelector('canvas.main');
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
    this.normalTexture = this.textureLoader.load("../../../assets/texture-4.png")

    this.geometry = new THREE.SphereGeometry(.5, 64,64);

    this.material = new THREE.MeshStandardMaterial();
    this.material.metalness = 0.7;
    this.material.roughness = 0.2;
    this.material.color = new THREE.Color(0x292929);
    this.material.normalMap = this.normalTexture;

    this.sphere = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.sphere);
  }

  setLight(){
    this.pointLight = new THREE.PointLight(0xffffff, 2);
    this.pointLight.intensity =  3.26;
    this.pointLight.position.set(0.77, -0.78, -0.2);

    this.scene.add(this.pointLight);

    this.pointLightExtra = new THREE.PointLight(0xff0000, 3);
    this.pointLightExtra.intensity = 3.06;
    this.pointLightExtra.position.set(-0.39, 0.38, 0.19);
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

  guiData(){

    this.pointLightHelper = new THREE.PointLightHelper(this.pointLightSecondary, 0.5);
    this.scene.add(this.pointLightHelper);

    const light1 =  this.gui.addFolder('Light1');
    const light2 =  this.gui.addFolder('Light2');
    const light3 =  this.gui.addFolder('Light3');

    light1.add(this.pointLight.position, 'x').min(-3).max(3).step(0.01);
    light1.add(this.pointLight.position, 'y').min(-3).max(3).step(0.01);
    light1.add(this.pointLight.position, 'z').min(-3).max(3).step(0.01);
    light1.add(this.pointLight, 'intensity').min(0).max(6).step(0.01);

    light2.add(this.pointLightExtra.position, 'x').min(-3).max(3).step(0.01);
    light2.add(this.pointLightExtra.position, 'y').min(-3).max(3).step(0.01);
    light2.add(this.pointLightExtra.position, 'z').min(-3).max(3).step(0.01);
    light2.add(this.pointLightExtra, 'intensity').min(0).max(6).step(0.01);

    light3.add(this.pointLightSecondary.position, 'x').min(-3).max(3).step(0.01);
    light3.add(this.pointLightSecondary.position, 'y').min(-3).max(3).step(0.01);
    light3.add(this.pointLightSecondary.position, 'z').min(-3).max(3).step(0.01);
    light3.add(this.pointLightSecondary, 'intensity').min(0).max(6).step(0.01);

  }

  runTick() {
    this.tick = () => {
      this.targetX = this.mouseX * .001;
      this.targetY = this.mouseY * .001;

      const elapsedTime = this.clock.getElapsedTime();
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
    }

    document.addEventListener('mousemove', this.onDocumentMouseMove);
  }

}
