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
import TimeStamp from "../../../../plugins/format-timestamp";
import { useOfficeContext } from "../../../../context/inventory/consumable/officeContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditOffice = (props) => {
  const formTitle = "Edit Office Consumable";
  const { open } = props;
  const theOfficeContext = useOfficeContext();

  const [addPurchaseItem, setAddPurchaseItem] = useState(true);

  const handleAddPurchaseItem = (e) => {
    const { checked } = e.target;
    setAddPurchaseItem(checked);
  };

  const createCloseHandler = () => {
    theOfficeContext.setActiveModal("");
  };

  const handleOnSubmit = () => {
    if (addPurchaseItem) {
      theOfficeContext.updateOfficePurchaseItem();
    } else {
      theOfficeContext.updateOffice();
    }
  };

  const handleInputChange = (e) => {
    theOfficeContext.onChange(e.target);
  };

  const handleInputDateChange = (date) => {
    theOfficeContext.onChange({
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
                  label="OID"
                  name="oid"
                  value={theOfficeContext.selected?.oid ?? ""}
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
                  value={theOfficeContext.selected?.name ?? ""}
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
                  value={theOfficeContext.selected?.quantity ?? ""}
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
                  value={theOfficeContext.selected?.quality ?? ""}
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
                  value={theOfficeContext.selected?.contact ?? ""}
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
                    value={theOfficeContext.selected?.dateOfDelivery ?? ""}
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
                  value={theOfficeContext.selected?.price ?? ""}
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
                  value={theOfficeContext.selected?.batchCode ?? ""}
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
                  value={theOfficeContext.selected?.supplier ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Destination"
                  name="destination"
                  value={theOfficeContext.selected?.destination ?? ""}
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
                  value={theOfficeContext.selected?.address ?? ""}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs></Grid>
            </Grid>
          </Grid>
          <Grid item xs>
            <TextareaAutosize
              aria-label="empty textarea"
              name="description"
              value={theOfficeContext.selected?.description ?? ""}
              placeholder="Enter description here"
              onChange={handleInputChange}
              maxRows={5}
              minRows={5}
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
      {theOfficeContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default EditOffice;
