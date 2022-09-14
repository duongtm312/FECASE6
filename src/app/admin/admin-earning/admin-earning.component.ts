import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {AdminBillService} from "../service/admin-bill.service";
import {Bill} from "../../model/Bill";
import {ReqRechargeService} from "../service/req-recharge.service";
import {Recharge} from "../../model/Recharge";
import {ScriptService} from "../../script.service";
import {AppUser} from "../../model/AppUser";

@Component({
  selector: 'app-admin-earning',
  templateUrl: './admin-earning.component.html',
  styleUrls: ['./admin-earning.component.css']
})
export class AdminEarningComponent implements OnInit,OnChanges {
bill:Bill[] =[]
  totalEarning:number = 0
  totalRecharge: number = 0
  totalBillInMonth:any
  reqRecharges:any
  billFail:number = 0
  p: any;
  g: any;
  profileBill: any;


  constructor(private billService:AdminBillService,private reqRechargeService:ReqRechargeService,private script:ScriptService) { }

  ngOnInit(): void {
    this.billService.getAll().subscribe((data)=>{
      this.bill = data
      for (const b of data) {
        if(b.status == true){
          if(b.contentBill == "Recharge"){
            this.totalRecharge += b.totalBill
          } else this.totalEarning += b.totalBill
        }
        if(b.status == false) this.billFail += b.totalBill
      }
      this.billService.getTotalBillInMonth().subscribe((data)=>{
        this.totalBillInMonth = data.totalBillInMonth - this.totalRecharge - this.billFail
    })

    })
    this.reqRechargeService.getAll().subscribe((data)=>{
      this.reqRecharges = data
    })
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
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

  ngOnChanges(changes: SimpleChanges): void {

  }
  setInst(bill: Bill) {
    this.profileBill = bill
  }

}
