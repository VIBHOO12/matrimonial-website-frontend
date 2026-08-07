import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './userDetails/login/login.component';
import { RegisterComponent } from './userDetails/register/register.component';
import { HomeComponent } from './Navbar Components/home/home.component';
import { NavbarComponent } from './Navbar Components/navbar/navbar.component';
import { AboutComponent } from './Navbar Components/about/about.component';
import { ForgotpasswordComponent } from './userDetails/forgotpassword/forgotpassword.component';
import { ServiceComponent } from './websiteServices/service/service.component';
import { environment } from '../environments/environment.development';
import { VerifyEmailComponent } from './userDetails/verify-email/verify-email.component';
import { StartingComponent } from './starting/starting.component';
import { LoginButtonComponent } from './userDetails/login-button/login-button.component';
import { UserInfoComponent } from './userDetails/user-info/user-info.component';
import { PersonalInfoComponent } from './userDetails/personal-info/personal-info.component';
import { EduInfoComponent } from './userDetails/edu-info/edu-info.component';
import { FamilyInfoComponent } from './userDetails/family-info/family-info.component';
import { ContactComponent } from './Navbar Components/contact/contact.component';
import { About1Component } from './Navbar Components/about1/about1.component';
import { Service1Component } from './websiteServices/service1/service1.component';
import { Contact1Component } from './Navbar Components/contact1/contact1.component';
import { GroomInformationComponent } from './websiteServices/groom-information/groom-information.component';
import { ResetPasswordComponent } from './userDetails/reset-password/reset-password.component';
import { AdminComponent } from './Admin Components/admin/admin.component';
import { LocationBookingComponent } from './websiteServices/location-booking/location-booking.component';
import { GroomsComponent } from './websiteServices/grooms/grooms.component';
import { BridesComponent } from './websiteServices/brides/brides.component';
import { BrideInformationComponent } from './websiteServices/bride-information/bride-information.component';
import { DifferentiatorComponent } from './websiteServices/differentiator/differentiator.component';
import { ChatComponent } from './websiteServices/chat/chat.component';
import { MessageDataComponent } from './Admin Components/message-data/message-data.component';
import { ContactDataComponent } from './Admin Components/contact-data/contact-data.component';
import { RegistrationDataComponent } from './Admin Components/registration-data/registration-data.component';
import { authGuard } from './userDetails/guards/auth.guard';
import { ProfileInfoComponent } from './Navbar Components/profile-info/profile-info.component';
import { SettingsPrivacyComponent } from './Navbar Components/settings-privacy/settings-privacy.component';
import { ChatDataComponent } from './Navbar Components/chat-data/chat-data.component';
import { LocationBookingDataComponent } from './Navbar Components/location-booking-data/location-booking-data.component';
import { ReplyformComponent } from './Admin Components/replyform/replyform.component';
const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: LoginButtonComponent },
  { path: 'home', component: HomeComponent , canActivate: [authGuard]},
  { path: 'navbar', component: NavbarComponent , canActivate: [authGuard]},
  { path: 'about', component: AboutComponent , canActivate: [authGuard]},
  { path: 'forgotpassword', component: ForgotpasswordComponent },
  { path : 'about1' , component : About1Component},
  { path : 'service1' , component : Service1Component},
  { path : 'contact1' , component : Contact1Component},
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'service', component: ServiceComponent , canActivate: [authGuard]},
  { path: 'user/:userName', component: UserInfoComponent },
  { path: 'personal/:userName', component: PersonalInfoComponent },
  { path: 'edu/:userName', component: EduInfoComponent },
  { path: 'family/:userName', component: FamilyInfoComponent },
  { path: 'grooms/groom-info', component: GroomInformationComponent },
  { path: 'contact', component: ContactComponent , canActivate: [authGuard]},
  { path: 'reset/:userName', component: ResetPasswordComponent},
  { path: 'login', redirectTo: '/login', pathMatch: 'full' },
  { path: 'grooms', component: GroomsComponent, canActivate: [authGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [authGuard]},
  { path: 'location-booking', component: LocationBookingComponent, canActivate: [authGuard]},
  { path: 'brides', component: BridesComponent, canActivate: [authGuard]},
  { path: 'brides/bride-info', component: BrideInformationComponent, canActivate: [authGuard]},
  { path: 'page', component: DifferentiatorComponent, canActivate: [authGuard]},
  { path: 'chat', component: ChatComponent, canActivate: [authGuard]},
  { path: 'message', component: MessageDataComponent, canActivate: [authGuard]},
  { path: 'admin/contactinfo', component: ContactDataComponent, canActivate: [authGuard]},
  { path: 'admin/registrationinfo', component: RegistrationDataComponent, canActivate: [authGuard]},
  { path: 'profile', component: ProfileInfoComponent, canActivate: [authGuard]},
  { path: 'settings', component: SettingsPrivacyComponent, canActivate: [authGuard]},
  { path: 'chatdata', component: ChatDataComponent, canActivate: [authGuard]},
  { path: 'bookings', component: LocationBookingDataComponent, canActivate: [authGuard]},
  { path: 'reply', component: ReplyformComponent, canActivate: [authGuard]}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
