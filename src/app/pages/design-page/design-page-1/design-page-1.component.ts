import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
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
  private imgs: THREE.Mesh[] = [];
  private gui = new dat.GUI();
  private animationFrameId?: number;
  private textureLoader = new THREE.TextureLoader();
  private scrollDelta = 0;

  @HostListener('window:wheel', ['$event'])
  private onMouseWheel(event: WheelEvent): void {
    this.scrollDelta = event.deltaY > 0 ? -1 : 1;
  }

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
    const canvas = document.querySelector('canvas.photo') as HTMLCanvasElement;

    const geometry = new THREE.PlaneGeometry(1, 1.5);

    for (let i = 0; i < 10; i++) {
      const material = new THREE.MeshBasicMaterial({
        map: this.textureLoader.load(`../../../../assets/${i}.jpg`)
      });

      const imgMesh = new THREE.Mesh(geometry, material);
      imgMesh.position.set(Math.random() + 0.3, (i * -1.8), 0);
      this.scene.add(imgMesh);
      this.imgs.push(imgMesh);
    }

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 2);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;


    window.addEventListener('resize', this.onWindowResize.bind(this));

    this.gui.add(this.camera.position, 'y').min(-5).max(10);
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
    for (let img of this.imgs) {
      img.position.y += this.scrollDelta * 0.1;

      if (img.position.y > 2) {
        img.position.y = -1.8 * this.imgs.length + 2;
      } else if (img.position.y < -1.8 * this.imgs.length + 2) {
        img.position.y = 2;
      }
    }

    this.scrollDelta = 0;

    this.controls.update();

    this.renderer.render(this.scene, this.camera);

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

}
