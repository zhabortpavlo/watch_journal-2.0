import "./LoginButton.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const LoginBlockButton = ({ buttonName, login, password }) => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = async () => {
    if (!login || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }

    // console.log("Sending login request with:", { username: login, password }); // Додати для перевірки

    try {
      await axios.post(
        "http://localhost:5000/api/login",
        {
          username: login,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      navigate("/mainpage");
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <button onClick={handleLogin}>{buttonName}</button>
    </>
  );
};

export default LoginBlockButton;
