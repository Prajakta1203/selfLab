import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewByIdStudentsComponent } from './view-by-id-students.component';

describe('ViewByIdStudentsComponent', () => {
  let component: ViewByIdStudentsComponent;
  let fixture: ComponentFixture<ViewByIdStudentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewByIdStudentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewByIdStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
