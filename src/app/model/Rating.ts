import {Course} from "./Course";
import {AppUser} from "./AppUser";

export class Rating{
  idRating!:number
  contentRating!:string
  numStar!:number
  statusRating!:boolean
  appUser!:AppUser
  course!:Course
}
