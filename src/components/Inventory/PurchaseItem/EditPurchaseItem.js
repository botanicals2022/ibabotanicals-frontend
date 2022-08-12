// react libraries
import { useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";

// other import file
import TimeStamp from "../../../plugins/format-timestamp";
import { usePurchaseItemContext } from "../../../context/inventory/purchaseItemContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditPurchaseItem = (props) => {
  const formTitle = "Edit Purchase Item";
  const { open } = props;
  const thePurchaseItemContext = usePurchaseItemContext();

  const itemType = () => {
    return [
      { label: "Fuel", value: "fuel" },
      { label: "Laboratory Consumable", value: "laboratory" },
      { label: "Maintenance Consumable", value: "maintenance" },
      { label: "Office Consumable", value: "office" },
      { label: "Other Consumable", value: "other" },
      { label: "Raw Material", value: "raw material" },
    ];
  };

  const createCloseHandler = () => {
    thePurchaseItemContext.setActiveModal("");
  };

  const handleOnSubmit = () => {
    thePurchaseItemContext.updatePurchaseItem();
  };

  const handleInputChange = (e) => {
    thePurchaseItemContext.onChange(e.target);
  };

  // purchase item
  const handleAutoInputChange = (e, val) => {
    thePurchaseItemContext.onChange({
      name: "type",
      value: val.value,
    });
  };

  const handleInputDateChange = (date) => {
    thePurchaseItemContext.onChange({
      name: "dateOfDelivery",
      value: TimeStamp(date),
    });
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

        <Grid container sx={{ gap: "10px" }} direction="column">
          <Grid container sx={{ gap: "10px" }} direction="row">
            <Grid item container sx={{ gap: "10px" }} xs direction="column">
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="PIID"
                  name="piid"
                  value={thePurchaseItemContext.selected?.piid ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Name"
                  name="name"
                  value={thePurchaseItemContext.selected?.name ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Quantity"
                  name="quantity"
                  value={thePurchaseItemContext.selected?.quantity ?? ""}
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
                  value={thePurchaseItemContext.selected?.quality ?? ""}
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
                  value={thePurchaseItemContext.selected?.contact ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <LocalizationProvider
                  sx={{ width: "100%" }}
                  dateAdapter={AdapterDateFns}
                >
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
                    value={
                      thePurchaseItemContext.selected?.dateOfDelivery ?? ""
                    }
                    onChange={handleInputDateChange}
                  />
                </LocalizationProvider>
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
                  value={thePurchaseItemContext.selected?.price ?? ""}
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
                  value={thePurchaseItemContext.selected?.batchCode ?? ""}
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
                  value={thePurchaseItemContext.selected?.supplier ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <Autocomplete
                  fullWidth
                  disablePortal
                  disableClearable
                  name="type"
                  onChange={handleAutoInputChange}
                  size="small"
                  options={itemType()}
                  value={thePurchaseItemContext.selected?.type ?? ""}
                  renderInput={(params) => (
                    <TextField {...params} label="Type" />
                  )}
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Address"
                  name="address"
                  value={thePurchaseItemContext.selected?.address ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs></Grid>
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
      {thePurchaseItemContext.loading && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default EditPurchaseItem;
