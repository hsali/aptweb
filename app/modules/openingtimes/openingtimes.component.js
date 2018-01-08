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
var account_service_1 = require("../../modules/useraccount/account.service");
var openingtimes_service_1 = require("./openingtimes.service");
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var OpeningTimesComponent = (function () {
    function OpeningTimesComponent(fb, userAccountService, openingtimesService, router) {
        this.fb = fb;
        this.userAccountService = userAccountService;
        this.openingtimesService = openingtimesService;
        this.router = router;
        this.isHidden = true;
        this.isMondayhidden = false;
        this.isTuesdayhidden = false;
        this.isWednesdayhidden = false;
        this.isThursdayhidden = false;
        this.isFridayhidden = false;
        this.isSaturdayhidden = true;
        this.isSundayhidden = true;
        this.selectedOpeningHour = "00";
        this.selectedClosingHour = "00";
        this.selectedOpeningMinute = "00";
        this.selectedClosingMinute = "00";
        this.savebuttonText = "Save";
        this.isMenuhidden = false;
        if (sessionStorage.getItem("isMenuhidden") == "true") {
            this.isMenuhidden = true;
            this.savebuttonText = "Save";
        }
        else {
            this.savebuttonText = "Update";
        }
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    OpeningTimesComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            ckMonday: [true],
            MondayOpeningHour: ['00'],
            MondayOpeningMinute: ['00'],
            MondayClosingHour: ['00'],
            MondayClosingMinute: ['00'],
            ckTuesday: [true],
            TuesdayOpeningHour: ['00'],
            TuesdayOpeningMinute: ['00'],
            TuesdayClosingHour: ['00'],
            TuesdayClosingMinute: ['00'],
            ckWednesday: [true],
            WednesdayOpeningHour: ['00'],
            WednesdayOpeningMinute: ['00'],
            WednesdayClosingHour: ['00'],
            WednesdayClosingMinute: ['00'],
            ckThursday: [true],
            ThursdayOpeningHour: ['00'],
            ThursdayOpeningMinute: ['00'],
            ThursdayClosingHour: ['00'],
            ThursdayClosingMinute: ['00'],
            ckFriday: [true],
            FridayOpeningHour: ['00'],
            FridayOpeningMinute: ['00'],
            FridayClosingHour: ['00'],
            FridayClosingMinute: ['00'],
            ckSaturday: [false],
            SaturdayOpeningHour: ['00'],
            SaturdayOpeningMinute: ['00'],
            SaturdayClosingHour: ['00'],
            SaturdayClosingMinute: ['00'],
            ckSunday: [false],
            SundayOpeningHour: ['00'],
            SundayOpeningMinute: ['00'],
            SundayClosingHour: ['00'],
            SundayClosingMinute: ['00'],
            timezoneControl: [],
            currencyControl: []
        });
        this.LoadTimeZone();
        this.LoadCurrency();
        this.LoadOpeningtimes();
    };
    OpeningTimesComponent.prototype.LoadOpeningtimes = function () {
        var _this = this;
        this.openingtimesService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            var obj = data["results"];
            if (obj != null && obj.length > 0) {
                var mondayobj = data["results"][0];
                var tuesdayobj = data["results"][1];
                var wednesdayobj = data["results"][2];
                var thursdayobj = data["results"][3];
                var fridayobj = data["results"][4];
                var saturdayobj = data["results"][5];
                var sundayobj = data["results"][6];
                _this.userForm = _this.fb.group({
                    ckMonday: [mondayobj["isOpen"]],
                    MondayOpeningHour: [mondayobj["openingTime"].substr(0, 2)],
                    MondayOpeningMinute: [mondayobj["openingTime"].substr(3, 2)],
                    MondayClosingHour: [mondayobj["closingTime"].substr(0, 2)],
                    MondayClosingMinute: [mondayobj["closingTime"].substr(3, 2)],
                    ckTuesday: [tuesdayobj["isOpen"]],
                    TuesdayOpeningHour: [tuesdayobj["openingTime"].substr(0, 2)],
                    TuesdayOpeningMinute: [tuesdayobj["openingTime"].substr(3, 2)],
                    TuesdayClosingHour: [tuesdayobj["closingTime"].substr(0, 2)],
                    TuesdayClosingMinute: [tuesdayobj["closingTime"].substr(3, 2)],
                    ckWednesday: [wednesdayobj["isOpen"]],
                    WednesdayOpeningHour: [wednesdayobj["openingTime"].substr(0, 2)],
                    WednesdayOpeningMinute: [wednesdayobj["openingTime"].substr(3, 2)],
                    WednesdayClosingHour: [wednesdayobj["closingTime"].substr(0, 2)],
                    WednesdayClosingMinute: [wednesdayobj["closingTime"].substr(3, 2)],
                    ckThursday: [thursdayobj["isOpen"]],
                    ThursdayOpeningHour: [thursdayobj["openingTime"].substr(0, 2)],
                    ThursdayOpeningMinute: [thursdayobj["openingTime"].substr(3, 2)],
                    ThursdayClosingHour: [thursdayobj["closingTime"].substr(0, 2)],
                    ThursdayClosingMinute: [thursdayobj["closingTime"].substr(3, 2)],
                    ckFriday: [fridayobj["isOpen"]],
                    FridayOpeningHour: [fridayobj["openingTime"].substr(0, 2)],
                    FridayOpeningMinute: [fridayobj["openingTime"].substr(3, 2)],
                    FridayClosingHour: [fridayobj["closingTime"].substr(0, 2)],
                    FridayClosingMinute: [fridayobj["closingTime"].substr(3, 2)],
                    ckSaturday: [saturdayobj["isOpen"]],
                    SaturdayOpeningHour: [saturdayobj["openingTime"].substr(0, 2)],
                    SaturdayOpeningMinute: [saturdayobj["openingTime"].substr(3, 2)],
                    SaturdayClosingHour: [saturdayobj["closingTime"].substr(0, 2)],
                    SaturdayClosingMinute: [saturdayobj["closingTime"].substr(3, 2)],
                    ckSunday: [sundayobj["isOpen"]],
                    SundayOpeningHour: [sundayobj["openingTime"].substr(0, 2)],
                    SundayOpeningMinute: [sundayobj["openingTime"].substr(3, 2)],
                    SundayClosingHour: [sundayobj["closingTime"].substr(0, 2)],
                    SundayClosingMinute: [sundayobj["closingTime"].substr(3, 2)],
                    timezoneControl: [],
                    currencyControl: []
                });
                _this.LoadTimeZone();
                _this.LoadCurrency();
            }
        });
    };
    OpeningTimesComponent.prototype.LoadTimeZone = function () {
        var _this = this;
        this.openingtimesService.getByCategory(apiUrl, "Timezone").subscribe(function (data) {
            _this.timezonelist = data["results"];
            _this.userAccountService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
                var obj = data["results"][0];
                _this.selectedTimeZone = obj["timezoneId"];
            });
        });
    };
    OpeningTimesComponent.prototype.LoadCurrency = function () {
        var _this = this;
        this.openingtimesService.getByCategory(apiUrl, "Currency").subscribe(function (data) {
            _this.currencylist = data["results"];
            _this.userAccountService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
                var obj = data["results"][0];
                _this.selectedCurrency = obj["currencyId"];
            });
        });
    };
    OpeningTimesComponent.prototype.ApplyChangesForAll = function (day) {
        switch (day) {
            case "Monday":
                this.selectedOpeningHour = this.userForm.value["MondayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["MondayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["MondayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["MondayClosingMinute"];
                break;
            case "Tuesday":
                this.selectedOpeningHour = this.userForm.value["TuesdayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["TuesdayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["TuesdayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["TuesdayClosingMinute"];
                break;
            case "Wednesday":
                this.selectedOpeningHour = this.userForm.value["WednesdayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["WednesdayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["WednesdayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["WednesdayClosingMinute"];
                break;
            case "Thursday":
                this.selectedOpeningHour = this.userForm.value["ThursdayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["ThursdayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["ThursdayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["ThursdayClosingMinute"];
                break;
            case "Friday":
                this.selectedOpeningHour = this.userForm.value["FridayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["FridayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["FridayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["FridayClosingMinute"];
                break;
            case "Saturday":
                this.selectedOpeningHour = this.userForm.value["SaturdayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["SaturdayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["SaturdayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["SaturdayClosingMinute"];
                break;
            case "Sunday":
                this.selectedOpeningHour = this.userForm.value["SundayOpeningHour"];
                this.selectedOpeningMinute = this.userForm.value["SundayOpeningMinute"];
                this.selectedClosingHour = this.userForm.value["SundayClosingHour"];
                this.selectedClosingMinute = this.userForm.value["SundayClosingMinute"];
                break;
        }
    };
    OpeningTimesComponent.prototype.onChange = function (day, event) {
        switch (day) {
            case "ckMonday":
                if (!event.target.checked)
                    this.isMondayhidden = true;
                else
                    this.isMondayhidden = false;
                break;
            case "ckTuesday":
                if (!event.target.checked)
                    this.isTuesdayhidden = true;
                else
                    this.isTuesdayhidden = false;
                break;
            case "ckWednesday":
                if (!event.target.checked)
                    this.isWednesdayhidden = true;
                else
                    this.isWednesdayhidden = false;
                break;
            case "ckThursday":
                if (!event.target.checked)
                    this.isThursdayhidden = true;
                else
                    this.isThursdayhidden = false;
                break;
            case "ckFriday":
                if (!event.target.checked)
                    this.isFridayhidden = true;
                else
                    this.isFridayhidden = false;
                break;
            case "ckSaturday":
                if (!event.target.checked)
                    this.isSaturdayhidden = true;
                else
                    this.isSaturdayhidden = false;
                break;
            case "ckSunday":
                if (!event.target.checked)
                    this.isSundayhidden = true;
                else
                    this.isSundayhidden = false;
                break;
        }
    };
    OpeningTimesComponent.prototype.onSubmit = function (formData, ismenuhidden) {
        this.openingtimesService.putOrganization(apiUrl, Number(sessionStorage.getItem("organizationId")), Number(formData.value['timezoneControl']), Number(formData.value['currencyControl'])).subscribe(function (data) { });
        var mondayOpening = formData.controls["MondayOpeningHour"].value + ":" + formData.controls["MondayOpeningMinute"].value;
        var mondayClosing = formData.controls["MondayClosingHour"].value + ":" + formData.controls["MondayClosingMinute"].value;
        var tuesdayOpening = formData.controls["TuesdayOpeningHour"].value + ":" + formData.controls["TuesdayOpeningMinute"].value;
        var tuesdayClosing = formData.controls["TuesdayClosingHour"].value + ":" + formData.controls["TuesdayClosingMinute"].value;
        var wednesdayOpening = formData.controls["WednesdayOpeningHour"].value + ":" + formData.controls["WednesdayOpeningMinute"].value;
        var wednesdayClosing = formData.controls["WednesdayClosingHour"].value + ":" + formData.controls["WednesdayClosingMinute"].value;
        var thursdayOpening = formData.controls["ThursdayOpeningHour"].value + ":" + formData.controls["ThursdayOpeningMinute"].value;
        var thursdayClosing = formData.controls["ThursdayClosingHour"].value + ":" + formData.controls["ThursdayClosingMinute"].value;
        var fridayOpening = formData.controls["FridayOpeningHour"].value + ":" + formData.controls["FridayOpeningMinute"].value;
        var fridayClosing = formData.controls["FridayClosingHour"].value + ":" + formData.controls["FridayClosingMinute"].value;
        var saturdayOpening = formData.controls["SaturdayOpeningHour"].value + ":" + formData.controls["SaturdayOpeningMinute"].value;
        var saturdayClosing = formData.controls["SaturdayClosingHour"].value + ":" + formData.controls["SaturdayClosingMinute"].value;
        var sundayOpening = formData.controls["SundayOpeningHour"].value + ":" + formData.controls["SundayOpeningMinute"].value;
        var sundayClosing = formData.controls["SundayClosingHour"].value + ":" + formData.controls["SundayClosingMinute"].value;
        this.InsertDays(1, mondayOpening, mondayClosing, formData.controls["ckMonday"].value);
        this.InsertDays(2, tuesdayOpening, tuesdayClosing, formData.controls["ckTuesday"].value);
        this.InsertDays(3, wednesdayOpening, wednesdayClosing, formData.controls["ckWednesday"].value);
        this.InsertDays(4, thursdayOpening, thursdayClosing, formData.controls["ckThursday"].value);
        this.InsertDays(5, fridayOpening, fridayClosing, formData.controls["ckFriday"].value);
        this.InsertDays(6, saturdayOpening, saturdayClosing, formData.controls["ckSaturday"].value);
        this.InsertDays(7, sundayOpening, sundayClosing, formData.controls["ckSunday"].value);
        if (ismenuhidden) {
            this.router.navigate(['/services']);
        }
    };
    OpeningTimesComponent.prototype.InsertDays = function (dayId, openingtime, closingtime, isOpen) {
        this.openingTime = {
            openingId: 0,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            dayId: dayId,
            openingtime: openingtime,
            closingtime: closingtime,
            isOpen: isOpen,
            isDeleted: false
        };
        if (this.savebuttonText == "Save") {
            this.openingtimesService.postOpeningTime(apiUrl, this.openingTime).subscribe(function (data) { });
        }
        else {
            this.openingtimesService.putOpeningTime(apiUrl, this.openingTime).subscribe(function (data) { });
        }
        this.isHidden = false;
    };
    return OpeningTimesComponent;
}());
OpeningTimesComponent = __decorate([
    core_1.Component({
        selector: 'openingtimes-component',
        moduleId: module.id,
        templateUrl: 'openingtimes.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, account_service_1.UserAccountService, openingtimes_service_1.OpeningTimesService, router_1.Router])
], OpeningTimesComponent);
exports.OpeningTimesComponent = OpeningTimesComponent;
//# sourceMappingURL=openingtimes.component.js.map