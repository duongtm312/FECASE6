import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../script.service";
import {AdminInstructorService} from "../service/admin-instructor.service";
import {Instructor} from "../../model/Instructor";
import {Page} from "../../model/Page";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {finalize} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-instructor',
  templateUrl: './admin-instructor.component.html',
  styleUrls: ['./admin-instructor.component.css']
})
export class AdminInstructorComponent implements OnInit {
  page!: Page
  instructor: Instructor[] = []
  editForm: any

  constructor(private script: ScriptService, private instructorService: AdminInstructorService, private storage: AngularFireStorage, private router: Router) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions').then(data => {
    }).catch(error => console.log(error));
    this.instructorService.getAllPage(0).subscribe((data) => {
      this.page = data
      this.instructor = this.page.content
      this.setInst(this.instructor[0])
    })
  }

  getAll(page: number) {
    if (page >= 0 && page < this.page.totalPages) {
      this.instructorService.getAllPage(page).subscribe((data) => {
        this.page = data
        this.instructor = this.page.content
      })
    }
  }

  createForm = new FormGroup({
    nameInstructor: new FormControl("", [Validators.required]),
    emailInstructor: new FormControl("", [Validators.email]),
    dateOfBirthInstructor: new FormControl("", [Validators.required]),
    phoneInstructor: new FormControl("", [Validators.required]),
    avatarInstructor: new FormControl("123"),
    experience: new FormControl("", [Validators.required])

  })

  setInst(instructor: Instructor) {
    this.editForm = new FormGroup({
      idInstructor: new FormControl(instructor.idInstructor, [Validators.required]),
      nameInstructor: new FormControl(instructor.nameInstructor, [Validators.required]),
      emailInstructor: new FormControl(instructor.emailInstructor, [Validators.email]),
      dateOfBirthInstructor: new FormControl(instructor.dateOfBirthInstructor, [Validators.required]),
      phoneInstructor: new FormControl(instructor.phoneInstructor, [Validators.required]),
      avatarInstructor: new FormControl(instructor.avatarInstructor),
      experience: new FormControl(instructor.experience, [Validators.required])

    })
  }

  editInstructor(file: any) {
    if (this.editForm.valid) {
      if (file[0] == undefined) {
        this.instructorService.save(this.editForm.value).subscribe((data) => {
          window.location.reload();
        })
      }
      for (let f of file) {
        if (f != null) {
          const filePath = f.name;
          const fileRef = this.storage.ref(filePath);
          this.storage.upload(filePath, f).snapshotChanges().pipe(
            finalize(() => (fileRef.getDownloadURL().subscribe(
              url => {
                this.editForm.get('avatarInstructor')?.setValue(url)
                this.instructorService.save(this.editForm.value).subscribe((data) => {
                  window.location.reload();
                })
              })))
          ).subscribe((data) => {

          });
        }
      }
    }


  }

  createInstructor(fileCreate: any) {
    if (this.createForm.valid) {
      for (let file of fileCreate) {
        console.log(file)
        if (file != null) {
          const filePathCreate = file.name;
          const fileRefCreate = this.storage.ref(filePathCreate);
          this.storage.upload(filePathCreate, file).snapshotChanges().pipe(
            finalize(() => (fileRefCreate.getDownloadURL().subscribe(
              urlCreate => {
                this.createForm.get('avatarInstructor')?.setValue(urlCreate)
                console.log(this.createForm.value)
                this.instructorService.save(this.createForm.value).subscribe((data) => {
                  window.location.reload();
                })
              })))
          ).subscribe((data) => {

          });
        }
      }
    }


  }

  delete(id: number) {
    this.instructorService.delete(id).subscribe(data => {
      window.location.reload();
    })
  }
}
