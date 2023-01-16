import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {


  constructor(private fireauth : AngularFireAuth, private router : Router) {
  
   }

   registerUser(email: string, password:string) {
    return this.fireauth.createUserWithEmailAndPassword(email,password).then( () => {
      alert('Registration Succesful')
      this.router.navigate(['']);
    }, err => {
      alert(err.massage);
      this.router.navigate(['/register'])
    })
   }

   loginUser(email: string, password: string) {
    
    return this.fireauth.signInWithEmailAndPassword(email, password).then( () => {
      localStorage.setItem('user', JSON.stringify(email));
      alert('Log in Succesful')
      this.router.navigate(['/home']);
    }, err => {
      alert(err.message);
      this.router.navigate(['']);
    })
    
   }

   logoutUser() {
    this.fireauth.signOut().then( () => {
      localStorage.removeItem('user');
      this.router.navigate([''])
    }, err => {
      alert(err.message);
    })
   }
}
