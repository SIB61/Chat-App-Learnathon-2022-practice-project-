import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { message } from '@common/models/message';
import { MessageService } from '@common/services/message/message.service';
import { AbstractLocalStorageService } from '@common/services/storage/abs/abs-local-storage';
import { LocalStorageService } from '@common/services/storage/local-storage.service';
import { distinctUntilChanged, Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [
    { provide: AbstractLocalStorageService, useClass: LocalStorageService },
  ],
})
export class ChatComponent implements OnInit, OnChanges {
  constructor(
    private storage: AbstractLocalStorageService,
    private messageService: MessageService
  ) {}

  @Input() receiverId: string = '';
  @Input() receiverUsername: string = '';
  messages: message[];
  userId: string = this.storage.get(LocalStorageService.USER_ID)!;
  ngOnInit(): void {}
  msgSubscription: Subscription;

  loadMessage() {
    this.messageService.messageThread$
      .pipe(distinctUntilChanged())
      .subscribe((res) => {
        this.messages = res;
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['receiverId'] && this.receiverId) {
      this.messageService.stopHubConnection();
      this.messageService.createHubConnection(this.receiverId);

      this.messageService.loadMessage(this.receiverId).subscribe({
        next: (res) => {
          this.messageService.messageThreadSource.next(res);
        },
        error: (error) => {
          console.log(error);
        },
      });
      this.loadMessage();
    }
  }

  sendMessage(message: string) {
    const value = {
      content: message,
      recipientId: this.receiverId,
    } as message;
    this.messages.push(value);
    this.messages = this.messages;
    this.messageService.sendMessage(value);
  }
}
