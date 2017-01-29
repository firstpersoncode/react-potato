import * as Immutable from 'immutable';
import { actionConstants } from './actions';

const initialState = {
  data: [],
  lastFetched: null,
  isLoading: false,
  error: null,
};

export default function PostListState(state = initialState, action) {
  const immutableState = Immutable.Map(state);
  switch (action.type) {
    case actionConstants.LOAD_POST_LIST_REQUEST:
      return immutableState
        .set('isLoading', true)
        .set('error', null)
        .toJS();
    case actionConstants.LOAD_POST_LIST_SUCCESS:
      return immutableState
        .set('data', action.payload)
        .set('lastFetched', action.meta.lastFetched)
        .set('isLoading', false)
        .toJS();
    case actionConstants.LOAD_POST_LIST_FAILURE:
      return immutableState
        .set('error', action.payload)
        .toJS();
    default:
      return state;
  }
}
