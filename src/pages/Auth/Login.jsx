import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [data, setData] = useState({ phone_number: "", password: "" });
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://autoapi.dezinfeksiyatashkent.uz/api/auth/signin",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("sign-in failed");
      }
      const responseData = await response.json();
      localStorage.setItem(
        "access_token",
        responseData?.data?.tokens?.accessToken?.token
      );
      localStorage.setItem("userName", responseData?.data?.user?.firstName);
      toast.success("You are logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <div className={styles["login"]}>
      <div className={styles["container"]}>
        <ToastContainer className={styles["toastify"]} />
        <form onSubmit={handleSubmit} className={styles["form-container"]}>
          <input
            type="text"
            name="phoneNumber"
            value={data.phone_number}
            onChange={(e) => setData({ ...data, phone_number: e.target.value })}
            className={styles["input-field"]}
            placeholder="Phone Number"
          />
          <input
            type="password"
            name="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className={styles["input-field"]}
            placeholder="Password"
          />
          <button type="submit" className={styles["submit-btn"]}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
