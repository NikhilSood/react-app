
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const Login = ({ user, setUser, setToken }) => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/api/user/login", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email, password
            })
        });

        const json = await response.json();

        if (!response.ok) {
            alert(json.error)
            return
        }

        localStorage.setItem("user", json.user.username);
        localStorage.setItem(json.user.username, JSON.stringify({
            email: json.user.email,
            company: json.user.company,
            token: json.token
        }))

        Cookies.set("user", json.user.username);
        Cookies.set("token", json.token);
        // console.log(json)
        setUser(json.user.username)
        setToken(json.token);
        navigate("/")
    }

    return (
        <div className="login-box">
            <h2>Login</h2>
            <form>
                <div className="user-box">
                    <label>Email: </label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required={true} />
                </div>
                <div className="user-box">
                    <label>Password: </label>
                    <input type={password} value={password} onChange={(e) => setPassword(e.target.value)} required={true} />
                </div>
                <button onClick={handleLogin} className="login" href="#">
                    Log in
                </button>
            </form>
            <span className="newuser"> New User ? <Link to="/signup">SignUp</Link></span>
        </div>
    );
}

export default Login;
