import { useEffect } from "react";

// other import file
import Cards from "../../Globals/RouteCards";
// import { useElemiProcessContext } from "../../../context/elemi/elemiProcessContext";

// muis
import { Grid, Paper } from "@mui/material";

const ElemiReportMenu = () => {
  // const theElemiProcessContext = useElemiProcessContext();
  useEffect(() => {
    // theElemiProcessContext.getAllProcess();
  }, []);

  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Elemi Overview"
            link="/reports/elemi/overview"
            body="list all elemi in total"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ElemiReportMenu;
