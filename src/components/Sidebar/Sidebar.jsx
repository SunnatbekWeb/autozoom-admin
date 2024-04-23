import React, { useEffect, useState } from "react";
import { TiHome } from "react-icons/ti";
import { NavLink, useLocation } from "react-router-dom";
import { Button, Menu } from "antd";
import { FaShopify } from "react-icons/fa6";
import {
  ContainerOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import Logo from "../../assets/icons/autozoom.svg";
import "./Sidebar.css";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  useEffect(() => {
    const storedActiveTab = localStorage.getItem("activeTab");
    if (storedActiveTab) {
      setActiveTab(storedActiveTab);
    }
  }, []);

  const handleMenuClick = (key) => {
    setActiveTab(key);
    localStorage.setItem("activeTab", key);
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
  const items = [
    getItem(
      <div className="logo">
        <NavLink to="/" onClick={() => handleMenuClick("0")}>
          {collapsed ? (
            <img
              src={Logo}
              style={{ width: "50px", height: "50px" }}
              alt="Avtozoom logo"
            />
          ) : (
            "AvtozoomAdmin"
          )}
        </NavLink>
      </div>,
      "0"
    ),
    getItem(
      <NavLink to="/" onClick={() => handleMenuClick("1")}>
        Dashboard
      </NavLink>,
      "1",
      <TiHome />
    ),
    getItem(
      <NavLink to="/brands" onClick={() => handleMenuClick("2")}>
        Brands
      </NavLink>,
      "2",
      <FaShopify />
    ),
    getItem(
      <NavLink to="/cities" onClick={() => handleMenuClick("3")}>
        Cities
      </NavLink>,
      "3",
      <ContainerOutlined />
    ),
  ];

  return (
    <>
      <Button
        type="primary"
        onClick={toggleCollapsed}
        style={{
          marginBottom: 16,
          position: "absolute",
          top: 16,
          left: `${collapsed ? "120px" : "275px"}`,
          zIndex: 999,
          transition: "0.1s",
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        selectedKeys={[activeTab]}
        defaultOpenKeys={["sub1"]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
        style={{ height: "90vh" }}
      />
    </>
  );
};

export default Sidebar;
