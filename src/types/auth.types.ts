//Typer för autentisering context fil
export interface User {
    id: string,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string
}

//Inloggning credentials
export interface LoginCredentials {
    username: string,
    password: string
}

//Respons
export interface AuthResponse {
    user: User,
    token: string
}

export interface AuthContextType {
    user: User | null,
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}