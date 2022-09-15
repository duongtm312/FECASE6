import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validator, Validators} from "@angular/forms";
import {ReqRechargeService} from "../../admin/service/req-recharge.service";
import Swal from "sweetalert2";
import {AdminBillService} from "../../admin/service/admin-bill.service";
import {LoginService} from "../../auth/service/login.service";
import {Bill} from "../../model/Bill";

@Component({
  selector: 'app-user-payment',
  templateUrl: './user-payment.component.html',
  styleUrls: ['./user-payment.component.css']
})
export class UserPaymentComponent implements OnInit {
  bills:Bill[] =[]
  constructor(private reqChargeService:ReqRechargeService,private billService:AdminBillService,private loginService:LoginService) { }

  ngOnInit(): void {
    this.billService.getAllByIdUser().subscribe((data)=>{
      this.bills = data
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
      title: 'Deposit request sent successfully',
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
