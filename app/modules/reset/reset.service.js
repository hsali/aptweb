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
var ResetService = (function () {
    function ResetService(http) {
        this.http = http;
    }
    ResetService.prototype.get = function (url, uniqueId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('uniqueId', uniqueId);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'reset', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ResetService.prototype.put = function (url, uniqueId, password) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('uniqueId', uniqueId);
        params.set('password', password);
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'reset', "", options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ResetService.prototype.handleError = function (error) {
        console.error('ApiService::handleError', error);
        return Observable_1.Observable.throw(error);
    };
    return ResetService;
}());
ResetService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ResetService);
exports.ResetService = ResetService;
//# sourceMappingURL=reset.service.js.map