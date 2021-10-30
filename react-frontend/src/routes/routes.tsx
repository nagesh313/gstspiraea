import AllOutIcon from "@material-ui/icons/AllOut";
import DashboardIcon from "@material-ui/icons/Dashboard";
import React from "react";
import Album from "../component/Album";
// import { BarChartComponent, ScatterPlotComponent } from "../component/charts";
import Checkout from "../component/checkout/Checkout";
import Dashboard from "../component/Dashboard";
import { AdminDashboard } from "../component/AdminDashboard";
import Deposits from "../component/Deposits";
import { ForgotPassword } from "../component/ForgotPassword";
import { ApplyForGstComponent } from "../component/forms/ApplyForGST";
import { Company } from "../component/forms/Company";
import { LLP } from "../component/forms/LLP";
import { Partnership } from "../component/forms/Partnership";
import { SoleProprietor } from "../component/forms/SoleProprietor";
import { OrderList } from "../component/OrderList";
import Pricing from "../component/pricing";
import { SignIn } from "../component/SignIn";
import { SignUp } from "../component/SignUp";
import { UserList } from "../component/UserList";
import { PlanList } from "../component/PlanList";
import QueueIcon from "@material-ui/icons/Queue";
import { UploadGSTDocum } from "../component/UploadGSTDashboard";

export const dashboardRoutes = [
  {
    path: "/signin",
    name: "Sign In",
    icon: <DashboardIcon></DashboardIcon>,
    component: <SignIn></SignIn>,
    layout: "/signin",
  },
  {
    path: "/SignUp",
    name: "SignUp",
    icon: <DashboardIcon></DashboardIcon>,
    component: <SignUp></SignUp>,
    layout: "/signup",
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    icon: <DashboardIcon></DashboardIcon>,
    component: <ForgotPassword></ForgotPassword>,
    layout: "/forgot-password",
  },

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <DashboardIcon></DashboardIcon>,
    component: <Dashboard></Dashboard>,
    layout: "/dashboard",
  },
  {
    path: "/admin",
    name: "admin",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Dashboard></Dashboard>,
    layout: "/admin",
  },
  // {
  //   path: "/dashboard/sole-proprietor",
  //   name: "/dashboard/sole-proprietor",
  //   icon: <AssignmentIndIcon></AssignmentIndIcon>,
  //   component: <SolePropreietor></SolePropreietor>,
  //   layout: "/admin",
  // },
  // {
  //   path: "/dashboard/partnership",
  //   name: "/dashboard/partnership",
  //   icon: <AllOutIcon></AllOutIcon>,
  //   component: <Checkout></Checkout>,
  //   layout: "/admin",
  // },
  // {
  //   path: "/dashboard/llp",
  //   name: "/dashboard/llp",
  //   icon: <LLP></LLP>,
  //   component: <Checkout></Checkout>,
  //   layout: "/admin",
  // },

  {
    path: "/dashboard/checkout",
    name: "/dashboard/checkout",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Checkout></Checkout>,
    layout: "/admin",
  },
  {
    path: "/",
    name: "Sign In",
    icon: <DashboardIcon></DashboardIcon>,
    component: <SignIn></SignIn>,
    layout: "/",
  },
];
export const secondaryRoutes = [
  {
    path: "/dashboard/home",
    name: "/dashboard/home",
    icon: <AllOutIcon></AllOutIcon>,
    component: <AdminDashboard></AdminDashboard>,
    layout: "/dashboard/home",
  },
  {
    path: "/dashboard/upload-gst-document",
    name: "/dashboard/home",
    icon: <AllOutIcon></AllOutIcon>,
    component: <UploadGSTDocum></UploadGSTDocum>,
    layout: "/dashboard/home",
  },
  {
    path: "/dashboard/order-list",
    name: "Application List",
    icon: <AllOutIcon></AllOutIcon>,
    component: <OrderList></OrderList>,
    layout: "/dashboard/order-list",
  },
  {
    path: "/dashboard/apply-for-gst",
    name: "/dashboard/apply-for-gst",
    icon: <ApplyForGstComponent></ApplyForGstComponent>,
    component: <ApplyForGstComponent></ApplyForGstComponent>,
    layout: "/apply-for-gst",
  },

  {
    path: "/dashboard/sole-proprietor/:id",
    component: <SoleProprietor></SoleProprietor>,
  },
  {
    path: "/dashboard/partnership/:id",
    component: <Partnership></Partnership>,
  },
  {
    path: "/dashboard/llp/:id",
    component: <LLP></LLP>,
  },
  {
    path: "/dashboard/company/:id",
    component: <Company></Company>,
  },
  {
    path: "/dashboard/checkout",
    name: "/dashboard/checkout",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Checkout></Checkout>,
    layout: "/admin",
  },
  // {
  //   path: "/dashboard/home",
  //   name: "/dashboard/home",
  //   icon: <AllOutIcon></AllOutIcon>,
  //   component: (
  //     <React.Fragment>
  //       {/* <ScatterPlotComponent></ScatterPlotComponent>
  //       <BarChartComponent></BarChartComponent> */}
  //     </React.Fragment>
  //   ),
  //   layout: "/dashboard/home",
  // },
  // {
  //   path: "/dashboard/BulkRNATasks",
  //   name: "/dashboard/BulkRNATasks",
  //   icon: <AllOutIcon></AllOutIcon>,
  //   component: <BulkRNATasks></BulkRNATasks>,
  //   layout: "/dashboard/BulkRNATasks",
  // },
  // {
  //   path: "/dashboard/BulkRNAWorkflow",
  //   name: "/dashboard/BulkRNAWorkflow",
  //   icon: <AllOutIcon></AllOutIcon>,
  //   component: <BulkRNAWorkflow></BulkRNAWorkflow>,
  //   layout: "/dashboard/BulkRNAWorkflow",
  // },
  // {
  //   path: "/dashboard/BulkRNAWorkflowResult/:id",
  //   component: <BulkRNAWorkflowResult></BulkRNAWorkflowResult>,
  // },
  // {
  //   path: "/dashboard/charts",
  //   name: "/dashboard/checkout",
  //   icon: <AllOutIcon></AllOutIcon>,
  //   component: (
  //     <React.Fragment>
  //       <ScatterPlotComponent></ScatterPlotComponent>
  //       <BarChartComponent></BarChartComponent>
  //     </React.Fragment>
  //   ),
  //   layout: "/dashboard/checkout",
  // },
  {
    path: "/dashboard/pricing",
    name: "/dashboard/pricing",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Pricing></Pricing>,
    layout: "/dashboard/pricing",
  },
  {
    path: "/dashboard/album",
    name: "/dashboard/album",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Album></Album>,
    layout: "/dashboard/album",
  },
  {
    path: "/dashboard/deposits",
    name: "/dashboard/deposits",
    icon: <AllOutIcon></AllOutIcon>,
    component: <Deposits></Deposits>,
    layout: "/dashboard/deposits",
  },
  {
    path: "/dashboard/userlist",
    name: "/dashboard/userlist",
    icon: <AllOutIcon></AllOutIcon>,
    component: <UserList></UserList>,
    layout: "/dashboard/userlist",
  },
  {
    path: "/dashboard/planlist",
    name: "/dashboard/planlist",
    icon: <QueueIcon></QueueIcon>,
    component: <PlanList></PlanList>,
    layout: "/dashboard/planlist",
  },
];
