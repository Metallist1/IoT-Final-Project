import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlarmCreateComponent } from './alarm-create.component';

describe('AlarmCreateComponent', () => {
  let component: AlarmCreateComponent;
  let fixture: ComponentFixture<AlarmCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlarmCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlarmCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
