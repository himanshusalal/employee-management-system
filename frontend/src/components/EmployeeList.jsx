function EmployeeList({ employees, deleteEmployee, editEmployee }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>Name</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>

      <tbody>
        {employees.map((emp) => (
          <tr key={emp.id}>
             <td>{emp.name}</td>
             <td>{emp.department}</td>
             <td>{emp.salary}</td>

            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => editEmployee(emp)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteEmployee(emp.id)}
              >
                Delete
              </button>
             </td>
           </tr>
        ))}
      </tbody>
    </table>
  );
}

export default EmployeeList;