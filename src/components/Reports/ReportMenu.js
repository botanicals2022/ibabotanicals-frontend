import { useEffect } from "react";

// other import file
import Cards from "../Globals/RouteCards";

// muis
import { Grid, Paper } from "@mui/material";

const ReportMenu = () => {
  useEffect(() => {}, []);

  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Elemi Report"
            link="/reports/elemi"
            body="all elemi report"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ReportMenu;
