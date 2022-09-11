import {Course} from "./Course";
import {AppUser} from "./AppUser";

export class Rating{
  idRating!:number
  contentRating!:string
  numStar!:number
  timeRating!: Date
  statusRating!:boolean
  appUser!:AppUser
  course!:Course


  constructor(idRating: number, contentRating: string, numStar: number, timeRating: Date, statusRating: boolean, appUser: AppUser, course: Course) {
    this.idRating = idRating;
    this.contentRating = contentRating;
    this.numStar = numStar;
    this.timeRating = timeRating;
    this.statusRating = statusRating;
    this.appUser = appUser;
    this.course = course;
  }
}
