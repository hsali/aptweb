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
var OpeningTimesService = (function () {
    function OpeningTimesService(http) {
        this.http = http;
    }
    OpeningTimesService.prototype.get = function (url, id) {
        console.log(id);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'openingtime', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OpeningTimesService.prototype.putOrganization = function (url, organizationId, timezoneID, currencyID) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        console.log(timezoneID);
        console.log(currencyID);
        params.set('timezoneID', JSON.stringify(timezoneID));
        params.set('currencyID', JSON.stringify(currencyID));
        params.set('organizationId', JSON.stringify(organizationId));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'user', "", options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OpeningTimesService.prototype.getByCategory = function (url, lookupCategory) {
        console.log(lookupCategory);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('lookupCategory', lookupCategory);
        params.set('id', null);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'lookup', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OpeningTimesService.prototype.getByCategoryId = function (url, id, lookupCategory) {
        console.log(lookupCategory);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('lookupCategory', lookupCategory);
        params.set('id', JSON.stringify(id));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'lookup', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    OpeningTimesService.prototype.postOpeningTime = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url + 'openingtime', body, options)
            .catch(this.handleError);
    };
    OpeningTimesService.prototype.putOpeningTime = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.put(url + 'openingtime', body, options)
            .catch(this.handleError);
    };
    OpeningTimesService.prototype.handleError = function (error) {
        console.error('ApiService::handleError', error);
        return Observable_1.Observable.throw(error);
    };
    return OpeningTimesService;
}());
OpeningTimesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], OpeningTimesService);
exports.OpeningTimesService = OpeningTimesService;
//# sourceMappingURL=openingtimes.service.js.map