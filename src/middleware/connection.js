module.exports = (poolMysql) => async (req, res, next) => {
  const executeConnection = () =>
    new Promise((resolve, reject) => {
      let conn = false;
      poolMysql.getConnection(async (err, connection) => {
        if (err) {
          if (connection && connection.release) connection.release();
          reject(err);
        }
        conn = true;

        req.connect_mysql = connection;
        req.poolMysql = poolMysql;
        process.poolMysql = poolMysql;

        res.on("finish", async () => {
          try {
            if (connection && connection.release) connection.release();
          } catch (e) {
            // eslint-disable-next-line no-console
            console.log("Error when finalizing", e);
          }
        });

        resolve();
      });

      setTimeout(async () => {
        if (!conn) {
          reject(new Error("Failed to get connection to MySql!"));
        }
      }, 5000);
    });

  try {
    await executeConnection();
    next();
  } catch (e) {
    res.status(500).json({ error: e });
  }
};
