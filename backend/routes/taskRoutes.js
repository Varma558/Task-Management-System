const express = require("express");

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();


// GET ALL TASKS
router.get("/", getTasks);


// CREATE TASK
router.post("/", createTask);


// UPDATE TASK
router.put("/:id", updateTask);


// DELETE TASK
router.delete("/:id", deleteTask);


module.exports = router;