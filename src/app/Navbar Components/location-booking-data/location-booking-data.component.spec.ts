import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationBookingDataComponent } from './location-booking-data.component';

describe('LocationBookingDataComponent', () => {
  let component: LocationBookingDataComponent;
  let fixture: ComponentFixture<LocationBookingDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LocationBookingDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LocationBookingDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
