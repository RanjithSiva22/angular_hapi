import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  users:any=[];
  constructor(private router: Router,private service:ServicesService) { }

  ngOnInit(): void {
    const token=localStorage.getItem("token");
    const email=localStorage.getItem("email");

    if (token) {
      const tok = JSON.parse(token);
      // const mail = JSON.parse(email);

      this.service.getusers(email,tok).subscribe({
        next: (v) =>{
          console.log(v)
          if(Array.isArray(v)){
            this.users=v;     
          }else{
            alert(" "+v.msg);
            localStorage.clear();
            this.router.navigateByUrl('/login').then();

          }
        } ,
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      })
    }else{
      this.router.navigateByUrl('/login').then();
    }
    
  }

  public blockUser(user:any){
    console.log(user)
    const token=localStorage.getItem("token");
    const email=localStorage.getItem("email");

    if (token) {
      const tok = JSON.parse(token);
      this.service.bkuser(user,email,tok).subscribe({
        next: (v) =>{
          console.log(v)
          if(v.msg==="sucess"){
            alert("user blocked");
            // this.ngOnInit();
          }else{
            alert(" "+v.msg);
            localStorage.clear();
            this.router.navigateByUrl('/login').then();
          }
        } ,
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      })
    }else{
      this.router.navigateByUrl('/login').then();
    }
  }

  public delUser(id: any){
    console.log(id)
    const token=localStorage.getItem("token");
    const email=localStorage.getItem("email");

    if (token) {
      const tok = JSON.parse(token);
      this.service.deluser(id,email,tok).subscribe({
        next: (v) =>{
          console.log(v)
          if(v.msg==="sucess"){
            alert("user deleted");
            this.ngOnInit();
          }else{
            alert(" "+v.msg);
            localStorage.clear();
            this.router.navigateByUrl('/login').then();

          }
        } ,
        error: (e) => console.error(e),
        complete: () => console.info('complete') 
      })
    }else{
      this.router.navigateByUrl('/login').then();
    }
  }

  public logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login').then();
    // alert()
  }

}
