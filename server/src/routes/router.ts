module.exports = (express: any) => {
  const router = express.Router();

  router.route('/login', require('./user.ts')(router));

  return router;
}