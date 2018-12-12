import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCircleComponent } from './new-circle.component';

describe('NewCircleComponent', () => {
  let component: NewCircleComponent;
  let fixture: ComponentFixture<NewCircleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCircleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
