// react libraries
import { useEffect, useState } from "react";

// other import file
import useFocusNext from "../../../../helper/hooks/focusNext";
// import TimeStamp from "../../../../plugins/format-timestamp";
import { useElemiProcessContext } from "../../../../context/elemi/forms/elemiProcessContext";
import { useElemiReceiveOilContext } from "../../../../context/elemi/oils/elemiReceiveOilContext";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  Checkbox,
  TextField,
} from "@mui/material";
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
  const { data, onRequestSelect, onRequestAddToRecord, focusNextEvent } = props;

  const handleAddToCheckList = (e, row, idx) => {
    const { checked } = e.target;
    onRequestSelect(row, checked, idx);
  };

  const handleAddToRecord = (cname, e, idx) => {
    const { textContent } = e.target;
    onRequestAddToRecord(cname, textContent, idx);
  };

  return (
    <tbody>
      {data.map((row, rowIdx) => {
        return (
          <tr key={`tblRow-${rowIdx}`}>
            <StyledTd>{row.id}</StyledTd>
            <StyledTd sx={{ textAlign: "center" }}>
              <Checkbox
                onChange={(e) => handleAddToCheckList(e, row, rowIdx)}
                defaultChecked={row?.selected}
                // disabled={row.selected}
                sx={{
                  paddingTop: "0",
                  paddingBottom: "0",
                  "& .MuiSvgIcon-root": { fontSize: 17 },
                }}
              />
            </StyledTd>
            <StyledTd
              sx={{ textAlign: "right" }}
              contentEditable
              ref={focusNextEvent}
              onKeyUp={(e) => handleAddToRecord("hSE", e, row.id)}
              suppressContentEditableWarning={true}
            >
              {row?.hSE?.toFixed(2) ?? 0}
            </StyledTd>
            <StyledTd
              sx={{ textAlign: "right" }}
              contentEditable
              ref={focusNextEvent}
              onKeyUp={(e) => handleAddToRecord("elemiFilipina", e, row.id)}
              suppressContentEditableWarning={true}
            >
              {row?.elemiFilipina?.toFixed(2) ?? 0}
            </StyledTd>
            <StyledTd sx={{ textAlign: "right" }}>
              {row?.averageFlowRate?.toFixed(2)}
            </StyledTd>
            <StyledTd sx={{ textAlign: "right" }}>
              {row?.totalOilRecovery}
            </StyledTd>
            <StyledTd>{row.oilBatchNumber}</StyledTd>
          </tr>
          // )
        );
      })}
    </tbody>
  );
};

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditReceiveOil = (props) => {
  const formTitle = "Edit Receive Oils";
  const { open } = props;

  const theFocusNext = useFocusNext();
  const theElemiReceiveOilContext = useElemiReceiveOilContext();
  // const theElemiProcessContext = useElemiProcessContext();

  const createCloseHandler = () => {
    theElemiReceiveOilContext.setActiveModal("");
  };

  const handleAddToCheckList = (row, isChkd, idx) => {
    theElemiReceiveOilContext.onAddToCheckList(row, isChkd, idx);
    // if (isChkd) {
    //   theElemiProcessContext.updateProcessStatus(true, row.id);
    // } else {
    //   theElemiProcessContext.updateProcessStatus(false, row.id);
    // }
  };

  const handleAddToRecordList = (cname, value, rowId) => {
    theElemiReceiveOilContext.onAddToRecordList(cname, value, rowId);
  };

  const handleOnSubmit = (e) => {
    theElemiReceiveOilContext.updateReceiveOil();
  };

  const handleInputChange = (e) => {
    theElemiReceiveOilContext.onChange(e.target);
  };

  return (
    <Dialog fullWidth maxWidth="md" disableEscapeKeyDown={true} open={open}>
      <Paper sx={{ position: "relative", padding: "10px" }}>
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

        <Grid container sx={{ gap: "10px" }} direction="column">
          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Tag"
                name="tag"
                value={theElemiReceiveOilContext.selected?.tag ?? ""}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Production Shift"
                name="prodShift"
                value={theElemiReceiveOilContext.selected?.prodShift ?? ""}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Total Flow Rate"
                name="totalflowRate"
                value={theElemiReceiveOilContext.selected?.totalFlowRate ?? 0}
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Total Oil Recovery"
                name="totalOilRecovery"
                value={
                  theElemiReceiveOilContext.selected?.totalOilRecovery ?? 0
                }
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs>
            <StyledTable>
              <THead />
              <TBody
                data={theElemiReceiveOilContext.selected?.tblRows}
                focusNextEvent={theFocusNext}
                onRequestSelect={handleAddToCheckList}
                onRequestAddToRecord={handleAddToRecordList}
              />
            </StyledTable>
          </Grid>
          <Grid item xs>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                sx={{ cursor: "pointer", marginTop: "1.5rem" }}
                onClick={(e) => handleOnSubmit(e)}
                variant="contained"
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {theElemiReceiveOilContext.loading && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default EditReceiveOil;
