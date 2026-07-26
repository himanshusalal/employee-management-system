
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

  // Search Employee
  
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase())
  );

 
  // Dashboard Statistics
  const totalEmployees = employees.length;

  const totalSalary = employees.reduce(
    (total, emp) => total + Number(emp.salary || 0),
    0
  );

  const totalDepartments = new Set(
    employees.map((emp) => emp.department)
  ).size;

  return (
    <div className="container mt-4">

      {/* Logout Button */}
     
      <div className="d-flex justify-content-end mb-3">
        <button
          className="btn btn-danger"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

    

      {/* Dashboard Heading */}
      <div className="text-center mb-4">
        <h1 className="dashboard-title">
          🏢 Employee Dashboard
        </h1>
      </div>


      {/* Dashboard Stats */}
      <div className="row mb-4">

        {/* Total Employees */}
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 stat-card employee-card">
            <div className="card-body text-center">
              <h5>Total Employees</h5>
              <h2>{totalEmployees}</h2>
            </div>
          </div>
        </div>

        {/* Total Salary */}
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 stat-card salary-card">
            <div className="card-body text-center">
              <h5>Total Salary</h5>
              <h2>₹ {totalSalary.toLocaleString()}</h2>
            </div>
          </div>
        </div>

        {/* Total Departments */}
        <div className="col-md-4 mb-3">
          <div className="card shadow border-0 stat-card department-card">
            <div className="card-body text-center">
              <h5>Total Departments</h5>
              <h2>{totalDepartments}</h2>
            </div>
          </div>
        </div>

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