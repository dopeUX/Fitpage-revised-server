const {router} = require("../connection");
const DataController = require("../controllers/dataController");
const assignDB = require("../middlewares/assignDB");
const controller = new DataController();

router.route("/data").get(assignDB, controller.getAll);

router.route("/data/:id").get(assignDB, controller.getById);

module.exports = router;