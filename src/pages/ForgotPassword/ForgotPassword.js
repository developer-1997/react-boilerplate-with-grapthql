import React, { useEffect, useState } from "react";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { FORGET_PASSWORD, RESET_PASSWORD } from "../../gql/userQueries";
import { useMutation } from "@apollo/client";

const ForgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Atleast 6 characters long")
    .max(50, "Too Long")
    .required(),
  passwordConfirm: Yup.string()
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.password === value;
    })
    .required(),
});

const OtpSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
});

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [forgetPassword] = useMutation(FORGET_PASSWORD);
  const [resetPassword] = useMutation(RESET_PASSWORD);
  const [mailSent, setMailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const _token = searchParams.get("token");
    if (_token) {
      setMailSent(true);
      setToken(_token);
    }
  }, []);

  const handleForgetSubmit = ({ email }) => {
    setLoading(true);
    forgetPassword({ variables: { input: { email } } })
      .then((result) => {
        const { data } = result;
        if (data.forgetPassword.status === "success") {
          setLoading(false);
          toast("Reset Link sent to your email.");
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  const handleResetSubmit = ({ password, passwordConfirm }) => {
    setLoading(true);
    resetPassword({
      variables: { input: { password, passwordConfirm, token } },
    })
      .then((result) => {
        setLoading(false);
        const { data } = result;
        if (data.resetPassword.status === "success") {
          toast("Password reset successfully.");
          setTimeout(() => {
            navigate("/signin");
          }, 1000);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="container py-4">
        <h2 className="fs-2 pb-3">Forgot Password</h2>
        <Formik
          validationSchema={mailSent ? ForgotPasswordSchema : OtpSchema}
          onSubmit={mailSent ? handleResetSubmit : handleForgetSubmit}
          validateOnChange={false}
          initialValues={{
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
              {mailSent ? (
                <>
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
                    sm="4"
                    className="mx-auto text-start mb-3"
                    controlId="validationFormik02"
                  >
                    <Form.Label className="pb-1">Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="confirm password"
                      name="passwordConfirm"
                      value={values.passwordConfirm}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={
                        touched.passwordConfirm && !errors.passwordConfirm
                      }
                      isInvalid={
                        touched.passwordConfirm && !!errors.passwordConfirm
                      }
                    />

                    <Form.Control.Feedback type="invalid">
                      {errors.passwordConfirm}
                    </Form.Control.Feedback>

                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  </Form.Group>
                </>
              ) : (
                <>
                  <Form.Group
                    as={Col}
                    sm="4"
                    className="mx-auto text-start mb-3"
                    controlId="validationFormik01"
                  >
                    <Form.Label className="pb-1">Email *</Form.Label>
                    <Form.Control
                      type="email"
                      disabled={mailSent}
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
                </>
              )}

              <div>
                <Button
                  type="button"
                  onClick={(event) => handleSubmit(event)}
                  as={Col}
                  sm="4"
                  className="btn-signup btn btn-dark my-3 mx-auto"
                >
                  {loading ? (
                    <Spinner size="sm" />
                  ) : !mailSent ? (
                    "Forgot Password"
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ForgotPassword;
