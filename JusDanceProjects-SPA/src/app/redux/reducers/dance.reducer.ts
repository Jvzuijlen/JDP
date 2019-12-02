import { IDanceState } from '@redux/store';
import { DanceActionsTypes } from '@redux/actions/dance.action';
import { tassign } from 'tassign';
import {
  createDefaultLoadable,
  onLoadableLoad,
  onLoadableSuccess,
  onLoadableError,
  onLoadableReset
} from '@redux/helper/loadable';

export function createDefaultIDanceState(): IDanceState {
  return {
    ...createDefaultLoadable(),
    courseTypes: []
  };
}

export function danceReducer(
  state: IDanceState = createDefaultIDanceState(),
  action: any
) {
  switch (action.type) {
    case DanceActionsTypes.GET_COURSE_TYPES:
      return tassign(state, onLoadableLoad(state));
    case DanceActionsTypes.GET_COURSE_TYPES_SUCCES:
      return tassign(onLoadableSuccess(state), {courseTypes: action.payload});
    case DanceActionsTypes.GET_COURSE_TYPES_ERROR:
      return tassign(state, onLoadableError(state, action.payload));
    case DanceActionsTypes.LOADABLE_RESET:
      return onLoadableReset(state);
    default:
      return state;
  }
}
