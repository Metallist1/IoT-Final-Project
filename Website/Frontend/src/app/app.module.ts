import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {environment} from "../environments/environment";
import {NgxsModule} from "@ngxs/store";
import { HeaderComponent } from './nav/header/header.component';
import { MainComponent } from './main/main.component';
import { NgChartsModule } from 'ng2-charts';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AlarmListComponent } from './alarm-list/alarm-list.component';
import { AlarmCreateComponent } from './alarm-create/alarm-create.component';
import { SensorDataComponent } from './sensor-data/sensor-data.component';
import {AlarmState} from "./shared/alarm/alarm.state";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    AlarmListComponent,
    AlarmCreateComponent,
    SensorDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([AlarmState], {
      developmentMode: !environment.production
    }),
    SocketIoModule.forRoot(config),
    NgChartsModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
