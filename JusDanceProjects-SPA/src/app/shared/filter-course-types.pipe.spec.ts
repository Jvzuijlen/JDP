import { TestBed, async } from '@angular/core/testing';
import { FilterCourseTypesPipe } from './filter-course-types.pipe';
import { DanceCourseType } from '@models/dance-course-type';
import { DanceActionsTypes } from '@redux/actions/dance.action';

// 0.0: Create filter an instance
// 0.1: Return empty array if array of courses is empty while searching on specific value.
// 0.2: Return empty array if array of courses is empty while searchstring is undefined.
// 0.3: Return entire array if search is undefined.
// 0.4: Return entire array if search is empty string.

// 1.0: Filter courses by searching for course title
// 1.1: Filter courses by searching for course description

// 2.0: Don't find courses when searching for something not in the array
// 2.1: Search for description but the data does not contain description

function getTestDate(): DanceCourseType[] {
  return [
    {id: 1, title: 'hiphop', description: 'dance style is hip hop', photo: null, visible: true},
    {id: 2, title: 'classic', description: 'dance style is classic', photo: null, visible: true},
    {id: 3, title: 'hi test', description: 'dance style is test jump', photo: null, visible: true},
    {id: 4, title: 'urban', description: undefined, photo: null, visible: true}
  ];
}

describe('Pipe: FilterCourseTypese', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterCourseTypesPipe]
    });
  });

  it('0.0: Create filter an instance', () => {
    const pipe = new FilterCourseTypesPipe();
    expect(pipe).toBeTruthy();
  });

  it('0.1: Return empty array if array of courses is empty while searching on specific value.', () => {
    // Arrange
    const filter = new FilterCourseTypesPipe();
    const data = [];
    const search = 'Dance';
    const expectedResult = [];

    // Act
    const result = filter.transform(data, search);

    // Assert (expect)
    expect(result).toEqual(expectedResult);
  });

  it('0.2: Return empty array if array of courses is empty while searchstring is undefined.', () => {
    // Arrange
    const filter = new FilterCourseTypesPipe();
    const data = [];
    const search = undefined;
    const expectedResult = [];

    // Act
    const result = filter.transform(data, search);

    // Assert (expect)
    expect(result).toEqual(expectedResult);
  });

  it('0.3: Return entire array if search is undefined', () => {
    // Arrange
    const filter = new FilterCourseTypesPipe();
    const data = getTestDate();
    const search = undefined;
    const expectedResult = getTestDate();

    // Act
    const result = filter.transform(data, search);

    // Assert (expect)
    expect(result).toEqual(expectedResult);
  });

  it('0.4: Return entire array if search is empty string.', () => {
    // Arrange
    const filter = new FilterCourseTypesPipe();
    const data = getTestDate();
    const search = '';
    const expectedResult = getTestDate();

    // Act
    const result = filter.transform(data, search);

    // Assert (expect)
    expect(result).toEqual(expectedResult);
  });

  it('1.0: Filter courses by searching for course title', () => {
    // Arrange
    const filter = new FilterCourseTypesPipe();
    const data = getTestDate();
    const search = 'hip';
    const expectedResult = [getTestDate()[0]];

    // Act
    const result = filter.transform(data, search);

    // Assert (expect)
    expect(result).toEqual(expectedResult);
  });

  it('1.1: Filter courses by searching for course description', () => {
    // Arrange
    const filter = new FilterCourseTypesPipe();
    const data = getTestDate();
    const search = 'jump';
    const expectedResult = [getTestDate()[2]];

    // Act
    const result = filter.transform(data, search);

    // Assert (expect)
    expect(result).toEqual(expectedResult);
  });

  it('2.0: Don\'t find courses when searching for something not in the array', () => {
    // Arrange
    const filter = new FilterCourseTypesPipe();
    const data = getTestDate();
    const search = 'not';
    const expectedResult = [];

    // Act
    const result = filter.transform(data, search);

    // Assert (expect)
    expect(result).toEqual(expectedResult);
  });

  it('2.1: Search for description but the data does not contain description', () => {
    // Arrange
    const filter = new FilterCourseTypesPipe();
    const data = getTestDate();
    const search = 'jump';
    const expectedResult = [getTestDate()[2]];

    // Act
    const result = filter.transform(data, search);

    // Assert (expect)
    expect(result).toEqual(expectedResult);
  });
});
