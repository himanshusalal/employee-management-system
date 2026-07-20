import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";
import SearchFilter from "../components/SearchFilter";

function Dashboard() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [search, setSearch] = useState("");
  const [editingEmployee, setEditingEmployee] = useState(null);

  // ==========================
  // Logout
  // ==========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/login");
  };

  // ==========================
  // Fetch Employees
  // ==========================
  const fetchEmployees = async () => {
    try {
      const res = await API.get("/api/employees");

      console.log("Employees Response:", res.data);

      setEmployees(
        Array.isArray(res.data.data)
          ? res.data.data
          : []
      );
    } catch (error) {
      console.log(error.response?.data || error.message);
      setEmployees([]);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // ==========================
  // Search Employee
  // ==========================
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">

        <h1>🏢Employee Dashboard</h1>

        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

      {/* Search */}
      <SearchFilter setSearch={setSearch} />

      {/* Employee Form */}
      <EmployeeForm
        fetchEmployees={fetchEmployees}
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
      />

      {/* Employee List */}
      <EmployeeList
        employees={filteredEmployees}
        fetchEmployees={fetchEmployees}
        editEmployee={setEditingEmployee}
      />

    </div>
  );
}

export default Dashboard;