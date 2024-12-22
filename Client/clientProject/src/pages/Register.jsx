import React from 'react';
import { Footer, Navbar } from "../components";
import { Link } from 'react-router-dom';

const Register = () => {
    const [form, setFormData] = React.useState({
        username: "",
        email: "",
        password: ""
    });

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
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Registration successful:', data);
                alert('Registration successful!');
            } else {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                alert('Failed to register. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert('An error occurred. Please try again later.',error);
        }
    }

    return (
        <>
            <Navbar />
            <div className="container my-3 py-3">
                <h1 className="text-center">Register</h1>
                <hr />
                <div className="row my-4 h-100">
                    <div className="col-md-4 col-lg-4 col-sm-8 mx-auto">
                        <form onSubmit={handleSubmit}>
                            <div className="form my-3">
                                <label htmlFor="Name">Full Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="Name"
                                    name="username"
                                    placeholder="Enter Your Name"
                                    value={form.username}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form my-3">
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
                            <div className="form my-3">
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
                                <p>Already have an account? <Link to="/login" className="text-decoration-underline text-info">Login</Link></p>
                            </div>
                            <div className="text-center">
                                <button className="my-2 mx-auto btn btn-dark" type="submit">
                                    Register
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

export default Register;
