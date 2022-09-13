import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatTitlebarComponent } from './chat-titlebar.component';

describe('ChatTitlebarComponent', () => {
  let component: ChatTitlebarComponent;
  let fixture: ComponentFixture<ChatTitlebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChatTitlebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatTitlebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
