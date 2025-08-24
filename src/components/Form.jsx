import React, { useEffect, useState } from "react";
import Alert from "./Alert";

const Form = (props) => {
  const { id } = props;
  const [formUser, setFormUser] = useState({
    _id: "",
    name: "",
    email: "",
    dob: "",
    username: "",
    password: "",
  });
  const [alert, setAlert] = useState({ message: "", type: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id) {
      // Check if id exists
      const fetchData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/users/${id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }
          const data = await response.json();
          setFormUser({ ...data, dob: dateToYMD(data.dob) });
        } catch (error) {
          console.log(error);
          setAlert({ message: error.message, type: "error" });
        }
      };
      fetchData();
    }
  }, [id]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUser({ ...formUser, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formUser.name.trim()) tempErrors.name = "The name is required";
    if (!/\S+@\S+\.\S+/.test(formUser.email))
      tempErrors.email = "Invalid Email";
    if (!formUser.dob) tempErrors.dob = "The birthdate is mandatory";
    if (!formUser.username.trim())
      tempErrors.username = "The username is required";
    if (formUser.password.length < 8)
      tempErrors.password = "Minimum 8 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const body = JSON.stringify({
          name: formUser.name,
          email: formUser.email,
          dob: formUser.dob,
          username: formUser.username,
          password: formUser.password,
        });
        const headers = {
          "Content-Type": "application/json",
        };
        let response;
        if (id) {
          response = await fetch(`http://localhost:3000/api/users/${id}`, {
            method: "PUT",
            headers: headers,
            body: body,
          });
        } else {
          response = await fetch("http://localhost:3000/api/users", {
            method: "POST",
            headers: headers,
            body: body,
          });
        }
        if (!response.ok) {
          console.log(response);
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        setAlert({
          message: id
            ? "User Updated Successfully"
            : "User Created Sucessfully",
          type: "success",
        });
        setFormUser({
          name: "",
          email: "",
          dob: "",
          username: "",
          password: "",
        });
        setErrors({});
      }
    } catch (error) {
      console.log(error.Error);
      setAlert({ message: error.message, type: "error" });
    }
  };
  function dateToYMD(end_date) {
    var ed = new Date(end_date);
    var d = ed.getDate();
    var m = ed.getMonth() + 1;
    var y = ed.getFullYear();
    return "" + y + "-" + (m <= 9 ? "0" + m : m) + "-" + (d <= 9 ? "0" + d : d);
  }
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <Alert message={alert.message} type={alert.type} />

      <div className="col-12 col-md-6">
        <h2 className="mb-4 text-center">User registration</h2>
        <form
          onSubmit={handleSubmit}
          className="border p-4 rounded shadow bg-light text-center"
        >
          <div className="row justify-content-center">
            <div className="col-md-12 mb-3">
              <label className="form-label d-block">Name</label>
              <input
                type="text"
                className={`form-control mx-auto ${
                  errors.name ? "is-invalid" : ""
                }`}
                style={{ maxWidth: "300px" }}
                name="name"
                value={formUser.name}
                onChange={handleChange}
                placeholder="Type your name"
              />
              {errors.name && (
                <div className="invalid-feedback">{errors.name}</div>
              )}
            </div>

            <div className="col-md-12 mb-3">
              <label className="form-label d-block">Email</label>
              <input
                type="email"
                className={`form-control mx-auto ${
                  errors.email ? "is-invalid" : ""
                }`}
                style={{ maxWidth: "300px" }}
                name="email"
                value={formUser.email}
                onChange={handleChange}
                placeholder="cr7@email.com"
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-12 mb-3">
              <label className="form-label d-block">BirthDate</label>
              <input
                type="date"
                className={`form-control mx-auto ${
                  errors.dob ? "is-invalid" : ""
                }`}
                style={{ maxWidth: "200px" }}
                name="dob"
                value={formUser.dob}
                onChange={handleChange}
              />
              {errors.dob && (
                <div className="invalid-feedback">{errors.dob}</div>
              )}
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label d-block">Username</label>
              <input
                type="text"
                className={`form-control mx-auto ${
                  errors.username ? "is-invalid" : ""
                }`}
                style={{ maxWidth: "200px" }}
                name="username"
                value={formUser.username}
                onChange={handleChange}
                placeholder="Enter your username"
              />
              {errors.username && (
                <div className="invalid-feedback">{errors.username}</div>
              )}
            </div>
            {!id && (
              <div className="col-md-6 mb-3">
                <label className="form-label d-block">Password</label>
                <input
                  type="password"
                  className={`form-control mx-auto ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  style={{ maxWidth: "200px" }}
                  name="password"
                  value={formUser.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                />
                {errors.password && (
                  <div className="invalid-feedback">{errors.password}</div>
                )}
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary w-75 mt-3">
            Add User
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
