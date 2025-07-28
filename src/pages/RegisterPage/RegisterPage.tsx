import LoginStyle from "../LoginPage/LoginPage.module.css";
import bgPattern from "../../assets/pattern.svg";
import { useState } from "react"
//Importera authcontext
import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

function RegisterPage() {

    const { registerUser } = useAuth();

    //States för formuläret
    const [firstname, setFirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [msgRegister, setmsgRegister] = useState("");
    const [error, setError] = useState('');

    //LoadingSpinner
    const [loadingSpinner, setLoadingSpinner] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Nollställ error state och success meddelande
        setError("");
        setmsgRegister("");

        try {
            if (firstname === "" || lastname === "" || email === "" || username === "" || password === "") {
                return setError("Fyll i varje fält!")
            }
            setLoadingSpinner(true);
            await registerUser({ firstname, lastname, email, username, password });
            setLoadingSpinner(false);
            setmsgRegister("Användarkonto har registrerats");

            //Nollställ inputsfälten
            setFirstname("");
            setlastname("");
            setEmail("");
            setUsername("");
            setPassword("");
        } catch (error) {
            //console.log(error)
            setLoadingSpinner(false);
            setError("Serverfel, E-post/användarnamn finns redan");
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
                    <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>Registrering</h1>
                    <form onSubmit={handleSubmit} className={LoginStyle.form}>
                        <div>
                            <label htmlFor="firstname">Förnamn:</label>
                            <input
                                type="text"
                                id="firstname"
                                required
                                value={firstname}
                                onChange={(e) => setFirstname(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="lastname">Efternamn:</label>
                            <input
                                type="text"
                                id="lastname"
                                required
                                value={lastname}
                                onChange={(e) => setlastname(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="email">E-post:</label>
                            <input
                                type="text"
                                id="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="username">Användarnamn:</label>
                            <input
                                type="text"
                                id="username"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>

                        <div>
                            <label htmlFor="password">Lösenord:</label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        {error && <p style={{ fontSize: "1.5rem", color: "red", marginTop: "1rem", marginBottom: "1rem" }}>{error}</p>}

                        <button type="submit">Registrera</button>
                        {loadingSpinner && <div className="loadingSpinner"></div>}
                    </form>

                    {
                        msgRegister && <p style={{ margin: "1rem auto 1rem auto" }}>{msgRegister}</p>
                    }
                    <div>
                        <Link to="/login" style={{ color: "#1e1e1e", display: "flex", marginTop: "1rem", justifyContent: "flex-start", alignItems: "center", fontSize: "1.5rem" }}><ChevronLeft />Inloggning</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default RegisterPage