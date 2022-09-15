import {Component, OnInit} from '@angular/core';
import {UserMycourseService} from "../service/user-mycourse.service";
import {MyCourse} from "../../model/MyCourse";
import {AdminLessonService} from "../../admin/service/admin-lesson.service";
import {
  logExperimentalWarnings
} from "@angular-devkit/build-angular/src/builders/browser-esbuild/experimental-warnings";

class Tour {
}

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  myCourse: MyCourse[] = []
  p: any;
  private tourService: any;
  private tours: Tour[] | undefined;

  constructor(private myCourseService: UserMycourseService, private lessonService: AdminLessonService) {
  }

  ngOnInit(): void {
    this.myCourseService.getAllMyCourse().subscribe((data) => {
      this.myCourse = data
      console.log(data)

      // document.getElementById("12")?.setAttribute("data-purecounter-end",data.length.toString())
    })
    this.myCourseService.checkExpire().subscribe()

  }
  search(input: any) {
    this.tourService.getAll().subscribe((data: any) => {
      let toursSearch:Tour[]=[]
      for (const d of data) {
        if (d.title.toLowerCase().normalize('NFD') .replace(/[\u0300-\u036f]/g, '')
          .replace(/đ/g, 'd').replace(/Đ/g, 'D').includes(input.toLowerCase().normalize('NFD') .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd').replace(/Đ/g, 'D'))){
          toursSearch.push(d)
        }
      }
      console.log(toursSearch)
      this.tours=toursSearch;
    })
  }
}
