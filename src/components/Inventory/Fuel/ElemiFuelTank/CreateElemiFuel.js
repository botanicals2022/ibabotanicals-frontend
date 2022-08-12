// react libraries
import { useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";

// other import file
import { useElemiFuelContext } from "../../../../context/inventory/fuel/elemiFuelContext";
import { useFuelContext } from "../../../../context/inventory/fuel/fuelContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const CreateElemiFuel = (props) => {
  const formTitle = "Create New Elemi Fuel";
  const { open } = props;
  const theElemiFuelContext = useElemiFuelContext();
  const theFuelContext = useFuelContext();

  const [obj, setObj] = useState({});

  const fuelType = () => {
    return [
      // { label: "Regular", value: "regular" },
      // { label: "Premium", value: "premium" },
      { label: "Diesel", value: "diesel" },
    ];
  };

  const createCloseHandler = () => {
    theElemiFuelContext.setActiveModal("");
  };

  const handleOnSubmit = (e) => {
    let tmpFuelList = theFuelContext.fuelList;
    let tmpFuelRes = tmpFuelList[tmpFuelList.length - 1];

    let tmpElemiFuelList = theElemiFuelContext.fuelList;
    let tmpElemiFuelRes = tmpElemiFuelList[tmpElemiFuelList.length - 1];
    if (!tmpFuelRes) {
      return;
    }

    const tmpLastFuel = (arrList) => {
      return parseInt(arrList[`quantity`].toString().replace(/\D+/gi, ""));
    };

    let tmpLastFuelQty = tmpLastFuel(tmpFuelRes) - obj.quantity;

    if (tmpLastFuelQty < 0) {
      return;
    }

    for (var i = 0; i < 2; i++) {
      if (i < 1) {
        theElemiFuelContext.createElemiFuel({
          ...obj,
        });
        theFuelContext.createFuel({
          name: obj.name,
          quantity: tmpLastFuelQty,
        });
      } else {
        if (tmpElemiFuelRes) {
          let tmpLastElemiFuelQty = tmpLastFuel(tmpElemiFuelRes) + obj.quantity;
          theElemiFuelContext.createElemiFuel({
            batchCode: obj.batchCode,
            name: obj.name,
            quantity: tmpLastElemiFuelQty,
          });
        }
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
      // if (name === "quantity" || name === "consumed") {
      setObj((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setObj((prev) => ({ ...prev, [name]: value }));
    }
  };

  // purchase item
  const handleAutoInputChange = (e, val) => {
    setObj((prev) => ({ ...prev, ["name"]: val.value }));
  };

  return (
    <Dialog fullWidth maxWidth="xs" disableEscapeKeyDown={true} open={open}>
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
          <Grid item container sx={{ gap: "10px" }} xs direction="column">
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="EFID"
                name="efid"
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <Autocomplete
                fullWidth
                disablePortal
                disableClearable
                name="name"
                onChange={handleAutoInputChange}
                size="small"
                options={fuelType()}
                renderInput={(params) => <TextField {...params} label="Name" />}
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Quantity"
                name="quantity"
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            {/* <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Consumed"
                name="consumed"
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid> */}
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Batch Code"
                name="batchCode"
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
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
      {theElemiFuelContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default CreateElemiFuel;
