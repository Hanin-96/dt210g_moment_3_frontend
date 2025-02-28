
import { useAuth } from "../context/AuthContext"

function MyPage() {
  const { user } = useAuth();
  console.log(user?.firstname);

  return (
    <>
      <h1>Min sida</h1>
      <h2>Inloggad</h2>
      <p>Välkommen {user?.firstname ? user.firstname : ""}</p>
    </>
  )
}

export default MyPage