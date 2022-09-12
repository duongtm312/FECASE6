import { Component, OnInit } from '@angular/core';
import {AdminBillService} from "../service/admin-bill.service";
import {Bill} from "../../model/Bill";
import {ReqRechargeService} from "../service/req-recharge.service";
import {Recharge} from "../../model/Recharge";

@Component({
  selector: 'app-admin-earning',
  templateUrl: './admin-earning.component.html',
  styleUrls: ['./admin-earning.component.css']
})
export class AdminEarningComponent implements OnInit {
bill:Bill[] =[]
  totalEarning:any
  totalRecharge:any
  totalBillInMonth:any
  reqRecharges:any


  constructor(private billService:AdminBillService,private reqRechargeService:ReqRechargeService ) { }

  ngOnInit(): void {
    this.billService.getAll().subscribe((data)=>{
      this.bill = data
      this.totalEarning = 0
      this.totalRecharge = 0
      for (const b of data) {
        if(b.status == true){
          this.totalEarning += b.totalBill
          if(b.contentBill == "Recharge"){
            this.totalRecharge += b.totalBill
          }
        }
      }
    })
    this.billService.getTotalBillInMonth().subscribe((data)=>{
      this.totalBillInMonth = data.totalBillInMonth

    })
    this.reqRechargeService.getAll().subscribe((data)=>{
      this.reqRecharges = data
    })
  }

  reChargeUser(money:any,idUser:any,idReq:any){
    let recharge:Recharge = new Recharge(money,idUser,idReq)
    this.reqRechargeService.reCharge(recharge).subscribe((data)=>{
      this.reqRechargeService.getAll().subscribe((data)=>{
        this.reqRecharges = data
        this.billService.getAll().subscribe((data)=>{
          this.bill = data
        })
      })
    })
  }

}
