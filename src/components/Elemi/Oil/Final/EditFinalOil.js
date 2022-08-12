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
// import TimeStamp from "../../../../plugins/format-timestamp";
import { useElemiFinalOilContext } from "../../../../context/elemi/oils/elemiFinalOilContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditFinalOil = (props) => {
  const formTitle = "Edit Final Oil";
  const { open } = props;
  const theElemiFinalOilContext = useElemiFinalOilContext();

  const createCloseHandler = () => {
    theElemiFinalOilContext.setActiveModal("");
  };

  const handleOnSubmit = () => {
    theElemiFinalOilContext.updateFinalOil();
  };

  const handleInputChange = (e) => {
    theElemiFinalOilContext.onChange(e.target);
  };

  const handleInputDateChange = (date) => {
    theElemiFinalOilContext.onChange({
      name: "blendingDate",
      value: date,
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

        <Grid container sx={{ gap: "10px" }} direction="column">
          <Grid item container sx={{ gap: "10px" }} xs direction="column">
            <Grid item xs>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  InputLabelProps={{
                    shrink: true,
                  }}
                  renderInput={(props) => (
                    <TextField sx={{ width: "100%" }} size="small" {...props} />
                  )}
                  label="Date Of Delivery"
                  name="blendingDate"
                  value={theElemiFinalOilContext.selected?.blendingDate ?? ""}
                  onChange={handleInputDateChange}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Lot Number"
                name="lotNumber"
                value={theElemiFinalOilContext.selected?.lotNumber ?? ""}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="High Sesquiterpene Elemi"
                name="hSE"
                value={theElemiFinalOilContext.selected?.hSE ?? ""}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Elemi Filipina"
                name="elemiFilipina"
                value={theElemiFinalOilContext.selected?.elemiFilipina ?? ""}
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <TextareaAutosize
                aria-label="empty textarea"
                name="remarks"
                placeholder="Enter remarks here"
                value={theElemiFinalOilContext.selected?.remarks ?? ""}
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
      {theElemiFinalOilContext.loading && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default EditFinalOil;
