import express from 'express';
import bodyParser from 'body-parser';
import * as resources from '../api';

const API_URL = '/api/v1';

export default (app) => {
  // Parse application/json bodys
  app.use(bodyParser.json());
  // Parse application/x-www-form-urlencoded bodys
  app.use(bodyParser.urlencoded({ extended: true }));
  // create restful routes
  Object.keys(resources).map((routeName) => {
    const route = `${API_URL}/${routeName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`;
    const router = express.Router();
    resources[routeName](router);
    app.use(route, router);
    return routeName;
  });
};
