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
var general_service_1 = require("./general.service");
var account_service_1 = require("../../../modules/useraccount/account.service");
var openingtimes_service_1 = require("../../../modules/openingtimes/openingtimes.service");
var environment_1 = require("../../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var GeneralComponent = (function () {
    function GeneralComponent(fb, generalService, userAccountService, openingtimesService, router) {
        this.fb = fb;
        this.generalService = generalService;
        this.userAccountService = userAccountService;
        this.openingtimesService = openingtimesService;
        this.router = router;
        this.messageText = "";
        this.isHidden = true;
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
        this.LoadTimeZone();
        this.LoadCurrency();
        this.LoadGeneralSetting();
    }
    GeneralComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            calendarIntervalIncrement: ['15'],
            dateFormat: ['mm/dd/yyyy'],
            timezoneControl: [],
            currencyControl: []
        });
    };
    GeneralComponent.prototype.LoadTimeZone = function () {
        var _this = this;
        this.openingtimesService.getByCategory(apiUrl, "Timezone").subscribe(function (data) {
            _this.timezonelist = data["results"];
            _this.userAccountService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
                var obj = data["results"][0];
                _this.selectedTimeZone = obj["timezoneId"];
            });
        });
    };
    GeneralComponent.prototype.LoadCurrency = function () {
        var _this = this;
        this.openingtimesService.getByCategory(apiUrl, "Currency").subscribe(function (data) {
            _this.currencylist = data["results"];
            _this.userAccountService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
                var obj = data["results"][0];
                _this.selectedCurrency = obj["currencyId"];
            });
        });
    };
    GeneralComponent.prototype.LoadGeneralSetting = function () {
        var _this = this;
        this.userAccountService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            var obj = data["results"][0];
            console.log(obj);
            if (obj["calendarIntervalIncrement"] != "" && obj["calendarIntervalIncrement"] != null) {
                _this.userForm.controls['calendarIntervalIncrement'].setValue(obj["calendarIntervalIncrement"]);
            }
            if (obj["dateFormat"] != "" && obj["dateFormat"] != null) {
                _this.userForm.controls['dateFormat'].setValue(obj["dateFormat"]);
            }
        });
    };
    GeneralComponent.prototype.CalendarIncrementChange = function () {
        this.messageText = "Calendar Interval Increment";
        this.isHidden = false;
        this.onSubmit();
    };
    GeneralComponent.prototype.TimeZoneChange = function () {
        this.messageText = "Time Zone";
        this.isHidden = false;
        this.onSubmit();
    };
    GeneralComponent.prototype.CurrencyChange = function () {
        this.messageText = "Currency";
        this.isHidden = false;
        this.onSubmit();
    };
    GeneralComponent.prototype.DateFormatChange = function () {
        this.messageText = "Date Format";
        this.isHidden = false;
        this.onSubmit();
    };
    GeneralComponent.prototype.onSubmit = function () {
        this.generalService.put(apiUrl, Number(sessionStorage.getItem("organizationId")), Number(this.userForm.value['timezoneControl']), Number(this.userForm.value['currencyControl']), this.userForm.controls['dateFormat'].value, Number(this.userForm.controls['calendarIntervalIncrement'].value)).subscribe(function (data) { });
    };
    return GeneralComponent;
}());
GeneralComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'general.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, general_service_1.GeneralService, account_service_1.UserAccountService, openingtimes_service_1.OpeningTimesService, router_1.Router])
], GeneralComponent);
exports.GeneralComponent = GeneralComponent;
//# sourceMappingURL=general.component.js.map