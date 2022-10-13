import { useState } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    // console.log(e.target.value);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); //not F5
    // send login info
    // check the validation
    setFormError(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regex =
      /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/;
    if (!values.username) {
      errors.username = "Required Username";
    }
    if (!values.email) {
      errors.email = "Required Email";
    } else if (!regex.test(values.email)) {
      errors.email = "need email address correctly";
    }
    if (!values.password) {
      errors.password = "Required password(4 ~ 6 characters";
    } else if (values.password.length < 4 || values.password.length > 15) {
      errors.password = "Required password(4 ~ 14 characters";
    }
    return errors;
  };

  return (
    <div className="formContainer">
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Login Form</h1>
        <hr />
        <div className="uiForm">
          <div className="formField">
            <label>User Name</label>
            <input
              type="text"
              placeholder="user name"
              name="username"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <p className="errorMessage">{formError.username}</p>
          <div className="formField">
            <label>Email</label>
            <input
              type="text"
              placeholder="example@com"
              name="email"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <p className="errorMessage">{formError.email}</p>
          <div className="formField">
            <label>Password</label>
            <input
              type="password"
              placeholder="password"
              name="password"
              onChange={(e) => handleChange(e)}
            ></input>
          </div>
          <p className="errorMessage">{formError.password}</p>
          <button className="submitButton">Login</button>
          {Object.keys(formError).length === 0 && isSubmit && (
            <div className="OKmsg">login success!</div>
          )}
        </div>
      </form>
    </div>
  );
}

export default App;
