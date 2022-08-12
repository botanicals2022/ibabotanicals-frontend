// muis
import Dialog from "@mui/material/Dialog";
import { Box, Typography, Paper, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// other import file
import { useContactContext } from "../../context/contactContext";
// import TimeStamp from "../../plugins/format-timestamp";
import BrowserStorage from "../../plugins/storage";

const ViewContact = (props) => {
  const { open } = props;
  const theContactContext = useContactContext();

  const createCloseHandler = () => {
    theContactContext.setActiveModal("");
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
            Contact
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
                : {theContactContext.selected?.id}
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
                Telephone
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theContactContext.selected?.telephone}
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
                Mobile
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theContactContext.selected?.mobile}
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
                Email
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theContactContext.selected?.email}
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
                Other
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theContactContext.selected?.other}
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
                User
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {BrowserStorage.FoundUser(theContactContext.selected?.userId)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default ViewContact;
