const { Router } = require("katas");
const {
  res: { success }
} = require("katas");
const daysController = require('./controllers/days');

const router = new Router();

router.get("/", () => {
  return success({ a: "a" });
});

router.get('/days', daysController.getAll);
router.put('/days', daysController.add);

module.exports = router;
