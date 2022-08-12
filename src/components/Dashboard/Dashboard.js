/* eslint-disable */
import React from "react";
// other import file
import Activity from "./Activity";
import Cards from "./Cards";
// import CustomTable from "../Globals/CustomTable";
// import { useAuthContext } from "../../context/authContext";
import useAppBarHeight from "../../helper/hooks/appBarHeight";

// muis
import { Grid, Typography, Box, Card, Paper } from "@mui/material";

const Dashboard = () => {
  const appbarheight = useAppBarHeight();
  // const auth = useAuthContext();
  return (
    <Grid
      container
      columnSpacing={2}
      direction="row"
      sx={{ height: `calc(100vh - ${appbarheight}px)` }}
    >
      <Grid item xs={8} sx={{ border: "1px solid red" }}>
        <Cards />
      </Grid>
      <Grid item xs sx={{ border: "1px solid blue", padding: "10px" }}>
        <Activity />
      </Grid>
    </Grid>
  );
};

export default Dashboard;
