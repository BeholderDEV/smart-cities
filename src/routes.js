/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.jsx";
import UserProfile from "views/UserProfile.jsx";
import TableList from "views/TableList.jsx";
import Typography from "views/Typography.jsx";
import Icons from "views/Icons.jsx";
import Maps from "views/Maps.jsx";
import Notifications from "views/Notifications.jsx";
import Relatorios from "views/Relatorios.jsx";
import Frota from "views/Frota.jsx";
import Users from "views/Users.jsx"
import Upgrade from "views/Upgrade.jsx";
import Tracks from "views/Tracks";
import BusMap from "views/BusMap.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-graph",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Mapa",
    icon: "pe-7s-map-marker",
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/relatorios",
    name: "Relatorios",
    icon: "pe-7s-news-paper",
    component: Relatorios,
    layout: "/admin"
  },
  {
    path: "/frota/:chassi/map",
    component: BusMap,
    layout: "/admin",
    hideFromSidebar: true
  },
  {
    path: "/frota",
    name: "Frota",
    icon: "pe-7s-car",
    component: Frota,
    layout: "/admin"
  },
  {
    path: "/users",
    name: "Usuários",
    icon: "pe-7s-user",
    component: Users,
    layout: "/admin"
  },
  {
    path: "/tracks",
    name: "Rotas",
    icon: "pe-7s-graph1",
    component: Tracks,
    layout: "/admin"
  },
  {
    path: "/notifications",
    name: "Notificações",
    icon: "pe-7s-bell",
    component: Notifications,
    layout: "/admin"
  }
];

export default dashboardRoutes;
