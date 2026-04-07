import MainLayout from "@/Layout/MainLayout/MainLayout";
import guestRoutes from "./guest_route";

const routes = [
  {
    prefix: "",
    layout: MainLayout,
    routes: guestRoutes,
  },
];

export default routes;
