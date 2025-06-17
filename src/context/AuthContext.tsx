import { createContext, useState, useContext, ReactNode, useEffect } from "react";

import { User, LoginCredentials, AuthResponse, AuthContextType, RegisterCredentials } from "../types/auth.types";

//Skapar context
const AuthContext = createContext<AuthContextType | null>(null);


//Renderar komponenter
interface AuthProviderProps {
    children: ReactNode
}

//Provider som lagrar context innehåll och skickar ut till komponent
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = async (credentials: LoginCredentials) => {
        try {
            const response = await fetch("https://pin-collect-api.onrender.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            }
            )
            if (!response.ok) {
                throw new Error("Inloggning misslyckades");
            } else {
                const loginData = await response.json() as AuthResponse;
                console.log("LoginData från servern:", loginData);

                //Lagra token i localstorage
                localStorage.setItem("token", loginData.token);

                //Sätta user state
                setUser(loginData.user);

            }

        } catch (error) {
            throw error;
        }

    }


    const registerUser = async (credentials: RegisterCredentials) => {
        try {
            const response = await fetch("https://pin-collect-api.onrender.com/user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            }
            )
            if (!response.ok) {
                throw new Error("Inloggning misslyckades");
            }

        } catch (error) {
            throw Error;
        }

    }

    //Logga ut
    const logout = () => {
        //Ta bort token
        localStorage.removeItem("token");
        setUser(null);
    }



    //Validera token för inloggad
    const checkToken = async () => {
        const token = localStorage.getItem("token");


        if (!token) {
            return;
        }

        try {
            const response = await fetch("https://pin-collect-api.onrender.com/userpage", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })

            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
            }

        } catch {
            localStorage.removeItem("token");
            setUser(null);
        }
    }


    //Köra metod för kontroll om användare är inne
    useEffect(() => {
        checkToken();

        //Kontrollera användares token var 30 min
        const intervalId = setInterval(() => {
            checkToken();
        }, 1800000);

        //Rensa intervallet
        return () => clearInterval(intervalId);
    }, [])



    return (
        <AuthContext.Provider value={{ user, login, logout, registerUser }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth måste användas inom en AuthProvider")
    }

    return context;
}

