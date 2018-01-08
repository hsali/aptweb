import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/nav.component';
import { ModalComponent } from './shared/modal/modal.component';
import { LookupComponent } from './shared/lookup/lookup.component';
import { HomeComponent } from './modules/home/home.component';
import { ProductComponent } from './modules/products/product.component';
import { ProductService } from './modules/products/product.service';
import { UserComponent } from './modules/user/user.component';
import { AccountSetupComponent } from './modules/user/accountsetup.component';
import { OpeningTimesComponent } from './modules/openingtimes/openingtimes.component';
import { OpeningTimesService } from './modules/openingtimes/openingtimes.service';
import { ResourcesComponent } from './modules/resources/resources.component';
import { ResourcesService } from './modules/resources/resources.service';
import { ServicesComponent } from './modules/services/services.component';
import { ServicesService } from './modules/services/services.service';
import { UserService } from './modules/user/user.service';
import { LoginComponent } from './modules/login/login.component';
import { LoginService } from './modules/login/login.service';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { DashboardService } from './modules/dashboard/dashboard.service';
import { ForgotComponent } from './modules/forgot/forgot.component';
import { ForgotService } from './modules/forgot/forgot.service';
import { ResetComponent } from './modules/reset/reset.component';
import { ResetService } from './modules/reset/reset.service';
import { LogoutComponent } from './modules/logout/logout.component';
import { CustomerComponent } from './modules/customer/customer.component';
import { CustomerService } from './modules/customer/customer.service';
import { AppointmentComponent } from './modules/appointment/appointment.component';
import { AppointmentService } from './modules/appointment/appointment.service';
import { UserAccountComponent } from './modules/useraccount/account.component';
import { UserAccountService } from './modules/useraccount/account.service';
import { TaskComponent } from './modules/task/task.component';
import { TaskService } from './modules/task/task.service';
import { AssetComponent } from './modules/asset/asset.component';
import { AssetService } from './modules/asset/asset.service';
import { ProfileComponent } from './modules/profile/profile.component';
import { ProfileService } from './modules/profile/profile.service';
import { GeneralComponent } from './modules/setting/general/general.component';
import { GeneralService } from './modules/setting/general/general.service';
import { CustomerSettingComponent } from './modules/setting/customer/customersetting.component';
import { CustomerSettingService } from './modules/setting/customer/customersetting.service';
import { CustomerSettingDetailComponent } from './modules/setting/customer/customersettingdetail.component';
import { UserSettingComponent } from './modules/setting/user/usersetting.component';
import { UserSettingService } from './modules/setting/user/usersetting.service';
import { UserSettingDetailComponent } from './modules/setting/user/usersettingdetail.component';
import { EmailSettingComponent } from './modules/setting/email/emailsetting.component';
import { EmailSettingService } from './modules/setting/email/emailsetting.service';
import { EmailSettingDetailComponent } from './modules/setting/email/emailsettingdetail.component';
import { CustomerDetailComponent } from './modules/customer/customerdetail.component';
import { SMSSettingComponent } from './modules/setting/sms/smssetting.component';
import { SMSSettingService } from './modules/setting/sms/smssetting.service';
import { BookingQuestionComponent } from './modules/setting/bookingquestion/bookingquestion.component';
import { BookingQuestionService } from './modules/setting/bookingquestion/bookingquestion.service';
import { BookingQuestionDetailComponent } from './modules/setting/bookingquestion/bookingquestiondetail.component';
import { OnlineBookingSettingComponent } from './modules/setting/onlinebooking/onlinebooking.component';
import { OnlineBookingSettingService } from './modules/setting/onlinebooking/onlinebooking.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpModule
  ],
  declarations: [
    AppComponent,
    ModalComponent,
    HomeComponent,
    ProductComponent,
    LookupComponent,
    UserComponent,
    AccountSetupComponent,
    OpeningTimesComponent,
    ResourcesComponent,
    ServicesComponent,
    LoginComponent,
    DashboardComponent,
    ForgotComponent,
    ResetComponent,
    LogoutComponent,
    CustomerComponent,
    AppointmentComponent,
    UserAccountComponent,
    TaskComponent,
    AssetComponent,
    ProfileComponent,
    GeneralComponent,
    CustomerSettingComponent,
    CustomerSettingDetailComponent,
    UserSettingComponent,
    UserSettingDetailComponent,
    EmailSettingComponent,
    EmailSettingDetailComponent,
    CustomerDetailComponent,
    SMSSettingComponent,
    BookingQuestionComponent,
    BookingQuestionDetailComponent,
    OnlineBookingSettingComponent,
    NavbarComponent
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    ProductService,
    UserService,
    LoginService,
    DashboardService,
    ForgotService,
    OpeningTimesService,
    ServicesService,
    ResourcesService,
    CustomerService,
    AppointmentService,
    UserAccountService,
    ResetService,
    TaskService,
    ProfileService,
    GeneralService,
    CustomerSettingService,
    UserSettingService,
    AssetService,
    EmailSettingService,
    SMSSettingService,
    BookingQuestionService,
    OnlineBookingSettingService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }