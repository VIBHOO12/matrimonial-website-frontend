import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrideInformationComponent } from './bride-information.component';

describe('BrideInformationComponent', () => {
  let component: BrideInformationComponent;
  let fixture: ComponentFixture<BrideInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BrideInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrideInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
