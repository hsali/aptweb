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
var emailsetting_service_1 = require("./emailsetting.service");
var environment_1 = require("../../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var EmailSettingComponent = (function () {
    function EmailSettingComponent(fb, emailSettingService, router) {
        this.fb = fb;
        this.emailSettingService = emailSettingService;
        this.router = router;
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    EmailSettingComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            isInternalBooking: [true],
            internalBookingText: [''],
            isExternalBooking: [true],
            isBookingModified: [false],
            bookingModifiedText: [''],
            isBookingCanceled: [false],
            bookingCanceledText: [''],
            bookingRequestedText: [''],
            bookingDeclinedText: [''],
            isBookingReminder: [false],
            bookingReminderText: [''],
            amountOfNotice: [''],
            isBookingReminderAfterOneDay: [false],
            bookingReminderAfterOneDayText: [''],
            isRebookingReminder: [false],
            rebookingReminderText: [''],
            comebackEmailAfter: [''],
            emailHeader: [''],
            emailFooter: [''],
            prefilledDirectMessage: ['']
        });
        this.LoadEmailSetting();
    };
    EmailSettingComponent.prototype.onSubmit = function (formData) {
        this.emailSetting = {
            emailSettingID: 0,
            organizationID: Number(sessionStorage.getItem("organizationId")),
            isInternalBooking: formData.controls["isInternalBooking"].value,
            internalBookingText: formData.controls["internalBookingText"].value,
            isExternalBooking: formData.controls["isExternalBooking"].value,
            isBookingModified: formData.controls["isBookingModified"].value,
            bookingModifiedText: formData.controls["bookingModifiedText"].value,
            isBookingCanceled: formData.controls["isBookingCanceled"].value,
            bookingCanceledText: formData.controls["bookingCanceledText"].value,
            isBookingRequested: true,
            bookingRequestedText: formData.controls["bookingRequestedText"].value,
            isBookingDeclined: true,
            bookingDeclinedText: formData.controls["bookingDeclinedText"].value,
            isBookingReminder: formData.controls["isBookingReminder"].value,
            bookingReminderText: formData.controls["bookingReminderText"].value,
            amountOfNotice: formData.controls["amountOfNotice"].value,
            isBookingReminderAfterOneDay: formData.controls["isBookingReminderAfterOneDay"].value,
            bookingReminderAfterOneDayText: formData.controls["bookingReminderAfterOneDayText"].value,
            isRebookingReminder: formData.controls["isRebookingReminder"].value,
            rebookingReminderText: formData.controls["rebookingReminderText"].value,
            comebackEmailAfter: formData.controls["comebackEmailAfter"].value,
            emailHeader: formData.controls["emailHeader"].value,
            emailFooter: formData.controls["emailFooter"].value,
            prefilledDirectMessage: formData.controls["prefilledDirectMessage"].value,
            isDeleted: false,
        };
        this.emailSettingService.post(apiUrl, this.emailSetting).subscribe(function (data) { });
    };
    EmailSettingComponent.prototype.LoadEmailSetting = function () {
        var _this = this;
        this.emailSettingService.get(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            var obj = data["results"][0];
            console.log(obj);
            _this.userForm = _this.fb.group({
                isInternalBooking: [obj["isInternalBooking"]],
                internalBookingText: [obj["internalBookingText"]],
                isExternalBooking: [obj["isExternalBooking"]],
                isBookingModified: [obj["isBookingModified"]],
                bookingModifiedText: [obj["bookingModifiedText"]],
                isBookingCanceled: [obj["isBookingCanceled"]],
                bookingCanceledText: [obj["bookingCanceledText"]],
                bookingRequestedText: [obj["bookingRequestedText"]],
                bookingDeclinedText: [obj["bookingDeclinedText"]],
                isBookingReminder: [obj["isBookingReminder"]],
                bookingReminderText: [obj["bookingReminderText"]],
                amountOfNotice: [obj["amountOfNotice"]],
                isBookingReminderAfterOneDay: [obj["isBookingReminderAfterOneDay"]],
                bookingReminderAfterOneDayText: [obj["bookingReminderAfterOneDayText"]],
                isRebookingReminder: [obj["isRebookingReminder"]],
                rebookingReminderText: [obj["rebookingReminderText"]],
                comebackEmailAfter: [obj["comebackEmailAfter"]],
                emailHeader: [obj["emailHeader"]],
                emailFooter: [obj["emailFooter"]],
                prefilledDirectMessage: [obj["prefilledDirectMessage"]]
            });
        });
    };
    EmailSettingComponent.prototype.Redirect = function () {
        this.router.navigate(['/emailsettingdetail']);
    };
    return EmailSettingComponent;
}());
EmailSettingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'emailsetting.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, emailsetting_service_1.EmailSettingService, router_1.Router])
], EmailSettingComponent);
exports.EmailSettingComponent = EmailSettingComponent;
//# sourceMappingURL=emailsetting.component.js.map