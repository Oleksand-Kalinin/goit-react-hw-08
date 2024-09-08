import { Suspense } from "react";
import Loader from "../Loader/Loader";
import AppBar from "../AppBar/AppBar";

function Layout({ children }) {
  return (
    <div>
      <AppBar />
      <Suspense fallback={<Loader />}>{children}</Suspense>
    </div>
  );
}

export default Layout;
