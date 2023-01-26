import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityListComponent } from './city-list/city-list.component';
import { environment } from './environments/environment';
import { ForecastItemComponent } from './forecast/forecast-item/forecast-item.component';
import { ForecastComponent } from './forecast/forecast.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MoreInfoComponent } from './more-info/more-info.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    ForecastComponent,
    ForecastItemComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    CityListComponent,
    MoreInfoComponent,
    NavbarComponent,
    RegisterComponent,
  ],
  imports: [
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFirestoreModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ButtonModule,
    CarouselModule,
    DropdownModule,
    FormsModule,
    HttpClientModule,
    InputTextModule,
    ReactiveFormsModule,
    TabViewModule,
    ToastModule,
    UiSwitchModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
