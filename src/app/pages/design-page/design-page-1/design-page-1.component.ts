import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
import gsap from 'gsap';

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
  private camera!: THREE.PerspectiveCamera | any;
  private imgs: THREE.Mesh[] = [];
  // private gui = new dat.GUI();
  private animationFrameId?: number;
  private textureLoader = new THREE.TextureLoader();
  private scrollDelta = 0;
  private position = 0;
  private rayCaster = new THREE.Raycaster();
  private mouse = new THREE.Vector2();
  private intersects:any;
  private obj:any;
  private lastIndex = 0; 
  private hoverDelay = 0.1;

  @HostListener('window:wheel', ['$event'])
  private onMouseWheel(event: WheelEvent): void {
    const direction = Math.sign(event.deltaY);

    if (
      (direction > 0 && this.position >= this.imgs.length - 2) || 
      (direction < 0 && this.position <= 0) 
    ) {
      return;
    }

    this.scrollDelta = event.deltaY * 0.0007;
  }

  @HostListener('window:mousemove', ['$event'])
  private onMouseMove(event: WheelEvent): void {
    this.mouse.x = event.clientX / window.innerWidth * 2 - 1;
    this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
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

    const geometry = new THREE.PlaneGeometry(0.8, 1.3);

    for (let i = 0; i < 10; i++) {
      const material = new THREE.MeshBasicMaterial({
        map: this.textureLoader.load(`../../../../assets/${i + 1}.jpg`)
      });

      const imgMesh = new THREE.Mesh(geometry, material) as any;
      imgMesh.position.set(Math.random() + 0.6, i * -1.8);
      this.scene.add(imgMesh);
      this.imgs.push(imgMesh);
    }

    this.obj = [];

    this.scene.traverse((el: any) =>{
      if(el.isMesh) this.obj.push(el);
    })

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    this.camera.position.set(0, 0, 2);
    this.scene.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));


    window.addEventListener('resize', this.onWindowResize.bind(this));

    // this.gui.add(this.camera.position, 'y').min(-5).max(10);
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
    this.position += this.scrollDelta;
    this.scrollDelta *= 0.9;
    this.camera.position.y = - this.position;

    this.imgs.forEach(img => {
      img.position.y += this.scrollDelta;

      if (img.position.y < -this.imgs.length * 1.8 / 2) {
        img.position.y += this.imgs.length * 1.8;
      } else if (img.position.y > this.imgs.length * 1.8 / 2) {
        img.position.y -= this.imgs.length * 1.8;
      }
    });

    this.rayCaster.setFromCamera(this.mouse, this.camera)
    this.intersects = this.rayCaster.intersectObjects(this.obj);

    for(const i of this.intersects ){
      gsap.delayedCall(this.hoverDelay, () => {
        gsap.to(i.object.scale, {x:1.7, y:1.7, duration: 0.3});
        gsap.to(i.object.rotation, {y:-0.5, duration: 0.3});
        gsap.to(i.object.position, {z:-0.9, duration: 0.3});
      });
    }

    for(const i of this.obj ){
      if(!this.intersects.find((int:any) => int.object === i)){
        gsap.delayedCall(this.hoverDelay, () => {
          gsap.to(i.scale, {x:1, y:1, duration: 0.3});
          gsap.to(i.rotation, {y:0, duration: 0.3});
          gsap.to(i.position, {z:0, duration: 0.3});
      });
      }
    }

    for (const img of this.imgs) {
      if (!this.intersects.find((int:any) => int.object === img)) {
        gsap.delayedCall(this.hoverDelay, () => {
          gsap.to(img.scale, { x: 1, y: 1, duration: 0.3 });
          gsap.to(img.rotation, { y: 0, duration: 0.3 });
          gsap.to(img.position, { z: 0, duration: 0.3 });
        });
      }
    }

    this.renderer.render(this.scene, this.camera);

    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

}
