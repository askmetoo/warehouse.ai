'use strict';

module.exports = function (app) {

  const auth = app.middlewares.auth;

  //
  // ### /version/name
  // List all versions in an array for a given package name
  // NOTE may not be the most efficient route so calls to this should not be
  // frequent.
  //
  app.routes.get('/versions/:name', auth, function (req, res, next) {
    const name = req.params.name;

    app.models.Version.findAll({
      fields: ['name', 'version'],
      allowFiltering: true,
      conditions: {
        name
      }
    }, (err, versions) => {
      if (err) {
        err.status = 500;
        return next(err);
      }
      const result = versions.map(ver => ver.version);
      res.status(200).send(result);
    })
  });
};
