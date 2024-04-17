import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

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
