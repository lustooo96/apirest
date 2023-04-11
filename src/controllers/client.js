const Client = require("../models/Client");

module.exports = {
  async getCient(req, res) {
    try {
      const { page, pageSize } = req.query;
      const offset = (page - 1) * pageSize;

      const clints = await Model.findAndCountAll({
        offset,
        limit: pageSize,
      });

      return res.json(clints);
    } catch (e) {
      return res.status(500).json({ error: e });
    }
  },

  async getClientById(req, res) {
    try {
      const { idclient } = req.params;

      const clientRt = await User.findOne({
        where: { id: idclient },
      });

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
      const file = req.file;

      const results = [];
      await Client.bulkCreate(results);
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
