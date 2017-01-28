import serviceWorkerConfig from '../../../config/service-worker';

// Add chuck from code-splitting to cache on serviceWorker
export default (nextState) => {
  const { pathname } = nextState.location;
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator && serviceWorkerConfig.active && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      type: 'ADD_CHUNK',
      payload: pathname,
    });
  }
};
