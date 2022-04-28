const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middlewear/auth");
const errors = require("./middlewear/errors");

const unless = require("express-unless");

const app = express();

mongoose.Promise = global.Promise;

mongoose
  .connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    () => {
      console.log("Database connected");
    },
    (error) => {
      console.log("Database can't be connected: " + error);
    }
  );

auth.authenticateToken.unless = unless;

app.use(
  auth.authenticateToken.unless({
    path: [
      { url: "/api/login", methods: ["POST"] },
      { url: "/api/register", methods: ["POST"] },
    ],
  })
);

app.use(express.json());

app.use("/api", require("./routes/routes"));

app.use(errors.errorHandler);

app.listen(process.env.port || 4000, console.log("Ready to Go.."));
