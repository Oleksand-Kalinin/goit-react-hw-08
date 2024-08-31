import { FaPhoneAlt, FaUser } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contactsOps";

import css from "./Contact.module.css";

function Contact({ userId, userName, userTelephoneNumber }) {
  const dispatch = useDispatch();
  const handleClickDeleteContact = () => {
    dispatch(deleteContact(userId));
  };

  return (
    <>
      <div>
        <div className={css.wrapperUserName}>
          <FaUser className={css.iconUser} />
          <h2 className={css.nameUser}>{userName}</h2>
        </div>
        <div className={css.wrapperUserPhone}>
          <FaPhoneAlt className={css.iconPhone} />
          <a
            className={css.phoneUser}
            href={`tel:+${userTelephoneNumber.replaceAll("-", "")}`}
          >
            {userTelephoneNumber}
          </a>
        </div>
      </div>
      <button
        className={css.btnDeleteUser}
        type="button"
        onClick={handleClickDeleteContact}
      >
        Delete
      </button>
    </>
  );
}

export default Contact;
