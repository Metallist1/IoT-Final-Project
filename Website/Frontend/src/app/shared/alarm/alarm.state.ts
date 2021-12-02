import {Action, Selector, State, StateContext, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {AlarmService} from "./alarm.service";
import {Alarm} from "./entities/alarm";
import {CreateAlarm, RemoveAlarm, SetUpAlarm, SetUpAllAlarms} from "./alarm.action";

export class AlarmStateModel {
  allAlarms: Alarm[] | undefined ;
}

@State<AlarmStateModel>({
  name: 'alarm',
  defaults: {
    allAlarms: []
  },
})
@Injectable()
export class AlarmState {
  constructor(private alarmService: AlarmService,
              private store: Store) {
    alarmService.setUpAllAlarms().subscribe(
      (data) => {
        this.store.dispatch(new SetUpAllAlarms(data as Alarm[]));
      });

    alarmService.setUpAlarm().subscribe(
      (data) => {
        this.store.dispatch(new SetUpAlarm(data as Alarm));
      });
  }

  @Selector()
  static getAlarms(state: AlarmStateModel): any {
    return state.allAlarms;
  }


  @Action(CreateAlarm)
  createAlarm({getState, setState}: StateContext<AlarmStateModel>,
                 {name,startTime,endTime }: CreateAlarm): any {
    this.alarmService.createAlarm( name,startTime,endTime);
  }

  @Action(RemoveAlarm)
  removeAlarm({getState, setState}: StateContext<AlarmStateModel>,
              {alarm }: RemoveAlarm): any {
    this.alarmService.removeAlarm(alarm);
  }

  @Action(SetUpAllAlarms)
  setUpMessages({getState, setState}: StateContext<AlarmStateModel>,
                { allAlarms }: SetUpAllAlarms): any {
    const state = getState();
    setState({
      ...state,
      allAlarms: allAlarms,
    });
  }

  @Action(SetUpAlarm)
  setUpAlarm({getState, setState}: StateContext<AlarmStateModel>,
                { alarm }: SetUpAlarm): any {
    const state = getState();
    setState({
      ...state,
      // @ts-ignore
      allAlarms: [...state.allAlarms, alarm],
    });
  }
}
