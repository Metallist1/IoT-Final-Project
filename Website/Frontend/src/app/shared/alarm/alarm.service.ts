import {Injectable} from "@angular/core";
import {Socket} from "ngx-socket-io";
import {Alarm} from "./entities/alarm";

@Injectable({
  providedIn: 'root',
})
export class AlarmService {

  constructor(private socket: Socket) {
  }

  setUpAllAlarms(){
    return this.socket.fromEvent('all_alarms');
  }

  setUpAlarm(){
    return this.socket.fromEvent('created_alarm');
  }

  createAlarm( name: string, startTime: string, endTime: string) {
    this.socket.emit('create_alarm', {label: name, startTime: startTime, endTime: endTime});
  }

  removeAlarm(alarm: Alarm) {
    this.socket.emit('remove_alarm', alarm);
  }
}
