import {Component, OnInit} from '@angular/core';
import {UserMycourseService} from "../service/user-mycourse.service";
import {MyCourse} from "../../model/MyCourse";
import {AdminLessonService} from "../../admin/service/admin-lesson.service";


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  myCourse: MyCourse[] = []


  constructor(private myCourseService: UserMycourseService, private lessonService: AdminLessonService) {
  }

  ngOnInit(): void {
    this.myCourseService.getAllMyCourse().subscribe((data) => {
      this.myCourse = data
    })
    this.myCourseService.checkExpire().subscribe((data) =>{
      this.myCourse = data
    })
  }

  search(input: any){
    let searchMyCourse : MyCourse[] = []
    this.myCourseService.getAllMyCourse().subscribe((data) =>{
      for (const d of data){
        if (d.course.nameCourse.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd').replace(/Đ/g, 'D').includes(input.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D'))){
          searchMyCourse.push(d)
        }
      }
      this.myCourse = searchMyCourse
    })
  }

  findExpired(){
    this.myCourseService.findExpired().subscribe((data) =>{
      console.log(data)
      this.myCourse = data
    })
  }

  findExpire(){
    this.myCourseService.findExpire().subscribe((data) =>{
      console.log(data)
      this.myCourse = data
    })
  }




}
