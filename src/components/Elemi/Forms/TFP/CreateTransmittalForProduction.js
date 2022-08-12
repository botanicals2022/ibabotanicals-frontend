import { useState, useEffect } from "react";

// other import file
import useFocusNext from "../../../../helper/hooks/focusNext";
import { useElemiTFPContext } from "../../../../context/elemi/forms/elemiTFPContext";

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

const CreateTransmittalForProduction = (props) => {
  const formTitle = "Create Transmittal For Production";
  const { open } = props;

  const theFocusNext = useFocusNext();
  const theElemiTFPContext = useElemiTFPContext();
  const [obj, setObj] = useState({});
  const [tblRows, setTblRows] = useState({});
  const [rowsData, setRowsData] = useState([0]);

  const createCloseHandler = () => {
    theElemiTFPContext.setActiveModal("");
  };

  const AddRows = () => {
    if (rowsData) {
      let tmpRows = parseInt(rowsData[rowsData.length - 1]) + 1;
      setRowsData([...rowsData, tmpRows]);
    }
  };

  useEffect(() => {
    let tmpQnty = 0;
    let tmpCntnr = 0;

    for (const [key, value] of Object.entries(tblRows)) {
      const tmpNum = value.toString().replace(/[a-zA-Z]+/gi, "");

      if (tmpNum) {
        if (tmpNum > 0) {
          if (key.includes("quantity")) {
            tmpQnty += parseFloat(tmpNum);
            setObj((prev) => ({ ...prev, totalQuantity: tmpQnty }));
          }
          if (key.includes("number_of_containers")) {
            tmpCntnr += parseFloat(tmpNum);
            setObj((prev) => ({ ...prev, totalContainer: tmpCntnr }));
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
    theElemiTFPContext.createTFP({
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
                    Date received:
                  </Typography>
                </Grid>
                <Grid item xs>
                  <TextField
                    type="date"
                    size="small"
                    name="dateReceived"
                    variant="standard"
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
                  {rowsData.map((item, idx) => (
                    <tr key={idx}>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange(`material_description_${item}`, e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "left" }}
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
                        onKeyUp={(e) =>
                          handleInputChange(`container_${item}`, e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "left" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange(`number_of_containers_${item}`, e)
                        }
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
                    <StyledTd sx={{ fontWeight: "bold" }}>Total: </StyledTd>
                    <StyledTd sx={{ textAlign: "right" }}>
                      {obj.totalQuantity}
                    </StyledTd>
                    <StyledTd></StyledTd>
                    <StyledTd sx={{ textAlign: "right" }}>
                      {obj.totalContainer}
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
      {theElemiTFPContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default CreateTransmittalForProduction;
