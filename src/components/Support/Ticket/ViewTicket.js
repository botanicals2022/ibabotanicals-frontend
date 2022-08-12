// muis
import Dialog from "@mui/material/Dialog";
import { Box, Typography, Paper, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// other import file
import TimeStamp from "../../../plugins/format-timestamp";
import BrowserStorage from "../../../plugins/storage";
import { useTicketContext } from "../../../context/ticketContext";

const ViewTicket = (props) => {
  const { open } = props;
  const theTicketContext = useTicketContext();

  const createCloseHandler = () => {
    theTicketContext.setActiveModal("");
  };

  return (
    <Dialog fullWidth maxWidth="sm" disableEscapeKeyDown={true} open={open}>
      <Paper sx={{ position: "relative", padding: "10px" }}>
        <Box sx={{ marginBottom: "2rem", marginTop: "1rem" }}>
          <Typography
            align="center"
            sx={{ fontWeight: "bold" }}
            // mb={2}
            variant="h5"
            component="div"
          >
            {/* {theTicketContext.selected?.name} */}
            Ticket
          </Typography>
        </Box>
        <CloseIcon
          onClick={createCloseHandler}
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        />
        <Grid container direction="column">
          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                ID
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theTicketContext.selected?.id}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Ticket Id
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theTicketContext.selected?.ticketId}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Subject
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theTicketContext.selected?.subject}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Modified By
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {BrowserStorage.FoundUser(theTicketContext.selected?.userId)}
                {/* {theTicketContext.selected?.userId} */}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Created At
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {TimeStamp(theTicketContext.selected?.createdAt)}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Updated At
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {TimeStamp(theTicketContext.selected?.updatedAt)}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Content
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theTicketContext.selected?.content}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default ViewTicket;
