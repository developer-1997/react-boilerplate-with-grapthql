import * as Yup from "yup";

export const signUpSchema = Yup.object().shape({
    name: Yup.string().required("Please Enter your name"),
    email: Yup.string().email("Please enter a valid Email").required("Please enter a your email address"),
    password: Yup.string().required("Please enter your password").min(8, "Password must be at least 8 characters"),
    passwordConfirm: Yup.string()
        .required('Please retype your password.')
        .oneOf([Yup.ref('password')], 'Your passwords do not match.')
})

export const signInSchema = Yup.object().shape({
    email: Yup.string().email("Please enter a valid Email").required("Please enter a your email address"),
    password: Yup.string().required("Please enter your password").min(8, "Password must be at least 8 characters"),
})