import React from "react";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid banner-hg">
      <div className="container position-relative">
        <div className="row mx-0 justify-content-end position-absolute w-100">
          <div className="col-md-3 mt-3">
            <div className="card rounded-3 text-center px-4 py-3">
              <div className="card-header border-0 bg-white"></div>
              <div className="card-body px-0">
                <Button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="btn-signup btn btn-dark px-4 py-2 my-1 rounded-2 w-100"
                >
                  Sign Up with Email
                </Button>
              </div>
              <div className="card-footer bg-white pt-3">
                <div>
                  Already a member?{" "}
                  <Link to="/signin" className="text-decoration-none">
                    Sign in
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
