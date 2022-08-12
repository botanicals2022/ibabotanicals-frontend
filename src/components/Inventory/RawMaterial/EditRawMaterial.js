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
import TextareaAutosize from "@mui/base/TextareaAutosize";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";

// other import file
import TimeStamp from "../../../plugins/format-timestamp";
import { useRawMaterial } from "../../../context/inventory/rawMaterialContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditGeneralInventory = (props) => {
  const formTitle = "Edit Raw Material";
  const { open } = props;
  const theRawMaterial = useRawMaterial();

  const [addPurchaseItem, setAddPurchaseItem] = useState(true);

  const handleAddPurchaseItem = (e) => {
    const { checked } = e.target;
    setAddPurchaseItem(checked);
  };

  const createCloseHandler = () => {
    theRawMaterial.setActiveModal("");
  };

  const handleOnSubmit = () => {
    theRawMaterial.updateRawMaterial();
  };

  const handleInputChange = (e) => {
    theRawMaterial.onChange(e.target);
  };

  const handleInputDateChange = (date) => {
    theRawMaterial.onChange({ name: "dateOfDelivery", value: TimeStamp(date) });
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
                  label="RMID"
                  name="rmid"
                  value={theRawMaterial.selected?.rmid ?? ""}
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
                  value={theRawMaterial.selected?.name ?? ""}
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
                  value={theRawMaterial.selected?.quantity ?? ""}
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
                  value={theRawMaterial.selected?.quality ?? ""}
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
                  value={theRawMaterial.selected?.contact ?? ""}
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
                    value={theRawMaterial.selected?.dateOfDelivery ?? ""}
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
                  value={theRawMaterial.selected?.price ?? ""}
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
                  value={theRawMaterial.selected?.batchCode ?? ""}
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
                  value={theRawMaterial.selected?.supplier ?? ""}
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
                  value={theRawMaterial.selected?.address ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs></Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <TextareaAutosize
              maxRows={5}
              minRows={5}
              aria-label="empty textarea"
              name="description"
              placeholder="Enter description here"
              value={theRawMaterial.selected?.description ?? ""}
              onChange={handleInputChange}
              style={{
                // height: "100%",
                width: "100%",
                resize: "none",
                borderRadius: "0.25rem",
                padding: "10px",
              }}
            />
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
      {theRawMaterial.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default EditGeneralInventory;
