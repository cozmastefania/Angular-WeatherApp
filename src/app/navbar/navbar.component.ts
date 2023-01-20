import { Component, OnInit } from '@angular/core';

import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: RegisterService) { }

  ngOnInit(): void {
  }

  logOut() {
    this.auth.logoutUser();
  }

  // logIn() {
  //   if (localStorage.getItem('token')) {
  //     this.auth.logoutUser();

  // }

}
