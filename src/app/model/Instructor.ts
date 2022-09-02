export class Instructor{
  idInstructor!:number
  nameInstructor!:string
  emailInstructor!:string
  dateOfBirthInstructor!:Date
  phoneInstructor!:string
  avatarInstructor!:string
  experience!:number

  constructor(idInstructor: number, nameInstructor: string, emailInstructor: string, dateOfBirthInstructor: Date, phoneInstructor: string, AvatarInstructor: string, experience: number) {
    this.idInstructor = idInstructor;
    this.nameInstructor = nameInstructor;
    this.emailInstructor = emailInstructor;
    this.dateOfBirthInstructor = dateOfBirthInstructor;
    this.phoneInstructor = phoneInstructor;
    this.avatarInstructor = AvatarInstructor;
    this.experience = experience;
  }
}
