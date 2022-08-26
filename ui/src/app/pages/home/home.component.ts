import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ApiEndpoints } from '@common/enums/api-endpoints.enum';
import { HttpRequestTypes } from '@common/enums/http-request-types.enum';
import { AbsApiService } from '@common/services/http/abs/abs-api.service';
import { ApiService } from '@common/services/http/api.service';
import { LocalStorageService } from '@common/services/storage/local-storage.service';
import { faAlipay } from '@fortawesome/free-brands-svg-icons';
import { SharedFriendService } from '@modules/users/services/shared_friend.service';
import { interval, observable, Observable, timeout, timer } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [{ provide: AbsApiService, useClass: ApiService }],
})
export class HomeComponent implements OnInit, AfterViewInit {
  constructor(
    private api: AbsApiService,
    private storage: LocalStorageService,
    private $breakPoint: BreakpointObserver,
    public shared: SharedFriendService
  ) {}
  isOpened: boolean;
  isLarge: boolean;
  receiverUser: string = 'username';
  myUsername = localStorage.getItem('username');

  ngAfterViewInit(): void {
    this.api.updateOnline();
    this.$breakPoint
      .observe([
        Breakpoints.Large,
        Breakpoints.Medium,
        Breakpoints.Small,
        '(min-width: 500px)',
      ])
      .subscribe({
        next: (value) => {
          if (
            this.$breakPoint.isMatched(Breakpoints.Small) ||
            this.$breakPoint.isMatched(Breakpoints.Handset) ||
            this.$breakPoint.isMatched(Breakpoints.XSmall)
          ) {
            this.shared.setOpen(false);
            this.shared.setLarge(false);
          } else {
            this.shared.setOpen(true);
            this.shared.setLarge(true);
          }
        },
      });
  }

  ngOnInit(): void {
    this.shared.$reciever.subscribe({
      next: (value) => {
        this.receiverUser = value.username;
      },
    });
    this.shared.$isOpen.subscribe({
      next: (val) => {
        this.isOpened = val;
      },
    });
    this.shared.$isLarge.subscribe((val) => {
      this.isLarge = val;
    });
  }
  tooglePage(event: any) {}
}
