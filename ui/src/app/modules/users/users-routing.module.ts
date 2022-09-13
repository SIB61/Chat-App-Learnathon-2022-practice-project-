import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlineUsersComponent } from './components/online-users/online-users.component';
import { UserTableComponent } from './components/user-table/user-table.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'onlineUsers',
    pathMatch: 'full',
  },
  {
    path: 'allUsers',
    component: UserTableComponent,
  },
  {
    path: 'onlineUsers',
    component: OnlineUsersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
