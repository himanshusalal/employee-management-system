const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let employees = [
  {
    id: 1,
    name: "Himanshu",
    department: "IT",
    salary: 50000
  },
  {
    id: 2,
    name: "Rahul",
    department: "HR",
    salary: 40000
  }
];

app.get("/", (req, res) => {
  res.send("Employee Management System Backend Running");
});

// GET

app.get("/employees", (req, res) => {
  res.json(employees);
});


// POST

app.post("/employees", (req, res) => {
  const employee = {
    id: Date.now(),
    ...req.body
  };

  employees.push(employee);

  res.json(employee);
});


// PUT

app.put("/employees/:id", (req, res) => {
  const id = Number(req.params.id);

  employees = employees.map(emp =>
    emp.id === id ? { ...emp, ...req.body } : emp
  );

  res.json({
    message: "Employee Updated"
  });
});


// DELETE

app.delete("/employees/:id", (req, res) => {
  const id = Number(req.params.id);

  employees = employees.filter(emp => emp.id !== id);

  res.json({
    message: "Employee Deleted"
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});



// app.listen(5000, () => {
//   console.log("Server Running On Port 5000");
// });