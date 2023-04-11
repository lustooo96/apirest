const client = require("../controllers/client");

module.exports = (app) => {
  app.get("/client", client.getCient);
  app.get("/client/:idclient", client.getClientById);
  app.post("/client", client.postClient);
  app.put("/client/:idclient", client.putClient);
};
