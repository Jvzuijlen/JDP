import { Component, OnInit } from '@angular/core';
import { DanceActions } from '@redux/actions/dance.action';
import { IAppState } from '@redux/store';
import { NgRedux } from '@angular-redux/store';
import { DanceCourseType } from '@models/dance-course-type';
import { Loadable } from '@redux/helper/loadable';

@Component({
  selector: 'app-dance-offers',
  templateUrl: './dance-offers.component.html',
  styleUrls: ['./dance-offers.component.css']
})
export class DanceOffersComponent implements OnInit {
  searchInput: string;
  courseTypes: DanceCourseType[];
  loadable: Loadable;

  constructor(
    private danceActions: DanceActions,
    private ngRedux: NgRedux<IAppState>
  ) {}

  ngOnInit() {
    this.ngRedux
      .select(x => x.dance)
      .subscribe(state => {
        this.courseTypes = state.courseTypes;
        this.loadable = state;
      });

    this.danceActions.getDanceCourseTypes();
  }
}
