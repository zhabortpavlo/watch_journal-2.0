import "./LoginPageInput.css";
import { useState } from "react";
import CloseEyeIcon from "../../svg/CloseEyeIcon";

const LoginPageInput = ({
  type,
  placeholder,
  value,
  onChange,
  onValidation,
}) => {
  const [isValid, setIsValid] = useState(true);
  const [showPassword,setShowPassword] = useState(false);

  const validateInput = (inputValue) => {
    if (type === "text") {
      const regex = /^[a-zA-Z0-9 \-_']{5,20}$/; // Валідація логіну
      return regex.test(inputValue);
    } else if (type === "password") {
      const regex = /^[a-zA-Z0-9]{7,16}$/; // Валідація пароля
      return regex.test(inputValue);
    } else if (type === "email") {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Валідація email
      return regex.test(inputValue);
    }
    return true;
  };

  const handleChange = (event) => {
    const inputValue = event.target.value;
    const valid = validateInput(inputValue);
    setIsValid(valid);
    onChange(event); // Виклик функції onChange з батьківського компонента
    if (onValidation) {
      onValidation(type, valid);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <input
        type={type === "password" && showPassword ? "text" : type} // Переключаю видімість пароля
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={isValid ? "" : "invalid-input"}
      />
       {type === "password" && (
        <span className="icon-container" onClick={togglePasswordVisibility}>
          <CloseEyeIcon />
        </span>
      )}
      {!isValid && type === "text" && (
        <p className="error-message">Wrong login format</p>
      )}
      {!isValid && type === "password" && (
        <p className="error-message">Wrong password format</p>
      )}
      {!isValid && type === "email" && (
        <p className="error-message">Invalid email format</p>
      )}
    </>
  );
};

export default LoginPageInput;
