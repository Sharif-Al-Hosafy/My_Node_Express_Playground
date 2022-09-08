const pool = require("../config/pool");
const toCamelCase = require("./utils/to.camel.case"); // ex: created_at ---> createdAt

module.exports = {
  async find() {
    const { rows } = await pool.query(`select * from users`);
    return toCamelCase(rows);
  },

  async findOne(id) {
    const { rows } = await pool.query(`select * from users where id=$1`, [id]);
    return toCamelCase(rows)[0];
  },

  async addUser(info) {
    const { username, bio } = info;

    const { rows } = await pool.query(
      `insert into users (username, bio) values($1,$2) Returning *`,
      [username, bio]
    );

    return toCamelCase(rows)[0];
  },

  async updateUser(id, info) {
    const { username, bio } = info;

    const { rows } = await pool.query(
      `update users set username = $1 , bio = $2 where id = $3 Returning *`,
      [username, bio, id]
    );

    return toCamelCase(rows)[0];
  },

  async deleteUser(id) {
    const { rows } = await pool.query(
      `delete from users where id = $1 Returning *`,
      [id]
    );

    return toCamelCase(rows)[0];
  },
};
