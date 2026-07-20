import API from "../api";

function EmployeeList({
  employees = [],
  fetchEmployees,
  editEmployee,
}) {

  const deleteEmployee = async (id) => {
    try {

      await API.delete(`/api/employees/${id}`);

      if (fetchEmployees) {
        fetchEmployees();
      }

    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div className="table-responsive">

      <table className="table table-bordered table-striped">

        <thead className="table-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {employees.length === 0 ? (
            <tr>
              <td colSpan="6" className="text-center">
                No Employees Found
              </td>
            </tr>
          ) : (
            employees.map((emp) => (
              <tr key={emp._id}>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.department}</td>
                <td>₹ {emp.salary}</td>
                <td>{emp.designation}</td>

                <td>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => editEmployee(emp)}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteEmployee(emp._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))
          )}

        </tbody>

      </table>

    </div>
  );
}

export default EmployeeList;