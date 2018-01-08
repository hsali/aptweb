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
var customersetting_service_1 = require("./customersetting.service");
var environment_1 = require("../../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var CustomerSettingComponent = (function () {
    function CustomerSettingComponent(fb, customerSettingService, router) {
        this.fb = fb;
        this.customerSettingService = customerSettingService;
        this.router = router;
        this.removeCustomId = 0;
        this.updatedCustomId = 0;
        this.savebuttonText = "Save";
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    CustomerSettingComponent.prototype.ngOnInit = function () {
        this.ClearFields();
    };
    CustomerSettingComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.customfield = {
            customId: this.updatedCustomId,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            fieldName: formData.controls["fieldName"].value,
            isRequired: formData.controls["isRequired"].value,
            isDeleted: false
        };
        if (this.updatedCustomId == 0) {
            this.customerSettingService.post(apiUrl, this.customfield).subscribe(function (data) {
                _this.LoadCustomSetting();
            });
        }
        else {
            this.customerSettingService.put(apiUrl, this.updatedCustomId, this.customfield).subscribe(function (data) {
                _this.LoadCustomSetting();
            });
        }
        this.ClearFields();
    };
    CustomerSettingComponent.prototype.LoadCustomSetting = function () {
        var _this = this;
        this.customerSettingService.get(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            _this.customfields = data["results"];
        });
    };
    CustomerSettingComponent.prototype.LoadCustomFieldById = function (customId) {
        var _this = this;
        this.savebuttonText = "Update";
        this.updatedCustomId = customId;
        this.removeCustomId = 0;
        this.customerSettingService.getCustomFieldById(apiUrl, customId)
            .subscribe(function (data) {
            var obj = data["results"][0];
            _this.userForm = _this.fb.group({
                fieldName: [obj["fieldName"]],
                isRequired: [obj["isRequired"]]
            });
        });
    };
    CustomerSettingComponent.prototype.CustomFieldIdForDelete = function (customId) {
        this.removeCustomId = customId;
    };
    CustomerSettingComponent.prototype.RemoveCustomField = function () {
        var _this = this;
        this.customerSettingService.delete(apiUrl, this.removeCustomId).subscribe(function (data) {
            _this.LoadCustomSetting();
            _this.ClearFields();
        });
    };
    CustomerSettingComponent.prototype.ClearFields = function () {
        this.userForm = this.fb.group({
            fieldName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            isRequired: [false]
        });
        this.savebuttonText = "Save";
        this.removeCustomId = 0;
        this.updatedCustomId = 0;
        this.LoadCustomSetting();
    };
    CustomerSettingComponent.prototype.Redirect = function () {
        this.router.navigate(['/customersettingdetail']);
    };
    return CustomerSettingComponent;
}());
CustomerSettingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'customersetting.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, customersetting_service_1.CustomerSettingService, router_1.Router])
], CustomerSettingComponent);
exports.CustomerSettingComponent = CustomerSettingComponent;
//# sourceMappingURL=customersetting.component.js.map