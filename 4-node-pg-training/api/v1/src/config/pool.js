const pg = require("pg");

class Pool {
  _pool = null;

  connect(options) {
    this._pool = new pg.Pool(options);
    return this._pool.query("SELECT 1 + 1;"); // testing the connection
  }

  query(sql) {
    return this._pool.query(sql);
  }

  close(options) {
    return this._pool.end();
  }
}

module.exports = new Pool();
