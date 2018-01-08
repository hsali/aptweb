"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var user_service_1 = require("./user.service");
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var AccountSetupComponent = (function () {
    function AccountSetupComponent(fb, userService, router) {
        this.fb = fb;
        this.userService = userService;
        this.router = router;
        this.isMenuhidden = false;
        if (sessionStorage.getItem("isMenuhidden") == "true") {
            this.isMenuhidden = true;
        }
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    AccountSetupComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            organizationId: [sessionStorage.getItem("organizationId")],
            firstName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            lastName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            companyName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            phoneNumber: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            emailAddress: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100), forms_1.Validators.email])],
            password: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
            timeZoneId: [''],
            currencyId: [''],
            isDeleted: ['']
        });
        this.LoadUser();
    };
    AccountSetupComponent.prototype.LoadUser = function () {
        var _this = this;
        this.userService.getEmailAddress(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            var obj = data["results"][0];
            _this.userForm.controls['emailAddress'].setValue(obj["emailAddress"]);
        });
    };
    AccountSetupComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.userService.put(apiUrl, Number(sessionStorage.getItem("organizationId")), formData.value).subscribe(function (data) {
            _this.router.navigate(['/openingtimes']);
        });
    };
    return AccountSetupComponent;
}());
AccountSetupComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user.accountsetup.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService, router_1.Router])
], AccountSetupComponent);
exports.AccountSetupComponent = AccountSetupComponent;
//# sourceMappingURL=accountsetup.component.js.map