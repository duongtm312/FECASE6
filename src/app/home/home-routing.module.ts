import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ShowhomeComponent} from "./showhome/showhome.component";

const routes: Routes = [
  {
  path: '',
  component: ShowhomeComponent,
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
