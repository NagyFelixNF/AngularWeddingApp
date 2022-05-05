import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { NbTokenService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { isConstructorDeclaration } from 'typescript';
import { Vendor } from '../data/Vendor';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  url = "https://localhost:5001/api/vendor/"

  constructor(private TokenService: NbTokenService, private http: HttpClient) { }

  getToken()
  {
    var token;
    this.TokenService.get().subscribe(
      x => token = x.getValue()
    )
    return token;
  }

  GetHeader()
  {
    console.log("header");
    return  {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.getToken()}`)
    }
  }

  DeleteVendor(vendorid:string)
  {
    this.http.delete(this.url+vendorid,this.GetHeader()).subscribe();
  }

  GetVendor(): Observable<Vendor[]>
  {
    return this.http.get<Vendor[]>(this.url,this.GetHeader()).pipe();
  }

  AddVendor(vendor): Observable<Vendor>
  {
    return this.http.post<Vendor>(this.url,vendor,this.GetHeader()).pipe();
  }

  updateVendor(vendorid,vendor)
  {
    this.http.patch(this.url+vendorid,vendor,this.GetHeader()).subscribe();
  }

}
