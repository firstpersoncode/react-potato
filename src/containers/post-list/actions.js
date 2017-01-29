export const actionConstants = {
  LOAD_POST_LIST_REQUEST: 'postList/LOAD_POST_LIST_REQUEST',
  LOAD_POST_LIST_SUCCESS: 'postList/LOAD_POST_LIST_SUCCESS',
  LOAD_POST_LIST_FAILURE: 'postList/LOAD_POST_LIST_FAILURE',
};

export function loadPostList() {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: actionConstants.LOAD_POST_LIST_REQUEST });
    return axios.get(`${protocol}://${host}/api/v1/posts`)
      .then((res) => {
        dispatch({
          type: actionConstants.LOAD_POST_LIST_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now(),
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: actionConstants.LOAD_POST_LIST_FAILURE,
          payload: error,
          error: true,
        });
      });
  };
}
