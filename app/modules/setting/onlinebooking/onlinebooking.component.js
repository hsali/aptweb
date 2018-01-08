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
var onlinebooking_service_1 = require("./onlinebooking.service");
var openingtimes_service_1 = require("../../../modules/openingtimes/openingtimes.service");
var environment_1 = require("../../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var OnlineBookingSettingComponent = (function () {
    function OnlineBookingSettingComponent(fb, onlineBookingSettingService, openingtimesService, router) {
        this.fb = fb;
        this.onlineBookingSettingService = onlineBookingSettingService;
        this.openingtimesService = openingtimesService;
        this.router = router;
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    OnlineBookingSettingComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            isCustomAllowBooking: [true],
            noticeForOnlineBooking: [''],
            blockAvailabilityAfter: [''],
            isShowPrice: [true],
            isCustomerSelectResourceGroup: [true],
            isCustomerSelectResources: [true],
            showResourceSelection: [''],
            isShowResourceImage: [true],
            isCustomerAllowAny: [true],
            defaultTimeZoneID: [''],
            timeIncrementsAvailability: [''],
            noAvailabilityMessage: [''],
            isCustomerBookwithoutAccount: [true],
            isMobileRequired: [true],
            isNotesForOnlineBooking: [true],
            notesForOnlineBooking: [''],
            confirmationMessageForBooking: [''],
            noticeForCancellation: [''],
            isCustomerCancelFromConfirmation: [true]
        });
        this.LoadTimeZone();
        this.LoadEmailSetting();
    };
    OnlineBookingSettingComponent.prototype.LoadTimeZone = function () {
        var _this = this;
        this.openingtimesService.getByCategory(apiUrl, "Timezone").subscribe(function (data) {
            _this.timezonelist = data["results"];
            //this.userAccountService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
            //    var obj = data["results"][0];
            //    this.selectedTimeZone = obj["timezoneId"];
            //});
        });
    };
    OnlineBookingSettingComponent.prototype.onSubmit = function (formData) {
        this.onlineBookingSetting = {
            onlineBookingSettingID: 0,
            organizationID: Number(sessionStorage.getItem("organizationId")),
            isCustomAllowBooking: formData.controls["isCustomAllowBooking"].value,
            noticeForOnlineBooking: formData.controls["noticeForOnlineBooking"].value,
            blockAvailabilityAfter: formData.controls["blockAvailabilityAfter"].value,
            isShowPrice: formData.controls["isShowPrice"].value,
            isCustomerSelectResourceGroup: formData.controls["isCustomerSelectResourceGroup"].value,
            isCustomerSelectResources: formData.controls["isCustomerSelectResources"].value,
            showResourceSelection: formData.controls["showResourceSelection"].value,
            isShowResourceImage: formData.controls["isShowResourceImage"].value,
            isCustomerAllowAny: formData.controls["isCustomerAllowAny"].value,
            defaultTimeZoneID: formData.controls["defaultTimeZoneID"].value,
            timeIncrementsAvailability: formData.controls["timeIncrementsAvailability"].value,
            noAvailabilityMessage: formData.controls["noAvailabilityMessage"].value,
            isCustomerBookwithoutAccount: formData.controls["isCustomerBookwithoutAccount"].value,
            isMobileRequired: formData.controls["isMobileRequired"].value,
            isNotesForOnlineBooking: formData.controls["isNotesForOnlineBooking"].value,
            notesForOnlineBooking: formData.controls["notesForOnlineBooking"].value,
            confirmationMessageForBooking: formData.controls["confirmationMessageForBooking"].value,
            noticeForCancellation: formData.controls["noticeForCancellation"].value,
            isCustomerCancelFromConfirmation: formData.controls["isCustomerCancelFromConfirmation"].value,
            isDeleted: false
        };
        this.onlineBookingSettingService.post(apiUrl, this.onlineBookingSetting).subscribe(function (data) { });
    };
    OnlineBookingSettingComponent.prototype.LoadEmailSetting = function () {
        var _this = this;
        this.onlineBookingSettingService.get(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            var obj = data["results"][0];
            console.log(obj);
            _this.userForm = _this.fb.group({
                isCustomAllowBooking: [obj["isCustomAllowBooking"]],
                noticeForOnlineBooking: [obj["noticeForOnlineBooking"]],
                blockAvailabilityAfter: [obj["blockAvailabilityAfter"]],
                isShowPrice: [obj["isShowPrice"]],
                isCustomerSelectResourceGroup: [obj["isCustomerSelectResourceGroup"]],
                isCustomerSelectResources: [obj["isCustomerSelectResources"]],
                showResourceSelection: [obj["showResourceSelection"]],
                isShowResourceImage: [obj["isShowResourceImage"]],
                isCustomerAllowAny: [obj["isCustomerAllowAny"]],
                defaultTimeZoneID: [obj["defaultTimeZoneID"]],
                timeIncrementsAvailability: [obj["timeIncrementsAvailability"]],
                noAvailabilityMessage: [obj["noAvailabilityMessage"]],
                isCustomerBookwithoutAccount: [obj["isCustomerBookwithoutAccount"]],
                isMobileRequired: [obj["isMobileRequired"]],
                isNotesForOnlineBooking: [obj["isNotesForOnlineBooking"]],
                notesForOnlineBooking: [obj["notesForOnlineBooking"]],
                confirmationMessageForBooking: [obj["confirmationMessageForBooking"]],
                noticeForCancellation: [obj["noticeForCancellation"]],
                isCustomerCancelFromConfirmation: [obj["isCustomerCancelFromConfirmation"]]
            });
        });
    };
    return OnlineBookingSettingComponent;
}());
OnlineBookingSettingComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'onlinebooking.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, onlinebooking_service_1.OnlineBookingSettingService, openingtimes_service_1.OpeningTimesService, router_1.Router])
], OnlineBookingSettingComponent);
exports.OnlineBookingSettingComponent = OnlineBookingSettingComponent;
//# sourceMappingURL=onlinebooking.component.js.map