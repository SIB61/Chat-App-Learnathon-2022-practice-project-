import { Component, Input, OnInit } from '@angular/core';
import { ResponsiveService } from '@common/services/shared/responsive.service';

@Component({
  selector: 'app-chat-titlebar',
  templateUrl: './chat-titlebar.component.html',
  styleUrls: ['./chat-titlebar.component.scss'],
})
export class ChatTitlebarComponent implements OnInit {
  @Input() username: string;

  isOpen: boolean = true;
  isSmall: boolean = false;
  constructor(private responsiveService: ResponsiveService) {}

  ngOnInit(): void {
    this.responsiveService.$isOpen.subscribe({
      next: (val) => {
        this.isOpen = val;
      },
    });
    this.responsiveService.$size.subscribe({
      next: (val) => {
        this.isSmall = val == 's';
      },
    });
  }
  toggleOpen() {
    this.responsiveService.setOpen(!this.isOpen);
  }
}
