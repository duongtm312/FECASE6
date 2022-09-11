import {Course} from "./Course";
import {AppUser} from "./AppUser";

export class Bill {
  idBill!: number
  createAt!: Date
  course!: Course
  appUser!: AppUser
  totalBill!: number
  status!: boolean
  contentBill!: string
  paymentMethod!: string
}
