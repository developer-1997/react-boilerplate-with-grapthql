import { gql } from "@apollo/client";

export const SIGNUP_USER = gql`
  mutation SignupUser($input: SignUpInput!) {
    signupUser(input: $input) {
      user {
        id
        name
        email
        photo
        role
        createdAt
        updatedAt
      }
      status
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation loginUser($input: LoginInput!) {
    loginUser(input: $input) {
      status
      access_token
    }
  }
`;

export const FORGET_PASSWORD = gql`
  mutation forgetPassword($input: ForgotPasswordInput!) {
    forgetPassword(input: $input) {
      status
      resetToken
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation resetPassword($input: ResetPasswordInput!) {
    resetPassword(input: $input) {
      status
    }
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation updatePassword($input: UpdatePasswordInput!) {
    updatePassword(input: $input) {
      status
      access_token
    }
  }
`;

export const GET_PROFILE = gql`
  query GetMe {
    getMe {
      status
      user {
        id
        name
        email
        photo
        role
        createdAt
        updatedAt
      }
    }
  }
`;
