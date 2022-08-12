import { useState, useEffect } from "react";

// other import file
import { useElemiMRFContext } from "../../../../context/elemi/forms/elemiMRFContext";
import TimeStamp from "../../../../plugins/format-timestamp";
import IsObjEmpty from "../../../../plugins/empty-object";

// muis
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextareaAutosize,
  TextField,
  Button,
  Dialog,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CloseIcon from "@mui/icons-material/Close";
import LinearProgress from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const StyledTable = styled("table")({
  borderCollapse: "collapse",
  width: "100%",
  border: "1px solid black",
});
const StyledTh = styled("th")({
  border: "1px solid black",
  backgroundColor: "#77D970",
  paddingRight: "5px",
  paddingLeft: "5px",
});
const StyledTd = styled("td")({
  border: "1px solid black",
  paddingRight: "5px",
  paddingLeft: "5px",
});

const ViewMaterialRequestForm = (props) => {
  const formTitle = "Material Request Form";
  const { open } = props;

  const theElemiMRFContext = useElemiMRFContext();

  const createCloseHandler = () => {
    theElemiMRFContext.setActiveModal("");
  };

  const tblArrays = (tmpContxtObj) => {
    if (tmpContxtObj.hasOwnProperty("tblRows")) {
      return tmpContxtObj.tblRows;
    } else {
      // console.log("tblRows is not present");
      return [];
    }
  };

  return (
    <Dialog fullWidth maxWidth="md" disableEscapeKeyDown={true} open={open}>
      <Paper elevation={0} sx={{ position: "relative", padding: "10px" }}>
        <Box sx={{ marginBottom: "3rem", marginTop: "1rem" }}>
          <Typography
            align="center"
            sx={{ fontWeight: "bold" }}
            mb={2}
            variant="h5"
            component="div"
          >
            {formTitle}
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
        <Grid container direction="column" sx={{ gap: "10px" }}>
          <Grid item container direction="column" sx={{ gap: "10px" }}>
            <Grid
              item
              container
              direction="column"
              sx={{ marginBottom: "1.5rem", gap: "10px" }}
            >
              <Grid item container sx={{ gap: "10px" }} xs direction="row">
                <Grid item xs="auto">
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="caption"
                    display="block"
                  >
                    Date:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    type="date"
                    size="small"
                    name="date"
                    variant="standard"
                    value={
                      TimeStamp(theElemiMRFContext.selected?.date, "short") ??
                      ""
                    }
                  ></TextField>
                </Grid>
              </Grid>

              <Grid item container sx={{ gap: "10px" }} xs direction="row">
                <Grid item xs="auto">
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="caption"
                    display="block"
                  >
                    Production request/Distillation batch no.:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    type="text"
                    size="small"
                    variant="standard"
                    name="production_request"
                    value={
                      TimeStamp(
                        theElemiMRFContext.selected?.productionRequest,
                        "short"
                      ) ?? ""
                    }
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs>
              <StyledTable>
                <thead>
                  <tr>
                    <StyledTh>Batch Number</StyledTh>
                    <StyledTh>No. Of Sacks</StyledTh>
                    <StyledTh>Weight (kg)</StyledTh>
                    <StyledTh>Note/Condition</StyledTh>
                  </tr>
                </thead>
                <tbody>
                  {tblArrays(theElemiMRFContext.selected).map((item, idx) => (
                    <tr key={idx}>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {item[`batch_number_${idx}`] ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {item[`quantity_${idx}`] ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {item[`weight_${idx}`] ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {item[`remarks_${idx}`] ?? ""}
                      </StyledTd>
                    </tr>
                  ))}
                  <tr>
                    <StyledTd sx={{ textAlign: "left", fontWeight: "bold" }}>
                      Total:
                    </StyledTd>
                    <StyledTd></StyledTd>
                    <StyledTd sx={{ textAlign: "right" }}>
                      {theElemiMRFContext.selected?.totalWeight ?? "0"}
                    </StyledTd>
                    <StyledTd></StyledTd>
                  </tr>
                </tbody>
              </StyledTable>
            </Grid>

            <Grid
              item
              container
              direction="row"
              sx={{ marginTop: "2rem", gap: "10px" }}
            >
              <Grid item container sx={{ gap: "10px" }} xs direction="row">
                <Grid item xs="auto">
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="caption"
                    display="block"
                  >
                    Endorsed by:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    type="text"
                    size="small"
                    name="endorsed_by"
                    variant="standard"
                    value={theElemiMRFContext.selected?.endorsedBy ?? ""}
                  ></TextField>
                </Grid>
              </Grid>

              <Grid item container sx={{ gap: "10px" }} xs direction="row">
                <Grid item xs="auto">
                  <Typography
                    sx={{ fontWeight: "bold" }}
                    variant="caption"
                    display="block"
                  >
                    Received by:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    type="text"
                    size="small"
                    name="received_by"
                    variant="standard"
                    value={theElemiMRFContext.selected?.receivedBy ?? ""}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default ViewMaterialRequestForm;
