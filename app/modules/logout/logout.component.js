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
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var LogoutComponent = (function () {
    function LogoutComponent(fb, router) {
        this.fb = fb;
        this.router = router;
        this.logout();
    }
    LogoutComponent.prototype.logout = function () {
        sessionStorage.removeItem('organizationId');
        sessionStorage.removeItem('isMenuhidden');
        this.router.navigate(['']);
    };
    return LogoutComponent;
}());
LogoutComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        template: ''
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, router_1.Router])
], LogoutComponent);
exports.LogoutComponent = LogoutComponent;
//# sourceMappingURL=logout.component.js.map