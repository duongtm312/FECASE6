import { Component, OnInit } from '@angular/core';
import {UserMycourseService} from "../service/user-mycourse.service";
import {MyCourse} from "../../model/MyCourse";

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  myCourse: MyCourse[] = []
  noti:any
  constructor(private myCourseService:UserMycourseService) { }

  ngOnInit(): void {
    this.myCourseService.getAllMyCourse().subscribe((data) =>{
      this.myCourse = data
      console.log(this.myCourse)
    })
  }


}
