const deepFreeze = require('deep-freeze');
import {
  danceReducer,
  createDefaultIDanceState
} from '@redux/reducers/dance.reducer';
import * as types from '@redux/actions/dance.action';
import { onLoadableLoad, onLoadableSuccess } from '@redux/helper/loadable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IDanceState } from '@redux/store';
import { DanceCourseType } from '@models/dance-course-type';

function getTestDate(): DanceCourseType[] {
  return [
    {
      id: 1,
      title: 'hiphop',
      description: 'dance style is hip hop',
      photo: null,
      visible: true
    },
    {
      id: 2,
      title: 'classic',
      description: 'dance style is classic',
      photo: null,
      visible: true
    },
    {
      id: 3,
      title: 'hi test',
      description: 'dance style is test jump',
      photo: null,
      visible: true
    },
    {
      id: 4,
      title: 'urban',
      description: undefined,
      photo: null,
      visible: true
    }
  ];
}

describe('dance reducer', () => {
  it('should return the initial state', () => {
    // ARRANGE - ACT - ASSERT

    // Arrange
    const expectedOutput: IDanceState = createDefaultIDanceState();

    // Act
    const result = danceReducer(undefined, {});

    // Assert
    expect(result).toEqual(expectedOutput);
  });

  it('get courses', () => {
    // Arrange
    const inputState: IDanceState = createDefaultIDanceState(); // Configuring my previous state
    const actionObject = { type: types.DanceActionsTypes.GET_COURSE_TYPES }; // Action object
    const expectedOutput: IDanceState = onLoadableLoad(
      createDefaultIDanceState()
    ); // After test I want this!

    deepFreeze(inputState);

    // Act
    const result = danceReducer(inputState, actionObject); // Perform test

    // Assert
    expect(result).toEqual(expectedOutput); // If true, test passes
  });

  it('get courses succes', () => {
    // Arrange
    const inputState: IDanceState = onLoadableLoad(createDefaultIDanceState());
    const actionObject = {
      type: types.DanceActionsTypes.GET_COURSE_TYPES_SUCCES,
      payload: getTestDate()
    }; // Action object
    const expectedOutput: IDanceState = {
      loading: false,
      success: true,
      error: null,
      courseTypes: getTestDate()
    };

    deepFreeze(inputState);

    // Act
    const result = danceReducer(inputState, actionObject); // Perform test

    // Assert
    expect(result).toEqual(expectedOutput); // If true, test passes
  });

  it('get courses error', () => {
    // Arrange
    const inputState: IDanceState = onLoadableLoad(createDefaultIDanceState());
    const actionObject = {
      type: types.DanceActionsTypes.GET_COURSE_TYPES_ERROR,
      payload: 'Error!'
    };
    const expectedOutput: IDanceState = {
      loading: false,
      success: false,
      error: 'Error!',
      courseTypes: []
    };

    deepFreeze(inputState);

    // Act
    const result = danceReducer(inputState, actionObject); // Perform test

    // Assert
    expect(result).toEqual(expectedOutput); // If true, test passes
  });
});
