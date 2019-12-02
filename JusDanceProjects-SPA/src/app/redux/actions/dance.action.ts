import { NgRedux } from '@angular-redux/store';
import { IDanceState } from '@redux/store';
import { DanceCourseType } from '@models/dance-course-type';
import { AlertService } from '@services/_alert';
import { DanceService } from '@services/dance.service';
import { Injectable } from '@angular/core';

export enum DanceActionsTypes {
  GET_COURSE_TYPES = '[Dance] Get CourseTypes',
  GET_COURSE_TYPES_SUCCES = '[Dance] Get CourseTypes succesful',
  GET_COURSE_TYPES_ERROR = '[Dance] Get CourseTypes error',
  LOADABLE_RESET = '[LOADABLE] Reset loadable'
}

@Injectable({ providedIn: 'root' })
export class DanceActions {
  constructor(
    private danceService: DanceService,
    private ngRedux: NgRedux<IDanceState>,
    private alertService: AlertService
  ) {}

  getDanceCourseTypes() {
    this.alertService.clear();

    this.ngRedux.dispatch({
      type: DanceActionsTypes.GET_COURSE_TYPES
    });

    this.danceService.getDanceCourseTypes().subscribe(
        (response: DanceCourseType[]) => {

        if (response != null) {
          this.ngRedux.dispatch({
            type: DanceActionsTypes.GET_COURSE_TYPES_SUCCES,
            payload: response
          });
        } else {
          this.alertService.warn('response != null');
        }
      },
      error => {
        console.log(error);

        this.alertService.warn(error);

        this.ngRedux.dispatch({
          type: DanceActionsTypes.GET_COURSE_TYPES_ERROR,
          payload: error
        });
      }
    );
  }

  resetLoadable() {
    console.log(DanceActionsTypes.LOADABLE_RESET);

    this.ngRedux.dispatch({
      type: DanceActionsTypes.LOADABLE_RESET
    });
  }
}
