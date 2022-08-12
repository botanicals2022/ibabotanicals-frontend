import { useState } from "react";

// other import file
import { useElemiTFLContext } from "../../../../context/elemi/forms/elemiTFLContext";
import TimeStamp from "../../../../plugins/format-timestamp";

// muis
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Dialog,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

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

const ViewTransmittalForLaboratory = (props) => {
  const formTitle = "Transmittal For Laboratory";
  const { open } = props;

  const theElemiTFLContext = useElemiTFLContext();

  const createCloseHandler = () => {
    theElemiTFLContext.setActiveModal("");
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
    <Dialog fullWidth maxWidth="sm" disableEscapeKeyDown={true} open={open}>
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
                    Date received:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    type="date"
                    size="small"
                    name="dateReceived"
                    variant="standard"
                    value={
                      TimeStamp(
                        theElemiTFLContext.selected?.dateReceived,
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
                    <StyledTh>Weight of Hydrosol (kg)</StyledTh>
                    <StyledTh>Weight of Purified Oil (kg)</StyledTh>
                  </tr>
                </thead>
                <tbody>
                  {tblArrays(theElemiTFLContext.selected).map((item, idx) => (
                    <tr key={idx}>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {item[`hydrosol_${idx}`] ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {item[`purified_oil_${idx}`] ?? ""}
                      </StyledTd>
                    </tr>
                  ))}
                  <tr>
                    <StyledTd sx={{ textAlign: "right" }}>
                      {theElemiTFLContext.selected?.totalHydrosol ?? "0"}
                    </StyledTd>
                    <StyledTd sx={{ textAlign: "right" }}>
                      {theElemiTFLContext.selected?.totalPurifiedOil ?? "0"}
                    </StyledTd>
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
                    Prepared by :
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    type="text"
                    size="small"
                    name="preparedBy"
                    variant="standard"
                    value={theElemiTFLContext.selected?.preparedBy ?? ""}
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
                    name="receivedBy"
                    variant="standard"
                    value={theElemiTFLContext.selected?.receivedBy ?? ""}
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

export default ViewTransmittalForLaboratory;
