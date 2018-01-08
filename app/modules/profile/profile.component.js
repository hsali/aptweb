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
var profile_service_1 = require("./profile.service");
var environment_1 = require("../../environments/environment");
var router_1 = require("@angular/router");
var apiUrl = environment_1.environment.apiUrl;
var ProfileComponent = (function () {
    function ProfileComponent(fb, profileService, router) {
        this.fb = fb;
        this.profileService = profileService;
        this.router = router;
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ProfileComponent.prototype.fileChangeMicrosite = function (files, microsite) {
        if (microsite == 0) {
            this.logoForMarketingPath = files[0].nativeElement;
        }
        else if (microsite == 1) {
            this.profileImageForMicrosite1 = files[0].nativeElement;
        }
        else if (microsite == 2) {
            this.profileImageForMicrosite2 = files[0].nativeElement;
        }
        else if (microsite == 3) {
            this.profileImageForMicrosite3 = files[0].nativeElement;
        }
        else if (microsite == 4) {
            this.profileImageForMicrosite4 = files[0].nativeElement;
        }
        else if (microsite == 5) {
            this.bannerImageForMicrosite = files[0].nativeElement;
        }
    };
    ProfileComponent.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            businessName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
            aboutYourBusiness: [''],
            street: [''],
            city: [''],
            postCode: [''],
            businessPhoneNumber: [''],
            businessWebsite: [''],
            mobileNumber: [''],
            emailAddress: [''],
            otherEmailAddress: [''],
            sendFromEmailAddress: [''],
            sendFromNameForEmail: [''],
            sendFromNameForSMS: [''],
            logoForMarketingPath: [''],
            setAsDefaultMircrosite1: [false],
            setAsDefaultMircrosite2: [false],
            setAsDefaultMircrosite3: [false],
            setAsDefaultMircrosite4: [false],
        });
        this.LoadProfile();
    };
    ProfileComponent.prototype.LoadProfile = function () {
        var _this = this;
        this.profileService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            var obj = data["results"][0];
            _this.userForm = _this.fb.group({
                businessName: [obj["businessName"], forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(50)])],
                aboutYourBusiness: [obj["aboutYourBusiness"]],
                street: [obj["street"]],
                city: [obj["city"]],
                postCode: [obj["postCode"]],
                businessPhoneNumber: [obj["businessPhoneNumber"]],
                businessWebsite: [obj["businessWebsite"]],
                mobileNumber: [obj["mobileNumber"]],
                emailAddress: [obj["emailAddress"]],
                otherEmailAddress: [obj["otherEmailAddress"]],
                sendFromEmailAddress: [obj["sendFromEmailAddress"]],
                sendFromNameForEmail: [obj["sendFromNameForEmail"]],
                sendFromNameForSMS: [obj["sendFromNameForSMS"]],
                logoForMarketingPath: [obj["logoForMarketingPath"]],
                setAsDefaultMircrosite1: [obj["setAsDefaultMircrosite1"]],
                setAsDefaultMircrosite2: [obj["setAsDefaultMircrosite2"]],
                setAsDefaultMircrosite3: [obj["setAsDefaultMircrosite3"]],
                setAsDefaultMircrosite4: [obj["setAsDefaultMircrosite4"]],
            });
        });
    };
    ProfileComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.profile = {
            profileId: 0,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            businessName: formData.controls["businessName"].value,
            aboutYourBusiness: formData.controls["aboutYourBusiness"].value,
            street: formData.controls["street"].value,
            city: formData.controls["city"].value,
            postCode: formData.controls["postCode"].value,
            businessPhoneNumber: formData.controls["businessPhoneNumber"].value,
            businessWebsite: formData.controls["businessWebsite"].value,
            mobileNumber: formData.controls["mobileNumber"].value,
            emailAddress: formData.controls["emailAddress"].value,
            otherEmailAddress: formData.controls["otherEmailAddress"].value,
            sendFromEmailAddress: formData.controls["sendFromEmailAddress"].value,
            sendFromNameForEmail: formData.controls["sendFromNameForEmail"].value,
            sendFromNameForSMS: formData.controls["sendFromNameForSMS"].value,
            logoForMarketingPath: this.logoForMarketingPath,
            profileImageForMicrosite1: this.profileImageForMicrosite1,
            setAsDefaultMircrosite1: formData.controls["setAsDefaultMircrosite1"].value,
            profileImageForMicrosite2: this.profileImageForMicrosite2,
            setAsDefaultMircrosite2: formData.controls["setAsDefaultMircrosite2"].value,
            profileImageForMicrosite3: this.profileImageForMicrosite3,
            setAsDefaultMircrosite3: formData.controls["setAsDefaultMircrosite3"].value,
            profileImageForMicrosite4: this.profileImageForMicrosite4,
            setAsDefaultMircrosite4: formData.controls["setAsDefaultMircrosite4"].value,
            bannerImageForMicrosite: this.bannerImageForMicrosite,
            isDeleted: false
        };
        console.log(this.profile);
        this.profileService.post(apiUrl, this.profile).subscribe(function (data) {
            _this.LoadProfile();
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'profile.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, profile_service_1.ProfileService, router_1.Router])
], ProfileComponent);
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map