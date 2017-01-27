/* eslint global-require: 0 */
// eslint-disable-next-line
import csshook from 'css-modules-require-hook/preset';
import http from 'http';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import hpp from 'hpp';
import throng from 'throng';
import fs from 'fs';
import path from 'path';
import spdy from 'spdy';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import defaultServerConfig from '../config/server';
import webpackConfig from '../tools/webpack.client.dev';
import { compileDev, startDev } from '../tools/dx';

import * as m from './middlewares';

export const createServer = (config) => {
  const __PROD__ = config.nodeEnv === 'production';
  const __TEST__ = config.nodeEnv === 'test';

  const app = express();
  let assets = null;
  app.disable('x-powered-by');

  if (__PROD__ || __TEST__) {
    app.use(morgan('combined'));
    app.use(helmet());
    app.use(hpp());
    app.use(compression());
    if (__PROD__) {
      assets = require('../assets.json');
    }
  } else {
    app.use(morgan('dev'));
    const compiler = compileDev((webpack(webpackConfig)), config.port);
    app.use(webpackDevMiddleware(compiler, {
      quiet: true,
      watchOptions: {
        ignored: /node_modules/,
      },
    }));
    app.use(webpackHotMiddleware(compiler, { log: console.log }));
  }

  // Static Assets
  m.staticMiddleware(app, __PROD__);
  // API
  m.apiMiddleware(app, __PROD__);
  // Views
  m.viewMiddleware(app, __PROD__, { assets });

  // Setup server to use http2 or old http. Configure it on /config/server.js
  let server;
  if (defaultServerConfig.http2) {
    const options = {
      key: fs.readFileSync(path.join(process.cwd(), 'server', 'certificate', 'server.key')),
      cert: fs.readFileSync(path.join(process.cwd(), 'server', 'certificate', 'server.crt')),
    };
    server = spdy.createServer(options, app);
  } else {
    server = http.createServer(app);
  }
  /*
   * Heroku dynos automatically timeout after 30s. Set our
   * own timeout here to force sockets to close before that.
   * https://devcenter.heroku.com/articles/request-timeout
   */
  if (config.timeout) {
    server.setTimeout(config.timeout, (socket) => {
      const message = `Timeout of ${config.timeout}ms exceeded`;

      socket.end([
        'HTTP/1.1 503 Service Unavailable',
        `Date: ${(new Date).toGMTString()}`,  // eslint-disable-line
        'Content-Type: text/plain',
        `Content-Length: ${message.length}`,
        'Connection: close',
        '',
        message,
      ].join(`\r\n`));
    });
  }

  return server;
};


export const startServer = (serverConfig) => {
  const config = { ...defaultServerConfig, ...serverConfig };
  const server = createServer(config);
  server.listen(config.port, (err) => {
    if (config.nodeEnv === 'production' || config.nodeEnv === 'test') {
      if (err) console.log(err);
      console.log(`server ${config.id} listening on port ${config.port}`);
    } else {
      startDev(config.port, err);
    }
  });
};

if (require.main === module) {
  throng({
    start: (id) => startServer({ id }),
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity,
  });
}
