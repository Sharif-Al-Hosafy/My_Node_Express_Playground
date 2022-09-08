const pg = require("pg");

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    return this._pool.query("SELECT 1 + 1;"); // testing the connection
  }

  query(sql, params) {
    // taking params in order to make the prepared sql statement in order to avoid sql injection exploit
    return this._pool.query(sql, params);
  }

  close(options) {
    return this._pool.end();
  }
}

module.exports = new Pool();
