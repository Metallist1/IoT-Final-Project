import { Component, OnInit } from '@angular/core';
import {Store} from "@ngxs/store";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {CreateAlarm} from "../shared/alarm/alarm.action";

@Component({
  selector: 'app-alarm-create',
  templateUrl: './alarm-create.component.html',
  styleUrls: ['./alarm-create.component.scss']
})
export class AlarmCreateComponent implements OnInit {

  startTime = {hour: 0, minute: 0};

  endTime = {hour: 0, minute: 0};

  // @ts-ignore
  loginDetail: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store) { }

  ngOnInit(): void {
    this.loginDetail = this.fb.group({
      email : ['', Validators.compose([Validators.minLength(1), Validators.maxLength(200)])],
    });
  }

  get f(): any { return this.loginDetail.controls; }

  createAlarm() {

    if (this.loginDetail.invalid || !this.startTime && !this.endTime) {
      return;
    }

    if(this.startTime.hour < this.endTime.hour || (this.startTime.hour == this.endTime.hour && this.startTime.minute < this.endTime.minute)) {
      const realStartTime = this.addZero(this.startTime.hour) + ':' + this.addZero(this.startTime.minute);
      const realEndTime = this.addZero(this.endTime.hour) + ':' + this.addZero(this.endTime.minute);
      this.store.dispatch(new CreateAlarm(this.loginDetail.value.email, realStartTime, realEndTime));
    }
  }

  private addZero(stringToCheck: number){
    let finalString = '' + stringToCheck;
    if(stringToCheck < 10){
      finalString = '0' + stringToCheck;
    }
    return finalString;
  }
}
