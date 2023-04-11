const Client = require("../models/Client");
const util = require("../lib/util");

module.exports = {
  async getCient(req, res) {
    try {
      const { page, pageSize } = req.query;
      const offset = (page - 1) * pageSize;

      const clients = await Client.findAndCountAll({
        offset,
        limit: pageSize,
      });

      return res.json(clients);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  },

  async getClientById(req, res) {
    try {
      const { idclient } = req.params;

      const clientRt = await Client.findOne({
        where: { idclient },
      });

      if (!clientRt) {
        return res.status(404).json({ error: "Client not found" });
      }

      return res.json(clientRt);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  },

  async postClient(req, res) {
    try {
      const client = await Client.create(req.body);

      const clientRT = await Client.findOne({
        where: { idclient: client.idclient },
      });

      return res.json(clientRT);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  },

  async postImportClient(req, res) {
    try {
      const file = req.files;

      util.readFile(req.files[0].buffer);
      console.log("file", file);

      const results = [];
      //await Client.bulkCreate(results);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  },

  async putClient(req, res) {
    try {
      const { idclient } = req.params;

      await Client.update(req.body, {
        where: {
          idclient,
        },
      });

      const clientRT = await Client.findOne({
        where: { idclient },
      });

      return res.json(clientRT);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  },

  async deleteClient(req, res) {
    try {
      const { idclient } = req.params;

      await Client.destroy({
        where: {
          idclient,
        },
      });

      return res.json({ status: "Sucess" });
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  },
};
