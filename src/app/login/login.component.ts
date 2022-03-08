import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private service:ServicesService) { }

  public userlogin(user:any){
    console.log(user);
    this.service.login(user).subscribe({
      next: (v) =>{
       
        console.log(v.token);
        localStorage.setItem("token", JSON.stringify(v.token));
        localStorage.setItem("email", JSON.stringify(user.email));

        if(v.message=='auth ok'){
          this.router.navigateByUrl('/home').then();
        }else{
          alert("Invalid user");
        }
      } ,
      error: (e) => console.error(e),
      complete: () => console.info('complete') 
    })

  }
  
  ngOnInit(): void {
    const token=localStorage.getItem("token");
    if (token) {
      this.router.navigateByUrl('/home').then();
    }
  }

}
