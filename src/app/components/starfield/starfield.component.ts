import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-starfield',
  standalone: true,
  templateUrl: './starfield.component.html',
  styleUrls: ['./starfield.component.scss']
})
export class StarfieldComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private stars!: THREE.Points;
  private animationId!: number;

  private starData: { phase: number; speed: number }[] = [];

  ngOnInit(): void {
    this.initThreeJS();
    this.animate();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }

  private initThreeJS(): void {
    const canvas = this.canvasRef.nativeElement;

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.camera.position.z = 500;

    const starsGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPositions = new Float32Array(starCount * 3);

    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);

      starPositions[i * 3] = x;
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = z;

      this.starData.push({
        phase: Math.random() * Math.PI * 2, 
        speed: Math.random() * 0.005 + 0.009 
      });
    }

    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

    const textureLoader = new THREE.TextureLoader();
    const starTexture = textureLoader.load('assets/vecteezy_white-light-effects_31569517.png');

    const starsMaterial = new THREE.PointsMaterial({
      color: 0x487A7A,
      size: 3,
      transparent: true,
      opacity: 1,
      map: starTexture,
      blending: THREE.AdditiveBlending, 
      depthWrite: false,
    });

    this.stars = new THREE.Points(starsGeometry, starsMaterial);

    this.scene.add(this.stars);

    window.addEventListener('resize', this.onWindowResize.bind(this), false);
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());

    const time = Date.now() * 0.0005;

    for (let i = 0; i < this.starData.length; i++) {
      const { phase, speed } = this.starData[i];
      (this.stars.material as THREE.PointsMaterial).opacity = 0.6 + Math.sin(phase + time * speed) * 0.4;
    }

    this.stars.rotation.y += 0.0007;

    this.renderer.render(this.scene, this.camera);
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}