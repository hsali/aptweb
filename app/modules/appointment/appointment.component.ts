import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from './appointment.service';
import { ResourcesService } from '../../modules/resources/resources.service';
import { Resource } from '../../modules/resources/resource';
import { environment } from '../../environments/environment';
import { WeeklyDay } from './weeklyday';
import { Router } from "@angular/router";
const apiUrl = environment.apiUrl;
@Component({
    moduleId: module.id,
    templateUrl: 'appointment.html'
})
export class AppointmentComponent implements OnInit {
    userForm: FormGroup;
    isDailyActive: boolean = true;
    allTimes: any;
    weeklyDays: WeeklyDay[];
    todayDate: string;
    resources: Resource[];
    constructor(private fb: FormBuilder, private resourcesService: ResourcesService, private appointmentService: AppointmentService, private router: Router) {
        if (sessionStorage.getItem("organizationId") == null) {
            this.router.navigate(['']);
        }
        this.FillAllTimes();
        this.LoadResources();
        this.LoadWeeklyDays(new Date(), true);
    }
    LoadResources() {
        this.resourcesService.getResources(apiUrl, Number(sessionStorage.getItem("organizationId")))
            .subscribe((data: any) => {
                this.resources = data["results"];
            });
    }
    LoadWeeklyDays(date: any, isToday: boolean) {
        this.weeklyDays = [];
        //Tue, Wed, Thu, Fri, Sat, Sun, Mon
        //1st, 2nd, 3rd, 4th upto 30th
        //Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec
        console.log(date);
        var weekday = new Array(7);
        weekday[1] = "Sun";   
        weekday[2] = "Mon";
        weekday[3] = "Tue";
        weekday[4] = "Wed";
        weekday[5] = "Thu";
        weekday[6] = "Fri";
        weekday[7] = "Sat";
        var months = new Array(12);
        months[1] = "Jan";
        months[2] = "Feb";
        months[3] = "Mar";
        months[4] = "Apr";
        months[5] = "May";
        months[6] = "Jun";
        months[7] = "Jul";
        months[8] = "Aug";
        months[9] = "Sep";
        months[10] = "Oct";
        months[11] = "Nov";
        months[12] = "Dec";
        var k = 7;
        var currentDate = date.getDate();
        var currentday = date.getDay();
        for (var i = currentday; i <= currentday + 6; i++)
        {
            var day = "";
            if (currentDate == 1) {
                day = "1st";
            }
            else if (currentDate == 2) {
                day = "2nd";
            }
            else if (currentDate == 3) {
                day = "3nd";
            }
            else {
                day = currentDate + "th";
            }
            currentDate++;
            var month = months[date.getMonth() + 1];
            var dayname = "";
            if (i > k) {
                console.log("i: " + i);
                console.log("k: " + k);
                dayname = weekday[i-k];
                k = k--;
            }
            else {
                dayname = weekday[i];
            }
            this.weeklyDays.push({
                id: i, weekday: day, dayname: dayname, monthname: month
            });
            if (isToday == true && i == date.getDay())
            {
                this.todayDate = day + " " + dayname + " " + month;
            }
        }
    }
    ngOnInit() {
    }
    changeTabs(isdailyActive: boolean) {
        this.isDailyActive = isdailyActive;
        console.log(this.isDailyActive);
    }
    onSubmit(formData: any) {
    }
    FillAllTimes() {
        this.allTimes = [
            { "time": "12:00 am" }, { "time": "12:15 am" }, { "time": "12:30 am" }, { "time": "12:45 am" },
            { "time": "1:00 am" }, { "time": "1:15 am" }, { "time": "1:30 am" }, { "time": "1:45 am" },
            { "time": "2:00 am" }, { "time": "2:15 am" }, { "time": "2:30 am" }, { "time": "2:45 am" },
            { "time": "3:00 am" }, { "time": "3:15 am" }, { "time": "3:30 am" }, { "time": "3:45 am" },
            { "time": "4:00 am" }, { "time": "4:15 am" }, { "time": "4:30 am" }, { "time": "4:45 am" },
            { "time": "5:00 am" }, { "time": "5:15 am" }, { "time": "5:30 am" }, { "time": "5:45 am" },
            { "time": "6:00 am" }, { "time": "6:15 am" }, { "time": "6:30 am" }, { "time": "6:45 am" },
            { "time": "7:00 am" }, { "time": "7:15 am" }, { "time": "7:30 am" }, { "time": "7:45 am" },
            { "time": "8:00 am" }, { "time": "8:15 am" }, { "time": "8:30 am" }, { "time": "8:45 am" },
            { "time": "9:00 am" }, { "time": "9:15 am" }, { "time": "9:30 am" }, { "time": "9:45 am" },
            { "time": "10:00 am" }, { "time": "10:15 am" }, { "time": "10:30 am" }, { "time": "10:45 am" },
            { "time": "11:00 am" }, { "time": "11:15 am" }, { "time": "11:30 am" }, { "time": "11:45 am" },
            { "time": "12:00 pm" }, { "time": "12:15 pm" }, { "time": "12:30 pm" }, { "time": "12:45 am" },
            { "time": "1:00 pm" }, { "time": "1:15 pm" }, { "time": "1:30 pm" }, { "time": "1:45 pm" },
            { "time": "2:00 pm" }, { "time": "2:15 pm" }, { "time": "2:30 pm" }, { "time": "2:45 pm" },
            { "time": "3:00 pm" }, { "time": "3:15 pm" }, { "time": "3:30 pm" }, { "time": "3:45 pm" },
            { "time": "4:00 pm" }, { "time": "4:15 pm" }, { "time": "4:30 pm" }, { "time": "4:45 pm" },
            { "time": "5:00 pm" }, { "time": "5:15 pm" }, { "time": "5:30 pm" }, { "time": "5:45 pm" },
            { "time": "6:00 pm" }, { "time": "6:15 pm" }, { "time": "6:30 pm" }, { "time": "6:45 pm" },
            { "time": "7:00 pm" }, { "time": "7:15 pm" }, { "time": "7:30 pm" }, { "time": "7:45 pm" },
            { "time": "8:00 pm" }, { "time": "8:15 pm" }, { "time": "8:30 pm" }, { "time": "8:45 pm" },
            { "time": "9:00 pm" }, { "time": "9:15 pm" }, { "time": "9:30 pm" }, { "time": "9:45 pm" },
            { "time": "10:00 pm" }, { "time": "10:15 pm" }, { "time": "10:30 pm" }, { "time": "10:45 pm" },
            { "time": "11:00 pm" }, { "time": "11:15 pm" }, { "time": "11:30 pm" }, { "time": "11:45 pm" }
        ];
    }
}