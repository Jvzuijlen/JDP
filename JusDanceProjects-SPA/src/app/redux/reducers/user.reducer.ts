import { IUserState } from '@redux/store';
import { UserActionsTypes } from '@redux/actions/user.action';
import { tassign } from 'tassign';
import {
  createDefaultLoadable,
  onLoadableLoad,
  onLoadableSuccess,
  onLoadableError
} from '@redux/helper/loadable';

export function createDefaultIUserState(): IUserState {
  return {
    ...createDefaultLoadable(),
    token: null
  };
}

export function userReducer(
  state: IUserState = createDefaultIUserState(),
  action: any
) {
  switch (action.type) {
    case UserActionsTypes.REGISTER_USER:
      return tassign(state, onLoadableLoad(state));
    case UserActionsTypes.REGISTER_USER_SUCCES:
      return tassign(state, onLoadableSuccess(state));
    case UserActionsTypes.REGISTER_USER_ERROR:
      return tassign(state, onLoadableError(state, action.payload));
    case UserActionsTypes.LOGIN_USER:
      return tassign(state, onLoadableLoad(state));
    case UserActionsTypes.LOGIN_USER_SUCCES:
      return tassign(state, onLoadableSuccess(state), state.token = action.payload);
    case UserActionsTypes.LOGIN_USER_ERROR:
      return tassign(state, onLoadableError(state, action.payload));
    default:
      return state;
  }
}

// function baseUserReducer(state: IUserState = createDefaultIUserState(), action: any): IUserState {
//   switch (action.type) {
//     case UserActionsTypes.REGISTER_USER:
//       return state;
//     default:
//       return state;
//   }
// }

// export function userReducer(state: IUserState, action: any): IUserState {
//   return withLoadable(baseUserReducer, {
//     loadingActionType: UserActionsTypes.REGISTER_USER,
//     successActionType: UserActionsTypes.REGISTER_USER_SUCCES,
//     errorActionType: UserActionsTypes.REGISTER_USER_ERROR,
//   })(state, action);
// }

// case LiftActions.GET_TRIPS:
//   return tassign(state, { lifts: action.payload });

// case LiftActions.IS_LOADING:
//   return tassign(state, { isLoading: action.payload });

// case LiftActions.CREATE_TRIP:
//   const newLifts = [...state.lifts, action.payload]; // Javascript spread operator
//   return tassign(state, { lifts: newLifts, isLoading: false });

// case LiftActions.DELETE_TRIP:
//   const afterDeleteTrips: Trip[] = state.lifts.filter(
//     trip => trip._id !== action.payload
//   );

//   return tassign(state, { lifts: afterDeleteTrips });

// case LiftActions.SET_TYPE:
//   // return Object.assign({}, state, { isLift: action.payload });
//   return tassign(state, { isLift: action.payload });