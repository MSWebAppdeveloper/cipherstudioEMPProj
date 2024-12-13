const express = require("express");
const router = express.Router();
const rulesForCalendarController = require("../Controllers/rulesForCalendarController");

//create a new rule
router.post("/rules", rulesForCalendarController.createRules);

//get all rules
router.get("/rules", rulesForCalendarController.getAllRules);

//get a rule by id
router.get("/rules/:id", rulesForCalendarController.getRulesByID);

//update a rule
router.put("/rules/:id", rulesForCalendarController.updateRules);

//delete a rule
router.delete("/rules/:id", rulesForCalendarController.deleteRules);

module.exports = router;
