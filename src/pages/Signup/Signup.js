import React, { useState } from "react";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { SIGNUP_USER } from "../../gql/userQueries";
import "./signup.css";

const SignupSchema = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(5, "Atleast 6 characters long")
    .max(50, "Too Long")
    .required(),
  passwordConfirm: Yup.string()
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const navigate = useNavigate();
  const [signupUser] = useMutation(SIGNUP_USER);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values, { resetForm }) => {
    setLoading(true);
    signupUser({ variables: { input: { ...values } } })
      .then((result) => {
        setLoading(false);
        const { data } = result;
        if (data.signupUser.status === "success") {
          toast("Registered successfully !");
          navigate("/login");
          resetForm({ values: "" });
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container py-4">
        <h2 className="fs-1 pb-3">Create Account</h2>
        <div className="">
          <Formik
            validationSchema={SignupSchema}
            onSubmit={handleSubmit}
            validateOnChange={false}
            initialValues={{
              name: "",
              email: "",
              password: "",
              passwordConfirm: "",
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
                  md="4"
                  className="mx-auto text-start mb-3"
                  controlId="validationFormik06"
                >
                  <Form.Label className="pb-1">Your name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="First and last name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    isValid={!errors.name && touched.name}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
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
                <Form.Group
                  as={Col}
                  md="4"
                  className="mx-auto text-start mb-3"
                  controlId="validationFormik03"
                >
                  <Form.Label className="pb-1">Re-enter password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Re-enter password"
                    name="passwordConfirm"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirm}
                    isValid={!errors.passwordConfirm && touched.passwordConfirm}
                    isInvalid={
                      touched.passwordConfirm && errors.passwordConfirm
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordConfirm}
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
                    Create Account
                  </Button>
                )}
                <div>
                  Already have an account?{" "}
                  <Link to="/signin" className="text-dark">
                    Sign in
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default Signup;
