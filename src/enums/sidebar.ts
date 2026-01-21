import {
    Home,
    BarChart3,
    FlaskConical,
    MessageCircle,
    Gift,
    Ticket,
    User,
  } from "lucide-react";
  
  export enum RoutePath {
    HOME = "/",
    PORTFOLIO = "/portfolio",
    EXPERIMENTAL = "#",
    SLACK = "#",
    REFER = "#",
    SUBSCRIPTION = "#",
    ACCOUNT = "#",
  }
  
  export enum NavLabel {
    HOME = "Home",
    PORTFOLIOS = "Portfolios",
    EXPERIMENTALS = "Experimentals",
    SLACK_ARCHIVES = "Slack Archives",
    REFER = "Refer a friend",
    GIFT = "Gift a subscription",
    ACCOUNT = "Account",
  }
  
  export const NavIcons = {
    HOME: Home,
    PORTFOLIO: BarChart3,
    EXPERIMENTAL: FlaskConical,
    SLACK: MessageCircle,
    REFER: Gift,
    SUBSCRIPTION: Ticket,
    ACCOUNT: User,
  };
  