import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <h1 className="display-1 text-danger">404</h1>

      <h2>Page Not Found</h2>

      <p className="text-muted">
        Sorry! The page you are looking for does not exist.
      </p>

      <Link to="/login" className="btn btn-primary mt-3">
        Go to Login
      </Link>
    </div>
  );
}

export default NotFound;