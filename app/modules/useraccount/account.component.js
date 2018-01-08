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
var account_service_1 = require("./account.service");
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var UserAccountComponent = (function () {
    function UserAccountComponent(fb, userAccountService, router) {
        this.fb = fb;
        this.userAccountService = userAccountService;
        this.router = router;
        this.isSuccessfulMessage = false;
        this.isPasswordMatch = true;
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    UserAccountComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            firstName: ['', forms_1.Validators.required],
            lastName: ['', forms_1.Validators.required],
            emailAddress: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
            confirmPassword: ['', forms_1.Validators.required],
        });
        this.LoadUser();
        this.isSuccessfulMessage = false;
        this.isPasswordMatch = true;
    };
    UserAccountComponent.prototype.LoadUser = function () {
        var _this = this;
        this.userAccountService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            var obj = data["results"][0];
            _this.userForm.controls['firstName'].setValue(obj["firstName"]);
            _this.userForm.controls['lastName'].setValue(obj["lastName"]);
            _this.userForm.controls['emailAddress'].setValue(obj["emailAddress"]);
        });
    };
    UserAccountComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        var uniqueId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
        if (formData.value['password'].trim() != formData.value['confirmPassword'].trim()) {
            this.isPasswordMatch = false;
            this.isSuccessfulMessage = false;
        }
        else {
            this.userAccountService.put(apiUrl, Number(sessionStorage.getItem("organizationId")), formData.value['firstName'], formData.value['lastName'], formData.value['password']).subscribe(function (data) {
                _this.isSuccessfulMessage = true;
                _this.isPasswordMatch = true;
            });
        }
    };
    return UserAccountComponent;
}());
UserAccountComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user.account.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, account_service_1.UserAccountService, router_1.Router])
], UserAccountComponent);
exports.UserAccountComponent = UserAccountComponent;
//# sourceMappingURL=account.component.js.map