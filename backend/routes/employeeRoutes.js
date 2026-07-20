const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController");

// Everyone who is logged in can view employees
router.get("/", auth, getEmployees);

// Only admin can create employee
router.post("/", auth, isAdmin, createEmployee);

// Only admin can update employee
router.put("/:id", auth, isAdmin, updateEmployee);

// Only admin can delete employee
router.delete("/:id", auth, isAdmin, deleteEmployee);

module.exports = router;