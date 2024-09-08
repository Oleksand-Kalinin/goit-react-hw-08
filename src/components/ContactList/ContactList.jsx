import { useSelector } from "react-redux";
import {
  selectContacts,
  selectFilteredContacts,
} from "../../redux/contacts/selectors";

import Contact from "../Contact/Contact";

import css from "./ContactList.module.css";

function ContactList() {
  const filteredContacts = useSelector(selectFilteredContacts);
  const contacts = useSelector(selectContacts);

  console.log(filteredContacts);

  if (contacts.length === 0)
    return (
      <p
        style={{
          textAlign: "center",
          fontSize: "30px",
        }}
      >
        You don&apos;t have any contacts.
      </p>
    );

  return (
    <ul className={css.contactList}>
      {filteredContacts.map(({ id, name, number }) => (
        <li key={id} className={css.contactItem}>
          <Contact userId={id} userName={name} userTelephoneNumber={number} />
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
