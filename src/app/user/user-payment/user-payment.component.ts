import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ReqRechargeService} from "../../admin/service/req-recharge.service";
import Swal from "sweetalert2";
import {AdminBillService} from "../../admin/service/admin-bill.service";
import {LoginService} from "../../auth/service/login.service";
import {Bill} from "../../model/Bill";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {
  bills:Bill[] =[]
  pipe = new DatePipe('en-US');
  constructor(private reqChargeService:ReqRechargeService,private billService:AdminBillService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.billService.getAllByIdUser().subscribe((data)=>{
      this.bills = data
      for (const b of data) {
        b.createAt = this.pipe.transform(b.createAt,'yyyy-MM-dd')
      }
      console.log(data)
    })
  }
  rechargeForm = new FormGroup({
    money: new FormControl("",[Validators.min(20),Validators.required])
  })
  p: any
  reqRecharge(){
        this.reqChargeService.reqRecharge(this.rechargeForm.value).subscribe(()=>{
          this.rechargeForm.reset()
          this.message()
        })
  }
  message(){
    Swal.fire({
      title: 'Deposit request sent successfully! Please transfer money to our bank account',
      icon: 'success',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })

  }

}
