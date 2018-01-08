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
var usersetting_service_1 = require("./usersetting.service");
var environment_1 = require("../../../environments/environment");
var account_service_1 = require("./../../../modules/useraccount/account.service");
var services_service_1 = require("./../../../modules/services/services.service");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var UserSettingComponent = (function () {
    function UserSettingComponent(fb, userSettingService, servicesService, userAccountService, router) {
        this.fb = fb;
        this.userSettingService = userSettingService;
        this.servicesService = servicesService;
        this.userAccountService = userAccountService;
        this.router = router;
        this.savebuttonText = "Save";
        this.removeUserId = 0;
        this.updatedUserId = 0;
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    UserSettingComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            firstName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            lastName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            emailAddress: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100), forms_1.Validators.email])],
        });
        this.LoadOrganizationUser();
        this.LoadCustomUsers();
        this.LoadPermission();
    };
    UserSettingComponent.prototype.LoadOrganizationUser = function () {
        var _this = this;
        this.userAccountService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            _this.users = data["results"];
        });
    };
    UserSettingComponent.prototype.LoadCustomUsers = function () {
        var _this = this;
        this.userSettingService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            _this.customusers = data["results"];
        });
    };
    UserSettingComponent.prototype.LoadPermission = function () {
        var _this = this;
        this.servicesService.getByCategory(apiUrl, "UserPermission").subscribe(function (data) {
            var obj = data["results"][0];
            _this.selectedPermissionId = obj["id"];
            _this.permission = data["results"];
        });
    };
    UserSettingComponent.prototype.LoadPermissionById = function (id) {
        var _this = this;
        this.servicesService.getByCategoryId(apiUrl, id, "UserPermission").subscribe(function (data) {
            var obj = data["results"][0];
            _this.selectedPermissionId = obj["id"];
        });
    };
    UserSettingComponent.prototype.ClearFields = function () {
        this.userForm = this.fb.group({
            firstName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            lastName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            emailAddress: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100), forms_1.Validators.email])],
        });
        this.savebuttonText = "Save";
        this.updatedUserId = 0;
        this.removeUserId = 0;
    };
    UserSettingComponent.prototype.Redirect = function () {
        this.router.navigate(['/usersettingdetail']);
    };
    UserSettingComponent.prototype.onClick = function (title, Id) {
        this.selectedPermissionId = Id;
    };
    UserSettingComponent.prototype.LoadUserById = function (userId) {
        var _this = this;
        this.savebuttonText = "Update";
        this.updatedUserId = userId;
        this.removeUserId = userId;
        this.userSettingService.getUserById(apiUrl, userId)
            .subscribe(function (data) {
            var obj = data["results"][0];
            _this.selectedPermissionId = obj["permissionID"];
            _this.userForm = _this.fb.group({
                firstName: [obj["firstName"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                lastName: [obj["firstName"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                emailAddress: [obj["emailAddress"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100), forms_1.Validators.email])],
            });
        });
    };
    UserSettingComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.organizationUser = {
            userId: this.updatedUserId,
            firstName: formData.controls["firstName"].value,
            lastName: formData.controls["lastName"].value,
            phoneNumber: '',
            emailAddress: formData.controls["emailAddress"].value,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            password: '',
            timeZoneId: null,
            currencyId: null,
            isDeleted: false,
            parentUserID: null,
            permissionID: this.selectedPermissionId,
            isInvitationAccepted: false
        };
        if (this.updatedUserId == 0) {
            this.userSettingService.post(apiUrl, this.organizationUser).subscribe(function (data) {
                _this.LoadCustomUsers();
            });
        }
        else {
            this.userSettingService.put(apiUrl, this.updatedUserId, this.organizationUser).subscribe(function (data) {
                _this.LoadCustomUsers();
            });
        }
        this.ClearFields();
    };
    return UserSettingComponent;
}());
UserSettingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'usersetting.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, usersetting_service_1.UserSettingService, services_service_1.ServicesService, account_service_1.UserAccountService, router_1.Router])
], UserSettingComponent);
exports.UserSettingComponent = UserSettingComponent;
//# sourceMappingURL=usersetting.component.js.map