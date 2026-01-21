import { Link, useLocation } from "react-router-dom";
import "./sidebar.css";
import React from "react";
import { RoutePath, NavLabel, NavIcons } from "../../enums/sidebar.ts";
import { NavItem } from "../../types/sidebar.ts";

export default function Sidebar() {
  const location = useLocation();

  const navItems: NavItem[] = [
    {
      path: RoutePath.HOME,
      label: NavLabel.HOME,
      Icon: NavIcons.HOME,
    },
    {
      path: RoutePath.PORTFOLIO,
      label: NavLabel.PORTFOLIOS,
      Icon: NavIcons.PORTFOLIO,
    },
    {
      path: RoutePath.EXPERIMENTAL,
      label: NavLabel.EXPERIMENTALS,
      Icon: NavIcons.EXPERIMENTAL,
    },
    {
      path: RoutePath.SLACK,
      label: NavLabel.SLACK_ARCHIVES,
      Icon: NavIcons.SLACK,
    },
    {
      path: RoutePath.REFER,
      label: NavLabel.REFER,
      Icon: NavIcons.REFER,
    },
    {
      path: RoutePath.SUBSCRIPTION,
      label: NavLabel.GIFT,
      Icon: NavIcons.SUBSCRIPTION,
    },
    {
      path: RoutePath.ACCOUNT,
      label: NavLabel.ACCOUNT,
      Icon: NavIcons.ACCOUNT,
    },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">
        <h3>
          <span className="logo-icon">C</span>
          capitalmind
          <span className="premium-badge">premium</span>
        </h3>
      </div>

      <nav className="sidebar-nav">
        {navItems.map(({ path, label, Icon }) => (
          <Link
            key={label}
            to={path}
            className={location.pathname === path ? "active" : ""}
          >
            <span className="nav-icon">
              <Icon size={18} />
            </span>
            {label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">CM</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">CMPSV</div>
            <div className="sidebar-user-plan">Valid till Apr 15, 2025</div>
          </div>
        </div>
      </div>
    </div>
  );
}
