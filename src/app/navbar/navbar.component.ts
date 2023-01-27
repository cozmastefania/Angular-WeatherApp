import { Component, OnInit } from '@angular/core';

import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isLoggedIn!: any;

  constructor(private auth: RegisterService) {}

  ngOnInit(): void {
    this.isLoggedIn = localStorage.getItem('user');
  }

  logOut() {
    this.auth.logoutUser();
  }
}
