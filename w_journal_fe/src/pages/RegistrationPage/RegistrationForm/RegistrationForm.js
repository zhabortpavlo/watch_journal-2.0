import "./RegistrationForm.css";
import Logo from "../../../Components/Logo/Logo";
import LoginPageInput from "../../../Components/Inputs/LoginPageInput";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Для виведення повідомлень про помилки

  // Регулярні вирази для валідації
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const passwordRegex = /^[a-zA-Z0-9]{7,16}$/;
  const usernameRegex = /^[a-zA-Z0-9 \-_']{5,20}$/;

  const handleRegister = async () => {
    // Валідація полів
    if (!emailRegex.test(email)) {
      setErrorMessage("Invalid email format");
      return;
    }
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be 7-16 characters long and contain only letters and numbers"
      );
      return;
    }
    if (!usernameRegex.test(username)) {
      setErrorMessage(
        "Username must be 5-20 characters long and can contain letters, numbers, spaces, and symbols (-, _, ')"
      );
      return;
    }

    // Якщо валідація пройшла успішно, очищуємо повідомлення про помилки
    setErrorMessage("");

    try {
      const response = await axios.post("http://localhost:5000/api/register", {
        email,
        password,
        username,
      });
      console.log(response.data.message);

      // Очищення полів форми після успішної реєстрації
      setEmail("");
      setPassword("");
      setUsername("");
    } catch (error) {
      // Виведення помилки з сервера, якщо email вже існує
      if (error.response && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("There was an error registering the user.");
      }
    }
  };

  return (
    <div className="main-registration-block">
      <div className="registration-form">
        <div className="login-inputs-block">
          <Logo />
          <LoginPageInput
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <LoginPageInput
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <LoginPageInput
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Виводимо помилку, якщо вона є */}
        <button onClick={handleRegister}>Register</button>
        <p className="register-link">
          Already have an account? <br />
          <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationForm;
