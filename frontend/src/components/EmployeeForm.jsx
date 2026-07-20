import { useState, useEffect } from "react";
import API from "../api";

function EmployeeForm({
  fetchEmployees,
  editingEmployee,
  setEditingEmployee,
}) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    department: "",
    salary: "",
    designation: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setForm({
        name: editingEmployee.name || "",
        email: editingEmployee.email || "",
        department: editingEmployee.department || "",
        salary: editingEmployee.salary || "",
        designation: editingEmployee.designation || "",
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      department: "",
      salary: "",
      designation: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEmployee) {
        // Update Employee
        await API.put(
          `/api/employees/${editingEmployee._id}`,
          form
        );

        alert("Employee Updated Successfully");

        setEditingEmployee(null);

      } else {
        // Add Employee
        await API.post(
          "/api/employees",
          form
        );

        alert("Employee Added Successfully");
      }

      resetForm();

      fetchEmployees();

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        error.message ||
        "Something went wrong"
      );
    }
  };

  const handleCancel = () => {
    setEditingEmployee(null);
    resetForm();
  };

  return (
    <form
      className="card p-4 shadow mb-4"
      onSubmit={handleSubmit}
    >
      <h3 className="mb-3">
        {editingEmployee
          ? "Update Employee"
          : "Add Employee"}
      </h3>

      <input
        type="text"
        name="name"
        className="form-control mb-3"
        placeholder="Employee Name"
        value={form.name}
        onChange={handleChange}
        required
      />

      <input
        type="email"
        name="email"
        className="form-control mb-3"
        placeholder="Employee Email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="department"
        className="form-control mb-3"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
        required
      />

      <input
        type="number"
        name="salary"
        className="form-control mb-3"
        placeholder="Salary"
        value={form.salary}
        onChange={handleChange}
        required
      />

      <input
        type="text"
        name="designation"
        className="form-control mb-3"
        placeholder="Designation"
        value={form.designation}
        onChange={handleChange}
        required
      />

      <button
        type="submit"
        className={
          editingEmployee
            ? "btn btn-warning"
            : "btn btn-primary"
        }
      >
        {editingEmployee
          ? "Update Employee"
          : "Add Employee"}
      </button>

      {editingEmployee && (
        <button
          type="button"
          className="btn btn-secondary mt-2"
          onClick={handleCancel}
        >
          Cancel
        </button>
      )}
    </form>
  );
}

export default EmployeeForm;