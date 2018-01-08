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
var resources_service_1 = require("./resources.service");
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var ResourcesComponent = (function () {
    function ResourcesComponent(fb, resourcesService, router) {
        this.fb = fb;
        this.resourcesService = resourcesService;
        this.router = router;
        this.selectedServiceIds = [];
        this.removeResourceId = 0;
        this.updatedResourceId = 0;
        this.isCheckAll = false;
        this.savebuttonText = "Save";
        this.isMenuhidden = false;
        if (sessionStorage.getItem("isMenuhidden") == "true") {
            this.isMenuhidden = true;
        }
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
        this.LoadResources();
    }
    ResourcesComponent.prototype.ngOnInit = function () {
        this.ClearFields();
    };
    ResourcesComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        console.log(this.selectedServiceIds);
        this.resource = {
            resourceId: this.updatedResourceId,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            resourceName: formData.controls["ResourceName"].value,
            contactName: '',
            emailAddress: '',
            isSendConfirmationEmail: false,
            houseNo: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            postcode: '',
            color: '',
            isDeleted: false
        };
        if (this.updatedResourceId == 0) {
            this.resourcesService.postResources(apiUrl, this.resource).subscribe(function (data) {
                var obj = data["results"][0];
                for (var i = 0; i < _this.selectedServiceIds.length; i++) {
                    _this.serviceResource = {
                        serviceResourceId: 0,
                        resourceId: obj,
                        serviceId: _this.selectedServiceIds[i],
                        resourceName: '',
                        serviceName: '',
                        isDeleted: false
                    };
                    _this.resourcesService.postServiceResources(apiUrl, _this.serviceResource).subscribe(function (data) {
                        _this.LoadResources();
                    });
                    _this.LoadResources();
                }
            });
        }
        else {
            //Mark all resources Services to removed.
            this.resourcesService.post(apiUrl, this.updatedResourceId).subscribe(function (data) {
                _this.resourcesService.putResources(apiUrl, _this.updatedResourceId, _this.resource).subscribe(function (data) {
                    for (var i = 0; i < _this.selectedServiceIds.length; i++) {
                        _this.serviceResource = {
                            serviceResourceId: 0,
                            resourceId: _this.updatedResourceId,
                            serviceId: _this.selectedServiceIds[i],
                            resourceName: '',
                            serviceName: '',
                            isDeleted: false
                        };
                        _this.resourcesService.postServiceResources(apiUrl, _this.serviceResource).subscribe(function (data) {
                            _this.LoadResources();
                        });
                    }
                    _this.LoadResources();
                });
            });
        }
        this.serviceResources = null;
        this.ClearFields();
    };
    ResourcesComponent.prototype.LoadServices = function () {
        var _this = this;
        this.resourcesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            _this.services = data["results"];
        });
    };
    ResourcesComponent.prototype.LoadResources = function () {
        var _this = this;
        this.resourcesService.getResources(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            _this.resources = data["results"];
        });
    };
    ResourcesComponent.prototype.LoadResourceById = function (resourceId) {
        var _this = this;
        this.serviceResources = null;
        this.selectedServiceIds = [];
        this.isCheckAll = false;
        this.LoadServices();
        this.savebuttonText = "Update";
        this.updatedResourceId = resourceId;
        this.removeResourceId = 0;
        this.resourcesService.getResourceById(apiUrl, resourceId)
            .subscribe(function (data) {
            var obj = data["results"][0];
            _this.serviceResources = obj["serviceresource"];
            _this.selectedServiceIds = [];
            for (var i = 0; i < obj["serviceresource"].length; i++) {
                _this.selectedServiceIds.push(obj["serviceresource"][i]["serviceId"]);
            }
            _this.userForm = _this.fb.group({
                ResourceName: [obj["resourceName"]],
            });
        });
        //Logic for populating Services in mention in isServiceChecked function.
    };
    ResourcesComponent.prototype.clearServices = function () {
        this.serviceResources = null;
        this.selectedServiceIds = [];
        this.isCheckAll = false;
    };
    ResourcesComponent.prototype.isServiceChecked = function (serviceId) {
        if (this.serviceResources != null) {
            if (this.serviceResources.find(function (d) { return d.serviceId === serviceId && d.isDeleted == false; })) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            return false;
        }
    };
    ResourcesComponent.prototype.CloneResourceById = function (resourceId) {
        var _this = this;
        this.selectedServiceIds = [];
        this.isCheckAll = false;
        this.savebuttonText = "Save";
        this.updatedResourceId = 0;
        this.removeResourceId = 0;
        this.resourcesService.getResourceById(apiUrl, resourceId)
            .subscribe(function (data) {
            var obj = data["results"][0];
            _this.serviceResources = obj["serviceresource"];
            for (var i = 0; i < obj["serviceresource"].length; i++) {
                _this.selectedServiceIds.push(obj["serviceresource"][i]["serviceId"]);
            }
            var copyResourceName = "Copy of " + obj["resourceName"];
            _this.userForm = _this.fb.group({
                ResourceName: [copyResourceName]
            });
        });
        //Logic for populating Services in mention in isServiceChecked function.
    };
    ResourcesComponent.prototype.ServiceIdForDelete = function (resourceId) {
        this.removeResourceId = resourceId;
    };
    ResourcesComponent.prototype.RemoveResource = function () {
        var _this = this;
        this.resourcesService.deleteResources(apiUrl, this.removeResourceId).subscribe(function (data) {
            _this.LoadResources();
            _this.ClearFields();
        });
    };
    ResourcesComponent.prototype.ClearFields = function () {
        this.userForm = this.fb.group({
            ResourceName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])]
        });
        this.savebuttonText = "Save";
        this.removeResourceId = 0;
        this.LoadServices();
    };
    ResourcesComponent.prototype.CheckAll = function () {
        var _this = this;
        this.isCheckAll = true;
        this.selectedServiceIds = [];
        this.resourcesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            for (var i = 0; i < data["results"].length; i++) {
                _this.selectedServiceIds.push(data["results"][i]["serviceId"]);
            }
            console.log(_this.selectedServiceIds);
        });
    };
    ResourcesComponent.prototype.UncheckAll = function () {
        this.selectedServiceIds = [];
        this.isCheckAll = false;
        this.serviceResources = null;
        this.LoadServices();
    };
    ResourcesComponent.prototype.onChange = function (serviceId, event) {
        //this.isCheckAll = false;
        if (!event.target.checked) {
            if (this.selectedServiceIds.find(function (d) { return d === serviceId; })) {
                var index = this.selectedServiceIds.findIndex(function (d) { return d == serviceId; });
                this.selectedServiceIds.splice(index, 1);
            }
        }
        else {
            if (!this.selectedServiceIds.find(function (d) { return d === serviceId; })) {
                this.selectedServiceIds.push(serviceId);
            }
        }
        console.log(this.selectedServiceIds);
    };
    ResourcesComponent.prototype.Redirect = function () {
        sessionStorage.setItem('isMenuhidden', "false");
        this.router.navigate(['/appointment']);
    };
    return ResourcesComponent;
}());
ResourcesComponent = __decorate([
    core_1.Component({
        selector: 'resources-component',
        moduleId: module.id,
        templateUrl: 'resources.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, resources_service_1.ResourcesService, router_1.Router])
], ResourcesComponent);
exports.ResourcesComponent = ResourcesComponent;
//# sourceMappingURL=resources.component.js.map