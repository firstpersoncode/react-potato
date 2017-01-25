import { LOAD_POSTS_REQUEST, LOAD_POSTS_SUCCESS, LOAD_POSTS_FAILURE } from '../../constants';

export function loadPosts() {
  return (dispatch, getState, { axios }) => {
    // const { protocol, host } = getState().sourceRequest;
    dispatch({ type: LOAD_POSTS_REQUEST });
    return axios.get('/api/v0/posts')
      .then((res) => {
        dispatch({
          type: LOAD_POSTS_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now(),
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: LOAD_POSTS_FAILURE,
          payload: error,
          error: true,
        });
      });
  };
}
