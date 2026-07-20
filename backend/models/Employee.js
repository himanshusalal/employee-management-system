const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Employee name is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Employee email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    department: {
      type: String,
      required: [true, "Department is required"],
    },

    salary: {
      type: Number,
      required: [true, "Salary is required"],
    },

    designation: {
      type: String,
      required: [true, "Designation is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Employee", employeeSchema);