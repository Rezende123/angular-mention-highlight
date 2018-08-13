import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGroupsBSComponent } from './list-groups-bs.component';

describe('ListGroupsBSComponent', () => {
  let component: ListGroupsBSComponent;
  let fixture: ComponentFixture<ListGroupsBSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGroupsBSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGroupsBSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
