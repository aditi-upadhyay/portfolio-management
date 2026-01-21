import { NavLabel, RoutePath } from "../enums/sidebar";
import React from "react";

export interface NavItem {
    path: RoutePath;
    label: NavLabel;
    Icon: React.ElementType;
}