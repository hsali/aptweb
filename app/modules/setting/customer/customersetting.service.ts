﻿import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
@Injectable()
export class CustomerSettingService {
    constructor(private http: Http) { }
    get(url: string, id: number): Observable<any> {
        console.log(id);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', JSON.stringify(id));
        params.set('customId', '0');
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'customersetting', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    getCustomFieldById(url: string, customId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('organizationId', '0');
        params.set('customId', JSON.stringify(customId));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.get(url + 'customersetting', options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    post(url: string, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url + 'customersetting', body, options)
            .map((response: Response) => <any>response.json())
            .catch(this.handleError);
    }
    put(url: string, customId: number, model: any): Observable<any> {
        let body = JSON.stringify(model);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('customId', JSON.stringify(customId));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.put(url + 'customersetting', body, options)
            .catch(this.handleError);
    }
    delete(url: string, customId: number): Observable<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let params: URLSearchParams = new URLSearchParams();
        params.set('customId', JSON.stringify(customId));
        let options = new RequestOptions({ headers: headers, search: params });
        return this.http.delete(url + 'customersetting', options)
            .catch(this.handleError);
    }
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}