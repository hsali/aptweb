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
var login_service_1 = require("./login.service");
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var LoginComponent = (function () {
    function LoginComponent(fb, loginService, router) {
        this.fb = fb;
        this.loginService = loginService;
        this.router = router;
        this.isValidLogin = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            emailAddress: ['', forms_1.Validators.required],
            password: ['', forms_1.Validators.required],
        });
    };
    LoginComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.loginService.get(apiUrl, formData.value['emailAddress'], formData.value['password']).subscribe(function (data) {
            if (data["results"][0]) {
                sessionStorage.setItem('organizationId', JSON.stringify(data["results"][0]));
                sessionStorage.setItem('isMenuhidden', "false");
                _this.router.navigate(['/appointment']);
            }
            else {
                _this.isValidLogin = true;
                //wait 3 Seconds and hide invalid login message.
                setTimeout(function () {
                    this.isValidLogin = false;
                }.bind(_this), 3000);
            }
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'login.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, login_service_1.LoginService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map