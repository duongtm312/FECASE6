import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserMainComponent } from './user-main/user-main.component';
import { NavbartopComponent } from './navbartop/navbartop.component';
import { NavbarleftComponent } from './navbarleft/navbarleft.component';
import { NavbarheadComponent } from './navbarhead/navbarhead.component';
import { UserDeleteComponent } from './user-delete/user-delete.component';
import { UserPaymentComponent } from './user-payment/user-payment.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    UserDashboardComponent,
    UserMainComponent,
    NavbartopComponent,
    NavbarleftComponent,
    NavbarheadComponent,
    UserDeleteComponent,
    UserPaymentComponent,
    UserEditComponent
  ],
    imports: [
        CommonModule,
        UserRoutingModule,
        ReactiveFormsModule
    ]
})
export class UserModule { }
