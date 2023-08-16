import Button from 'react-bootstrap/Button';
import thiqahLogo from '../assets/thiqahLogo.png';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Header(props) {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');
    const navigate = useNavigate(); // Initialize the navigate function
    const [isHovered, setIsHovered] = useState(false);


    const handleLogout = () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('pID');
        localStorage.removeItem('userid');
        setIsLoggedIn(false);
        navigate('/login'); // Redirect to login page
    }





    const style = {
        logout:
        {
            background: isHovered ? "#0387b0" : "#04ade2",
            border: isHovered ? "#0387b0" : "#04ade2",
            transition: "background 0.3s, border 0.3s", // Add smooth transition
            margin: "10px 20px",
        },
        logo:
        {
            width: "70px",
            height: "60px",
            margin: "10px 20px",

        }


    }


    return (
        <nav className="navbar navbar-light bg-light shadow-sm">
            <img src={thiqahLogo} alt="logo" style={style.logo} l />
           { props.db }
           
            {props.db ? (
                <Button
                    className="Logout"
                    style={style.logout}
                    onClick={handleLogout}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    Log out
                </Button>
            ) : (
                <></>
            )}

        </nav>
    );







}