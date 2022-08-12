// react libraries
import { useEffect, useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";

// other import file
import TimeStamp from "../../../../plugins/format-timestamp";
import { useElemiProcessOilContext } from "../../../../context/elemi/oils/elemiProcessOilContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditProcessOil = (props) => {
  const formTitle = "Edit Process Oil";
  const { open } = props;
  const theElemiProcessOilContext = useElemiProcessOilContext();

  const createCloseHandler = () => {
    theElemiProcessOilContext.setActiveModal("");
  };

  const handleInputChange = (e) => {
    theElemiProcessOilContext.onChange(e.target);
  };

  const handleInputDateChange = (date) => {
    theElemiProcessOilContext.onChange({
      name: "distillationDate",
      value: date,
    });
  };

  const handleOnSubmit = (e) => {
    theElemiProcessOilContext.updateProcessOil();
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
                    label="Distillation Date"
                    name="createdAt"
                    value={
                      theElemiProcessOilContext.selected?.distillationDate ?? ""
                    }
                    onChange={handleInputDateChange}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Production Shift"
                  name="prodShift"
                  value={theElemiProcessOilContext.selected?.prodShift ?? ""}
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
                  value={theElemiProcessOilContext.selected?.hSE ?? 0}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="High Sesquiterpene Elemi Loss"
                  name="hSELoss"
                  value={theElemiProcessOilContext.selected?.hSELoss ?? 0}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Total Loss"
                  name="totalLoss"
                  value={theElemiProcessOilContext.selected?.totalLoss ?? 0}
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
                  label="Oil Batch Code Number"
                  name="batchNumber"
                  value={theElemiProcessOilContext.selected?.batchNumber ?? ""}
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
                  value={theElemiProcessOilContext.selected?.elemiFilipina ?? 0}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Elemi Filipina Loss"
                  name="elemiFilipinaLoss"
                  value={
                    theElemiProcessOilContext.selected?.elemiFilipinaLoss ?? 0
                  }
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Total Oil Yield Recovery"
                  name="recoveredOil"
                  value={theElemiProcessOilContext.selected?.recoveredOil ?? 0}
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
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {theElemiProcessOilContext.loading && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default EditProcessOil;
