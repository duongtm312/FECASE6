import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ReqRechargeService} from "../../admin/service/req-recharge.service";

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {
  noti:any
  constructor(private reqChargeService:ReqRechargeService) { }

  ngOnInit(): void {
  }
  rechargeForm = new FormGroup({
    money: new FormControl()
  })
  reqRecharge(){
    console.log("alo")
    console.log(this.rechargeForm.value)
    this.reqChargeService.reqRecharge(this.rechargeForm.value).subscribe()
  }
}
