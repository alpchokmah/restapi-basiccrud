import express from "express";
const PORT = 8080;

const app = express();
app.use(express.json());

const routes = require('./routes');
app.use('/api', routes);

app.listen(PORT, () => {
  console.log("Server running...");
});