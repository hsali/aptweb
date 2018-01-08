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
var bookingquestion_service_1 = require("./bookingquestion.service");
var resources_service_1 = require("../../resources/resources.service");
var environment_1 = require("../../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var BookingQuestionComponent = (function () {
    function BookingQuestionComponent(fb, resourcesService, bookingQuestionService, router) {
        this.fb = fb;
        this.resourcesService = resourcesService;
        this.bookingQuestionService = bookingQuestionService;
        this.router = router;
        this.removeBookingQuestionId = 0;
        this.updatedBookingQuestionId = 0;
        this.savebuttonText = "Save";
        this.isAlwaysShow = true;
        this.selectedServiceIds = [];
        this.isCheckAll = false;
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
        this.LoadBookingQuestions();
    }
    BookingQuestionComponent.prototype.ngOnInit = function () {
        this.ClearFields();
    };
    BookingQuestionComponent.prototype.LoadBookingQuestions = function () {
        var _this = this;
        this.bookingQuestionService.get(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            _this.bookingQuestions = data["results"];
        });
    };
    BookingQuestionComponent.prototype.LoadBookingQuestionById = function (serviceId) {
        var _this = this;
        this.savebuttonText = "Update";
        this.updatedBookingQuestionId = serviceId;
        this.removeBookingQuestionId = 0;
        this.bookingQuestionService.getBookingQuestionById(apiUrl, serviceId)
            .subscribe(function (data) {
            var obj = data["results"][0];
            _this.questionService = obj["questionservice"];
            _this.selectedServiceIds = [];
            for (var i = 0; i < obj["questionservice"].length; i++) {
                _this.selectedServiceIds.push(obj["questionservice"][i]["serviceId"]);
            }
            _this.userForm = _this.fb.group({
                question: [obj["question"]],
                questionType: [obj["questionType"]],
                link: [obj["link"]],
                isRequired: [obj["isRequired"]],
                isAlwaysShow: [obj["isAlwaysShow"]]
            });
        });
    };
    BookingQuestionComponent.prototype.BookingQuestionIdForDelete = function (bookingQuestiond) {
        this.removeBookingQuestionId = bookingQuestiond;
    };
    BookingQuestionComponent.prototype.RemoveBookingQuestion = function () {
        var _this = this;
        this.bookingQuestionService.delete(apiUrl, this.removeBookingQuestionId).subscribe(function (data) {
            _this.LoadBookingQuestions();
            _this.ClearFields();
        });
    };
    BookingQuestionComponent.prototype.ClearFields = function () {
        this.userForm = this.fb.group({
            question: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            questionType: ['', forms_1.Validators.required],
            link: ['', forms_1.Validators.maxLength(500)],
            isRequired: [false],
            isAlwaysShow: [true]
        });
        this.savebuttonText = "Save";
        this.updatedBookingQuestionId = 0;
        this.removeBookingQuestionId = 0;
        this.LoadServices();
        this.LoadBookingQuestions();
    };
    BookingQuestionComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.bookingQuestion = {
            bookingQuestionId: this.updatedBookingQuestionId,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            question: formData.controls["question"].value,
            questionType: formData.controls["questionType"].value,
            link: formData.controls["link"].value,
            isRequired: formData.controls["isRequired"].value,
            isAlwaysShow: formData.controls["isAlwaysShow"].value,
            isDeleted: false
        };
        if (this.updatedBookingQuestionId == 0) {
            this.bookingQuestionService.post(apiUrl, this.bookingQuestion).subscribe(function (data) {
                var obj = data["results"][0];
                for (var i = 0; i < _this.selectedServiceIds.length; i++) {
                    _this.questionService = {
                        questionServiceId: 0,
                        bookingQuestionId: obj,
                        serviceId: _this.selectedServiceIds[i],
                        serviceName: '',
                        isDeleted: false
                    };
                    _this.bookingQuestionService.postQuestionServices(apiUrl, _this.questionService).subscribe(function (data) {
                        _this.LoadBookingQuestions();
                    });
                    _this.LoadBookingQuestions();
                }
            });
        }
        else {
            //Mark all Question Services to removed.
            this.bookingQuestionService.postQuestion(apiUrl, this.updatedBookingQuestionId).subscribe(function (data) {
                _this.bookingQuestionService.put(apiUrl, _this.updatedBookingQuestionId, _this.bookingQuestion).subscribe(function (data) {
                    for (var i = 0; i < _this.selectedServiceIds.length; i++) {
                        _this.questionService = {
                            questionServiceId: 0,
                            bookingQuestionId: _this.updatedBookingQuestionId,
                            serviceId: _this.selectedServiceIds[i],
                            serviceName: '',
                            isDeleted: false
                        };
                        _this.bookingQuestionService.postQuestionServices(apiUrl, _this.questionService).subscribe(function (data) {
                            _this.LoadBookingQuestions();
                        });
                        _this.LoadBookingQuestions();
                    }
                });
            });
        }
        this.questionServices = null;
        this.ClearFields();
    };
    BookingQuestionComponent.prototype.IsShow = function (isShow) {
        this.isAlwaysShow = isShow;
    };
    BookingQuestionComponent.prototype.LoadServices = function () {
        var _this = this;
        this.resourcesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            _this.services = data["results"];
        });
    };
    BookingQuestionComponent.prototype.clearServices = function () {
        this.questionServices = null;
        this.selectedServiceIds = [];
        this.isCheckAll = false;
    };
    BookingQuestionComponent.prototype.isServiceChecked = function (serviceId) {
        if (this.questionServices != null) {
            if (this.questionServices.find(function (d) { return d.serviceId === serviceId && d.isDeleted == false; })) {
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
    BookingQuestionComponent.prototype.CheckAll = function () {
        var _this = this;
        this.isCheckAll = true;
        this.selectedServiceIds = [];
        this.resourcesService.getServices(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            for (var i = 0; i < data["results"].length; i++) {
                _this.selectedServiceIds.push(data["results"][i]["serviceId"]);
            }
        });
    };
    BookingQuestionComponent.prototype.UncheckAll = function () {
        this.selectedServiceIds = [];
        this.isCheckAll = false;
        this.questionServices = null;
        this.LoadServices();
    };
    BookingQuestionComponent.prototype.Redirect = function () {
        this.router.navigate(['/bookingquestiondetail']);
    };
    return BookingQuestionComponent;
}());
BookingQuestionComponent = __decorate([
    core_1.Component({
        selector: 'bookingquestion-component',
        moduleId: module.id,
        templateUrl: 'bookingquestion.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, resources_service_1.ResourcesService, bookingquestion_service_1.BookingQuestionService, router_1.Router])
], BookingQuestionComponent);
exports.BookingQuestionComponent = BookingQuestionComponent;
//# sourceMappingURL=bookingquestion.component.js.map