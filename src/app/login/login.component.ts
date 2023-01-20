import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';

  constructor(private router: Router, private register: RegisterService) { }

  ngOnInit(): void {
  }

  redirectToRegister() {
    this.router.navigate(['/register']);
  }

  loginUser() { 
    if(this.email == '') {
      alert('Please enter email');
      return;
    }
    if(this.password == '') {
      alert('Please enter password');
      return;
    }
    this.register.loginUser(this.email, this.password);
    // this.email = '';
    // this.password = '';
  }

 

}
