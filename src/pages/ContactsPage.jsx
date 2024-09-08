import { useEffect } from "react";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import { useDispatch } from "react-redux";
import { fetchContacts } from "../redux/contacts/operations";
import SearchBox from "../components/SearchBox/SearchBox";

function ContactsPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
    // dispatch(fetchContacts()).unwrap().then({});
  }, [dispatch]);

  return (
    <section>
      <ContactForm />
      <SearchBox />
      <ContactList />
    </section>
  );
}

export default ContactsPage;
