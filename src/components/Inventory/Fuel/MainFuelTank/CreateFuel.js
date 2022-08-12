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
import { useFuelContext } from "../../../../context/inventory/fuel/fuelContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const CreateFuel = (props) => {
  const formTitle = "Create New Fuel";
  const { open } = props;
  const theFuelContext = useFuelContext();

  const [obj, setObj] = useState({});
  const [addPurchaseItem, setAddPurchaseItem] = useState(true);

  const handleAddPurchaseItem = (e) => {
    const { checked } = e.target;
    setAddPurchaseItem(checked);
  };

  const fuelType = () => {
    return [
      // { label: "Regular", value: "regular" },
      // { label: "Premium", value: "premium" },
      { label: "Diesel", value: "diesel" },
    ];
  };

  const createCloseHandler = () => {
    theFuelContext.setActiveModal("");
  };

  const handleOnSubmit = (e) => {
    let tmpFuelList = theFuelContext.fuelList;
    if (tmpFuelList.length < 1) {
      theFuelContext.createFuelPurchaseItem(obj);
    }
    let tmpFuelRes = tmpFuelList[tmpFuelList.length - 1];
    if (!tmpFuelRes) {
      return;
    }

    const tmpLastFuel = (arrList) => {
      return parseInt(arrList[`quantity`].toString().replace(/\D+/gi, ""));
    };

    // console.log(obj);

    let tmpLastFuelQty = tmpLastFuel(tmpFuelRes) + obj.quantity;

    for (var i = 0; i < 2; i++) {
      if (i == 1) {
        theFuelContext.createFuel({
          name: `${obj.name}`,
          quantity: tmpLastFuelQty,
        });
      } else {
        theFuelContext.createFuelPurchaseItem(obj);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "quantity") {
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
    <Dialog fullWidth maxWidth="sm" disableEscapeKeyDown={true} open={open}>
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

        <FormGroup sx={{ marginY: "10px" }}>
          <FormControlLabel
            sx={{ fontSize: "12px", fontWeight: "bold" }}
            control={
              <Checkbox
                value={addPurchaseItem}
                defaultChecked={addPurchaseItem}
                onChange={handleAddPurchaseItem}
                sx={{
                  paddingTop: "0",
                  paddingBottom: "0",
                  "& .MuiSvgIcon-root": { fontSize: 17 },
                }}
              />
            }
            label={
              <Typography sx={{ fontSize: "12px", fontWeight: "bold" }}>
                Create Purchase Item
              </Typography>
            }
            labelPlacement="end"
          />
        </FormGroup>

        <Grid container sx={{ gap: "10px" }} direction="column">
          <Grid container sx={{ gap: "10px" }} direction="row">
            <Grid item container sx={{ gap: "10px" }} xs direction="column">
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="FID"
                  name="fid"
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
                  renderInput={(params) => (
                    <TextField {...params} label="Name" />
                  )}
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
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Quality"
                  name="quality"
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Contact"
                  name="contact"
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid item container sx={{ gap: "10px" }} xs direction="column">
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Price"
                  name="price"
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
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
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Supplier"
                  name="supplier"
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Address"
                  name="address"
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs></Grid>
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
      {theFuelContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default CreateFuel;
