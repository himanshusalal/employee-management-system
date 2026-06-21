import { useState, useEffect } from "react";
import axios from "axios";

import API_URL from "../api";

function EmployeeForm({
  fetchEmployees,
  editingEmployee,
  setEditingEmployee
}) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    salary: "",
  });

  useEffect(() => {
    if (editingEmployee) {
      setForm(editingEmployee);
    }
  }, [editingEmployee]);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingEmployee) {
        // UPDATE
      await axios.put(
  `${API_URL}/employees/${editingEmployee.id}`,
  form
);
        // await axios.put(
        //   `http://localhost:5000/employees/${editingEmployee.id}`,
        //   form
        // );

        setEditingEmployee(null);
      } else {

        // ADD
        await axios.post(
  `${API_URL}/employees`,
  form
);

        // await axios.post(
        //   "http://localhost:5000/employees",
        //   form
        // );
      }

      setForm({
        name: "",
        department: "",
        salary: "",
      });

      fetchEmployees();

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mb-4">

      <input
        type="text"
        className="form-control mb-2"
        name="name"
        placeholder="Employee Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        type="text"
        className="form-control mb-2"
        name="department"
        placeholder="Department"
        value={form.department}
        onChange={handleChange}
      />

      <input
        type="number"
        className="form-control mb-2"
        name="salary"
        placeholder="Salary"
        value={form.salary}
        onChange={handleChange}
      />

      <button
        className={
          editingEmployee
            ? "btn btn-warning"
            : "btn btn-primary"
        }
        onClick={handleSubmit}
      >
        
        {editingEmployee
          ? "Update Employee"
          : "Add Employee"}
      </button>

      {editingEmployee && (
        <button
          className="btn btn-secondary ms-2"
          onClick={() => {
            setEditingEmployee(null);

            setForm({
              name: "",
              department: "",
              salary: "",
            });
          }}
        >
          Cancel
        </button>
      )}

    </div>
  );
}

export default EmployeeForm;