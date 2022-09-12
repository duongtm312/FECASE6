import {AppUser} from "./AppUser";

export class Notification{
  idNotification!:number;
  title!:string
  timeNotification!:Date
  appUser!:AppUser
  status!:boolean

  constructor(idNotification: number, title: string, timeNotification: Date, appUser: AppUser, status: boolean) {
    this.idNotification = idNotification;
    this.title = title;
    this.timeNotification = timeNotification;
    this.appUser = appUser;
    this.status = status;
  }
}
