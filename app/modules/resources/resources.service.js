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
var ResourcesService = (function () {
    function ResourcesService(http) {
        this.http = http;
    }
    ResourcesService.prototype.post = function (url, resourceId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('resourceId', JSON.stringify(resourceId));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.post(url + 'serviceresource', "", options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ResourcesService.prototype.postResources = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url + 'resource', body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ResourcesService.prototype.postServiceResources = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url + 'serviceresource', body, options)
            .catch(this.handleError);
    };
    ResourcesService.prototype.putResources = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('resourceId', JSON.stringify(id));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'resource', body, options)
            .catch(this.handleError);
    };
    ResourcesService.prototype.deleteResources = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('resourceId', JSON.stringify(id));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.delete(url + 'resource', options)
            .catch(this.handleError);
    };
    ResourcesService.prototype.getServices = function (url, id) {
        console.log(id);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        params.set('serviceId', '0');
        params.set('resourceId', '0');
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'service', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ResourcesService.prototype.getResources = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        params.set('serviceId', '0');
        params.set('resourceId', '0');
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'resource', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ResourcesService.prototype.getResourceById = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('organizationId', '0');
        params.set('serviceId', '0');
        params.set('resourceId', JSON.stringify(id));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'resource', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ResourcesService.prototype.getServicesByResourceId = function (url, resourceId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('organizationId', '0');
        params.set('serviceId', '0');
        params.set('resourceId', JSON.stringify(resourceId));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'service', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ResourcesService.prototype.getResourcesByServiceId = function (url, serviceId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('organizationId', '0');
        params.set('serviceId', JSON.stringify(serviceId));
        params.set('resourceId', '0');
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'resource', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    ResourcesService.prototype.handleError = function (error) {
        console.error('ApiService::handleError', error);
        return Observable_1.Observable.throw(error);
    };
    return ResourcesService;
}());
ResourcesService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], ResourcesService);
exports.ResourcesService = ResourcesService;
//# sourceMappingURL=resources.service.js.map