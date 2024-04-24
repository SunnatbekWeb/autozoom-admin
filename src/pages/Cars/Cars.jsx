import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    localStorage.getItem("access_token") ? "" : navigate("/login");
  }, []);
  return <div>Cars</div>;
};

export default Cars;
