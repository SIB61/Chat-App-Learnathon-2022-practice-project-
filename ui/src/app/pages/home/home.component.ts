import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { HttpHeaders } from '@angular/common/http';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UpdateUserDialogueComponent } from '@common/components/update-user-dialogue/update-user-dialogue.component';
import { ApiEndpoints } from '@common/enums/api-endpoints.enum';
import { HttpRequestTypes } from '@common/enums/http-request-types.enum';
import { GetUserModel } from '@common/models/get-user.model';
import { AbsApiService } from '@common/services/http/abs/abs-api.service';
import { ApiService } from '@common/services/http/api.service';
import { ResponsiveService } from '@common/services/shared/responsive.service';
import { LocalStorageService } from '@common/services/storage/local-storage.service';
import { faAlipay } from '@fortawesome/free-brands-svg-icons';
import { SharedFriendService } from '@modules/users/services/shared_friend.service';
import { UserApiService } from '@modules/users/services/user-api.service';
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
    private router: Router,
    private dialog: MatDialog,
    private service: UserApiService,
    private responsiveService: ResponsiveService
  ) {}
  isOpened: boolean = true;
  isSmall: boolean = true;
  receiverUsername: string = 'username';
  receiverId: string = '';
  myUsername = localStorage.getItem('username');
  user: GetUserModel;

  ngAfterViewInit(): void {
    this.api.updateOnline();
  }

  ngOnInit(): void {
    this.service
      .getUser(this.storage.get(LocalStorageService.USER_ID)!)
      .subscribe({
        next: (value) => {
          this.user = value;
          console.log(value);
        },
      });

    this.responsiveService.$isOpen.subscribe({
      next: (val) => {
        this.isOpened = val;
      },
    });
    this.responsiveService.$size.subscribe({
      next: (val) => {
        this.isSmall = val == 's';
      },
    });
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/account/login');
  }

  updateUser() {
    this.dialog
      .open(UpdateUserDialogueComponent, { data: this.user })
      .afterClosed()
      .subscribe({
        next: (value: GetUserModel) => {
          console.warn(value);
          this.service.updateUser(value).subscribe({
            next: (val) => console.warn(val),
          });
        },
      });
  }

  changeReceiver(data: any) {
    this.receiverUsername = data.username;
    this.receiverId = data.id;
  }
}
