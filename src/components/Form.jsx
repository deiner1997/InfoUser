import React, { useReducer, useState } from "react";

// Initial State
const initialState = {
  users: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    default:
      return state;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formUser, setFormUser] = useState({
    name: "",
    email: "",
    bithDate: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUser({ ...formUser, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};

    if (!formUser.name.trim()) tempErrors.name = "The name is required";
    if (!/\S+@\S+\.\S+/.test(formUser.email))
      tempErrors.email = "Invalid Email";
    if (!formUser.bithDate)
      tempErrors.bithDate = "The birthdate is mandatory";
    if (!formUser.username.trim())
      tempErrors.username = "The username is required";
    if (formUser.password.length < 8)
      tempErrors.password = "Minimum 8 characters";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch({ type: "ADD_USER", payload: formUser });
      setFormUser({
        name: "",
        email: "",
        bithDate: "",
        username: "",
        password: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">User registration</h2>
      <form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow bg-light"
      >
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Name</label>
            <input
              type="text"
              className={`form-control ${
                errors.nombre ? "is-invalid" : ""
              }`}
              name="name"
              value={formUser.name}
              onChange={handleChange}
              placeholder="Type your name"
            />
            {errors.name && (
              <div className="invalid-feedback">{errors.name}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${
                errors.email ? "is-invalid" : ""
              }`}
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

        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">BirthDate</label>
            <input
              type="date"
              className={`form-control ${
                errors.bithDate ? "is-invalid" : ""
              }`}
              name="bithDate"
              value={formUser.bithDate}
              onChange={handleChange}
            />
            {errors.bithDate && (
              <div className="invalid-feedback">{errors.bithDate}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className={`form-control ${
                errors.username ? "is-invalid" : ""
              }`}
              name="username"
              value={formUser.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            {errors.username && (
              <div className="invalid-feedback">{errors.username}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className={`form-control ${
                errors.password ? "is-invalid" : ""
              }`}
              name="password"
              value={formUser.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
            />
            {errors.password && (
              <div className="invalid-feedback">{errors.password}</div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Add User
        </button>
      </form>

      {state.users.length > 0 && (
        <div className="mt-5">
          <h4>Registered users</h4>
          <table className="table table-striped table-bordered mt-3">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>BithDate</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {state.users.map((u, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.bithDate}</td>
                  <td>{u.username}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Form;