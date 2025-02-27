import { useAuth } from "../context/AuthContext"

function MyPage() {
  const {user} = useAuth();
  return (
    <>
    <h1>Min sida</h1>
    <h2>Inloggad</h2>
    <p style={{color:"white"}}>Välkommen {user ? user?.firstname : ""}</p>
    </>
  )
}

export default MyPage