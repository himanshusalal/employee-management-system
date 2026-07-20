const Employee = require("../models/Employee");

// ==========================
// Get All Employees
// ==========================
const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: employees,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch employees",
    });
  }
};

// ==========================
// Add Employee
// ==========================
const createEmployee = async (req, res) => {
  try {
    const { name, email, department, salary, designation } = req.body;

    // Validation
    if (!name || !email || !department || !salary || !designation) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Duplicate Email Check
    const existingEmployee = await Employee.findOne({ email });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee already exists with this email",
      });
    }

    const employee = await Employee.create({
      name,
      email,
      department,
      salary,
      designation,
    });

    res.status(201).json({
      success: true,
      message: "Employee Added Successfully",
      data: employee,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to add employee",
    });
  }
};

// ==========================
// Update Employee
// ==========================
const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee Updated Successfully",
      data: employee,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to update employee",
    });
  }
};

// ==========================
// Delete Employee
// ==========================
const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);

    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee Not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Employee Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Failed to delete employee",
    });
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};