import { TestBed } from '@angular/core/testing';
import { CustomCursorDirective } from './custom-cursor.directive';
import { ElementRef, Renderer2 } from '@angular/core';

describe('CustomCursorDirective', () => {
  let directive: CustomCursorDirective;
  let el: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    el = new ElementRef(document.createElement('div'));
    renderer = jasmine.createSpyObj('Renderer2', ['setStyle']);
    directive = new CustomCursorDirective(el, renderer);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });
});
