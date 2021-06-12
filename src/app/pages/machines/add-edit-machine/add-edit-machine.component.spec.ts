import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditMachineComponent } from './add-edit-machine.component';

describe('AddEditMachineComponent', () => {
  let component: AddEditMachineComponent;
  let fixture: ComponentFixture<AddEditMachineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditMachineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
