"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var app_routing_1 = require("./app.routing");
var http_1 = require("@angular/http");
var app_component_1 = require("./app.component");
var nav_component_1 = require("./nav/nav.component");
var modal_component_1 = require("./shared/modal/modal.component");
var lookup_component_1 = require("./shared/lookup/lookup.component");
var home_component_1 = require("./modules/home/home.component");
var product_component_1 = require("./modules/products/product.component");
var product_service_1 = require("./modules/products/product.service");
var user_component_1 = require("./modules/user/user.component");
var accountsetup_component_1 = require("./modules/user/accountsetup.component");
var openingtimes_component_1 = require("./modules/openingtimes/openingtimes.component");
var openingtimes_service_1 = require("./modules/openingtimes/openingtimes.service");
var resources_component_1 = require("./modules/resources/resources.component");
var resources_service_1 = require("./modules/resources/resources.service");
var services_component_1 = require("./modules/services/services.component");
var services_service_1 = require("./modules/services/services.service");
var user_service_1 = require("./modules/user/user.service");
var login_component_1 = require("./modules/login/login.component");
var login_service_1 = require("./modules/login/login.service");
var dashboard_component_1 = require("./modules/dashboard/dashboard.component");
var dashboard_service_1 = require("./modules/dashboard/dashboard.service");
var forgot_component_1 = require("./modules/forgot/forgot.component");
var forgot_service_1 = require("./modules/forgot/forgot.service");
var reset_component_1 = require("./modules/reset/reset.component");
var reset_service_1 = require("./modules/reset/reset.service");
var logout_component_1 = require("./modules/logout/logout.component");
var customer_component_1 = require("./modules/customer/customer.component");
var customer_service_1 = require("./modules/customer/customer.service");
var appointment_component_1 = require("./modules/appointment/appointment.component");
var appointment_service_1 = require("./modules/appointment/appointment.service");
var account_component_1 = require("./modules/useraccount/account.component");
var account_service_1 = require("./modules/useraccount/account.service");
var task_component_1 = require("./modules/task/task.component");
var task_service_1 = require("./modules/task/task.service");
var asset_component_1 = require("./modules/asset/asset.component");
var asset_service_1 = require("./modules/asset/asset.service");
var profile_component_1 = require("./modules/profile/profile.component");
var profile_service_1 = require("./modules/profile/profile.service");
var general_component_1 = require("./modules/setting/general/general.component");
var general_service_1 = require("./modules/setting/general/general.service");
var customersetting_component_1 = require("./modules/setting/customer/customersetting.component");
var customersetting_service_1 = require("./modules/setting/customer/customersetting.service");
var customersettingdetail_component_1 = require("./modules/setting/customer/customersettingdetail.component");
var usersetting_component_1 = require("./modules/setting/user/usersetting.component");
var usersetting_service_1 = require("./modules/setting/user/usersetting.service");
var usersettingdetail_component_1 = require("./modules/setting/user/usersettingdetail.component");
var emailsetting_component_1 = require("./modules/setting/email/emailsetting.component");
var emailsetting_service_1 = require("./modules/setting/email/emailsetting.service");
var emailsettingdetail_component_1 = require("./modules/setting/email/emailsettingdetail.component");
var customerdetail_component_1 = require("./modules/customer/customerdetail.component");
var smssetting_component_1 = require("./modules/setting/sms/smssetting.component");
var smssetting_service_1 = require("./modules/setting/sms/smssetting.service");
var bookingquestion_component_1 = require("./modules/setting/bookingquestion/bookingquestion.component");
var bookingquestion_service_1 = require("./modules/setting/bookingquestion/bookingquestion.service");
var bookingquestiondetail_component_1 = require("./modules/setting/bookingquestion/bookingquestiondetail.component");
var onlinebooking_component_1 = require("./modules/setting/onlinebooking/onlinebooking.component");
var onlinebooking_service_1 = require("./modules/setting/onlinebooking/onlinebooking.service");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            forms_1.ReactiveFormsModule,
            app_routing_1.AppRoutingModule,
            http_1.HttpModule
        ],
        declarations: [
            app_component_1.AppComponent,
            modal_component_1.ModalComponent,
            home_component_1.HomeComponent,
            product_component_1.ProductComponent,
            lookup_component_1.LookupComponent,
            user_component_1.UserComponent,
            accountsetup_component_1.AccountSetupComponent,
            openingtimes_component_1.OpeningTimesComponent,
            resources_component_1.ResourcesComponent,
            services_component_1.ServicesComponent,
            login_component_1.LoginComponent,
            dashboard_component_1.DashboardComponent,
            forgot_component_1.ForgotComponent,
            reset_component_1.ResetComponent,
            logout_component_1.LogoutComponent,
            customer_component_1.CustomerComponent,
            appointment_component_1.AppointmentComponent,
            account_component_1.UserAccountComponent,
            task_component_1.TaskComponent,
            asset_component_1.AssetComponent,
            profile_component_1.ProfileComponent,
            general_component_1.GeneralComponent,
            customersetting_component_1.CustomerSettingComponent,
            customersettingdetail_component_1.CustomerSettingDetailComponent,
            usersetting_component_1.UserSettingComponent,
            usersettingdetail_component_1.UserSettingDetailComponent,
            emailsetting_component_1.EmailSettingComponent,
            emailsettingdetail_component_1.EmailSettingDetailComponent,
            customerdetail_component_1.CustomerDetailComponent,
            smssetting_component_1.SMSSettingComponent,
            bookingquestion_component_1.BookingQuestionComponent,
            bookingquestiondetail_component_1.BookingQuestionDetailComponent,
            onlinebooking_component_1.OnlineBookingSettingComponent,
            nav_component_1.NavbarComponent
        ],
        providers: [
            { provide: common_1.LocationStrategy, useClass: common_1.HashLocationStrategy },
            product_service_1.ProductService,
            user_service_1.UserService,
            login_service_1.LoginService,
            dashboard_service_1.DashboardService,
            forgot_service_1.ForgotService,
            openingtimes_service_1.OpeningTimesService,
            services_service_1.ServicesService,
            resources_service_1.ResourcesService,
            customer_service_1.CustomerService,
            appointment_service_1.AppointmentService,
            account_service_1.UserAccountService,
            reset_service_1.ResetService,
            task_service_1.TaskService,
            profile_service_1.ProfileService,
            general_service_1.GeneralService,
            customersetting_service_1.CustomerSettingService,
            usersetting_service_1.UserSettingService,
            asset_service_1.AssetService,
            emailsetting_service_1.EmailSettingService,
            smssetting_service_1.SMSSettingService,
            bookingquestion_service_1.BookingQuestionService,
            onlinebooking_service_1.OnlineBookingSettingService
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map