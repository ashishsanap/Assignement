/* eslint-disable global-require,no-unused-vars */

export default function (app) {
  app.use('/api/login', require('./api/login'));
  app.use('/api/logout', require('./api/logout'));
  app.use('/api/register', require('./api/register'));
  app.use('/api/search', require('./api/search'));
  app.use('/api/user', require('./api/user'));

  app.use((req, res, next) => {
    res.status(404);

    res.format({
      html() {
        res.render('404', { url: req.url });
      },
      json() {
        res.json({ error: 'Not found' });
      },
      default() {
        res.type('txt').send('Not found');
      },
    });
  });
}
