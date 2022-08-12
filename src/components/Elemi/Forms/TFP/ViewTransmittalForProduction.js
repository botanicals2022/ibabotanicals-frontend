import { useState } from "react";

// other import file
import { useElemiTFPContext } from "../../../../context/elemi/forms/elemiTFPContext";
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

const ViewTransmittalForProduction = (props) => {
  const formTitle = "Transmittal For Production";
  const { open } = props;

  const theElemiTFPContext = useElemiTFPContext();

  const createCloseHandler = () => {
    theElemiTFPContext.setActiveModal("");
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
                        theElemiTFPContext.selected?.dateReceived,
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
                    <StyledTh>Material Description</StyledTh>
                    <StyledTh>Quantity (kg)</StyledTh>
                    <StyledTh>Container/Packaging</StyledTh>
                    <StyledTh>No. Of Cotainers</StyledTh>
                  </tr>
                </thead>
                <tbody>
                  {tblArrays(theElemiTFPContext.selected).map((item, idx) => (
                    <tr key={idx}>
                      <StyledTd sx={{ textAlign: "left" }}>
                        {item[`material_description_${idx}`] ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {item[`quantity_${idx}`] ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "left" }}>
                        {item[`container_${idx}`] ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {item[`number_of_containers_${idx}`] ?? ""}
                      </StyledTd>
                    </tr>
                  ))}
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold" }}>Total: </StyledTd>
                    <StyledTd sx={{ textAlign: "right" }}>
                      {theElemiTFPContext.selected?.totalQuantity ?? "0"}
                    </StyledTd>
                    <StyledTd></StyledTd>
                    <StyledTd sx={{ textAlign: "right" }}>
                      {theElemiTFPContext.selected?.totalContainer ?? "0"}
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
                    value={theElemiTFPContext.selected?.preparedBy ?? ""}
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
                    value={theElemiTFPContext.selected?.receivedBy ?? ""}
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

export default ViewTransmittalForProduction;
