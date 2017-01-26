const serverConfig = require('../server/config');

module.exports = {
  generateScopedName: serverConfig.cssModuleScope,
};
