const express = require("express");
const { getUsers, createUser, updateUser, deleteUser } = require("../controllers/usersController");
const { authenticate } = require("../middleware/auth");
// We will need a middleware to check roles.
// For now, let's assume only authenticated users can access, 
// and we'll add role checks inside controller or separate middleware.

const router = express.Router();

router.use(authenticate);

router.get("/", getUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
