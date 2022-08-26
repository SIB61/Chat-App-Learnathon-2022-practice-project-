import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { fadeIn } from '@common/animations/enter.animations';
import { ApiEndpoints } from '@common/enums/api-endpoints.enum';
import { HttpRequestTypes } from '@common/enums/http-request-types.enum';
import { GetUserModel } from '@common/models/get-user.model';
import { AbsApiService } from '@common/services/http/abs/abs-api.service';
import { ApiService } from '@common/services/http/api.service';
import { AbstractLocalStorageService } from '@common/services/storage/abs/abs-local-storage';
import { LocalStorageService } from '@common/services/storage/local-storage.service';
import { SharedFriendService } from '@modules/users/services/shared_friend.service';
import { UserApiService } from '@modules/users/services/user-api.service';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss'],
  providers: [
    { provide: AbsApiService, useClass: ApiService },
    { provide: AbstractLocalStorageService, useClass: LocalStorageService },
  ],
  animations: [fadeIn],
})
export class OnlineUsersComponent implements OnInit {
  userId: string;
  frnd: GetUserModel;
  items = [1, 2, 3, 4, 2, 2, 2, 2, 2, 2];
  constructor(
    private sharedService: SharedFriendService,
    private api: UserApiService,
    private api1: AbsApiService
  ) {}
  users: GetUserModel[] = [];
  displayedColumns = ['username', 'email', 'date of birth'];
  ngOnInit(): void {
    this.loadUsers();
    //  this.api1.updateOnline();
    this.sharedService.$isLarge.subscribe({
      next: (val: boolean) => {
        this.isLarge = val;
      },
    });
    let userid = localStorage.getItem('user_id');
    if (userid != null) {
      this.userId = userid;
    }
  }
  loadUsers() {
    this.api.getOnlineUser().subscribe({
      next: (users: GetUserModel[]) => {
        this.users = users.filter((user) => user.id != this.userId);

        console.log(users);
      },
      error: (error: HttpErrorResponse) => {
        console.warn(error);
      },
    });
  }
  isLarge: boolean;

  changeFriend(user: any) {
    this.sharedService.setReciever({
      username: user.userName,
      id: user.id,
    });
    this.sharedService.setOpen(this.isLarge);
  }
}
