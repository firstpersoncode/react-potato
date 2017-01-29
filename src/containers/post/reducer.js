import * as Immutable from 'immutable';
import { actionConstants } from './actions';

const initialState = {
  lastFetched: null,
  isLoading: false,
  error: null,
  title: '',
  content: '',
};

export default function PostState(state = initialState, action) {
  const immutableState = Immutable.Map(state);
  switch (action.type) {
    case actionConstants.LOAD_POST_REQUEST:
      return immutableState
        .set('isLoading', true)
        .set('error', null)
        .toJS();
    case actionConstants.LOAD_POST_SUCCESS:
      return immutableState
        .set('title', action.payload.title)
        .set('content', action.payload.content)
        .set('lastFetched', action.meta.lastFetched)
        .set('isLoading', false)
        .toJS();
    case actionConstants.LOAD_POST_FAILURE:
      return immutableState
        .set('error', action.payload)
        .toJS();
    default:
      return state;
  }
}
