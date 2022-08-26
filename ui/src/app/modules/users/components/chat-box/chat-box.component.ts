import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { message } from '@common/models/message';
import { sendmessage } from '@common/models/sendmessage';
import { MessageService } from '@common/services/message/message.service';
import { sendMessage } from '@microsoft/signalr/dist/esm/Utils';
import { SharedFriendService } from '@modules/users/services/shared_friend.service';
import { distinctUntilChanged, take, Subject } from 'rxjs';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit, OnDestroy {
  recipientId: string = "T";
  recieverUsername: string;
  messages: message[];
  sendmessage: sendmessage;
  form: FormGroup;
  scrolltop: number;
  isOpen: boolean;
  isLarge: boolean;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public messageService: MessageService,
    public sharedService: SharedFriendService
  ) {}

  ngOnDestroy(): void {
    console.log('Stop HubConnection');
    this.messageService.stopHubConnection();
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      content: [''],
    });

    this.sharedService.$reciever.subscribe({
      next: (value: any) => {
        this.messageService.stopHubConnection();
        this.recipientId = value.id;
        this.form.get('recipientId')?.setValue(value.id);
        this.recieverUsername = value.username;
        this.messageService.createHubConnection(value.id);
        this.messageService.loadMessage(this.recipientId).subscribe({
          next: (res) => {
            this.messageService.messageThreadSource.next(res);
          },
          error: (error) => {
            console.log(error);
          },
        });
      },
    });

    this.messageService.messageThread$
      .pipe(distinctUntilChanged())
      .subscribe((res) => {
        this.messages = res;
      });

    this.sharedService.$isOpen.subscribe({
      next: (val) => {
        this.isOpen = val;
      },
    });

    this.sharedService.$isLarge.subscribe({
      next: (val) => {
        this.isLarge = val;
      },
    });
  }

  async sendSMS() {
    const content = this.form.get('content')?.value;

    const value = { content: content, recipientId: this.recipientId };
    const message = await this.messageService.sendMessage(value);
    this.form.reset();
    this.messages = [message, ...this.messages];
  }
}
