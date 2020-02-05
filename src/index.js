const express = require("express");
const app = express();
const routes = require("../routes");

app.use(express.json());
app.use((req, res, next) => {
  console.count("Chamadas do middleware global");
  next();
});
app.use('/projects', routes);

app.listen(3000);
