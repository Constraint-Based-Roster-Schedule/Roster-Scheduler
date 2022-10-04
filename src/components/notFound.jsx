import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="container mb-5">
      <div className="d-flex align-items-center justify-content-center">
        <div className="text-center">
          <h1 className="display-1 fw-bold text-danger">404!</h1>
          <p className="fs-3">Oops! Page not found.</p>
          <Link onClick={()=>{navigate(-1)}} className="btn btn-primary">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
