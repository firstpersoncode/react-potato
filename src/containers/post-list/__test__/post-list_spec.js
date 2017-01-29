import { expect } from 'chai';
import { actionConstants } from '../actions';
import reducer from '../reducer';

// Remove this
import fakeDB from '../../../../server/fake-db';

describe('PostList Reducer', () => {
  const initialState = {
    lastFetched: null,
    isLoading: false,
    error: null,
    data: [],
  };

  it('should return default state if action is undefined', () => {
    const nextState = reducer(initialState, 'BLAH');
    expect(nextState).to.deep.equal(initialState);
  });

  it('should handle LOAD_POST_LIST_REQUEST', () => {
    const action = {
      type: actionConstants.LOAD_POST_LIST_REQUEST,
    };

    const expectedNextState = {
      lastFetched: null,
      isLoading: true,
      error: null,
      data: [],
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal(expectedNextState);
  });

  it('should handle LOAD_POST_LIST_SUCCESS', () => {
    const currentTime = Date.now();

    const action = {
      type: actionConstants.LOAD_POST_LIST_SUCCESS,
      payload: fakeDB,
      meta: {
        lastFetched: currentTime,
      },
    };

    const expectedNextState = {
      lastFetched: currentTime,
      isLoading: false,
      error: null,
      data: fakeDB,
    };

    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal(expectedNextState);
  });

  it('should handle LOAD_POST_LIST_FAILURE', () => {
    const error = new Error('Invalid request');
    const action = {
      type: actionConstants.LOAD_POST_LIST_FAILURE,
      payload: error,
      error: true,
    };

    const expectedNextState = {
      lastFetched: null,
      isLoading: false,
      error,
      data: [],
    };
    const nextState = reducer(initialState, action);
    expect(nextState).to.deep.equal(expectedNextState);
  });
});
