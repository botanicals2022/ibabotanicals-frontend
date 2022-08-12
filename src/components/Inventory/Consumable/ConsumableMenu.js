import { useEffect } from "react";
import { Grid, Paper } from "@mui/material";

// other import file
import Cards from "../../Globals/RouteCards";

const ConsumableMenu = () => {
  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Laboratory Items"
            link="/inventory/consumable/laboratory"
            body="list of all items for laboratory"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Maintenance Items"
            link="/inventory/consumable/maintenance"
            body="list of all items for maintenance"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Office Items"
            link="/inventory/consumable/office"
            body="list of all items for office"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Other Items"
            link="/inventory/consumable/other"
            body="list of all items for other"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="General Consumables"
            link="/inventory/consumable/general-inventory"
            body="general inventory of all consumables"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ConsumableMenu;
