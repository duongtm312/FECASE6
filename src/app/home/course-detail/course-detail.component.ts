import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CourceService} from "../../user/service/cource.service";
import * as http from "http";
import {Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnChanges {
  private stompClient: any;
  idCourse: any
  course: any
  noti: any

  constructor(private script: ScriptService, private route: ActivatedRoute, private courseService: CourceService, private router: Router) {
  }

  ngOnInit(): void {
    this.connect()
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data
        console.log(data)
      })
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  buyCourse(idCourse: any) {
    this.courseService.buyCourse(idCourse).subscribe((data) => {
      console.log(data)
      if (data != null) {
        this.noti = "buy success"
        this.sendNotification()
      } else {
        this.noti = "* Your money not enough"
      }
    })
  }

  connect() {
    // đường dẫn đến server
    const socket = new WebSocket('ws://localhost:8081/socket/websocket');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      // là chờ xèm thằng server gửi về.
      // _this.stompClient.subscribe('/notification/admin', function (hello: any) {
      // });
    });
  }
  sendNotification() {
    this.stompClient.send(
      '/app/notification.send',
      {},
      // Dữ liệu được gửi đi
      JSON.stringify({'idNotification':0,'title':'Bought the course' , 'timeNotification': new Date(),'appUser':{},'status':false})
    );
  }
}
