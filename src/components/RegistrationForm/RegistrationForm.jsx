import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import css from "./RegistrationForm.module.css";
import { useDispatch, useSelector } from "react-redux";
import { apiRegister } from "../../redux/auth/operations";
import { selectAuthError } from "../../redux/auth/selectors";
import { useEffect } from "react";
import { resetError } from "../../redux/auth/slice";

const RegistrationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("The username is required")
    .min(2, "The username must be at least 2 characters long.")
    .max(100, "The username must be shorter than 100 characters."),

  password: Yup.string()
    .required("Password is required")
    .min(8, "The password must be at least 8 characters long")
    .max(100, "The password must be shorter than 100 characters"),

  email: Yup.string()
    .email("Incorrect email address")
    .required("Email is required"),
});

function RegistrationForm() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  const error = useSelector(selectAuthError);
  const INITIAL_VALUES = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (formData) => {
    dispatch(apiRegister(formData));
  };

  return (
    <Formik
      initialValues={INITIAL_VALUES}
      onSubmit={handleSubmit}
      validationSchema={RegistrationValidationSchema}
    >
      {({ errors }) => (
        <Form className={css.registrationForm}>
          <label className={css.fieldWrapper}>
            <span>User name:</span>
            <Field
              className={css.fieldInput}
              type="text"
              name="name"
              placeholder="Alex"
            />
            <ErrorMessage
              className={css.errMessage}
              name="name"
              component="span"
            />
          </label>
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

export default RegistrationForm;
