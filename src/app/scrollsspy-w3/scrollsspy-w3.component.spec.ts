import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScrollsspyW3Component } from './scrollsspy-w3.component';

describe('ScrollsspyW3Component', () => {
  let component: ScrollsspyW3Component;
  let fixture: ComponentFixture<ScrollsspyW3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScrollsspyW3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollsspyW3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
