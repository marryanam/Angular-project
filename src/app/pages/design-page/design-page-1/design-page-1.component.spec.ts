import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPage1Component } from './design-page-1.component';

describe('DesignPage1Component', () => {
  let component: DesignPage1Component;
  let fixture: ComponentFixture<DesignPage1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesignPage1Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesignPage1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
