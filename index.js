const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();
const port = 3001;

const {
  handleGetAllData,
  handleGetInfo,
  handleGetDataById,
  handleDeleteData,
  handleCreateData,
  handleUpdateData,
} = require("./controller");

//midlewares
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("build"));

//get information
app.get("/info", handleGetInfo);

//get users
app.get("/api/users", handleGetAllData);

//get user
app.get("/api/users/:id", handleGetDataById);

//delete user
app.delete("/api/users/:id", handleDeleteData);

//add user
app.post("/api/users", handleCreateData);

app.patch("/api/users/:id", handleUpdateData);

app.listen(port, () => console.log(`App listening on port ${port}!`));
