const app = require("./v1/src/app");
const db = require("./v1/src/config/pool");

db.connect({
  host: "localhost",
  port: "5432",
  database: "socialnetwork",
  user: "shix",
  password: "allahraby1234",
})
  .then(() => {
    app().listen(5000, () => {
      console.log("server is running");
    });
  })
  .catch((err) => {
    console.log(err);
  });
