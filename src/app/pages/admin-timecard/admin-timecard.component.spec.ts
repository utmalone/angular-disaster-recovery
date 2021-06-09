import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimecardComponent } from './admin-timecard.component';

describe('AdminTimecardComponent', () => {
  let component: AdminTimecardComponent;
  let fixture: ComponentFixture<AdminTimecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTimecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTimecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
