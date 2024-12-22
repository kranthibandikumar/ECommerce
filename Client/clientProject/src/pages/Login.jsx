import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components";
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const [form, setFormData] = React.useState({
    email: "",
    password: ""
  });
  const navigate = useNavigate();

  // Handle form field changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({ ...form, [name]: value });
  }

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault(); // Prevent page reload

    try {
      // Replace 'API_LINK' with your actual API endpoint
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login successful:', data);
        alert('Login successful!');
        navigate('/home');
      } else {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again later.',error);
    }
  }

  return (
    <>
      <Navbar />
      <div className="container my-3 py-3">
        <h1 className="text-center">Login</h1>
        <hr />
        <div className="row my-4 h-100">
          <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
            <form onSubmit={handleSubmit}>
              <div className="my-3">
                <label htmlFor="Email">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="email"
                  placeholder="name@example.com"
                  value={form.email}
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <label htmlFor="Password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="password"
                  placeholder="Password"
                  value={form.password}
                  onChange={handleChange}
                />
              </div>
              <div className="my-3">
                <p>
                  New Here? <Link to="/register" className="text-decoration-underline text-info">Register</Link>
                </p>
              </div>
              <div className="text-center">
                <button className="my-2 mx-auto btn btn-dark" type="submit">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
