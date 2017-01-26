const path = require('path');

module.exports = {
  CLIENT_ENTRY: path.join(process.cwd(), 'client'),
  CLIENT_OUTPUT: path.join(process.cwd(), 'public/assets'),
  CSS_OUTPUT: '../public/assets/style.css',
  SERVER_ENTRY: path.join(process.cwd(), 'server'),
  SERVER_OUTPUT: path.join(process.cwd(), 'build'),
  PUBLIC_PATH: '/assets/',
};
