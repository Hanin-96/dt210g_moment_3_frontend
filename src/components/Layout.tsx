import Header from "./Header/Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function layout() {
  return (
    <>
      <Header />
      <main style={{ minHeight: "80vh" }}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default layout


