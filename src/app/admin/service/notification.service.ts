import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Notification} from "../../model/Notification";
const API_URL = `${environment.apiUrl}`;
@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http:HttpClient) { }
  getAll():Observable<Notification[]>{
    return this.http.get<Notification[]>(API_URL+"/admin/notification/")
  }
  doneNotification(notification:any):Observable<Notification>{
    return this.http.post<Notification>(API_URL+"/admin/notification/done",notification)
  }
}
