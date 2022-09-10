import {AppUser} from "./AppUser";
import {ChangeProfileUser} from "./ChangeProfileUser";

export class RequestRecharge {
  idRequest!: number
  money!: number
  appUser!: ChangeProfileUser
  createAt!: Date
  paymentMethod!: string
  status!: boolean
}
