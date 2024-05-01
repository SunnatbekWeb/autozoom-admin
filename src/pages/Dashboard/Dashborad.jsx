import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashborad = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.getItem("access_token") ? "" : navigate("/login");
  }, []);
  return <div>Saytga hush kelibsiz!</div>;
};

export default Dashborad;
