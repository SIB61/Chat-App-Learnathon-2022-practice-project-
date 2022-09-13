import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveService {
  private size: BehaviorSubject<string> = new BehaviorSubject('l');
  private isOpen: BehaviorSubject<boolean> = new BehaviorSubject(true)

  $isOpen = this.isOpen.asObservable()
  $size = this.size.asObservable();
 
  setOpen(val:boolean){
    this.isOpen.next(val)
  }

  constructor(private $breakPoint: BreakpointObserver) {
    this.$breakPoint
      .observe([
        Breakpoints.Large,
        Breakpoints.Medium,
        Breakpoints.Small,
        Breakpoints.Handset,
        Breakpoints.XSmall,
      ])
      .subscribe({
        next: (value) => {
          if (
            this.$breakPoint.isMatched(Breakpoints.Small) ||
            this.$breakPoint.isMatched(Breakpoints.Handset) ||
            this.$breakPoint.isMatched(Breakpoints.XSmall)
          ) {
            this.size.next('s');
            this.setOpen(false)
          } else if (this.$breakPoint.isMatched(Breakpoints.Medium)) {
            this.size.next('m');
            this.setOpen(true)
          } else {
            this.size.next('l');
            this.setOpen(true)
          }
        },
      });
  }
}
