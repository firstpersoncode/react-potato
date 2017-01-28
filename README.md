# React Potato

Because everything with potato is awesome.

## About
This is purely a fork from [jaredpalmer/react-production-starter](https://github.com/jaredpalmer/react-production-starter) except there are some changes I made by adding/removing some modules and tools.

## Changes

1. Changed Aphrodite CSS to CSS Modules
2. Changed ESLint rule to AirBnB Eslint rules
3. Refactored server entry point to provide API ready project structure
4. Change all folder structure to be more consistent
5. Unit test now can be put everywhere
6. Async route but with more semantic code
7. Jan 27: Added HTTP2 feature. Now you can choose to serve your file from http2 protocol.
8. Jan 28: Added Service Worker feature.

## Commands
| No | Command            | Description                             |
|----|--------------------|-----------------------------------------|
| 1  | `npm install `     | Install the project dependencies        |
| 2  | `npm start`        | Start the server on development mode    |
| 3  | `npm run build`    | Bundle the app to be used on production |
| 4  | `npm run lint`     | Run ESlint                              |
| 5  | `npm run lint:fix` | Run ESlint with autofix                 |
| 6  | `npm run test`     | Run unit testing                        |


## Project structure
| Path                         | Description                                                                                                             |
|------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| /client                      |                                                                                                                         |
| /client/index.jsx            | Entry point for client side                                                                                             |
| /config                      |                                                                                                                         |
| /config/server.js            | Configuration file for server related stuff                                                                             |
| /config/service-worker.js    | Configuration file for service-worker                                                                                   |
| /config/webpack.js           | Configuration file webpack related stuff                                                                                |
| /public                      | Directory for static assets                                                                                             |
| /public/assets               | Client side bundle located here                                                                                         |
| /public/sw.js                | Service worker configuration file                                                                                       |
| /server                      |                                                                                                                         |
| /server/api                  | Directory for API endpoints                                                                                             |
| /server/certificate          | Directory for SSL certificate to be used by http2                                                                       |
| /server/middleware/api.js    | ExpressJS configuration for API related stuff                                                                           |
| /server/middleware/static.js | ExpressJS configuration for static files                                                                                |
| /server/middleware/view.js   | ExpressJS configuration for view                                                                                        |
| /server/cmrh.conf.js         | Configuration file for css-modules-require-hook. This module to fix error when using css-modules on isomorpic react app |
| /src                         |                                                                                                                         |
| /src/component               | Directory for reusable and stateless / dumb react component only                                                        |
| /src/containers              | Directory for smart / routing react component                                                                           |
| /src/routes/index.js         | Routes for the app                                                                                                      |
| /src/routes/async            | Directory for configurations to lazy load the react component to react-router                                           |
| /src/constants.js            | Constant for redux action and reducer. Will be deprecated in the future. Constant will be moved to each redux action    |
| /static                      | Directory to put static file. Can be accessed from `/static` path                                                         |
| /tools                       | Directory for webpack configuration and other webpack stuff                                                             |

## FAQ
#### How to enable & disable HTTP2?
Change the configuration on `/config/server.js`. Set `http2` to true of false.

#### How to enable & disable ServiceWorker?
Change the configuration on `/config/service-worker.js`. Set `enable` to true of false.

#### How to change the cache name on ServiceWorker?
We cannot really put it on config file, because `sw.js` file is not generated by webpack. So you need to manually edit the `sw.js` file located on `/public` folder and change the `CACHE_NAME` variable.

#### How do I change the routes?
This boilerplate is code-splitting ready. So always load your route component asyncronously.
* If your route component is async, load it on `/src/routes/async/index.js`. Basically it is just an array to tell the path of the route and entry point to asyncronously load your component
* If your route component is not async, you can directly write the route on `/src/routes/index.js`
