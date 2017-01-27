import express from 'express';

export default (app) => {
  app.use(express.static('public'));
  app.use('/static', express.static('static'));
};
