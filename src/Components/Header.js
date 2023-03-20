import React from 'react'
import { useNavigate } from 'react-router-dom'
// import Avatar from 'react-avatar';
import './Header.css';
import Cookies from 'js-cookie';

const Header = ({ user, setUser }) => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem("user")
        localStorage.removeItem(user)
        Cookies.remove("user");
        Cookies.remove("token");
        setUser("")
        navigate("/login")
    }


    return (
        <header>

            <div className="container" id="header">
                <div className="links">
                    <nav>
                        <ul className="navigation">
                            <li><a href="">Home</a></li>
                            <li><a href="">Users</a></li>
                            <li><a href="">Account</a></li>
                        </ul>
                    </nav>
                </div>
                <div className="log_part">

                    {!user && <button>Login</button>}
                    {user && <button onClick={handleLogout}>LogOut</button>}

                </div>
            </div>
        </header>
    )
}

export default Header