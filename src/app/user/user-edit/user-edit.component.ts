import {Component, OnInit} from '@angular/core';
import {UserProfileService} from "../service/user-profile.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  notiPass: any
  notiProfile: any
  changeProfileUser: any
  editAvatarForm: any

  constructor(private profileService: UserProfileService, private router: Router, private storage: AngularFireStorage) {
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
          avatarSrcc: new FormControl(data.avatarSrc)
        }
      )
    })
  }

  editProfile() {
    this.profileService.saveProfile(this.editProfileForm.value).subscribe(data => {
      if (data != null) {
        this.messageEditProSuccess()
      } else {
        this.messageEditProFail()
      }
    })
    this.router.navigate(["user/edit"])
  }

  editPassForm = new FormGroup(
    {
      oldPassword: new FormControl("", Validators.required),
      newPassword: new FormControl("", [Validators.required, Validators.minLength(6)]),
      confirmNewPassword: new FormControl("", [Validators.required])
    }
  )

  editPassword() {
    this.profileService.savePassword(this.editPassForm.value).subscribe(data => {
      if (data != null) {
        this.messagePassSuccess()
      } else {
        this.messagePassFail()
      }
    })

  }

  onUploadAvatar($event: any) {
    // @ts-ignore
    document.getElementById("avatar avatar-xl").hidden = true;
    this.editAvatarForm.avatar = $event;
  }

  editAvatar(file: any) {

  }

  messageEditProSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Edit profile successful!',
      showConfirmButton: false,
      timer: 1500
    })
  }

  messageEditProFail() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Change profile fail ',
      showConfirmButton: false,
      timer: 1500
    })
  }

  messagePassSuccess() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Change password succes !',
      showConfirmButton: false,
      timer: 1500
    })
  }

  messagePassFail() {
    Swal.fire({
      position: 'center',
      icon: 'error',
      title: 'Change password fail ! ',
      showConfirmButton: false,
      timer: 1500
    })

  }


}
