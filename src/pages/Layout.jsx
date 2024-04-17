import { Footer, Header } from "antd/es/layout/layout";
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";

const Layout = () => {
  return (
    <>
      <Header />
      <aside>
        <Sidebar />
      </aside>
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
