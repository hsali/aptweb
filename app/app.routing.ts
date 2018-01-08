import { NgModule } from '@angular/core';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { ProductComponent } from './modules/products/product.component';
import { UserComponent } from './modules/user/user.component';
import { AccountSetupComponent } from './modules/user/accountsetup.component';
import { OpeningTimesComponent } from './modules/openingtimes/openingtimes.component';
import { ResourcesComponent } from './modules/resources/resources.component';
import { ServicesComponent } from './modules/services/services.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { LoginComponent } from './modules/login/login.component';
import { ForgotComponent } from './modules/forgot/forgot.component';
import { ResetComponent } from './modules/reset/reset.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { AppointmentComponent } from './modules/appointment/appointment.component';
import { UserAccountComponent } from './modules/useraccount/account.component';
import { TaskComponent } from './modules/task/task.component';
import { AssetComponent } from './modules/asset/asset.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { GeneralComponent } from './modules/setting/general/general.component';
import { CustomerSettingComponent } from './modules/setting/customer/customersetting.component';
import { CustomerSettingDetailComponent } from './modules/setting/customer/customersettingdetail.component';
import { UserSettingComponent } from './modules/setting/user/usersetting.component';
import { UserSettingDetailComponent } from './modules/setting/user/usersettingdetail.component';
import { EmailSettingComponent } from './modules/setting/email/emailsetting.component';
import { EmailSettingDetailComponent } from './modules/setting/email/emailsettingdetail.component';
import { CustomerDetailComponent } from './modules/customer/customerdetail.component';
import { SMSSettingComponent } from './modules/setting/sms/smssetting.component';
import { BookingQuestionComponent } from './modules/setting/bookingquestion/bookingquestion.component';
import { BookingQuestionDetailComponent } from './modules/setting/bookingquestion/bookingquestiondetail.component';
import { OnlineBookingSettingComponent } from './modules/setting/onlinebooking/onlinebooking.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'registration', component: UserComponent },
      { path: 'accountsetup', component: AccountSetupComponent },
      { path: 'openingtimes', component: OpeningTimesComponent },
      { path: 'resources', component: ResourcesComponent },
      { path: 'services', component: ServicesComponent },
      { path: 'login', component: LoginComponent},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'forgot', component: ForgotComponent },
      { path: 'reset/:id', component: ResetComponent },
      { path: 'customer', component: CustomerComponent },
      { path: 'appointment', component: AppointmentComponent },
      { path: 'task', component: TaskComponent },
      { path: 'account', component: UserAccountComponent },
      { path: 'asset', component: AssetComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'general', component: GeneralComponent },
      { path: 'customersetting', component: CustomerSettingComponent },
      { path: 'customersettingdetail', component: CustomerSettingDetailComponent },
      { path: 'usersetting', component: UserSettingComponent },
      { path: 'usersettingdetail', component: UserSettingDetailComponent },
      { path: 'emailsetting', component: EmailSettingComponent },
      { path: 'emailsettingdetail', component: EmailSettingDetailComponent },
      { path: 'customerdetail', component: CustomerDetailComponent },
      { path: 'smssetting', component: SMSSettingComponent },
      { path: 'onlinebookingsetting', component: OnlineBookingSettingComponent },
      { path: 'bookingquestion', component: BookingQuestionComponent },
      { path: 'bookingquestiondetail', component: BookingQuestionDetailComponent },
      { path: '', redirectTo: '', pathMatch: 'full' }
    ], { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }