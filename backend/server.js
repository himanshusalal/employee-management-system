const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const employeeRoutes = require("./routes/employeeRoutes");

dotenv.config();

connectDB();

const app = express();


// CORS Configuration
const allowedOrigins = [
  "http://localhost:5173",
   "https://employee-management-system-uyph-7396izo4g.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {

      // Allow requests without origin (Postman, server-to-server)
      if (!origin) {
        return callback(null, true);
      }

      // Allow localhost and deployed frontend
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "PATCH",
      "OPTIONS"
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization"
    ]
  })
);


// Handle preflight requests
app.options("*", cors());


// Middleware
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/employees", employeeRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send("Employee Management API Running...");
});


// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});