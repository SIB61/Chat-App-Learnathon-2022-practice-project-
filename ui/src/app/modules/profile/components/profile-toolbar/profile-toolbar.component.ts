import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ResponsiveService } from '@common/services/shared/responsive.service';
import { LocalStorageService } from '@common/services/storage/local-storage.service';

@Component({
  selector: 'app-profile-toolbar',
  templateUrl: './profile-toolbar.component.html',
  styleUrls: ['./profile-toolbar.component.scss'],
})
export class ProfileToolbarComponent implements OnInit {
  constructor(
    private storage: LocalStorageService,
    private router: Router,
    private responsiveService: ResponsiveService
  ) {}

  open: boolean;
  isSmall: boolean;
  username = this.storage.get(LocalStorageService.USERNAME);
  userId: string = this.storage.get(LocalStorageService.USER_ID)!;

  ngOnInit(): void {
    this.responsiveService.$size.subscribe({
      next: (val) => {
        this.isSmall = val == 's';
      },
    });
    if (this.username == null) this.router.navigateByUrl('/account/login');
  }

  updateUser() {}
  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/account/login');
  }
}
