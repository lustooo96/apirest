const client = require("../controllers/client");
const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = (app) => {
  app.get("/client", client.getCient);
  app.get("/client/:idclient", client.getClientById);
  app.post("/client", client.postClient);
  app.put("/client/:idclient", client.putClient);
  app.delete("/client/:idclient", client.deleteClient);

  app.post("/importClient", upload.any(), client.postImportClient);
};
