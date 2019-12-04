const deepFreeze = require('deep-freeze');
import {
  userReducer,
  createDefaultIUserState
} from '@redux/reducers/user.reducer';
import * as types from '@redux/actions/user.action';
import { onLoadableLoad, onLoadableSuccess } from '@redux/helper/loadable';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserState } from '@redux/store';

describe('user reducer', () => {
  it('should return the initial state', () => {
    // ARRANGE - ACT - ASSERT

    // Arrange
    const expectedOutput: IUserState = createDefaultIUserState();

    // Act
    const result = userReducer(undefined, {});

    // Assert
    expect(result).toEqual(expectedOutput);
  });

  it('login user', () => {
    // Arrange
    const inputState: IUserState = createDefaultIUserState(); // Configuring my previous state
    const actionObject = { type: types.UserActionsTypes.LOGIN_USER }; // Action object
    const expectedOutput: IUserState = onLoadableLoad(
      createDefaultIUserState()
    ); // After test I want this!

    deepFreeze(inputState);

    // Act
    const result = userReducer(inputState, actionObject); // Perform test

    // Assert
    expect(result).toEqual(expectedOutput); // If true, test passes
  });

  it('login user succes', () => {
    // Arrange
    const token =
      // tslint:disable-next-line: max-line-length
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNiIsInVuaXF1ZV9uYW1lIjoidGVzdDEyMzQ1NiIsIm5iZiI6MTU3NDg2MjMxMiwiZXhwIjoxNTc0OTQ4NzEyLCJpYXQiOjE1NzQ4NjIzMTJ9.gJKpQ57kcnC4iMdHQoQFSfWCC7EVpokuXzrU7WHb9Bsh94NQpsPggXtU2d0uktUlPFjkMqyZolowp4EnGO31PQ';
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);

    const inputState: IUserState = onLoadableLoad(createDefaultIUserState()); // Configuring my previous state
    const actionObject = {
      type: types.UserActionsTypes.LOGIN_USER_SUCCES,
      payload: { loggedIn: true, decodeToken: decodedToken }
    };
    const expectedOutput: IUserState = {
      loggedIn: true,
      loggedInUser: null,
      decodeToken: decodedToken,
      loading: false,
      success: true,
      error: null
    };

    deepFreeze(inputState);

    // Act
    const result = userReducer(inputState, actionObject); // Perform test

    // Assert
    expect(result).toEqual(expectedOutput); // If true, test passes
  });

  it('login user error', () => {
    // Arrange
    const inputState: IUserState = onLoadableLoad(createDefaultIUserState()); // Configuring my previous state
    const actionObject = {
      type: types.UserActionsTypes.LOGIN_USER_ERROR,
      payload: 'Error!'
    }; // Action object
    const expectedOutput: IUserState = {
      loggedIn: false,
      loggedInUser: null,
      decodeToken: null,
      loading: false,
      success: false,
      error: 'Error!'
    } as IUserState;

    deepFreeze(inputState);

    // Act
    const result = userReducer(inputState, actionObject); // Perform test

    // Assert
    expect(result).toEqual(expectedOutput); // If true, test passes
  });

  it('logout user', () => {
    // Arrange
    const token =
      // tslint:disable-next-line: max-line-length
      'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyNiIsInVuaXF1ZV9uYW1lIjoidGVzdDEyMzQ1NiIsIm5iZiI6MTU3NDg2MjMxMiwiZXhwIjoxNTc0OTQ4NzEyLCJpYXQiOjE1NzQ4NjIzMTJ9.gJKpQ57kcnC4iMdHQoQFSfWCC7EVpokuXzrU7WHb9Bsh94NQpsPggXtU2d0uktUlPFjkMqyZolowp4EnGO31PQ';
    const jwtHelper = new JwtHelperService();
    const decodedToken = jwtHelper.decodeToken(token);

    const inputState: IUserState = {
      loggedIn: true,
      loggedInUser: null,
      decodeToken: decodedToken,
      loading: false,
      success: true,
      error: null
    };
    const actionObject = {
      type: types.UserActionsTypes.LOGOUT_USER,
      payload: { loggedIn: false, decodeToken: null }
    };
    const expectedOutput: IUserState = {
      loggedIn: false,
      loggedInUser: null,
      decodeToken: null,
      loading: false,
      success: true,
      error: null
    };

    deepFreeze(inputState);

    // Act
    const result = userReducer(inputState, actionObject); // Perform test

    // Assert
    expect(result).toEqual(expectedOutput); // If true, test passes
  });
});
