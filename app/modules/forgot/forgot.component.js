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
var forgot_service_1 = require("./forgot.service");
var environment_1 = require("../../environments/environment");
var apiUrl = environment_1.environment.apiUrl;
var ForgotComponent = (function () {
    function ForgotComponent(fb, forgotService) {
        this.fb = fb;
        this.forgotService = forgotService;
        this.isEmailSendMessage = false;
    }
    ForgotComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            emailAddress: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100), forms_1.Validators.email])],
        });
    };
    ForgotComponent.prototype.onSubmit = function (formData) {
        this.forgotService.put(apiUrl, formData.value['emailAddress']).subscribe(function (data) { });
        this.isEmailSendMessage = true;
    };
    return ForgotComponent;
}());
ForgotComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'forgot.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, forgot_service_1.ForgotService])
], ForgotComponent);
exports.ForgotComponent = ForgotComponent;
//# sourceMappingURL=forgot.component.js.map