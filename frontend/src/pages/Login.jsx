import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Login.css";
import API from "../api";
import { AuthContext } from "../context/AuthContext";


function Login() {

  const navigate = useNavigate();

  const { login } = useContext(AuthContext);



  const [formData, setFormData] = useState({

    email: "",

    password: "",

  });



  // Password Show Hide State

  const [showPassword, setShowPassword] = useState(false);




  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value,

    });

  };




  const handleLogin = async (e) => {

    e.preventDefault();


    try {


      const res = await API.post(
        "/api/auth/login",
        formData
      );



      localStorage.setItem(
        "token",
        res.data.token
      );



      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );



      login(res.data.user);



      navigate("/dashboard");



    } catch (error) {


      alert(
        error.response?.data?.message ||
        "Login Failed"
      );


    }

  };




  return (

    <div className="auth-container">


      <div className="auth-card">


        {/* Logo */}

        <div className="logo">

          🏢

        </div>



        <h2>
          Employee Portal
        </h2>



        <p className="subtitle">

          Welcome back! Sign in to access your employee dashboard.

        </p>




        <form onSubmit={handleLogin}>


          {/* Email */}

          <input

            type="email"

            name="email"

            placeholder="📧 Email Address"

            value={formData.email}

            onChange={handleChange}

            required

          />




          {/* Password with Eye Button */}


          

             
<div className="password-box">

  <input
     type={showPassword ? "text" : "password"}
    name="password"
    placeholder="Password"
    value={formData.password}
    onChange={handleChange}
      autoComplete="current-password"
    required
  />

  <button
    type="button"
    className="show-btn"
    onClick={() => setShowPassword(!showPassword)}
  >
    {showPassword ? "Hide" : "Show"}
  </button>

</div>




          <div className="options">


            <label>


              <input 
                type="checkbox"
              />


              Remember Me


            </label>




            <Link to="#">

              Forgot Password?

            </Link>



          </div>





          <button type="submit">


            Sign In


          </button>




        </form>





        <div className="divider">

          OR

        </div>





        <div className="auth-footer">


          Don't have an account?


          <Link to="/signup">

            Create Account →

          </Link>



        </div>





      </div>


    </div>

  );

}



export default Login;