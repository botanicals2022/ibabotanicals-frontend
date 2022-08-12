// react libraries
import { useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";

// other import file
import { usePurchaseItemContext } from "../../../context/inventory/purchaseItemContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const CreatePurchaseitem = (props) => {
  const formTitle = "Create New Purchase Item";
  const { open } = props;
  const thePurchaseItemContext = usePurchaseItemContext();

  const [obj, setObj] = useState({});

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

  const handleOnSubmit = (e) => {
    thePurchaseItemContext.createPurchaseItem(obj);
  };

  // purchase item
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
    setObj((prev) => ({ ...prev, ["type"]: val.value }));
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
                <Autocomplete
                  fullWidth
                  disablePortal
                  disableClearable
                  name="type"
                  onChange={handleAutoInputChange}
                  size="small"
                  options={itemType()}
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
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
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
                disabled={!obj.hasOwnProperty("type")}
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
      {thePurchaseItemContext.loading && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default CreatePurchaseitem;
