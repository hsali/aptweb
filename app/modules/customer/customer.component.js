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
var customer_service_1 = require("./customer.service");
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var CustomerComponent = (function () {
    function CustomerComponent(fb, customerService, router) {
        this.fb = fb;
        this.customerService = customerService;
        this.router = router;
        this.savebuttonText = "Save";
        this.removeCustomerId = 0;
        this.updatedCustomerId = 0;
        this.isValidLogin = false;
        this.LoadCustomers();
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    CustomerComponent.prototype.ngOnInit = function () {
        this.ClearFields();
    };
    CustomerComponent.prototype.ClearFields = function () {
        this.userForm = this.fb.group({
            firstName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            lastName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            mobileNumber: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            contactNumber: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            emailAddress: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100), forms_1.Validators.email])],
            twitterUserName: ['', forms_1.Validators.maxLength(50)],
            malegender: [true],
            femalegender: [false],
            dateOfBirth: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(10)])],
            unsubscribed: [false],
            addressLine1: ['', forms_1.Validators.maxLength(50)],
            addressLine2: ['', forms_1.Validators.maxLength(50)],
            city: ['', forms_1.Validators.maxLength(50)],
            postCode: ['', forms_1.Validators.maxLength(50)],
            tags: [''],
            firstNameSearch: [''],
            lastNameSearch: [''],
            emailAddressSearch: [''],
            citySearch: ['']
        });
        this.savebuttonText = "Save";
        this.updatedCustomerId = 0;
        this.removeCustomerId = 0;
        //this.LoadCustomers();
    };
    CustomerComponent.prototype.LoadCustomers = function () {
        var _this = this;
        this.customerService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            _this.customers = data["results"];
            console.log(data["results"]);
        });
    };
    CustomerComponent.prototype.LoadCustomerById = function (customerId) {
        var _this = this;
        this.savebuttonText = "Update";
        this.updatedCustomerId = customerId;
        this.removeCustomerId = 0;
        this.customerService.getCustomerById(apiUrl, customerId)
            .subscribe(function (data) {
            console.log(data);
            var obj = data["results"][0];
            var gender = obj["gender"] == true ? true : false;
            _this.userForm = _this.fb.group({
                firstName: [obj["firstName"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                lastName: [obj["lastName"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                mobileNumber: [obj["mobileNumber"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                contactNumber: [obj["contactNumber"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                emailAddress: [obj["emailAddress"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.minLength(5), forms_1.Validators.maxLength(100), forms_1.Validators.email])],
                twitterUserName: [obj["twitterUserName"], forms_1.Validators.maxLength(50)],
                malegender: [gender],
                femalegender: [!gender],
                dateOfBirth: [obj["dateOfBirth"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(10)])],
                unsubscribed: [obj["unsubscribed"]],
                addressLine1: [obj["addressLine1"], forms_1.Validators.maxLength(50)],
                addressLine2: [obj["addressLine2"], forms_1.Validators.maxLength(50)],
                city: [obj["city"], forms_1.Validators.maxLength(50)],
                postCode: [obj["postCode"], forms_1.Validators.maxLength(50)],
                tags: ['']
            });
        });
    };
    CustomerComponent.prototype.CustomerIdForDelete = function (customerId) {
        this.removeCustomerId = customerId;
        console.log(this.removeCustomerId);
    };
    CustomerComponent.prototype.RemoveCustomer = function () {
        var _this = this;
        this.customerService.deleteCustomer(apiUrl, this.removeCustomerId).subscribe(function (data) {
            _this.LoadCustomers();
            _this.ClearFields();
        });
    };
    CustomerComponent.prototype.SearchCustomers = function (firstname, lastname, emailaddress, city) {
        var _this = this;
        this.customerService.getCustomerByFilter(apiUrl, Number(sessionStorage.getItem("organizationId")), firstname.value, lastname.value, emailaddress.value, city.value).subscribe(function (data) {
            _this.customers = data["results"];
        });
    };
    CustomerComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        var genderStatus = formData.controls["malegender"].checked == true ? true : false;
        this.customer = {
            customerId: this.updatedCustomerId,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            firstName: formData.controls["firstName"].value,
            lastName: formData.controls["lastName"].value,
            mobileNumber: formData.controls["mobileNumber"].value,
            contactNumber: formData.controls["contactNumber"].value,
            emailAddress: formData.controls["emailAddress"].value,
            twitterUserName: formData.controls["twitterUserName"].value,
            gender: genderStatus,
            dateOfBirth: formData.controls["dateOfBirth"].value,
            unsubscribed: formData.controls["unsubscribed"].value,
            addressLine1: formData.controls["addressLine1"].value,
            addressLine2: formData.controls["addressLine2"].value,
            city: formData.controls["city"].value,
            postCode: formData.controls["postCode"].value,
            profileImage: '',
            isDeleted: false
        };
        if (this.updatedCustomerId == 0) {
            this.customerService.postCustomer(apiUrl, this.customer).subscribe(function (data) {
                _this.LoadCustomers();
            });
        }
        else {
            this.customerService.putCustomer(apiUrl, this.updatedCustomerId, this.customer).subscribe(function (data) {
                _this.LoadCustomers();
            });
        }
        this.ClearFields();
    };
    return CustomerComponent;
}());
CustomerComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'customer.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, customer_service_1.CustomerService, router_1.Router])
], CustomerComponent);
exports.CustomerComponent = CustomerComponent;
//# sourceMappingURL=customer.component.js.map