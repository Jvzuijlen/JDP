import { Component } from '@angular/core';
import { NgbDatepickerConfig, NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [NgbDatepickerConfig] // add NgbDatepickerConfig to the component providers
})
export class AppComponent {
  title = 'JusDanceProjects-SPA';

  constructor(config: NgbDatepickerConfig, calendar: NgbCalendar) {
    // customize default values of datepickers used by this component tree
    config.minDate = {year: 1900, month: 1, day: 1};
    config.maxDate = calendar.getToday();

    // days that don't belong to current month are not visible
    config.outsideDays = 'hidden';
  }
}
