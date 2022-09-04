import {Course} from "./Course";
import {AppUser} from "./AppUser";
import {Certificate} from "./Certificate";

export class MyCourse {
  idMyCourse!: number
  course!: Course
  appUser!: AppUser
  exprie!: Date
  statusMyCourse!: boolean
  certificate!: Certificate
}
