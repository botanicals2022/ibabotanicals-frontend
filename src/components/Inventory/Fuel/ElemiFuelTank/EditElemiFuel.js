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
import { useElemiFuelContext } from "../../../../context/inventory/fuel/elemiFuelContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const ViewElemiFuel = (props) => {
  const formTitle = "Edit Fuel";
  const { open } = props;
  const theElemiFuelContext = useElemiFuelContext();

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
    theElemiFuelContext.setActiveModal("");
  };

  const handleOnSubmit = () => {
    theElemiFuelContext.updateFuel();
  };

  const handleInputChange = (e) => {
    theElemiFuelContext.onChange(e.target);
  };

  const handleAutoInputChange = (e, val) => {
    theElemiFuelContext.onChange({
      name: "name",
      value: val.value,
    });
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
          <Grid item container sx={{ gap: "10px" }} xs direction="column">
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="EFID"
                name="efid"
                value={theElemiFuelContext.selected?.efid ?? ""}
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
                value={theElemiFuelContext.selected?.name ?? ""}
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
                value={theElemiFuelContext.selected?.quantity ?? ""}
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
                value={theElemiFuelContext.selected?.consumed ?? ""}
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
                value={theElemiFuelContext.selected?.batchCode ?? ""}
                onChange={handleInputChange}
                variant="outlined"
              />
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
      {theElemiFuelContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default ViewElemiFuel;
