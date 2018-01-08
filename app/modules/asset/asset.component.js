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
var asset_service_1 = require("./asset.service");
var resources_service_1 = require("../../modules/resources/resources.service");
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var AssetComponent = (function () {
    function AssetComponent(fb, assetService, resourcesService, router) {
        this.fb = fb;
        this.assetService = assetService;
        this.resourcesService = resourcesService;
        this.router = router;
        this.selectedServiceIds = [];
        this.savebuttonText = "Save";
        this.removeAssetId = 0;
        this.updatedAssetId = 0;
        this.isCheckAll = false;
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
        this.LoadAssets();
    }
    AssetComponent.prototype.ngOnInit = function () {
        this.ClearFields();
    };
    AssetComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.asset = {
            assetId: this.updatedAssetId,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            name: formData.controls["name"].value,
            quantity: formData.controls["quantity"].value,
            isDeleted: false
        };
        if (this.updatedAssetId == 0) {
            this.assetService.postAssets(apiUrl, this.asset).subscribe(function (data) {
                var obj = data["results"][0];
                for (var i = 0; i < _this.selectedServiceIds.length; i++) {
                    _this.assetservice = {
                        assetserviceId: 0,
                        assetId: obj,
                        serviceId: _this.selectedServiceIds[i],
                        isDeleted: false
                    };
                    _this.assetService.postAssetServices(apiUrl, _this.assetservice).subscribe(function (data) {
                        _this.LoadAssets();
                    });
                    _this.LoadAssets();
                }
            });
        }
        else {
            //Mark all asset Services to removed.
            this.assetService.post(apiUrl, this.updatedAssetId).subscribe(function (data) {
                _this.assetService.putAssets(apiUrl, _this.updatedAssetId, _this.asset).subscribe(function (data) {
                    for (var i = 0; i < _this.selectedServiceIds.length; i++) {
                        _this.assetservice = {
                            assetserviceId: 0,
                            assetId: _this.updatedAssetId,
                            serviceId: _this.selectedServiceIds[i],
                            isDeleted: false
                        };
                        _this.assetService.postAssetServices(apiUrl, _this.assetservice).subscribe(function (data) {
                            _this.LoadAssets();
                        });
                    }
                    _this.LoadAssets();
                });
            });
        }
        this.assetservices = null;
        this.ClearFields();
    };
    AssetComponent.prototype.LoadServices = function () {
        var _this = this;
        this.resourcesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            _this.services = data["results"];
        });
    };
    AssetComponent.prototype.LoadAssets = function () {
        var _this = this;
        this.assetService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            _this.assets = data["results"];
            console.log(data["results"]);
        });
    };
    AssetComponent.prototype.ClearFields = function () {
        this.userForm = this.fb.group({
            name: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            quantity: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(7)])],
        });
        this.savebuttonText = "Save";
        this.removeAssetId = 0;
        this.LoadServices();
    };
    AssetComponent.prototype.isServiceChecked = function (serviceId) {
        if (this.assetservices != null) {
            if (this.assetservices.find(function (d) { return d.serviceId === serviceId && d.isDeleted == false; })) {
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
    AssetComponent.prototype.LoadAssetById = function (assetId) {
        var _this = this;
        this.assetservices = null;
        this.selectedServiceIds = [];
        this.isCheckAll = false;
        this.savebuttonText = "Update";
        this.updatedAssetId = assetId;
        this.removeAssetId = 0;
        this.LoadServices();
        this.assetService.getAssetById(apiUrl, assetId)
            .subscribe(function (data) {
            console.log(data);
            var obj = data["results"][0];
            _this.assetservices = obj["assetservice"];
            _this.selectedServiceIds = [];
            for (var i = 0; i < obj["assetservice"].length; i++) {
                _this.selectedServiceIds.push(obj["assetservice"][i]["serviceId"]);
            }
            _this.userForm = _this.fb.group({
                name: [obj["name"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                quantity: [obj["quantity"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(7)])]
            });
        });
    };
    AssetComponent.prototype.CheckAll = function () {
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
    AssetComponent.prototype.UncheckAll = function () {
        this.selectedServiceIds = [];
        this.isCheckAll = false;
        this.assetservices = null;
        this.LoadServices();
    };
    AssetComponent.prototype.onChange = function (serviceId, event) {
        if (!event.target.checked) {
            if (this.selectedServiceIds.find(function (d) { return d === serviceId; })) {
                var index = this.selectedServiceIds.findIndex(function (d) { return d == serviceId; });
                this.selectedServiceIds.splice(index, 1);
            }
            console.log("remove it" + serviceId);
        }
        else {
            if (!this.selectedServiceIds.find(function (d) { return d === serviceId; })) {
                this.selectedServiceIds.push(serviceId);
                console.log("add it" + serviceId);
            }
        }
        console.log(this.selectedServiceIds);
    };
    AssetComponent.prototype.AssetIdForDelete = function (assetId) {
        this.removeAssetId = assetId;
        console.log(this.removeAssetId);
    };
    AssetComponent.prototype.RemoveAsset = function () {
        var _this = this;
        this.assetService.delete(apiUrl, this.removeAssetId).subscribe(function (data) {
            _this.LoadAssets();
            _this.ClearFields();
        });
    };
    return AssetComponent;
}());
AssetComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'asset.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, asset_service_1.AssetService, resources_service_1.ResourcesService, router_1.Router])
], AssetComponent);
exports.AssetComponent = AssetComponent;
//# sourceMappingURL=asset.component.js.map