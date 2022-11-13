import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { useNavigate } from "react-router-dom";

const mainList = [
  // {
  //   text: "Dashboard",
  //   link: "/dashboard",
  // },
  {
    text: "Main Banner",
    link: "/banner",
  },
  {
    text: "Product",
    link: "/product",
  },
  {
    text: "Skin Concern",
    link: "/skin-concern",
  },
  {
    text: "Skin Type",
    link: "/skin-type",
  },
];

export const MainListItems = () => {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {mainList.map((item) => (
        <ListItemButton onClick={() => navigate(item.link)} key={item.link}>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary={item.text} />
        </ListItemButton>
      ))}
    </React.Fragment>
  );
};

export const secondaryListItems = <React.Fragment></React.Fragment>;
