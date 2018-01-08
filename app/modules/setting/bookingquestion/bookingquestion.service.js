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
var BookingQuestionService = (function () {
    function BookingQuestionService(http) {
        this.http = http;
    }
    BookingQuestionService.prototype.get = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        params.set('bookingQuestionId', '0');
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'bookingquestion', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BookingQuestionService.prototype.getBookingQuestionById = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('organizationId', '0');
        params.set('bookingQuestionId', JSON.stringify(id));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'bookingquestion', options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BookingQuestionService.prototype.post = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url + 'bookingquestion', body, options)
            .catch(this.handleError);
    };
    BookingQuestionService.prototype.postQuestion = function (url, bookingQuestionId) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('bookingQuestionId', JSON.stringify(bookingQuestionId));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.post(url + 'questionservice', "", options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    BookingQuestionService.prototype.postQuestionServices = function (url, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url + 'questionservice', body, options)
            .catch(this.handleError);
    };
    BookingQuestionService.prototype.put = function (url, id, model) {
        var body = JSON.stringify(model);
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('bookingQuestionId', JSON.stringify(id));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'bookingquestion', body, options)
            .catch(this.handleError);
    };
    BookingQuestionService.prototype.delete = function (url, id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var params = new http_1.URLSearchParams();
        params.set('bookingQuestionId', JSON.stringify(id));
        var options = new http_1.RequestOptions({ headers: headers, search: params });
        return this.http.delete(url + 'bookingquestion', options)
            .catch(this.handleError);
    };
    BookingQuestionService.prototype.handleError = function (error) {
        console.error('ApiService::handleError', error);
        return Observable_1.Observable.throw(error);
    };
    return BookingQuestionService;
}());
BookingQuestionService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], BookingQuestionService);
exports.BookingQuestionService = BookingQuestionService;
//# sourceMappingURL=bookingquestion.service.js.map