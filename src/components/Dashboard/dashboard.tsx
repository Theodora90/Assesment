import React from "react";
import Products from "../Products/products";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <div className="sidebar"></div>
      <div className="main">
        <Products />
      </div>
    </div>
  );
};

export default Dashboard;
