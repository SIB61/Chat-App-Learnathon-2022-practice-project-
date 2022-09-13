import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserTableComponent } from './components/user-table/user-table.component';
import { MateialModule } from '@common/mateial/mateial.module';
import { DirectivesModule } from 'src/app/common/directives/directives.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { OnlineUsersComponent } from './components/online-users/online-users.component';
import { SharedFriendService } from './services/shared_friend.service';
@NgModule({
  declarations: [UserTableComponent, OnlineUsersComponent],
  imports: [
    ReactiveFormsModule,
    FontAwesomeModule,
    CommonModule,
    DirectivesModule,
    UsersRoutingModule,
    MateialModule,
  ],
  exports: [OnlineUsersComponent],
  providers: [SharedFriendService],
})
export class UsersModule {}
