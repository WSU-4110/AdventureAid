import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

// import heroImg from "../../../assets/img/hero2.jpg";
// import NavBar from "../navbar/index";
import "./index.scss";

export const HeroLayout = ({ children }) => {
  return (
    <Box
    // style={{
    //   backgroundImage: `url(${heroImg})`,
    //   height: '100vh',
    //   backgroundSize: 'cover',
    //   backgroundPosition: 'center'
    // }}
    >
      {/* <Outlet /> */}
      <div className="container">
        {/* <NavBar /> */}
        <div className="content">
          <div className="gradient-bg"></div>
          <div className="icon-bg"></div>
          <div className="outlet">
            <Outlet />
          </div>
        </div>
      </div>
    </Box>
  );
};
