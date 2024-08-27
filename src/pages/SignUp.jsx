import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HeaderContext } from "../main";
import { BASE_URL } from "../helpers/constants";
import { setCurrentId } from "../helpers/functions";
import FillerContent from "../components/FillerContent";

function SignUp() {
    const navigate = useNavigate();
  
    async function handleLogin({ email, password, password_confirmation}) {
      try {
        const data = await fetch(`${BASE_URL}/auth`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
            password_confirmation
          }),
        });
        const response = await data.json();
        console.log("signup status: ", response.data);
        return response;
      } catch (err) {
        console.error(err);
      }
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      const formData = new FormData(e.target);
      const data = {
        email: formData.get("email"),
        password: formData.get("password"),
        password_confirmation: formData.get("password_confirmation"),
      };
  
      const signupData = await handleLogin(data);
  
      if (signupData.data.id) {
        console.log("sign-in id: ",signupData.data.id);
        navigate("/login");
      }
  
      e.target.reset();
    }
  
    return (
        <>
        <FillerContent />
      <div className="sign-up-container">
           <h1 className="sign-up-header">Welcome! </h1>
        <h3 className="sign-up-subheader">Create a new account.</h3>
        <form onSubmit={handleSubmit} className="sign-up-form">
    
          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            id="email"
            placeholder="Enter your email address"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            id="password"
            placeholder="Enter your password"
            required
          />
          <label htmlFor="password_confirmation">Confirm Password</label>
          <input
            name="password_confirmation"
            type="password"
            id="password_confirmation"
            placeholder="Re-enter your password"
            required
          />
          <button type="submit">Sign Up</button>
        </form>
  
        <div className="login-wrapper">
          <span>Don't have an account yet?</span>
          <Link to="/login" className="login-link">Log in Here!</Link>
        </div>
      </div >
      </>
    );
}

export default SignUp