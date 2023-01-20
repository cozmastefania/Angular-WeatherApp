import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { CityListComponent } from 'src/app/city-list/city-list.component';
// import { CityComponent } from 'src/app/city-list/city/city.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'register', component: RegisterComponent },
  // { path: 'city-list', component: CityListComponent },
  // { path: 'city-list/:name', component: CityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
