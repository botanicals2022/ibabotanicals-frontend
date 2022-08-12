import { useEffect } from "react";

// other import file
import { useTicketContext } from "../../context/ticketContext";

import Cards from "../Globals/RouteCards";

// muis
import { Grid, Paper } from "@mui/material";

const SupportMenu = () => {
  const theTicketContext = useTicketContext();

  useEffect(() => {
    theTicketContext.getAllTicket();
  }, []);

  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Ticket"
            link="/support/ticket"
            body="list of all tickets submitted"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default SupportMenu;
