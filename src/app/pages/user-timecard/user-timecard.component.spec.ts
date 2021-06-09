import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTimecardComponent } from './user-timecard.component';

describe('UserTimecardComponent', () => {
  let component: UserTimecardComponent;
  let fixture: ComponentFixture<UserTimecardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTimecardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTimecardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
