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
var UserComponent = (function () {
    function UserComponent(fb, userService, router) {
        this.fb = fb;
        this.userService = userService;
        this.router = router;
        this.exist = false;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            organizationId: [''],
            firstName: [''],
            lastName: [''],
            companyName: [''],
            phoneNumber: [''],
            emailAddress: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100), forms_1.Validators.email])],
            password: [''],
            timeZoneId: [''],
            currencyId: [''],
            isDeleted: ['']
        });
    };
    UserComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.userService.get(apiUrl, formData.value['emailAddress']).subscribe(function (data) {
            if (data["results"][0]) {
                _this.exist = true;
                //wait 3 Seconds and hide already exit message.
                setTimeout(function () {
                    this.exist = false;
                }.bind(_this), 3000);
            }
            else {
                _this.userService.post(apiUrl, formData.value).subscribe(function (data) {
                    sessionStorage.setItem('organizationId', JSON.stringify(data["results"][0]));
                    sessionStorage.setItem('isMenuhidden', "true");
                    _this.router.navigate(['/accountsetup']);
                });
            }
        });
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'user.registration.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService, router_1.Router])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map