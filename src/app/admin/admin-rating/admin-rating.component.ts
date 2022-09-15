import {Component, OnInit} from '@angular/core';
import {ScriptService} from "../../script.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AdminCommentService} from "../service/admin-comment.service";
import {Rating} from "../../model/Rating";
import {Page} from "../../model/Page";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admin-rating',
  templateUrl: './admin-rating.component.html',
  styleUrls: ['./admin-rating.component.css']
})
export class AdminRatingComponent implements OnInit {
  page!: Page
  ratings: any[] = []
  rate: Rating=new Rating()

  constructor(private script: ScriptService, private router: Router, private ratingService: AdminCommentService) {
  }

  ngOnInit(): void {
    this.script.load('bootstrap', 'tiny-slider',
      'glightbox', 'purecounter_vanilla', 'functions',).then(data => {
    }).catch(error => console.log(error));
    this.ratingService.getAll(0).subscribe((data) => {
      this.page = data
      this.ratings = this.page.content
      // @ts-ignore
      this.showRate(this.ratings[0])
    })
  }

  getAll(page: any) {
    if (page >= 0 && page < this.page.totalPages) {
      this.ratingService.getAll(page).subscribe((data) => {
        this.page = data
        this.ratings = this.page.content
        // @ts-ignore
        this.showRate(this.ratings[0])
      })
    }
  }

  counter(s: number) {
    return new Array(s);
  }
  showRate(rate:Rating){
    this.rate=rate
  }
  disable(id:number,page:any){
    this.ratingService.disable(id).subscribe(()=>{
      this.messageDisable()
      this.getAll(page)
    })

  }
  approval(id:number,page:any){
    this.messageApproval()
    this.ratingService.approval(id).subscribe(()=>{
      this.getAll(page)
    })

  }
  delete(id:number,page:any){
    this.ratingService.delete(id).subscribe(()=>{
      this.getAll(page)
    })

  }

  messageApproval(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your student has been approvaled ',
      showConfirmButton: false,
      timer: 1500
    })
  }
  messageDisable (){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your student has been disabled ',
      showConfirmButton: false,
      timer: 1500
    })
  }
  confirmDelete(id:number,page:any){
    Swal.fire({
      title: 'Do you want to delete rating?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.delete(id,page)
        Swal.fire('Rating has been deleted!', '', 'success')
      }
    })
  }
}
