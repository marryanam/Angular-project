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
  sizes: any;
  camera: any;
  renderer: any;
  clock: any;
  tick: any;

  constructor() { }

  ngOnInit(): void {
    this.setInitialData();
    this.resize();
    this.runTick();
  }

  setInitialData() {
    this.gui = new dat.GUI();
    this.canvas = document.querySelector('canvas.main');
    this.scene = new THREE.Scene();
    this.geometry = new THREE.TorusGeometry(.7, .2, 16, 100);
    this.material = new THREE.MeshBasicMaterial();
    this.material.color = new THREE.Color(0xff0000);
    this.sphere = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.sphere);

    this.pointLight = new THREE.PointLight(0xffffff, 0.1);
    this.pointLight.position.x = 2;
    this.pointLight.position.y = 3;
    this.pointLight.position.z = 4;

    this.scene.add(this.pointLight);

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    }

    this.camera = new THREE.PerspectiveCamera(75, this.sizes.width / this.sizes.height, 0.1, 100);
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 2;
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.clock = new THREE.Clock();
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

  runTick() {
    this.tick = () => {
      const elapsedTime = this.clock.getElapsedTime();
      this.sphere.rotation.y = .5 * elapsedTime;
      this.renderer.render(this.scene, this.camera);

      window.requestAnimationFrame(this.tick);
    };

    this.tick();
  }
}
