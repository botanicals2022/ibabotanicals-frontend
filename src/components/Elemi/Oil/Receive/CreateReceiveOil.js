// react libraries
import { useEffect, useState } from "react";

// other import file
import useFocusNext from "../../../../helper/hooks/focusNext";
import TimeStamp from "../../../../plugins/format-timestamp";
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
        <StyledTh>Date</StyledTh>
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
          // !row.isConsumed && (
          <tr key={`tblRow-${rowIdx}`}>
            <StyledTd>{row.id}</StyledTd>
            <StyledTd sx={{ textAlign: "center" }}>
              <Checkbox
                onChange={(e) => handleAddToCheckList(e, row, rowIdx)}
                // defaultValue={row.isConsumed}
                // disabled={row.isConsumed}
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
            ></StyledTd>
            <StyledTd
              sx={{ textAlign: "right" }}
              contentEditable
              ref={focusNextEvent}
              onKeyUp={(e) => handleAddToRecord("elemiFilipina", e, row.id)}
              suppressContentEditableWarning={true}
            ></StyledTd>
            <StyledTd sx={{ textAlign: "right" }}>
              {row?.averageFlowRate?.toFixed(2)}
            </StyledTd>
            <StyledTd sx={{ textAlign: "right" }}>
              {row.totalOilRecovery}
            </StyledTd>
            <StyledTd>{row.oilBatchNumber}</StyledTd>
            <StyledTd>{TimeStamp(row.createdAt)}</StyledTd>
            {/* <StyledTd>{}</StyledTd> */}
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

const CreateReceiveOil = (props) => {
  const formTitle = "Create New Receive Oils";
  const { open } = props;

  const theFocusNext = useFocusNext();
  const theElemiReceiveOilContext = useElemiReceiveOilContext();
  const theElemiProcessContext = useElemiProcessContext();

  const [counter, setCounter] = useState(0);
  const [obj, setObj] = useState({});
  const [objList, setObjList] = useState([]);
  // const [tag, setTag] = useState([]);

  useEffect(() => {
    getOilsTotal(objList);
  }, [objList, counter]);

  const handleAddToCheckList = (row, isChkd, idx) => {
    console.log(row);
    let tmpData = {
      id: row.id,
      selected: isChkd,
      averageFlowRate: row.averageFlowRate,
      totalOilRecovery: row.totalOilRecovery,
      oilBatchNumber: row.oilBatchNumber,
    };
    if (isChkd) {
      setObjList((prev) => [...prev, tmpData]);
      // theElemiProcessContext.updateProcessStatus(true, row.id);
    } else {
      let tmp_idx = objList.findIndex((item) => item.id === row.id);
      objList.splice(tmp_idx, 1);
      // theElemiProcessContext.updateProcessStatus(false, row.id);
    }
    setCounter(counter + 1);
  };

  const handleAddToRecordList = (cname, value, rowId) => {
    let tmpRowData = objList.find((item) => item.id === rowId);
    if (!tmpRowData) return;
    Object.assign(tmpRowData, { [cname]: parseFloat(value) });
    setCounter(counter + 1);
  };

  const createCloseHandler = () => {
    theElemiReceiveOilContext.setActiveModal("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
    getOilsTotal(objList);
  };

  const getOilsTotal = (list) => {
    let tmpHSE = 0;
    let tmpElemiFilipina = 0;
    let tmpFlowRate = 0;
    let tmpOilRecovery = 0;
    list.forEach((item) => {
      tmpFlowRate += item.averageFlowRate;
      tmpOilRecovery += item.totalOilRecovery;
      tmpHSE += item.hSE ? item.hSE : 0;
      tmpElemiFilipina += item.elemiFilipina ? item.elemiFilipina : 0;
    });

    setObj((prev) => ({
      ...prev,
      totalHSE: tmpHSE,
      totalElemiFilipina: tmpElemiFilipina,
      totalFlowRate: tmpFlowRate,
      totalOilRecovery: tmpOilRecovery,
    }));
  };

  const handleOnSubmit = (e) => {
    console.log(obj);
    // theElemiReceiveOilContext.createReceiveOil({
    //   ...obj,
    //   tblRows: objList,
    // });
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
                value={obj?.tag ?? ""}
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
                value={obj?.prodShift ?? ""}
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
                name="totalFlowRate"
                value={obj?.totalFlowRate ?? 0}
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
                value={obj?.totalOilRecovery ?? 0}
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid item xs>
            <StyledTable>
              <THead />
              <TBody
                data={theElemiProcessContext.processList}
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
                Create
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

export default CreateReceiveOil;
