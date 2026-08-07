import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduInfoComponent } from './edu-info.component';

describe('EduInfoComponent', () => {
  let component: EduInfoComponent;
  let fixture: ComponentFixture<EduInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EduInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EduInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
