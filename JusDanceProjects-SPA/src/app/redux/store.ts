import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { userReducer } from './reducers/user.reducer';
import { Loadable } from './helper/loadable';

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
export interface IAppState {
  user?: IUserState;
}

export const rootReducer = combineReducers<IAppState>({
  user: userReducer,
  router: routerReducer
} as any);
