import { Component, OnInit } from '@angular/core';
import {AdminBillService} from "../service/admin-bill.service";
import {Bill} from "../../model/Bill";

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


  constructor(private billService:AdminBillService) { }

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
      console.log(data)
    })
  }

}
