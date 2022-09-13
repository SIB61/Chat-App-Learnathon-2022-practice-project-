import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatTitlebarComponent } from './components/chat-titlebar/chat-titlebar.component';
import { MessagesBoxComponent } from './components/messages-box/messages-box.component';
import { ChatBoxComponent } from './components/chat-box/chat-box.component';
import { ChatComponent } from './components/chat/chat.component';
import { MateialModule } from '@common/mateial/mateial.module';
import { MessageService } from '@common/services/message/message.service';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ChatTitlebarComponent,
    MessagesBoxComponent,
    ChatBoxComponent,
    ChatComponent,
  ],
  imports: [CommonModule, MateialModule, ReactiveFormsModule],
  exports: [ChatComponent],
  providers: [MessageService],
})
export class ChatModule {}
