import { Component, OnInit } from '@angular/core';
import {CertificateService} from "../service/certificate.service";
import {Certificate} from "../../model/Certificate";

@Component({
  selector: 'app-my-certificate',
  templateUrl: './my-certificate.component.html',
  styleUrls: ['./my-certificate.component.css']
})
export class MyCertificateComponent implements OnInit {
  certificates: Certificate[]=[]
  constructor(private certificateService:CertificateService) { }

  ngOnInit(): void {
    this.certificateService.findByIdUser().subscribe((data)=>{
      this.certificates = data
    })
  }

}
