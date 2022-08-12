import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// other import file
import Cards from "../../Globals/RouteCards";

// muis
import { Grid, Paper } from "@mui/material";

const ElemiOilMenu = () => {
  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Receive Oil"
            link="/elemi/oil/receive"
            body="Receive elemi oil"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Process Oil"
            link="/elemi/oil/process"
            body="Process elemi oil"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Final Oil"
            link="/elemi/oil/final"
            body="Final elemi oil"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ElemiOilMenu;
