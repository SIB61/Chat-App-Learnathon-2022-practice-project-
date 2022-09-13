import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { message } from '@common/models/message';
import { LocalStorageService } from '@common/services/storage/local-storage.service';

@Component({
  selector: 'app-messages-box',
  templateUrl: './messages-box.component.html',
  styleUrls: ['./messages-box.component.scss'],
})
export class MessagesBoxComponent implements OnInit {
  @Input() messages: message[];
  userId = localStorage.getItem(LocalStorageService.USER_ID);
  constructor() {}

  ngOnInit(): void {}
}
