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
var services_service_1 = require("./services.service");
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var ServicesComponent = (function () {
    function ServicesComponent(fb, servicesService, router) {
        this.fb = fb;
        this.servicesService = servicesService;
        this.router = router;
        this.removeServiceId = 0;
        this.updatedServiceId = 0;
        this.savebuttonText = "Save";
        this.price = "0";
        this.isPriceOnApplication = false;
        this.isCustomerSupport = false;
        this.isMenuhidden = false;
        if (sessionStorage.getItem("isMenuhidden") == "true") {
            this.isMenuhidden = true;
        }
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
        this.LoadServices();
    }
    ServicesComponent.prototype.ngOnInit = function () {
        this.ClearFields();
    };
    ServicesComponent.prototype.LoadPermission = function () {
        var _this = this;
        this.servicesService.getByCategory(apiUrl, "OnlinePermission").subscribe(function (data) {
            var obj = data["results"][0];
            _this.selectedPermissionId = obj["id"];
            _this.permissionTitle = obj["title"];
            _this.permission = data["results"];
        });
    };
    ServicesComponent.prototype.LoadPermissionById = function (id) {
        var _this = this;
        this.servicesService.getByCategoryId(apiUrl, id, "OnlinePermission").subscribe(function (data) {
            var obj = data["results"][0];
            _this.selectedPermissionId = obj["id"];
            _this.permissionTitle = obj["title"];
        });
    };
    ServicesComponent.prototype.onClick = function (title, Id) {
        this.permissionTitle = title;
        this.selectedPermissionId = Id;
    };
    ServicesComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.service = {
            serviceId: this.updatedServiceId,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            serviceName: formData.controls["ServiceName"].value,
            duration: formData.controls["Duration"].value,
            durationType: formData.controls["DurationType"].value,
            isPriceOfApplication: formData.controls["ckPriceOnApplication"].value,
            price: (formData.controls["ckPriceOnApplication"].value) ? 0 : formData.controls["Price"].value,
            permissionId: this.selectedPermissionId,
            isCustomerSupport: formData.controls["ckCustomerSupport"].value,
            occupancy: formData.controls["Occupancy"].value,
            categoryId: null,
            serviceDescription: '',
            offerPrice: null,
            bufferTimeBefore: null,
            bufferTimeAfter: null,
            isOnlineGroupBooking: false,
            isCustomBookableTime: false,
            isDeleted: false
        };
        if (this.updatedServiceId == 0) {
            this.servicesService.postServices(apiUrl, this.service).subscribe(function (data) {
                _this.LoadServices();
            });
        }
        else {
            this.servicesService.putServices(apiUrl, this.updatedServiceId, this.service).subscribe(function (data) {
                _this.LoadServices();
            });
        }
        this.ClearFields();
    };
    ServicesComponent.prototype.LoadServices = function () {
        var _this = this;
        this.servicesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            console.log(data);
            _this.services = data["results"];
        });
    };
    ServicesComponent.prototype.LoadServiceById = function (serviceId) {
        var _this = this;
        this.savebuttonText = "Update";
        this.updatedServiceId = serviceId;
        this.removeServiceId = 0;
        this.servicesService.getServiceById(apiUrl, serviceId)
            .subscribe(function (data) {
            console.log(data);
            var obj = data["results"][0];
            if (obj["isPriceOfApplication"] == false) {
                _this.price = "0";
                _this.isPriceOnApplication = false;
            }
            else {
                _this.price = "POA";
                _this.isPriceOnApplication = true;
            }
            _this.userForm = _this.fb.group({
                ServiceName: [obj["serviceName"]],
                Duration: [obj["duration"]],
                DurationType: [obj["durationType"]],
                Price: [obj["price"]],
                ckPriceOnApplication: [obj["isPriceOfApplication"]],
                ckCustomerSupport: [obj["isCustomerSupport"]],
                Occupancy: [obj["occupancy"]]
            });
            _this.isCustomerSupport = obj["isCustomerSupport"];
            _this.LoadPermissionById(obj["permissionId"]);
        });
    };
    ServicesComponent.prototype.CloneServiceById = function (serviceId) {
        var _this = this;
        this.savebuttonText = "Save";
        this.updatedServiceId = 0;
        this.removeServiceId = 0;
        this.servicesService.getServiceById(apiUrl, serviceId)
            .subscribe(function (data) {
            console.log(data);
            var obj = data["results"][0];
            var copyServiceName = "Copy of " + obj["serviceName"];
            _this.userForm = _this.fb.group({
                ServiceName: [copyServiceName],
                Duration: [obj["duration"]],
                DurationType: [obj["durationType"]],
                Price: [obj["price"]],
                ckPriceOnApplication: [obj["isPriceOfApplication"]],
                ckCustomerSupport: [obj["isCustomerSupport"]],
                Occupancy: [obj["occupancy"]]
            });
            _this.isCustomerSupport = obj["isCustomerSupport"];
            _this.LoadPermissionById(obj["permissionId"]);
        });
    };
    ServicesComponent.prototype.ServiceIdForDelete = function (serviceId) {
        this.removeServiceId = serviceId;
        console.log(this.removeServiceId);
    };
    ServicesComponent.prototype.RemoveService = function () {
        var _this = this;
        this.servicesService.deleteServices(apiUrl, this.removeServiceId).subscribe(function (data) {
            _this.LoadServices();
            _this.ClearFields();
        });
    };
    ServicesComponent.prototype.ChangePrice = function (event) {
        if (!event.target.checked) {
            this.price = "0";
            this.isPriceOnApplication = false;
        }
        else {
            this.price = "POA";
            this.isPriceOnApplication = true;
        }
    };
    ServicesComponent.prototype.ChangeCustomerSupport = function (event) {
        if (!event.target.checked) {
            this.isCustomerSupport = false;
        }
        else {
            this.isCustomerSupport = true;
        }
    };
    ServicesComponent.prototype.ClearFields = function () {
        this.userForm = this.fb.group({
            ServiceName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            Duration: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(2)])],
            DurationType: ['Minutes'],
            Price: ['0'],
            ckPriceOnApplication: [false],
            ckCustomerSupport: [false],
            Occupancy: ['1']
        });
        this.savebuttonText = "Save";
        this.isCustomerSupport = false;
        this.isPriceOnApplication = false;
        this.price = "0";
        this.updatedServiceId = 0;
        this.removeServiceId = 0;
        this.LoadPermission();
    };
    ServicesComponent.prototype.Redirect = function () {
        this.router.navigate(['/resources']);
    };
    return ServicesComponent;
}());
ServicesComponent = __decorate([
    core_1.Component({
        selector: 'services-component',
        moduleId: module.id,
        templateUrl: 'services.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, services_service_1.ServicesService, router_1.Router])
], ServicesComponent);
exports.ServicesComponent = ServicesComponent;
//# sourceMappingURL=services.component.js.map