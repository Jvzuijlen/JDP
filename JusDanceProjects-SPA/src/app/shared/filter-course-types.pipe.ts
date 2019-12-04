import { Pipe, PipeTransform, Injectable } from '@angular/core';
import { DanceCourseType } from '@models/dance-course-type';

@Pipe({
  name: 'filterCourseTypes'
})
@Injectable()
export class FilterCourseTypesPipe implements PipeTransform {

  transform(items: DanceCourseType[], searchInput: any): any {

    if (searchInput === undefined) {
      return items;
    }

    searchInput = searchInput.toLowerCase();
    return items.filter(course =>
      course.title && course.title.toLowerCase().includes(searchInput) ||
      course.description && course.description.toLowerCase().includes(searchInput));
  }

}
