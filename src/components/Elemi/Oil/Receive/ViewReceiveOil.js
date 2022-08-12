// react libraries
import { useState, useEffect } from "react";

// other import file
import BrowserStorage from "../../../../plugins/storage";
import TimeStamp from "../../../../plugins/format-timestamp";
import { useElemiReceiveOilContext } from "../../../../context/elemi/oils/elemiReceiveOilContext";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import { Box, Typography, Paper, Grid, Checkbox } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const StyledTable = styled("table")({
  borderCollapse: "collapse",
  width: "100%",
  border: "1px solid black",
});
const StyledTh = styled("th")({
  border: "1px solid black",
  paddingRight: "5px",
  paddingLeft: "5px",
});
const StyledTd = styled("td")({
  border: "1px solid black",
  paddingRight: "5px",
  paddingLeft: "5px",
});

const THead = () => {
  return (
    <thead>
      <tr>
        <StyledTh>ID</StyledTh>
        <StyledTh>Selected</StyledTh>
        <StyledTh>High Sesquiterpene Elemi</StyledTh>
        <StyledTh>Elemi Filipina</StyledTh>
        <StyledTh>Flow Rate</StyledTh>
        <StyledTh>Oil Recovery</StyledTh>
        <StyledTh>Oil Batch Number</StyledTh>
      </tr>
    </thead>
  );
};

const TBody = (props) => {
  const { data } = props;

  return (
    <tbody>
      {data.map((row, rowIdx) => {
        return (
          <tr key={`tblRow-${rowIdx}`}>
            <StyledTd>{row.id}</StyledTd>
            <StyledTd sx={{ textAlign: "center" }}>
              <Checkbox
                defaultChecked={row.selected}
                disabled
                sx={{
                  paddingTop: "0",
                  paddingBottom: "0",
                  "& .MuiSvgIcon-root": { fontSize: 17 },
                }}
              />
            </StyledTd>
            <StyledTd>{row?.hSE ?? 0}</StyledTd>
            <StyledTd>{row?.elemiFilipina ?? 0}</StyledTd>
            <StyledTd>{row?.averageFlowRate?.toFixed(2)}</StyledTd>
            <StyledTd>{row?.totalOilRecovery?.toFixed(2)}</StyledTd>
            <StyledTd>{row?.oilBatchNumber}</StyledTd>
          </tr>
        );
      })}
    </tbody>
  );
};

const ViewReceiveOil = (props) => {
  const { open } = props;
  const theElemiReceiveOilContext = useElemiReceiveOilContext();

  const createCloseHandler = () => {
    theElemiReceiveOilContext.setActiveModal("");
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
            Receive Oil
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
                : {theElemiReceiveOilContext.selected?.id}
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
                Tag
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theElemiReceiveOilContext.selected?.tag}
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
                Production Shift
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theElemiReceiveOilContext.selected?.prodShift}
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
                Total Flow Rate
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theElemiReceiveOilContext.selected?.totalFlowRate}
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
                Total Oil Recovery
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theElemiReceiveOilContext.selected?.totalOilRecovery}
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
                  theElemiReceiveOilContext.selected?.userId
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
                Created At
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {TimeStamp(theElemiReceiveOilContext.selected?.createdAt)}
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
                : {TimeStamp(theElemiReceiveOilContext.selected?.updatedAt)}
              </Typography>
            </Grid>
          </Grid>

          <Grid item xs>
            <StyledTable>
              <THead />
              <TBody data={theElemiReceiveOilContext?.selected?.tblRows} />
            </StyledTable>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default ViewReceiveOil;
