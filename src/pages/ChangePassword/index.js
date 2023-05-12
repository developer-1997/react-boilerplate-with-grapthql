import React, { useState } from "react";
import { Form, Col, Button, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import { Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CHANGE_PASSWORD } from "../../gql/userQueries";
import { useMutation } from "@apollo/client";

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .min(5, "Atleast 6 characters long")
    .max(50, "Too Long")
    .required(),
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

const ChangePassword = () => {
  const token = localStorage.getItem("token") || "";
  const navigate = useNavigate();
  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    context: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });
  const [loading, setLoading] = useState(false);

  const handleChangePasswordSubmit = ({
    oldPassword,
    password,
    passwordConfirm,
  }) => {
    setLoading(true);
    changePassword({
      variables: { input: { password, passwordConfirm, oldPassword } },
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
        if (error.message === "jwt expired") {
          setTimeout(() => {
            navigate("/signin");
          }, 1000);
        }

        toast.error(error.message);
      });
  };

  return (
    <>
      <div className="container py-4">
        <h2 className="fs-2 pb-3">Change Password</h2>
        <Formik
          validationSchema={ChangePasswordSchema}
          onSubmit={handleChangePasswordSubmit}
          validateOnChange={false}
          initialValues={{
            oldPassword: "",
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
                    placeholder="Current Password"
                    name="oldPassword"
                    value={values.oldPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isValid={touched.oldPassword && !errors.oldPassword}
                    isInvalid={touched.oldPassword && !!errors.oldPassword}
                  />

                  <Form.Control.Feedback type="invalid">
                    {errors.oldPassword}
                  </Form.Control.Feedback>

                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
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
                    isValid={touched.passwordConfirm && !errors.passwordConfirm}
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

              <div>
                <Button
                  type="button"
                  onClick={(event) => handleSubmit(event)}
                  as={Col}
                  sm="4"
                  className="btn-signup btn btn-dark my-3 mx-auto"
                >
                  {loading ? <Spinner size="sm" /> : "Change Password"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default ChangePassword;
