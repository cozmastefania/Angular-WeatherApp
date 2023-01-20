import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import {ref, remove} from '@angular/fire/database';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  favoritesRef!: AngularFireList<object>;
  user!: any;
  dataFromFavorites!: object;
  favoriteCity: Array<string> = [];

  constructor(private fireauth : AngularFireAuth, private router : Router, public firedb: AngularFireDatabase) {
    
    this.user = this.getUserLoggedIn();
    this.favoritesRef = firedb.list(`favorites/${this?.user}`);
    console.log(this.favoritesRef);

   }
   


   getUserLoggedIn() {
      return localStorage.getItem('user');
    }

    createFavorite(fav: any) {
      console.log(this.favoriteCity.includes(fav))
      return this.favoritesRef.push(fav);
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
    
    return this.fireauth.signInWithEmailAndPassword(email, password).then( (data) => {
      console.log(data.user?.uid);
      localStorage.setItem('user', JSON.stringify(data.user?.uid));
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
