const Client = require("../models/Client");

module.exports = {
  async getCient(req, res) {
    try {
      console.log("dasdkasdsakodkosako33");
      return res.json({ teste: "etste" });
    } catch (e) {
      return res.status(500).json("teste");
    }
  },

  async getClientById(req, res) {
    try {
      return res.json({ teste: "etste" });
    } catch (e) {
      return res.status(500).json("teste");
    }
  },

  async postClient(req, res) {
    try {
      const postClient = await Client.create(req.body);
      return res.json({ teste: "etste" });
    } catch (e) {
      return res.status(500).json("teste");
    }
  },

  async putClient(req, res) {
    try {
      const putClient = await Client.update(req.body);
      return res.json({ teste: "etste" });
    } catch (e) {
      return res.status(500).json("teste");
    }
  },
};
