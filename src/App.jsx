import { useDispatch, useSelector } from "react-redux";
import { lazy, useEffect } from "react";

import { apiRefreshUser } from "./redux/auth/operations";
import Layout from "./components/Layout/Layout";
import { Navigate, Route, Routes } from "react-router-dom";
import { RestrictedRoute } from "./components/RestrictedRoute";
import { PrivateRoute } from "./components/PrivateRoute";
import { selectIsRefreshing } from "./redux/auth/selectors";
import Loader from "./components/Loader/Loader";

const HomePage = lazy(() => import("./pages/HomePage"));
const RegistrationPage = lazy(() => import("./pages/RegistrationPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ContactsPage = lazy(() => import("./pages/ContactsPage"));

function App() {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(selectIsRefreshing);

  useEffect(() => {
    dispatch(apiRefreshUser());
  }, [dispatch]);

  if (isRefreshing)
    return (
      <>
        <p>User is refreshing, please wait</p>
        <Loader />
      </>
    );

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/register"
          element={<RestrictedRoute component={<RegistrationPage />} />}
        />

        <Route
          path="/login"
          element={<RestrictedRoute component={<LoginPage />} />}
        />

        <Route
          path="/contacts"
          element={<PrivateRoute component={<ContactsPage />} />}
        />

        <Route path="*" element={<Navigate to={"/"} replace />} />
      </Routes>
    </Layout>
  );
}

export default App;
