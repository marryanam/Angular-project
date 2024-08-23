import { Component, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import * as dat from 'dat.gui';

@Component({
  selector: 'app-design-page-1',
  standalone: true,
  templateUrl: './design-page-1.component.html',
  styleUrls: ['./design-page-1.component.scss']
})
export class DesignPage1Component implements OnInit, OnDestroy {
  private clock = new THREE.Clock();
  private renderer!: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private sphere!: THREE.Mesh;
  private gui = new dat.GUI();
  private animationFrameId?: number;
  private textureLoader!: THREE.TextureLoader;


  ngOnInit(): void {
    this.initThree();
    this.animate();
  }

  ngOnDestroy(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  private initThree(): void {
    // Canvas
    const canvas = document.querySelector('canvas.photo') as HTMLCanvasElement;
    this.textureLoader  = new THREE.TextureLoader();

    // Scene
    this.scene = new THREE.Scene();

    // Objects
    const geometry = new THREE.PlaneGeometry(1, 1.3);
    for(let i = 1; i < 10; i++){
      const material = new THREE.MeshBasicMaterial({
        map:
       });
    }
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    this.sphere = new THREE.Mesh(geometry, material);
    this.scene.add(this.sphere);

    // Lights
    const pointLight = new THREE.PointLight(0xffffff, 0.1);
    pointLight.position.set(2, 3, 4);
    this.scene.add(pointLight);

    // Camera
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 2);
    this.scene.add(this.camera);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;

    // Handle window resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
  }

  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  private animate(): void {
    const elapsedTime = this.clock.getElapsedTime();

    // Update objects
    this.sphere.rotation.y = 0.5 * elapsedTime;

    // Update controls
    this.controls.update();

    // Render
    this.renderer.render(this.scene, this.camera);

    // Request next frame
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }
}
