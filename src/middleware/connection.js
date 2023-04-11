module.exports = (poolMysql) => async (req, res, next) => {
  const executeConnection = () =>
    new Promise((resolve, reject) => {
      poolMysql.getConnection(async (err, connection) => {
        if (err) {
          if (connection && connection.release) connection.release();
          reject(err);
        }

        resolve();
      });
    });

  try {
    await executeConnection();
    next();
  } catch (e) {
    res.status(500).json(await config.gravarErro({ e, req }));
  }
};
