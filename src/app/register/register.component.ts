import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';

  constructor(private router: Router, private register: RegisterService) {}

  ngOnInit(): void {}

  redirectToLogin() {
    this.router.navigate(['']);
  }

  registerUser() {
    if (
      this.firstName == '' ||
      this.lastName == '' ||
      this.email == '' ||
      this.password == ''
    ) {
      console.log(this.firstName, this.lastName, this.email, this.password);
      alert('Please complete all fields');
      return;
    }
    this.register.registerUser(this.email, this.password);
    this.firstName = '';
    this.lastName = '';
    this.email = '';
    this.password = '';
  }
}
