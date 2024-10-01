import "./LoginForm.css";
import { Link } from "react-router-dom";
import LoginBlockButton from "../../../Components/Buttons/LoginBlockButton";
import LoginPageInput from "../../../Components/Inputs/LoginPageInput";
import Logo from "../../../Components/Logo/Logo";
import { useState } from "react";
import axios from "axios"; // Імпортуємо axios для запитів

const InputForm = () => {
  const [isLoginValid, setIsLoginValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleValidation = (type, isValid) => {
    if (type === "text") {
      setIsLoginValid(isValid);
    } else if (type === "password") {
      setIsPasswordValid(isValid);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      setErrorMessage("Username and password are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        username,
        password,
      });
      console.log(response.data.message);
      // Переходьте на головну сторінку або виконуйте інші дії після логіну
    } catch (error) {
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("Error during login");
      }
    }
  };

  return (
    <div className="main-login-block">
      <div className="login-form">
        <div className="login-inputs-block">
          <Logo />
          <LoginPageInput
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Передача значення логіну
            onValidation={handleValidation}
          />
          <LoginPageInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Передача значення пароля
            onValidation={handleValidation}
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <LoginBlockButton
          buttonName="Login"
          login={username} // Передача логіну у LoginBlockButton
          password={password} // Передача пароля у LoginBlockButton
          isLoginValid={isLoginValid}
          isPasswordValid={isPasswordValid}
          onClick={handleLogin} // Використання функції для логіну
        />
        <p className="register-link">
          Don't have an account? <br />
          <Link to="/registration">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default InputForm;
