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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";

// other import file
import TimeStamp from "../../../../plugins/format-timestamp";
import { useFuelContext } from "../../../../context/inventory/fuel/fuelContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditFuel = (props) => {
  const formTitle = "Edit Fuel";
  const { open } = props;
  const theFuelContext = useFuelContext();

  const [addPurchaseItem, setAddPurchaseItem] = useState(true);

  const handleAddPurchaseItem = (e) => {
    const { checked } = e.target;
    setAddPurchaseItem(checked);
  };

  const fuelType = () => {
    return [
      { label: "Regular", value: "regular" },
      { label: "Premium", value: "premium" },
      { label: "Diesel", value: "diesel" },
    ];
  };

  const createCloseHandler = () => {
    theFuelContext.setActiveModal("");
  };

  const handleOnSubmit = () => {
    theFuelContext.updateFuel();
  };

  const handleInputChange = (e) => {
    theFuelContext.onChange(e.target);
  };

  const handleAutoInputChange = (e, val) => {
    theFuelContext.onChange({
      name: "name",
      value: val.value,
    });
  };

  const handleInputDateChange = (date) => {
    theFuelContext.onChange({ name: "dateOfDelivery", value: TimeStamp(date) });
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
                Update Purchase Item
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
                  value={theFuelContext.selected?.fid ?? ""}
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
                  value={theFuelContext.selected?.name ?? ""}
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
                  value={theFuelContext.selected?.quantity ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              {/* <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Withdrawn"
                  name="withdrawn"
                  value={theFuelContext.selected?.withdrawn ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid> */}
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Quality"
                  name="quality"
                  value={theFuelContext.selected?.quality ?? ""}
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
                  value={theFuelContext.selected?.contact ?? ""}
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
                  value={theFuelContext.selected?.price ?? ""}
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
                  value={theFuelContext.selected?.batchCode ?? ""}
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
                  value={theFuelContext.selected?.supplier ?? ""}
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
                  value={theFuelContext.selected?.address ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DateTimePicker
                    InputLabelProps={{
                      shrink: true,
                    }}
                    renderInput={(props) => (
                      <TextField
                        sx={{ width: "100%" }}
                        size="small"
                        {...props}
                      />
                    )}
                    label="Date Of Delivery"
                    name="dateOfDelivery"
                    value={theFuelContext.selected?.dateOfDelivery ?? ""}
                    onChange={handleInputDateChange}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={12}>
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
      {theFuelContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default EditFuel;
