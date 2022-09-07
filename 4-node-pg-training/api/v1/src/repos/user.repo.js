const pool = require("../config/pool");
const toCamelCase = require("./utils/to.camel.case"); // ex: created_at ---> createdAt

module.exports = {
  async find() {
    const { rows } = await pool.query(`select * from users`);
    return toCamelCase(rows);
  },

  async findOne(id) {
    const { rows } = await pool.query(`select * from users where id=${id}`);
    return toCamelCase(rows);
  },
};
