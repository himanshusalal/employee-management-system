
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

import API_URL from "./api";

import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import SearchFilter from "./components/SearchFilter";

function App() {
  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  // Fetch Employees
  const fetchEmployees = async () => {
    try {
      // const res = await axios.get("http://localhost:5000/employees");

      const res = await axios.get(
  `${API_URL}/employees`
);

      setEmployees(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Delete Employee
  const deleteEmployee = async (id) => {
    try {
      // await axios.delete(`http://localhost:5000/employees/${id}`);

      await axios.delete(
  `${API_URL}/employees/${id}`
);

      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  // Edit Employee
  const editEmployee = (employee) => {
    setEditingEmployee(employee);
  };

  // Search Filter
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      <h1 className="title">
        Employee Dashboard
      </h1>

      {/* Stats Cards */}
      <div className="stats">
        <div className="card-box">
          <h3>Total Employees</h3>
          <p>{employees.length}</p>
        </div>

        <div className="card-box">
          <h3>Total Salary</h3>

          <p>
            ₹
            {employees.reduce(
              (acc, emp) => acc + Number(emp.salary),
              0
            )}
          </p>
        </div>

        <div className="card-box">
          <h3>Departments</h3>

          <p>
            {new Set(employees.map(emp => emp.department)).size}
          </p>
        </div>
      </div>

      <SearchFilter setSearch={setSearch} />

      <EmployeeForm
        fetchEmployees={fetchEmployees}
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
      />

      <EmployeeList
        employees={filteredEmployees}
        deleteEmployee={deleteEmployee}
        editEmployee={editEmployee}
      />

    </div>
  );
}

export default App;
