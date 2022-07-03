import React from "react";
import Menu from "./Menu";

const Layout = ({
  title = "Title",
  description = "Descritpion",
  className,
  children,
}) => (
  <div>
    <Menu />
    <div className="jumbotron">
      <h2>{title}</h2>
      <p className="lead">{description}</p>
    </div>
    <div className={className}>{children}</div>
  </div>
);

export default Layout;
