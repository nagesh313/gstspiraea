import AllOutIcon from "@material-ui/icons/AllOut";
import DashboardIcon from "@material-ui/icons/Dashboard";
import QueueIcon from "@material-ui/icons/Queue";
import React from "react";
import { AdminDashboard } from "../component/admin/AdminDashboard";
import { AdminList } from "../component/admin/AdminList";
import { AgentList } from "../component/admin/AgentList";
import { PlanList } from "../component/admin/PlanList";
import { UserList } from "../component/admin/UserList";
import Dashboard from "../component/Dashboard";
import { ForgotPassword } from "../component/ForgotPassword";
import { ApplyForGstComponent } from "../component/forms/ApplyForGST";
import { Company } from "../component/forms/Company";
import { LLP } from "../component/forms/LLP";
import { Partnership } from "../component/forms/Partnership";
import { SoleProprietor } from "../component/forms/SoleProprietor";
import { OrderList } from "../component/OrderList";
import { SignIn } from "../component/SignIn";
import { SignUp } from "../component/SignUp";
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
    path: "/dashboard/userlist",
    name: "/dashboard/userlist",
    icon: <AllOutIcon></AllOutIcon>,
    component: <UserList></UserList>,
    layout: "/dashboard/userlist",
  },
  {
    path: "/dashboard/agentlist",
    name: "/dashboard/agentlist",
    icon: <AllOutIcon></AllOutIcon>,
    component: <AgentList></AgentList>,
    layout: "/dashboard/agentlist",
  },
  {
    path: "/dashboard/adminlist",
    name: "/dashboard/adminlist",
    icon: <AllOutIcon></AllOutIcon>,
    component: <AdminList></AdminList>,
    layout: "/dashboard/adminlist",
  },
  {
    path: "/dashboard/planlist",
    name: "/dashboard/planlist",
    icon: <QueueIcon></QueueIcon>,
    component: <PlanList></PlanList>,
    layout: "/dashboard/planlist",
  },
];
