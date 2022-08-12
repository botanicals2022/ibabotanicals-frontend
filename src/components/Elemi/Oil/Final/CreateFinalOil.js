// react libraries
import { useState, useEffect } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";

// other import file
import TimeStamp from "../../../../plugins/format-timestamp";
import { useElemiFinalOilContext } from "../../../../context/elemi/oils/elemiFinalOilContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const CreateFinalOil = (props) => {
  const formTitle = "Create New Final Oil";
  const { open } = props;
  const theElemiFinalOilContext = useElemiFinalOilContext();

  const [obj, setObj] = useState({});

  useEffect(() => {
    setObj({});
  }, []);

  const createCloseHandler = () => {
    theElemiFinalOilContext.setActiveModal("");
  };

  const handleOnSubmit = (e) => {
    theElemiFinalOilContext.createFinalOil(obj);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "elemiFilipina" || name === "hSE") {
      setObj((prev) => ({ ...prev, [name]: parseFloat(value) }));
    } else {
      setObj((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputDateChange = (date) => {
    setObj((prev) => ({ ...prev, blendingDate: date }));
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
          <Grid item container sx={{ gap: "10px" }} direction="column">
            <Grid item xs>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                  InputLabelProps={{
                    shrink: true,
                  }}
                  renderInput={(props) => (
                    <TextField sx={{ width: "100%" }} size="small" {...props} />
                  )}
                  label="Blending Date"
                  name="blendingDate"
                  value={obj.blendingDate}
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
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <TextareaAutosize
                aria-label="empty textarea"
                name="remarks"
                placeholder="Enter remarks here"
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
      {theElemiFinalOilContext.loading && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default CreateFinalOil;
