import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ScriptService} from "../../script.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {CourceService} from "../../user/service/cource.service";
import * as http from "http";
import {Stomp} from "@stomp/stompjs";
import {UserProfileService} from "../../user/service/user-profile.service";
import {ChangeProfileUser} from "../../model/ChangeProfileUser";
import {FormControl, FormGroup} from "@angular/forms";
import {Comment} from "../../model/Comment";
import {Rating} from "../../model/Rating";
import {AppUser} from "../../model/AppUser";
import {LoginService} from "../../auth/service/login.service";

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit, OnChanges {
  private stompClient: any;

  comments: Comment[] = []
  ratings: Rating[] = []
  rate!: Rating
  idCmt: any
  idCourse: any
  course: any
  noti: any
proFile!:ChangeProfileUser
  constructor(private script: ScriptService, private route: ActivatedRoute,
              private courseService: CourceService, private router: Router,
              private userService:UserProfileService,private loginService:LoginService) {}
  numRating:number = 0
  num1star:number = 0
  num2star:number = 0
  num3star:number = 0
  num4star:number = 0
  num5star:number = 0
  star1:any
  star2:any
  star3:any
  star4:any
  star5:any
  ratingCourse:any
  numRate:number=0
  editForm: FormGroup = new FormGroup({
    contentCmt: new FormControl(""),
    timeCmt: new FormControl(),
    appUser: new FormGroup({
      idUser: new FormControl()
    }),
    course: new FormGroup({
      idCourse: new FormControl()
    })
  })



  ngOnInit(): void {
    this.connect()
    this.route.paramMap.subscribe(paramMap => {
      this.idCourse = paramMap.get('idCourse');
      this.courseService.findById(this.idCourse).subscribe((data) => {
        this.course = data
        this.ratingCourse = data.numRating
        console.log(this.ratingCourse)
      })
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        this.comments = data
      })
      this.courseService.getAllRating(this.idCourse).subscribe((data) =>{
        console.log(data)
        this.ratings = data
        this.numRating = data.length
        for (let i = 0; i < data.length; i++) {
          if (data[i].numStar == 1) {
            this.num1star ++
            console.log("1")
          }
          if (data[i].numStar == 2) {
            this.num2star ++
            console.log("2")
          }
          if (data[i].numStar == 3) {
            this.num3star ++
            console.log("3")
          }
          if (data[i].numStar == 4) {
            this.num4star ++
            console.log("4")
          }
          if (data[i].numStar == 5) {
            this.num5star ++
            console.log("5")
          }
        }
        console.log(this.num1star,this.num2star,this.num3star,this.num4star,this.num5star,this.numRating)
        this.star1 = this.num1star / this.numRating * 100
        this.star2 = this.num2star / this.numRating * 100
        this.star3 = this.num3star / this.numRating * 100
        this.star4 = this.num4star / this.numRating * 100
        this.star5 = this.num5star / this.numRating * 100
      })
    })
    this.userService.getProfileFull().subscribe(data=>{
      this.proFile=data
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    this.script.load('bootstrap', 'tiny-slider', 'glightbox', 'purecounter_vanilla', 'functions').then(data => {
      console.log('script loaded ', data);
    }).catch(error => console.log(error));
  }

  buyCourse(idCourse: any) {
    if (this.loginService.getUserToken().roles[0].nameRole.includes("ROLE_ADMIN")){
      this.noti = "* Admin thì mua cái gì"
    } else if (this.loginService.getUserToken().roles[0].nameRole.includes("ROLE_USER")) {
      this.courseService.buyCourse(idCourse).subscribe((data) => {
        console.log(data)
        if (data != null) {
          this.noti = "buy success"
          this.sendNotification()
        } else {
          this.noti = "* Your money not enough"
        }
      })
    } else {
      this.router.navigate(["/login"])
    }

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
      JSON.stringify({'idNotification':0,'title':'Bought the course' , 'timeNotification': new Date(),'appUser':this.proFile,'status':false})
    );
  }
  commentForm: FormGroup = new FormGroup({
    contentCmt: new FormControl(""),
    timeCmt: new FormControl(""),
  })

  saveCmt() {
    this.courseService.saveCmt(this.idCourse, this.commentForm.value).subscribe((data) => {
      this.commentForm.reset();
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        this.comments = data;
      })
    })

  }

  delete(id: number) {
    this.courseService.deleteCmt(id).subscribe((data) => {
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        this.comments = data
      })
    })

  }

  setCmt(comment: Comment) {
    this.idCmt = comment.idComment
    this.editForm = new FormGroup({
      contentCmt: new FormControl(comment.contentCmt),
      timeCmt: new FormControl(comment.timeCmt),
      appUser: new FormGroup({
        idUser: new FormControl(comment.appUser.idUser)
      }),
      course: new FormGroup({
        idCourse: new FormControl(comment.course.idCourse)
      })
    })
  }


  editCmt() {
    this.courseService.editCmt(this.idCmt, this.editForm.value).subscribe((data) => {
      this.courseService.getAllCmt(this.idCourse).subscribe((data) => {
        this.comments = data
      })

    })
  }

  ratingForm : FormGroup = new FormGroup({
    contentRating: new FormControl(""),
    numStar: new FormControl(),
    appUser: new FormGroup({
      idUser: new FormControl()
    }),
    course: new FormControl()
  })
  counter(s: number) {
    return new Array(s);
  }
  setNumRate(rate:number){
    this.numRate=rate
    this.ratingForm.controls["numStar"]?.setValue(rate)
  }
 saveRating(){
    this.courseService.saveRating(this.idCourse,this.ratingForm.value).subscribe((data) =>{
      this.ratingForm.reset()
      console.log(data)
    this.rate = data;
      this.courseService.getAllRating(this.idCourse).subscribe((data) =>{
        console.log(data)
        this.ratings = data
        this.numRating = data.length
        for (let i = 0; i < data.length; i++) {
          if (data[i].numStar == 1) {
            this.num1star ++
            console.log("1")
          }
          if (data[i].numStar == 2) {
            this.num2star ++
            console.log("2")
          }
          if (data[i].numStar == 3) {
            this.num3star ++
            console.log("3")
          }
          if (data[i].numStar == 4) {
            this.num4star ++
            console.log("4")
          }
          if (data[i].numStar == 5) {
            this.num5star ++
            console.log("5")
          }
        }
        console.log(this.num1star,this.num2star,this.num3star,this.num4star,this.num5star,this.numRating)
        this.star1 = this.num1star / this.numRating * 100
        this.star2 = this.num2star / this.numRating * 100
        this.star3 = this.num3star / this.numRating * 100
        this.star4 = this.num4star / this.numRating * 100
        this.star5 = this.num5star / this.numRating * 100
      })
    })
 }





}
