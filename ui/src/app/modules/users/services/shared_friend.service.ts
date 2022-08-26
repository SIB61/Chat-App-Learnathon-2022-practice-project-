import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SharedFriendService {
  constructor() {}
  private reciever = new BehaviorSubject({ username: '', id: '' });
  $reciever = this.reciever.asObservable();
  private isOpen = new BehaviorSubject(true);
  $isOpen = this.isOpen.asObservable();
  private isLarge = new BehaviorSubject(true);
  $isLarge = this.isLarge.asObservable();
  setReciever(value: { username: string; id: string }) {
    this.reciever.next(value);
  }
  setOpen(val: boolean) {
    this.isOpen.next(val);
  }
  setLarge(val: boolean) {
    this.isLarge.next(val);
  }
}
