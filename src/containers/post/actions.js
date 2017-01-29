export const actionConstants = {
  LOAD_POST_REQUEST: 'post/LOAD_POST_REQUEST',
  LOAD_POST_SUCCESS: 'post/LOAD_POST_SUCCESS',
  LOAD_POST_FAILURE: 'post/LOAD_POST_FAILURE',
};

export function loadPost(slug) {
  return (dispatch, getState, { axios }) => {
    const { protocol, host } = getState().sourceRequest;
    dispatch({ type: actionConstants.LOAD_POST_REQUEST });
    return axios.get(`${protocol}://${host}/api/v1/posts/${slug}`)
      .then((res) => {
        dispatch({
          type: actionConstants.LOAD_POST_SUCCESS,
          payload: res.data,
          meta: {
            lastFetched: Date.now(),
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: actionConstants.LOAD_POST_FAILURE,
          payload: error,
          error: true,
        });
      });
  };
}
