import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    return this.http.post('http://localhost:1234/login', data);
  }

  deluser(id:Number,email:any,tok:any): Observable<any>{

    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': tok
    });

        const httpOptions = {
          headers: headers_object
        };
    return this.http.post(`http://localhost:1234/delete/${id}`,{email},httpOptions);

  }

  bkuser(user:any,email:any,tok:any): Observable<any>{

    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': tok
    });

        const httpOptions = {
          headers: headers_object
        };
    return this.http.post(`http://localhost:1234/block/`+email,user,httpOptions);

  }

  getusers(email:any,tok:any): Observable<any> {
    // const obj={mail:email};
    var headers_object = new HttpHeaders({
      'Content-Type': 'application/json',
       'Authorization': tok,
      //  'email': JSON.parse(email)
    });
    console.log(email);
        const httpOptions = {
          headers: headers_object
        };

    return this.http.get('http://localhost:1234/users/'+email,httpOptions);
  }
}
