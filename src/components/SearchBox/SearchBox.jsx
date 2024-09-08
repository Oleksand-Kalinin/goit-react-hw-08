import { useDispatch, useSelector } from "react-redux";
import { selectNameFilter } from "../../redux/filters/selectors";
import { changeFilter } from "../../redux/filters/slice";

import css from "./SearchBox.module.css";

function SearchBox() {
  const dispatch = useDispatch();
  const filterValue = useSelector(selectNameFilter);

  const handleChangeFilter = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.wrapperFilterContacts}>
      <p className={css.findContacts}>Find contacts by name</p>
      <input
        className={css.inputSearchContacts}
        type="text"
        value={filterValue}
        onChange={handleChangeFilter}
      />
    </div>
  );
}

export default SearchBox;
