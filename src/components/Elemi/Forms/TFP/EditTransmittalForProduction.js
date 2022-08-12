import { useState } from "react";

// other import file
import useFocusNext from "../../../../helper/hooks/focusNext";
import { useElemiTFPContext } from "../../../../context/elemi/forms/elemiTFPContext";
import TimeStamp from "../../../../plugins/format-timestamp";
import IsObjEmpty from "../../../../plugins/empty-object";

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

const EditTransmittalForProduction = (props) => {
  const formTitle = "Edit Transmittal For Production";
  const { open } = props;

  const theFocusNext = useFocusNext();
  const theElemiTFPContext = useElemiTFPContext();

  const createCloseHandler = () => {
    theElemiTFPContext.setActiveModal("");
  };

  const handleInputChange = (gname = "", e) => {
    theElemiTFPContext.onChange(gname, e.target);
  };

  const handleOnSubmit = (e) => {
    theElemiTFPContext.updateTFP();
  };

  const tblArrays = (tmpContxtObj) => {
    if (!tmpContxtObj) return [];
    if (!IsObjEmpty(tmpContxtObj)) {
      return tmpContxtObj;
    } else {
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
                    onChange={(e) => handleInputChange("", e)}
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
                  {tblArrays(theElemiTFPContext.objTbl).map((item, idx) => (
                    <tr key={idx}>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onBlur={(e) =>
                          handleInputChange(`material_description_${idx}`, e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "left" }}
                      >
                        {item[`material_description_${idx}`] ?? ""}
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onBlur={(e) => handleInputChange(`quantity_${idx}`, e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        {item[`quantity_${idx}`] ?? ""}
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onBlur={(e) => handleInputChange(`container_${idx}`, e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "left" }}
                      >
                        {item[`container_${idx}`] ?? ""}
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onBlur={(e) =>
                          handleInputChange(`number_of_containers_${idx}`, e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
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
                    onChange={(e) => handleInputChange("", e)}
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
                    onChange={(e) => handleInputChange("", e)}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <Button
              sx={{ cursor: "pointer", marginTop: "1.5rem" }}
              onClick={(e) => handleOnSubmit(e)}
              variant="contained"
            >
              Update
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {theElemiTFPContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default EditTransmittalForProduction;
