import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";

import { useId } from "react";

import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import { changeFilter } from "../../redux/filtersSlice";

import css from "./ContactForm.module.css";

const phoneRegExp = /\d{3}-\d{3}-\d{4}$/;
const validationFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(phoneRegExp, "Telephone number is invalid")
    .required("Required"),
});

function ContactForm() {
  const dispatch = useDispatch();

  const nameId = useId();
  const numberId = useId();
  const valuesForm = {
    name: "",
    number: "",
  };

  const handleSubmit = (values, actions) => {
    dispatch(addContact(values));
    dispatch(changeFilter(""));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={valuesForm}
      onSubmit={handleSubmit}
      validationSchema={validationFormSchema}
    >
      <Form className={css.formAddContact}>
        <div className={css.fieldWrapper}>
          <label htmlFor={nameId}>Name:</label>
          <Field
            className={css.fieldInput}
            type="text"
            name="name"
            id={nameId}
            placeholder="e.g. Mike Shinoda"
          />
          <ErrorMessage
            className={css.errMessage}
            name="name"
            component="span"
          />
        </div>

        <div className={css.fieldWrapper}>
          <label htmlFor={numberId}> Number:</label>
          <Field
            className={css.fieldInput}
            type="tel"
            name="number"
            id={numberId}
            placeholder="mask: xxx-xxx-xxxx"
          />
          <ErrorMessage
            className={css.errMessage}
            name="number"
            component="span"
          />
        </div>

        <button className={css.btnSubmitForm} type="submit">
          Add contact
        </button>
      </Form>
    </Formik>
  );
}

export default ContactForm;
