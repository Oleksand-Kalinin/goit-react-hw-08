import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import css from "./LoginForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { apiLogin } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { resetError } from "../../redux/auth/slice";

const LoginValidationSchema = Yup.object().shape({
  password: Yup.string()
    .required("Password is required")
    .min(8, "The password must be at least 8 characters long")
    .max(100, "The password must be shorter than 100 characters"),

  email: Yup.string()
    .email("Incorrect email address")
    .required("Email is required"),
});

function LoginForm() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const error = useSelector(selectAuthError);
  const INITIAL_VALUES = {
    email: "",
    password: "",
  };

  const handleSubmit = (formData) => {
    dispatch(apiLogin(formData));
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={LoginValidationSchema}
    >
      {({ errors }) => (
        <Form className={css.loginForm}>
          <label className={css.fieldWrapper}>
            <span>E-mail:</span>
            <Field
              className={css.fieldInput}
              type="text"
              name="email"
              placeholder="alex@gmail.com"
            />
            <ErrorMessage
              className={css.errMessage}
              name="email"
              component="span"
            />
          </label>

          <label className={css.fieldWrapper}>
            <span>Password:</span>
            <Field
              className={css.fieldInput}
              type="password"
              name="password"
              placeholder="Enter your password"
            />
            <ErrorMessage
              className={css.errMessage}
              name="password"
              component="span"
            />
          </label>

          <button
            disabled={Object.keys(errors).length > 0}
            className={css.btnSubmitForm}
            type="submit"
          >
            Log in
          </button>

          {error && (
            <p className={css.errorText}>Oops, some error occured... {error}</p>
          )}
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;
