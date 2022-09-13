import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesBoxComponent } from './messages-box.component';

describe('MessagesBoxComponent', () => {
  let component: MessagesBoxComponent;
  let fixture: ComponentFixture<MessagesBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessagesBoxComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MessagesBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
