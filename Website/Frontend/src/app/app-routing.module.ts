import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {SensorDataComponent} from "./sensor-data/sensor-data.component";

const routes: Routes = [
  {
  path: '',
  component: MainComponent,
  },
  {
    path: 'data',
    component: SensorDataComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
