import React, { useState } from "react";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./signin.css";
import { SIGNIN_USER } from "../../gql/userQueries";
import { useMutation } from "@apollo/client";
import { useDispatch } from "react-redux";

const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Atleast 6 characters long")
    .max(50, "Too Long")
    .required(),
});

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginUser] = useMutation(SIGNIN_USER);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    loginUser({ variables: { input: { ...values } } })
      .then((result) => {
        setLoading(false);
        const { data } = result;
        if (data.loginUser.status === "success") {
          dispatch({ type: "GET_LOGIN_SUCCESS", payload: data.loginUser });
          localStorage.setItem("isLoggedIn", true);
          localStorage.setItem("token", data.loginUser.access_token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.name === "ApolloError") {
          toast.error(error.message);
        }
        console.log(error);
      });
  };

  return (
    <>
      <div className="container py-4">
        <h2 className="fs-2 pb-3">Sign in</h2>
        <Formik
          validationSchema={SignInSchema}
          onSubmit={handleSubmit}
          validateOnChange={false}
          initialValues={{
            email: "",
            password: "",
          }}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            errors,
          }) => (
            <Form noValidate onSubmit={(event) => handleSubmit(event)}>
              <Form.Group
                as={Col}
                sm="4"
                className="mx-auto text-start mb-3"
                controlId="validationFormik01"
              >
                <Form.Label className="pb-1">Email *</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.email && !errors.email}
                  isInvalid={touched.email && !!errors.email}
                />
                {touched.email && errors.email && (
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                )}
                <Form.Control.Feedback type="valid">
                  Valid email
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group
                as={Col}
                sm="4"
                className="mx-auto text-start mb-3"
                controlId="validationFormik02"
              >
                <Form.Label className="pb-1">Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  isValid={touched.password && !errors.password}
                  isInvalid={touched.password && !!errors.password}
                />

                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>

                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>

              {loading ? (
                <Spinner />
              ) : (
                <Button
                  type="button"
                  onClick={(event) => handleSubmit(event)}
                  as={Col}
                  sm="4"
                  disabled={loading}
                  className="btn-signup btn btn-dark mx-auto mb-2"
                >
                  Sign in
                </Button>
              )}

              <div>
                <Link className="text-decoration-none me-2 " to={"/register"}>
                  Sign Up
                </Link>
                |
                <Link
                  className="text-decoration-none ms-2"
                  to={"/forgotPassword"}
                >
                  Forgot Password ?
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default Signin;
