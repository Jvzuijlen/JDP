import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { userReducer } from './reducers/user.reducer';
import { Loadable } from './helper/loadable';
import { DanceCourseType } from '@models/dance-course-type';
import { danceReducer } from './reducers/dance.reducer';

export interface DecodedToken {
  nameid: string;
  unique_name: string;
  nbf: string;
  exp: string;
  iat: string;
}

export interface IUserState extends Loadable {
  loggedIn: boolean;
  decodeToken: DecodedToken;
}
export interface IDanceState extends Loadable {
  courseTypes: DanceCourseType[];
}
export interface IAppState {
  user?: IUserState;
  dance?: IDanceState;
}

export const rootReducer = combineReducers<IAppState>({
  user: userReducer,
  dance: danceReducer,
  router: routerReducer
} as any);
