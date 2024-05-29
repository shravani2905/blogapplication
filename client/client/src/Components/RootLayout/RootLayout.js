import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer"

function RootLayout() {
  return (
    <div>
      <Header />
      <div style={{ minHeight: "60vh" }}>
        <div className="container">
          {" "}
          <Outlet />
        </div>
      </div>
      <div style={{ marginTop: "40px" }}>
        <Footer />
      </div>
    </div>
  );
}

export default RootLayout;