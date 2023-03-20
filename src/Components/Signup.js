import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Signup = ({ setUser, setToken }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [company, setCompany] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        const response = await fetch("http://localhost:4000/api/user/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username,
                email,
                password,
                company,
            }),
        });

        const json = await response.json();
        // console.log("json", json.error);

        if (!response.ok) {
            alert(json.error);
            return;
        }
        console.log("json", json);

        localStorage.setItem("user", username);
        localStorage.setItem(
            username,
            JSON.stringify({
                email,
                company,
                token: json.token
            })
        );

        Cookies.set("user", json.user.username);
        Cookies.set("token", json.token);

        setUser(username);
        setToken(json.token);
        navigate("/");
    };

    return (
        <div className="signup-box">
            <h2>Signup</h2>
            <form>
                <div className="user-box">
                    <label>Email</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
                    />


                </div>
                <div className="user-box password">
                    <label>Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required={true}
                    />

                </div>
                <div className="user-box confpassword">
                    <label>Password</label>
                    <input
                        type={password}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={true}
                    />
                </div>
                <div className="user-box company">
                    <label>Company</label>
                    <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        required={true}
                    />

                </div>
                <button onClick={handleSignup} className="signup" href="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Sign Up
                </button>
            </form>
            <span className="newuser">
                Already Registerd? <Link to="/login">Login</Link>
            </span>
        </div>
    );
};

export default Signup;