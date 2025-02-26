import { createContext, useState, useContext, ReactNode } from "react";

import { User, LoginCredentials, AuthResponse, AuthContextType } from "../types/auth.types";

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
            const response = await fetch("http://localhost:3000/login", {
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

                //Lagra token i localstorage
                localStorage.setItem("token", loginData.token);

                //Sätta user state
                setUser(loginData.user);

            }


        } catch (error) {
            throw error;
        }

    }

    const logout = () => {
        //Ta bort token
        localStorage.removeItem("token");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error("useAuth måste användas inom en AuthProvider")
    }

    return context;
}

