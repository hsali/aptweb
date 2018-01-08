import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Customer } from './customer';
import { environment } from '../../environments/environment';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'customer.html'
})
export class CustomerComponent implements OnInit {
    customers: Customer[];
    customer: Customer;
    userForm: FormGroup;
    savebuttonText: string = "Save";
    removeCustomerId: number = 0;
    updatedCustomerId: number = 0;
    public isValidLogin = false;
    constructor(private fb: FormBuilder, private customerService: CustomerService, private router: Router) {
        this.LoadCustomers();
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
    }
    ngOnInit() {
        this.ClearFields();
    }
    ClearFields() {
        this.userForm = this.fb.group({
            firstName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            lastName: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            mobileNumber: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            contactNumber: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
            emailAddress: ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
            twitterUserName: ['', Validators.maxLength(50)],
            malegender: [true],
            femalegender: [false],
            dateOfBirth: ['', Validators.compose([Validators.required, Validators.maxLength(10)])],
            unsubscribed: [false],
            addressLine1: ['', Validators.maxLength(50)],
            addressLine2: ['', Validators.maxLength(50)],
            city: ['', Validators.maxLength(50)],
            postCode: ['', Validators.maxLength(50)],
            tags: [''],
            firstNameSearch: [''],
            lastNameSearch: [''],
            emailAddressSearch: [''],
            citySearch:['']
        });
        this.savebuttonText = "Save";
        this.updatedCustomerId = 0;
        this.removeCustomerId = 0;
        //this.LoadCustomers();
    }
    LoadCustomers() {
        this.customerService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe((data: any) => {
            this.customers = data["results"];
            console.log(data["results"]);
        });
    }
    LoadCustomerById(customerId: number) {
        this.savebuttonText = "Update";
        this.updatedCustomerId = customerId;
        this.removeCustomerId = 0;
        this.customerService.getCustomerById(apiUrl, customerId)
            .subscribe((data: any) => {
                console.log(data);
                var obj = data["results"][0];
                var gender = obj["gender"] == true ? true : false;
                this.userForm = this.fb.group({
                    firstName: [obj["firstName"], Validators.compose([Validators.required, Validators.maxLength(50)])],
                    lastName: [obj["lastName"], Validators.compose([Validators.required, Validators.maxLength(50)])],
                    mobileNumber: [obj["mobileNumber"], Validators.compose([Validators.required, Validators.maxLength(50)])],
                    contactNumber: [obj["contactNumber"], Validators.compose([Validators.required, Validators.maxLength(50)])],
                    emailAddress: [obj["emailAddress"], Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(100), Validators.email])],
                    twitterUserName: [obj["twitterUserName"], Validators.maxLength(50)],
                    malegender: [gender],
                    femalegender: [!gender],
                    dateOfBirth: [obj["dateOfBirth"], Validators.compose([Validators.required, Validators.maxLength(10)])],
                    unsubscribed: [obj["unsubscribed"]],
                    addressLine1: [obj["addressLine1"], Validators.maxLength(50)],
                    addressLine2: [obj["addressLine2"], Validators.maxLength(50)],
                    city: [obj["city"], Validators.maxLength(50)],
                    postCode: [obj["postCode"], Validators.maxLength(50)],
                    tags: ['']
                });
            });
    }
    CustomerIdForDelete(customerId: number) {
        this.removeCustomerId = customerId;
        console.log(this.removeCustomerId);
    }
    RemoveCustomer() {
        this.customerService.deleteCustomer(apiUrl, this.removeCustomerId).subscribe((data: any) => {
            this.LoadCustomers();
            this.ClearFields();
        });
    }
    SearchCustomers(firstname: any, lastname: any, emailaddress: any, city: any) {
        this.customerService.getCustomerByFilter(apiUrl, Number(sessionStorage.getItem("organizationId")), firstname.value, lastname.value, emailaddress.value, city.value).subscribe((data: any) => {
            this.customers = data["results"];
        });
    }
    onSubmit(formData: any) {
        var genderStatus = formData.controls["malegender"].checked == true ? true : false;
        this.customer = {
            customerId: this.updatedCustomerId,
            organizationId: Number(sessionStorage.getItem("organizationId")),
            firstName: formData.controls["firstName"].value,
            lastName: formData.controls["lastName"].value,
            mobileNumber: formData.controls["mobileNumber"].value,
            contactNumber: formData.controls["contactNumber"].value,
            emailAddress: formData.controls["emailAddress"].value,
            twitterUserName: formData.controls["twitterUserName"].value,
            gender: genderStatus,
            dateOfBirth: formData.controls["dateOfBirth"].value,
            unsubscribed: formData.controls["unsubscribed"].value,
            addressLine1: formData.controls["addressLine1"].value,
            addressLine2: formData.controls["addressLine2"].value,
            city: formData.controls["city"].value,
            postCode: formData.controls["postCode"].value,
            profileImage: '',
            isDeleted: false
        };
        if (this.updatedCustomerId == 0) {
            this.customerService.postCustomer(apiUrl, this.customer).subscribe((data: any) => {
                this.LoadCustomers();
            });
        }
        else {
            this.customerService.putCustomer(apiUrl, this.updatedCustomerId, this.customer).subscribe((data: any) => {
                this.LoadCustomers();
            });
        }
        this.ClearFields();
    }
}