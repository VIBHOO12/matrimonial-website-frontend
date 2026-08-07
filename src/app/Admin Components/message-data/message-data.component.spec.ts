import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageDataComponent } from './message-data.component';

describe('MessageDataComponent', () => {
  let component: MessageDataComponent;
  let fixture: ComponentFixture<MessageDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessageDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessageDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
