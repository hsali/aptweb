"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var home_component_1 = require("./modules/home/home.component");
var user_component_1 = require("./modules/user/user.component");
var accountsetup_component_1 = require("./modules/user/accountsetup.component");
var openingtimes_component_1 = require("./modules/openingtimes/openingtimes.component");
var resources_component_1 = require("./modules/resources/resources.component");
var services_component_1 = require("./modules/services/services.component");
var dashboard_component_1 = require("./modules/dashboard/dashboard.component");
var login_component_1 = require("./modules/login/login.component");
var forgot_component_1 = require("./modules/forgot/forgot.component");
var reset_component_1 = require("./modules/reset/reset.component");
var logout_component_1 = require("./modules/logout/logout.component");
var customer_component_1 = require("./modules/customer/customer.component");
var appointment_component_1 = require("./modules/appointment/appointment.component");
var account_component_1 = require("./modules/useraccount/account.component");
var task_component_1 = require("./modules/task/task.component");
var asset_component_1 = require("./modules/asset/asset.component");
var profile_component_1 = require("./modules/profile/profile.component");
var general_component_1 = require("./modules/setting/general/general.component");
var customersetting_component_1 = require("./modules/setting/customer/customersetting.component");
var customersettingdetail_component_1 = require("./modules/setting/customer/customersettingdetail.component");
var usersetting_component_1 = require("./modules/setting/user/usersetting.component");
var usersettingdetail_component_1 = require("./modules/setting/user/usersettingdetail.component");
var emailsetting_component_1 = require("./modules/setting/email/emailsetting.component");
var emailsettingdetail_component_1 = require("./modules/setting/email/emailsettingdetail.component");
var customerdetail_component_1 = require("./modules/customer/customerdetail.component");
var smssetting_component_1 = require("./modules/setting/sms/smssetting.component");
var bookingquestion_component_1 = require("./modules/setting/bookingquestion/bookingquestion.component");
var bookingquestiondetail_component_1 = require("./modules/setting/bookingquestion/bookingquestiondetail.component");
var onlinebooking_component_1 = require("./modules/setting/onlinebooking/onlinebooking.component");
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    core_1.NgModule({
        imports: [
            router_1.RouterModule.forRoot([
                { path: '', component: home_component_1.HomeComponent },
                { path: 'registration', component: user_component_1.UserComponent },
                { path: 'accountsetup', component: accountsetup_component_1.AccountSetupComponent },
                { path: 'openingtimes', component: openingtimes_component_1.OpeningTimesComponent },
                { path: 'resources', component: resources_component_1.ResourcesComponent },
                { path: 'services', component: services_component_1.ServicesComponent },
                { path: 'login', component: login_component_1.LoginComponent },
                { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
                { path: 'forgot', component: forgot_component_1.ForgotComponent },
                { path: 'reset/:id', component: reset_component_1.ResetComponent },
                { path: 'customer', component: customer_component_1.CustomerComponent },
                { path: 'appointment', component: appointment_component_1.AppointmentComponent },
                { path: 'task', component: task_component_1.TaskComponent },
                { path: 'account', component: account_component_1.UserAccountComponent },
                { path: 'asset', component: asset_component_1.AssetComponent },
                { path: 'logout', component: logout_component_1.LogoutComponent },
                { path: 'profile', component: profile_component_1.ProfileComponent },
                { path: 'general', component: general_component_1.GeneralComponent },
                { path: 'customersetting', component: customersetting_component_1.CustomerSettingComponent },
                { path: 'customersettingdetail', component: customersettingdetail_component_1.CustomerSettingDetailComponent },
                { path: 'usersetting', component: usersetting_component_1.UserSettingComponent },
                { path: 'usersettingdetail', component: usersettingdetail_component_1.UserSettingDetailComponent },
                { path: 'emailsetting', component: emailsetting_component_1.EmailSettingComponent },
                { path: 'emailsettingdetail', component: emailsettingdetail_component_1.EmailSettingDetailComponent },
                { path: 'customerdetail', component: customerdetail_component_1.CustomerDetailComponent },
                { path: 'smssetting', component: smssetting_component_1.SMSSettingComponent },
                { path: 'onlinebookingsetting', component: onlinebooking_component_1.OnlineBookingSettingComponent },
                { path: 'bookingquestion', component: bookingquestion_component_1.BookingQuestionComponent },
                { path: 'bookingquestiondetail', component: bookingquestiondetail_component_1.BookingQuestionDetailComponent },
                { path: '', redirectTo: '', pathMatch: 'full' }
            ], { preloadingStrategy: router_1.PreloadAllModules })
        ],
        exports: [router_1.RouterModule]
    })
], AppRoutingModule);
exports.AppRoutingModule = AppRoutingModule;
//# sourceMappingURL=app.routing.js.map