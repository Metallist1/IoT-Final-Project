import { Component, OnInit } from '@angular/core';
import {AlarmState} from "../shared/alarm/alarm.state";
import {Alarm} from "../shared/alarm/entities/alarm";
import {Select, Store} from "@ngxs/store";
import {Observable} from "rxjs";
import {RemoveAlarm} from "../shared/alarm/alarm.action";

@Component({
  selector: 'app-alarm-list',
  templateUrl: './alarm-list.component.html',
  styleUrls: ['./alarm-list.component.scss']
})
export class AlarmListComponent implements OnInit {

  // @ts-ignore
  @Select(AlarmState.getAlarms) allAlarms: Observable<Alarm[]>;
  alarms: Alarm[] | undefined;

  constructor(private store: Store) {
    // @ts-ignore
    this.allAlarms.subscribe((data) => {
      this.alarms = data;
    });
  }

  ngOnInit(): void {
  }

  removeAlarm(alarm: Alarm) {
    console.log(alarm);
      this.store.dispatch(new RemoveAlarm(alarm));
  }
}
