import { Outlet } from "react-router";
import { Header } from "../components/layouts";

const PrincipalsRoutes = (): JSX.Element => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};

export default PrincipalsRoutes;
