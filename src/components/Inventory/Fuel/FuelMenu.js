import { useEffect } from "react";
import { Grid, Paper } from "@mui/material";

// other import file
import { useFuelContext } from "../../../context/inventory/fuel/fuelContext";
import { useElemiFuelContext } from "../../../context/inventory/fuel/elemiFuelContext";
import Cards from "../../Globals/RouteCards";

const FuelMenu = () => {
  const theFuelContext = useFuelContext();
  const theElemiFuelContext = useElemiFuelContext();

  useEffect(() => {
    theFuelContext.getAllFuel();
    theElemiFuelContext.getAllElemiFuel();
  }, []);

  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Main Fuel Tank"
            link="/inventory/fuel/main-tank"
            body="list of record for main fuel tank"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Elemi Fuel Tank"
            link="/inventory/fuel/elemi"
            body="list of record for elemi fuel tank"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default FuelMenu;
