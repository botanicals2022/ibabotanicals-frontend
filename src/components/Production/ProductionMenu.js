import { useEffect } from "react";

// other import file
import Cards from "../Globals/RouteCards";

// muis
import { Grid, Paper } from "@mui/material";

const ProductionMenu = () => {
  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Production"
            link="/production/main"
            body="list of all production"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProductionMenu;
