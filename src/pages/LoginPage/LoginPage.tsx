import LoginStyle from "../LoginPage/LoginPage.module.css";
import bgPattern from "../../assets/pattern.svg";
import { useState, useEffect } from "react"
//Importera authcontext
import { useAuth } from "../../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const { login, user } = useAuth();
    const navigate = useNavigate();

    //Kontrollera användare
    useEffect(() => {
        if (user) {
            console.log("User updated:", user);
            navigate("/mypage");
        }
    }, [user])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');

        try {
            await login({ username, password });
            console.log("Inloggning lyckades: ", user)

        } catch (error) {
            setError("Fel användarnamn/lösenord")

        }
    }

    const bgPatternStyle: object = {
        "position": "absolute",
        "width": "100%",
        "opacity": "0.8",
        "zIndex": "-1",
        "objectFit": "cover",
        "height": "100%",

    }
    return (
        <>
            <img src={bgPattern} alt="Mönster" style={bgPatternStyle} />
            <div style={{ padding: "1rem", paddingTop: "20rem", paddingBottom: "20rem" }}>
                <div className={LoginStyle.loginContainer}>
                    <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>Inloggning</h1>
                    <form onSubmit={handleSubmit} className={LoginStyle.form}>
                        <label htmlFor="username">Användarnamn:</label>
                        <input
                            id="username"
                            type="username"
                            required
                            value={username}
                            onChange={(event) => setUsername(event.target.value)} />

                        <br />

                        <label htmlFor="password">Lösenord:</label>
                        <input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(event) => setPassword(event.target.value)} />

                        <br />

                        {
                            error && <span style={{ fontSize: "1.5rem", color: "red" }}>{error}</span>
                        }
                        <br />
                        <button type="submit" style={{ marginTop: "2rem" }}>Logga in</button>
                    </form>
                    <div>
                        <Link to="/register" style={{ color: "#1e1e1e", display: "flex", marginTop: "2rem", justifyContent: "flex-end", alignItems: "center", fontSize: "1.5rem" }}>Inget användarkonto? Registrera<ChevronRight /></Link>
                    </div>
                </div>

            </div>
        </>
    )
}

export default LoginPage