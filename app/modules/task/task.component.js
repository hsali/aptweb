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
var task_service_1 = require("./task.service");
var resources_service_1 = require("../../modules/resources/resources.service");
var customer_service_1 = require("../../modules/customer/customer.service");
var router_1 = require("@angular/router");
var environment_1 = require("../../environments/environment");
var apiUrl = environment_1.environment.apiUrl;
var TaskComponent = (function () {
    function TaskComponent(fb, taskService, customerService, resourcesService, router) {
        this.fb = fb;
        this.taskService = taskService;
        this.customerService = customerService;
        this.resourcesService = resourcesService;
        this.router = router;
        this.isMenuhidden = false;
        if (sessionStorage.getItem("isMenuhidden") == "true") {
            this.isMenuhidden = true;
        }
    }
    TaskComponent.prototype.ngOnInit = function () {
        this.ClearFields();
    };
    TaskComponent.prototype.LoadResources = function () {
        var _this = this;
        this.resourcesService.getResources(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe(function (data) {
            _this.resources = data["results"];
        });
    };
    TaskComponent.prototype.LoadCustomers = function () {
        var _this = this;
        this.customerService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            _this.customers = data["results"];
        });
    };
    TaskComponent.prototype.LoadTasks = function () {
        var _this = this;
        this.taskService.get(apiUrl, Number(sessionStorage.getItem("organizationId"))).subscribe(function (data) {
            console.log(data["results"]);
            _this.tasks = data["results"];
        });
    };
    TaskComponent.prototype.TaskIdForDelete = function (taskId) {
        this.removeTaskId = taskId;
    };
    TaskComponent.prototype.RemoveTask = function () {
        var _this = this;
        this.taskService.delete(apiUrl, this.removeTaskId).subscribe(function (data) {
            _this.LoadTasks();
            _this.ClearFields();
        });
    };
    TaskComponent.prototype.ClearFields = function () {
        this.userForm = this.fb.group({
            taskName: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.maxLength(100)])],
            drpresources: [''],
            drpcustomers: ['', forms_1.Validators.required],
            dueDate: ['', forms_1.Validators.required]
        });
        this.LoadResources();
        this.LoadCustomers();
        this.LoadTasks();
    };
    TaskComponent.prototype.onChange = function (taskId, event) {
        var _this = this;
        if (!event.target.checked) {
            this.taskService.put(apiUrl, taskId, false).subscribe(function (data) {
                _this.ClearFields();
            });
        }
        else {
            this.taskService.put(apiUrl, taskId, true).subscribe(function (data) {
                _this.ClearFields();
            });
        }
    };
    TaskComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.task = {
            taskId: 0,
            taskName: formData.controls["taskName"].value,
            resourceId: formData.controls["drpresources"].value,
            resourceName: '',
            dueDate: formData.controls["dueDate"].value,
            customerId: formData.controls["drpcustomers"].value,
            customerName: '',
            details: '',
            isTaskCompleted: false,
            completedDate: null,
            isDeleted: false
        };
        this.taskService.post(apiUrl, this.task).subscribe(function (data) {
            _this.ClearFields();
        });
    };
    return TaskComponent;
}());
TaskComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        templateUrl: 'task.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, task_service_1.TaskService, customer_service_1.CustomerService, resources_service_1.ResourcesService, router_1.Router])
], TaskComponent);
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map