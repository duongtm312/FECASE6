import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {LoginService} from "../../auth/service/login.service";
import {Router} from "@angular/router";
import {NotificationService} from "../service/notification.service";
import {Notification} from "../../model/Notification";
import {Stomp} from "@stomp/stompjs";

@Component({
  selector: 'app-navbartop',
  templateUrl: './navbartop.component.html',
  styleUrls: ['./navbartop.component.css']
})
export class NavbartopComponent implements OnInit, OnChanges {
  private stompClient: any;
  statusNoti: boolean = false
  notification: Notification[] = []
  constructor(private script: ScriptService, private loginService: LoginService, private router: Router, private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.getAll()
    this.connect()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  getAll() {
    this.notificationService.getAll().subscribe((data) => {
      this.notification = data
      if (this.notification.length == 0) {
        this.statusNoti = false
      } else {
        this.statusNoti = true
      }
    })
  }

  doneStatus(noti: any) {
    let notis: Notification[] = [noti]
    this.notificationService.doneNotification(notis).subscribe(() => {
      this.getAll()
    })
  }

  doneAll() {
    this.notificationService.doneNotification(this.notification).subscribe(() => {
      this.getAll()
    })
  }

  signOut() {
    this.loginService.setToken("");
    localStorage.setItem("userToken", "")
    this.router.navigate(["/login"])
  }
  connect() {
    // đường dẫn đến server
    const socket = new WebSocket('ws://localhost:8081/socket/websocket');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame: any) {
      console.log('Connected: ' + frame);

      // là chờ xèm thằng server gửi về.
      _this.stompClient.subscribe('/notification/admin', function (hello: any) {
        _this.getAll();
      });

    });
  }
}
