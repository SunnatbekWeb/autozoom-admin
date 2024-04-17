import React, { useState } from "react";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({ phone_number: "", password: "" });
  const [error, setError] = useState(null);
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
        responseData.data?.tokens?.accessToken?.token
      );
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
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
  );
}

export default Login;
