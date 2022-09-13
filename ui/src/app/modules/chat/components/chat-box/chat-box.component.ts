import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
})
export class ChatBoxComponent implements OnInit, OnChanges {
  @Input() disabled: boolean;
  @Output() send = new EventEmitter<string>();
  constructor(private fb: FormBuilder) {}
  form: FormGroup;
  ngOnInit(): void {
    this.form = this.fb.group({
      message: ['', Validators.required],
    });
  }
  ngOnChanges(changes: SimpleChanges) {}
  emitMessage() {
    if (this.form.value.message != '') {
      this.send.emit(this.form.value.message);
      this.form.reset();
    }
  }
}
