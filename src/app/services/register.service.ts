import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  getUserLoggedIn() {
    return localStorage.getItem('user');
  }

  registerUser(email: string, password: string) {
    return this.fireauth.createUserWithEmailAndPassword(email, password).then(
      userResponse => {
        alert('Registration Succesful');
        this.router.navigate(['']);
      },
      err => {
        alert(err.massage);
        this.router.navigate(['/register']);
      }
    );
  }

  loginUser(email: string, password: string) {
    return this.fireauth.signInWithEmailAndPassword(email, password).then(
      data => {
        console.log(data.user?.uid);
        localStorage.setItem('user', JSON.stringify(data.user?.uid));
        alert('Log in Succesful');
        this.router.navigate(['/home']);
      },
      err => {
        alert(err.message);
        this.router.navigate(['']);
      }
    );
  }

  logoutUser() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('user');
        this.router.navigate(['']);
      },
      err => {
        alert(err.message);
      }
    );
  }
}
