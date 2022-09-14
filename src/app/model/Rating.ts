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
  fullName!: string;



}
