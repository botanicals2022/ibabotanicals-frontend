// react libraries
import { useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { Box, Typography, Paper, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// other import file
import BrowserStorage from "../../../../plugins/storage";
import TimeStamp from "../../../../plugins/format-timestamp";
import { useElemiFinalOilContext } from "../../../../context/elemi/oils/elemiFinalOilContext";

const ViewFinalOil = (props) => {
  const { open } = props;
  const theElemiFinalOilContext = useElemiFinalOilContext();

  const createCloseHandler = () => {
    theElemiFinalOilContext.setActiveModal("");
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
            Elemi Final Oil
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
                : {theElemiFinalOilContext.selected?.id}
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
                Lot Number
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theElemiFinalOilContext.selected?.lotNumber}
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
                High Sesquiterpene Elemi
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theElemiFinalOilContext.selected?.hSE}
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
                Elemi Filipina
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theElemiFinalOilContext.selected?.elemiFilipina}
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
                :{" "}
                {BrowserStorage.FoundUser(
                  theElemiFinalOilContext.selected?.userId
                )}
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
                Blending Date
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {TimeStamp(theElemiFinalOilContext.selected?.blendingDate)}
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
                : {TimeStamp(theElemiFinalOilContext.selected?.createdAt)}
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
                : {TimeStamp(theElemiFinalOilContext.selected?.updatedAt)}
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
                Remarks
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theElemiFinalOilContext.selected?.remarks}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default ViewFinalOil;
