/**
 * Test environment settings
 *
 */

module.exports = {
  connections: {
    jibePostgreSQL: {
      database: 'jibetest'
    }
  },
  models: {
    migrate: 'drop'
  }
};
