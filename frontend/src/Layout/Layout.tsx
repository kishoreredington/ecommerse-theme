import { Outlet } from "react-router-dom";
import Header from "../Components/Header";

import CommonBreadcrumbs from "../Components/BasicBreadCrumb";

const Layout = () => {
  return (
    <div className="flex h-screen flex-col">
      {/* Header */}
      <Header />

      {/* Middle content */}
      <main className="flex-1 px-10 pt-5">
        <CommonBreadcrumbs />
        <Outlet />
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
