//Typer för autentisering context fil
export interface User {
    _id: string,
    firstname: string,
    lastname: string,
    email: string,
    username: string,
    password: string
}   

export interface RegisterCredentials {
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
    registerUser: (credentials: RegisterCredentials) => Promise<void>
}