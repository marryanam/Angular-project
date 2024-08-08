import { Directive, ElementRef, HostListener, Renderer2, OnInit } from '@angular/core';
import { gsap } from 'gsap';
import { CursorPosition } from '../../models/interfaces';

@Directive({
  selector: '[appCustomCursor]',
  standalone: true,
})
export class CustomCursorDirective implements OnInit {
  private cursorElement!: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const cursorPosition:CursorPosition  = {
      left: event.clientX,
      top: event.clientY
    };

    // Find the element under the cursor
    const hoveredElement = document.elementFromPoint(event.clientX, event.clientY) as HTMLElement;
 
    if (hoveredElement && hoveredElement.classList.contains('target-link')) {
      const hoveredElementPosition = hoveredElement.getBoundingClientRect();
      const triggerDistance = hoveredElementPosition.width;

      const targetPosition = {
        left: hoveredElementPosition.left + hoveredElementPosition.width / 2,
        top: hoveredElementPosition.top + hoveredElementPosition.height / 2
      };

      const distance = {
        x: targetPosition.left - cursorPosition.left,
        y: targetPosition.top - cursorPosition.top
      };

      const angle = Math.atan2(distance.x, distance.y);
      const hypotenuse = Math.sqrt(distance.x * distance.x + distance.y * distance.y);

      if (hypotenuse < triggerDistance) {
        gsap.to(this.cursorElement, {
          duration: 0.2,
          left: targetPosition.left - (Math.sin(angle) * hypotenuse) / 2,
          top: targetPosition.top - (Math.cos(angle) * hypotenuse) / 2,
          height: hoveredElement.clientHeight,
          width: hoveredElement.clientWidth
        });

      } else {
        this.resetToDefault(cursorPosition);
      }
    } else {
      this.resetToDefault(cursorPosition);
    }
  }

  resetToDefault(cursorPosition: CursorPosition ){
    gsap.to(this.cursorElement, {
      duration: 0.2,
      left: cursorPosition.left,
      top: cursorPosition.top,
      height: '12px',
      width: '12px'
    });
  }

  ngOnInit() {
    this.cursorElement = this.el.nativeElement;
  }
}
