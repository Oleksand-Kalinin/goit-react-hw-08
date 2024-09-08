import { useDispatch, useSelector } from "react-redux";
import css from "./UserMenu.module.css";
import { selectUser } from "../../redux/auth/selectors";
import { apiLogout } from "../../redux/auth/operations";

function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const handleClickLogOut = () => {
    dispatch(apiLogout());
  };

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name}</p>
      <button
        className={css.btnLogout}
        type="button"
        onClick={handleClickLogOut}
      >
        Logout
      </button>
    </div>
  );
}

export default UserMenu;
