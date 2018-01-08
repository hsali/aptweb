import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';
const apiUrl = environment.apiUrl;
@Component({
    selector: 'dashboard-component',
    moduleId: module.id,
    templateUrl: 'dashboard.html'
})
export class DashboardComponent implements OnInit {
    organizationName: string = "Personal";
    constructor(private dashboardService: DashboardService, private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
        this.LoadUser();
    }
    LoadUser() {
        this.dashboardService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
            var obj = data["results"][0];
            this.organizationName = obj["companyName"];
        });
    }
}