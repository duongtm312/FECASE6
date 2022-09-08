import {Component, OnInit} from '@angular/core';
import {UserProfileService} from "../service/user-profile.service";
import {FormControl, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
notiPass:any
  notiProfile:any
  changeProfileUser: any
  editAvatarForm:any
  constructor(private profileService: UserProfileService,private router:Router) {
  }

  editProfileForm = new FormGroup({
    userName: new FormControl("alo"),
    fullName: new FormControl(),
    email: new FormControl(),
    address: new FormControl(),
    dateOfBirth: new FormControl(),
    phone: new FormControl(),
    description: new FormControl()

  })
  ngOnInit(): void {
    this.profileService.getProfileFull().subscribe(data => {
      this.changeProfileUser = data
      console.log(data.avatarSrc)
      this.editProfileForm = new FormGroup({
        userName: new FormControl(data.userName),
        fullName: new FormControl(data.fullName),
        email: new FormControl(data.email),
        address: new FormControl(data.address),
        dateOfBirth: new FormControl(data.dateOfBirth),
        phone: new FormControl(data.phone),
        description: new FormControl(data.address)
      })
      this.editAvatarForm = new FormGroup(
        {
          avatarSrcc : new FormControl(data.avatarSrc)
        }
      )
    })
  }
  editProfile(){
    this.profileService.saveProfile(this.editProfileForm.value).subscribe(data=>{
      if(data != null){
        this.notiProfile = "Change profile succes !"
      } else {this.notiProfile = "Change profile fail ! "}
    })
    this.router.navigate(["user/edit"])
  }

  editPassForm = new FormGroup(
    {
      oldPassword : new FormControl(),
    newPassword: new FormControl(),
    confirmNewPassword: new FormControl()
    }
  )
  editPassword(){
  this.profileService.savePassword(this.editPassForm.value).subscribe(data=>{
    if(data != null){
      this.notiPass = "Change password succes !"
    } else {this.notiPass = "Change password fail ! "}
  })

  }

  editAvatar(file: any){
    console.log(file)

  }

}
