import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Login } from './login';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'login.html'
})
export class LoginComponent implements OnInit {
    login: Login[];
    userForm: FormGroup;
    public isValidLogin = false;
    constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) { }
    ngOnInit() {
        this.userForm = this.fb.group({
            emailAddress: ['', Validators.required],
            password: ['', Validators.required],
        });
    }
    onSubmit(formData: any) {
        this.loginService.get(apiUrl, formData.value['emailAddress'], formData.value['password']).subscribe((data: any) => {
            if (data["results"][0]) {
                sessionStorage.setItem('organizationId', JSON.stringify(data["results"][0]));
                sessionStorage.setItem('isMenuhidden', "false");
                this.router.navigate(['/appointment']);
            }
            else {
                this.isValidLogin = true;
                //wait 3 Seconds and hide invalid login message.
                setTimeout(function () {
                    this.isValidLogin = false;
                }.bind(this), 3000);
            }
        });
    }
}