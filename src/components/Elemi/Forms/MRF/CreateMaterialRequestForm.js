import { useState, useEffect } from "react";

// other import file
import useFocusNext from "../../../../helper/hooks/focusNext";
import { useElemiMRFContext } from "../../../../context/elemi/forms/elemiMRFContext";

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

const CreateMaterialRequestForm = (props) => {
  const formTitle = "Create Material Request Form";
  const { open } = props;

  const theFocusNext = useFocusNext();
  const theElemiMRFContext = useElemiMRFContext();
  const [obj, setObj] = useState({});
  const [tblRows, setTblRows] = useState({});
  const [rowsData, setRowsData] = useState([0]);

  const createCloseHandler = () => {
    theElemiMRFContext.setActiveModal("");
  };

  const AddRows = () => {
    if (rowsData) {
      let tmpRows = parseInt(rowsData[rowsData.length - 1]) + 1;
      setRowsData([...rowsData, tmpRows]);
    }
  };

  useEffect(() => {
    let tmpQnty = 0;

    for (const [key, value] of Object.entries(tblRows)) {
      const tmpNum = value.toString().replace(/[a-zA-Z]+/gi, "");

      if (tmpNum) {
        if (tmpNum > 0) {
          if (key.includes("weight")) {
            tmpQnty += parseFloat(tmpNum);
            setObj((prev) => ({ ...prev, totalWeight: tmpQnty }));
          }
        }
      }
    }
  }, [tblRows]);

  const handleInputChange = (gname = "", e) => {
    const { name, value, textContent } = e.target;
    if (name) {
      setObj((prev) => ({ ...prev, [name]: value }));
    }
    if (gname) {
      setTblRows((prev) => ({ ...prev, [gname]: textContent }));
    }
  };

  const handleOnSubmit = (e) => {
    // initialize empty object and array
    let tmpArr = [];
    let tmpLoopObj = {};

    // create a function to control the data flow
    // and return the sorted objects separated in arrays of objects
    const finalArrObj = () => {
      rowsData.forEach((item) => {
        let arrName = Object.keys(tblRows).filter(
          (word) => parseInt(word.replace(/\D+/gi, "")) === item
        );

        const singleArrObj = () => {
          arrName.forEach((element) => {
            tmpLoopObj = { ...tmpLoopObj, [element]: tblRows[element] };
          });
          return { ...tmpLoopObj, id: item };
        };

        tmpArr.push(singleArrObj());
        tmpLoopObj = {};
      });
      return tmpArr;
    };

    theElemiMRFContext.createMRF({
      ...obj,
      tblRows: finalArrObj(),
    });
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
                    Production request/Distillation batch no.:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    type="text"
                    size="small"
                    variant="standard"
                    name="productionRequest"
                    onChange={(e) => handleInputChange("", e)}
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
                  {rowsData.map((item, idx) => (
                    <tr key={idx}>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange(`batch_number_${item}`, e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange(`quantity_${item}`, e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange(`weight_${item}`, e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange(`remarks_${item}`, e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                    </tr>
                  ))}

                  <tr>
                    <StyledTd>
                      <AddCircleOutlineIcon
                        sx={{ cursor: "pointer" }}
                        onClick={AddRows}
                      />
                      {/* <DeleteForeverIcon sx={{ cursor: "pointer" }} onClick={removeRows} /> */}
                    </StyledTd>
                    <StyledTd></StyledTd>
                    <StyledTd></StyledTd>
                    <StyledTd></StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ textAlign: "left", fontWeight: "bold" }}>
                      Total:
                    </StyledTd>
                    <StyledTd></StyledTd>
                    <StyledTd sx={{ textAlign: "right" }}>
                      {obj?.totalWeight}
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
                    name="endorsedBy"
                    variant="standard"
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
              Create
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {theElemiMRFContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default CreateMaterialRequestForm;
