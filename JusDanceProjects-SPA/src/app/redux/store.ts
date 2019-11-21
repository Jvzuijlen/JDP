import { routerReducer } from '@angular-redux/router';
import { combineReducers } from 'redux';
import { userReducer } from './reducers/user.reducer';
import { Loadable } from './helper/loadable';
import { User } from '@models/user';

export interface IUserState extends Loadable {
  token: string;
}
export interface IAppState {
  user?: IUserState;
}

export const rootReducer = combineReducers<IAppState>({
  user: userReducer,
  router: routerReducer
} as any);
