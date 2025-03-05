import Header from "./Header/Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function layout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default layout


