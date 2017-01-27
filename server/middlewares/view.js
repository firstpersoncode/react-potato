/* eslint consistent-return:0 */
import { match, RouterContext, createMemoryHistory } from 'react-router';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Helm from 'react-helmet';
import { trigger } from 'redial';
import { configureStore } from '../../src/store';
import createRoutes from '../../src/routes';

export default (app, isProd, options) => {
  // match everything else
  app.get('*', (req, res) => {
    const store = configureStore({
      sourceRequest: {
        protocol: req.headers['x-forwarded-proto'] || req.protocol,
        host: req.headers.host,
      },
    });
    const routes = createRoutes(store);
    const history = createMemoryHistory(req.originalUrl);
    const { dispatch } = store;

    match({ routes, history }, (err, redirectLocation, renderProps) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Internal server error');
      }

      if (!renderProps) {
        return res.status(404).send('Not found');
      }

      const { components } = renderProps;

      // Define locals to be provided to all lifecycle hooks:
      const locals = {
        path: renderProps.location.pathname,
        query: renderProps.location.query,
        params: renderProps.params,
        // Allow lifecycle hooks to dispatch Redux actions:
        dispatch,
      };

      trigger('fetch', components, locals)
        .then(() => {
          const initialState = store.getState();
          const InitialView = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          );

          const html = ReactDOM.renderToString(InitialView);
          const head = Helm.rewind();
          res.status(200).send(`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charSet="utf-8">
                <meta httpEquiv="X-UA-Compatible" content="IE=edge">
                ${head.title.toString()}
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <link rel="shortcut icon" href="/favicon.ico">
                ${isProd ? '<link rel="stylesheet" type="text/css" href="/assets/style.css">' : ''}
                ${head.meta.toString()}
                ${head.link.toString()}
              </head>
              <body>
                <div id="root">${html}</div>
                <script>window.INITIAL_STATE = ${JSON.stringify(initialState)};</script>
                <script src="${isProd ? options.assets.vendor.js : '/vendor.js'}"></script>
                <script async src="${isProd ? options.assets.main.js : '/main.js'}" ></script>
              </body>
            </html>
          `);
        }).catch((e) => console.log(e));
    });
  });
};
