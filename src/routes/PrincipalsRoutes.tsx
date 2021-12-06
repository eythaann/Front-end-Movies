import { Outlet } from "react-router";
import { Footer, Header } from "../components/layouts";

const PrincipalsRoutes = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PrincipalsRoutes;
