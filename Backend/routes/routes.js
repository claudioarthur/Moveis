const express = require("express")
const app = express();
const router = express.Router();
const UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");

router.post('/user', UserController.create);
router.get("/user",UserController.index);
router.get("/user/:idUsuario",UserController.findUser);
router.put("/user",UserController.edit);
router.delete("/user/:idUsuario",UserController.remove);
router.post("/recoverpassword",UserController.recoverPassword);
router.post("/changepassword",UserController.changePassword);
router.post("/login",UserController.login);

module.exports = router;