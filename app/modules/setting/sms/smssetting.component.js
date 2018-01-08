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
var smssetting_service_1 = require("./smssetting.service");
var environment_1 = require("../../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var SMSSettingComponent = (function () {
    function SMSSettingComponent(fb, smsSettingService, router) {
        this.fb = fb;
        this.smsSettingService = smsSettingService;
        this.router = router;
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    SMSSettingComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            isBookingMade: [false],
            bookingMadeText: [''],
            isBookingModified: [false],
            bookingModifiedText: [''],
            isBookingCanceled: [false],
            bookingCanceledText: [''],
            isBookingRequested: [false],
            bookingRequestedText: [''],
            isBookingDeclined: [false],
            bookingDeclinedText: [''],
            isBookingReminder: [false],
            bookingReminderText: [''],
            amountOfNotice: [''],
            isRebooking: [false],
            rebookingText: [''],
            isBookingMadeExternal: [false],
            isBookingCanceledByCustomer: [false]
        });
        this.LoadEmailSetting();
    };
    SMSSettingComponent.prototype.onSubmit = function (formData) {
        this.smsSetting = {
            sMSSettingID: 0,
            organizationID: Number(sessionStorage.getItem("organizationId")),
            isBookingMade: formData.controls["isBookingMade"].value,
            bookingMadeText: formData.controls["bookingMadeText"].value,
            isBookingModified: formData.controls["isBookingModified"].value,
            bookingModifiedText: formData.controls["bookingModifiedText"].value,
            isBookingCanceled: formData.controls["isBookingCanceled"].value,
            bookingCanceledText: formData.controls["bookingCanceledText"].value,
            isBookingRequested: formData.controls["isBookingRequested"].value,
            bookingRequestedText: formData.controls["bookingRequestedText"].value,
            isBookingDeclined: formData.controls["isBookingDeclined"].value,
            bookingDeclinedText: formData.controls["bookingDeclinedText"].value,
            isBookingReminder: formData.controls["isBookingReminder"].value,
            bookingReminderText: formData.controls["bookingReminderText"].value,
            amountOfNotice: formData.controls["amountOfNotice"].value,
            isRebooking: formData.controls["isRebooking"].value,
            rebookingText: formData.controls["rebookingText"].value,
            isBookingMadeExternal: formData.controls["isBookingMadeExternal"].value,
            isBookingCanceledByCustomer: formData.controls["isBookingCanceledByCustomer"].value,
            isDeleted: false
        };
        this.smsSettingService.post(apiUrl, this.smsSetting).subscribe(function (data) { });
    };
    SMSSettingComponent.prototype.LoadEmailSetting = function () {
        var _this = this;
        this.smsSettingService.get(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            var obj = data["results"][0];
            console.log(obj);
            _this.userForm = _this.fb.group({
                isBookingMade: [obj["isBookingMade"]],
                bookingMadeText: [obj["bookingMadeText"]],
                isBookingModified: [obj["isBookingModified"]],
                bookingModifiedText: [obj["bookingModifiedText"]],
                isBookingCanceled: [obj["isBookingCanceled"]],
                bookingCanceledText: [obj["bookingCanceledText"]],
                isBookingRequested: [obj["isBookingRequested"]],
                bookingRequestedText: [obj["bookingRequestedText"]],
                isBookingDeclined: [obj["isBookingDeclined"]],
                bookingDeclinedText: [obj["bookingDeclinedText"]],
                isBookingReminder: [obj["isBookingReminder"]],
                bookingReminderText: [obj["bookingReminderText"]],
                amountOfNotice: [obj["amountOfNotice"]],
                isRebooking: [obj["isRebooking"]],
                rebookingText: [obj["rebookingText"]],
                isBookingMadeExternal: [obj["isBookingMadeExternal"]],
                isBookingCanceledByCustomer: [obj["isBookingCanceledByCustomer"]]
            });
        });
    };
    return SMSSettingComponent;
}());
SMSSettingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'smssetting.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, smssetting_service_1.SMSSettingService, router_1.Router])
], SMSSettingComponent);
exports.SMSSettingComponent = SMSSettingComponent;
//# sourceMappingURL=smssetting.component.js.map