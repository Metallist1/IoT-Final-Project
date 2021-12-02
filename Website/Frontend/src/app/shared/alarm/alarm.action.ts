import {Alarm} from "./entities/alarm";

export class CreateAlarm {
  static readonly type = '[Auth] CreateAlarm';
  constructor(
    public name: string, public startTime: string, public endTime: string
  ) {}
}

export class RemoveAlarm {
  static readonly type = '[Auth] RemoveAlarm';
  constructor(
    public alarm: Alarm
  ) {}
}

export class SetUpAllAlarms {
  static readonly type = '[Auth] SetUpAllAlarms';
  constructor(
    public allAlarms: Alarm[]
  ) {}
}

export class SetUpAlarm {
  static readonly type = '[Auth] SetUpAlarm';
  constructor(
    public alarm: Alarm
  ) {}
}
