import { useEffect } from "react";

// other import file
// import { useElemiContext } from "../../context/elemi/elemiContext";
import Cards from "../Globals/RouteCards";

// muis
import { Grid, Paper } from "@mui/material";

const VetiverMenu = () => {
  useEffect(() => {
    console.log("vetiver menu");
  }, []);

  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards title="Forms" link="/vetiver/forms" body="list of all forms" />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Oil"
            link="/vetiver/oil"
            body="list of oil transaction"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default VetiverMenu;
