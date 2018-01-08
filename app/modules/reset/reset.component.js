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
var reset_service_1 = require("./reset.service");
var environment_1 = require("../../environments/environment");
var apiUrl = environment_1.environment.apiUrl;
var ResetComponent = (function () {
    function ResetComponent(fb, resetService) {
        this.fb = fb;
        this.resetService = resetService;
        this.isLinkExpired = false;
        this.isReset = false;
        this.isPasswordMatch = true;
        this.get();
    }
    ResetComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            password: ['', forms_1.Validators.required],
            confirmPassword: ['', forms_1.Validators.required],
        });
    };
    ResetComponent.prototype.get = function () {
        var _this = this;
        var uniqueId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
        this.resetService.get(apiUrl, uniqueId).subscribe(function (data) {
            if (data["results"][0]) {
                //Unique Id exist
                _this.isLinkExpired = false;
                _this.isReset = false;
            }
            else {
                //Link has been expired.
                _this.isLinkExpired = true;
                _this.isReset = false;
            }
        });
    };
    ResetComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        var uniqueId = window.location.href.substr(window.location.href.lastIndexOf('/') + 1);
        if (formData.value['password'].trim() != formData.value['confirmPassword'].trim()) {
            this.isPasswordMatch = false;
        }
        else {
            this.resetService.put(apiUrl, uniqueId, formData.value['password']).subscribe(function (data) {
                _this.isReset = true;
                _this.isLinkExpired = false;
                _this.isPasswordMatch = true;
            });
        }
    };
    return ResetComponent;
}());
ResetComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'reset.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, reset_service_1.ResetService])
], ResetComponent);
exports.ResetComponent = ResetComponent;
//# sourceMappingURL=reset.component.js.map