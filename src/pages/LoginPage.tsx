import { useState } from "react"

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        /*

        try {
            await login({ username, password });


        } catch (error) {
            setError("Inloggningen misslyckades!")

        }
            */
    }
  return (
    <>
    <h1>Inloggning</h1>
    <form onSubmit={handleSubmit}>
                {
                    error && <div>{error}</div>
                }
                <label htmlFor="username">Användarnamn</label>
                <input
                    id="username"
                    type="username"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)} />

                <br />

                <label htmlFor="password">Lösenord</label>
                <input
                    id="password"
                    type="text"
                    required
                    value={password}
                    onChange={(event) => setPassword(event.target.value)} />

                <br />

                <button type="submit">Logga in</button>
            </form>
    </>
  )
}

export default LoginPage