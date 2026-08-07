import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroomInformationComponent } from './groom-information.component';

describe('GroomInformationComponent', () => {
  let component: GroomInformationComponent;
  let fixture: ComponentFixture<GroomInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GroomInformationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GroomInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
