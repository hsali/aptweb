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
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
require("rxjs/add/observable/throw");
var UserAccountService = (function () {
    function UserAccountService(http) {
        this.http = http;
    }
    UserAccountService.prototype.get = function (url, organizationId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('organizationId', JSON.stringify(organizationId));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'user', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserAccountService.prototype.put = function (url, organizationId, firstName, lastName, password) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('firstName', firstName);
        params.set('lastName', lastName);
        params.set('organizationId', JSON.stringify(organizationId));
        params.set('password', password);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'user', "", options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    UserAccountService.prototype.handleError = function (error) {
        console.error('ApiService::handleError', error);
        return Observable_1.Observable.throw(error);
    };
    return UserAccountService;
}());
UserAccountService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], UserAccountService);
exports.UserAccountService = UserAccountService;
//# sourceMappingURL=account.service.js.map