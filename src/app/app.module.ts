import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './Navbar Components/about/about.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './Navbar Components/home/home.component';
import { LoginComponent } from './userDetails/login/login.component';
import { NavbarComponent } from './Navbar Components/navbar/navbar.component';
import { RegisterComponent } from './userDetails/register/register.component';
import { ForgotpasswordComponent } from './userDetails/forgotpassword/forgotpassword.component';
import { ServiceComponent } from './websiteServices/service/service.component';
import { DashboardComponent } from './userDetails/dashboard/dashboard.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment.development';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { VerifyEmailComponent } from './userDetails/verify-email/verify-email.component';
import { LoginButtonComponent } from './userDetails/login-button/login-button.component';
import { StartingComponent } from './starting/starting.component';
import { ContactComponent } from './Navbar Components/contact/contact.component';
import { EduInfoComponent } from './userDetails/edu-info/edu-info.component';
import { FamilyInfoComponent } from './userDetails/family-info/family-info.component';
import { UserInfoComponent } from './userDetails/user-info/user-info.component';
import { PersonalInfoComponent } from './userDetails/personal-info/personal-info.component';
import { About1Component } from './Navbar Components/about1/about1.component';
import { Service1Component } from './websiteServices/service1/service1.component';
import { Contact1Component } from './Navbar Components/contact1/contact1.component';
import { GroomInformationComponent } from './websiteServices/groom-information/groom-information.component';
import { HttpClientModule } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { withFetch } from '@angular/common/http';
import { ROUTES, RouterModule } from '@angular/router';
import { ResetPasswordComponent } from './userDetails/reset-password/reset-password.component';
import { AdminComponent } from './Admin Components/admin/admin.component';
import { LocationBookingComponent } from './websiteServices/location-booking/location-booking.component';
import { GroomsComponent } from './websiteServices/grooms/grooms.component';
import { BridesComponent } from './websiteServices/brides/brides.component';
import { BrideInformationComponent } from './websiteServices/bride-information/bride-information.component';
import { DifferentiatorComponent } from './websiteServices/differentiator/differentiator.component';
import { ChatComponent } from './websiteServices/chat/chat.component';
import { ContactDataComponent } from './Admin Components/contact-data/contact-data.component';
import { MessageDataComponent } from './Admin Components/message-data/message-data.component';
import { RegistrationDataComponent } from './Admin Components/registration-data/registration-data.component';
import { ProfileInfoComponent } from './Navbar Components/profile-info/profile-info.component';
import { SettingsPrivacyComponent } from './Navbar Components/settings-privacy/settings-privacy.component';
import { ChatDataComponent } from './Navbar Components/chat-data/chat-data.component';
import { LocationBookingDataComponent } from './Navbar Components/location-booking-data/location-booking-data.component';
import { ReplyformComponent } from './Admin Components/replyform/replyform.component';



@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ServiceComponent,
    DashboardComponent,
    VerifyEmailComponent,
    LoginButtonComponent,
    StartingComponent,
    ContactComponent,
    EduInfoComponent,
    FamilyInfoComponent,
    UserInfoComponent,
    PersonalInfoComponent,
    About1Component,
    Service1Component,
    Contact1Component,
    GroomInformationComponent,
    UserInfoComponent,
    ResetPasswordComponent,
    AdminComponent,
    LocationBookingComponent,
    GroomsComponent,
    BridesComponent,
    BrideInformationComponent,
    DifferentiatorComponent,
    ChatComponent,
    ContactDataComponent,
    MessageDataComponent,
    RegistrationDataComponent,
    ProfileInfoComponent,
    SettingsPrivacyComponent,
    ChatDataComponent,
    LocationBookingDataComponent,
    ReplyformComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    
  ], 
  providers: [
    HttpClientModule,
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
