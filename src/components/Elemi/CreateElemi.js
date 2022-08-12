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
import { useElemiContext } from "../../context/elemi/elemiContext";
import { useElemiMaterialContext } from "../../context/elemi/elemiMaterialContext";
import { useElemiFuelContext } from "../../context/inventory/fuel/elemiFuelContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const CreateElemi = (props) => {
  const formTitle = "Create New Elemi";
  const { open } = props;
  const theElemiContext = useElemiContext();
  const theElemiMaterialContext = useElemiMaterialContext();
  const theElemiFuelContext = useElemiFuelContext();

  const [obj, setObj] = useState({});

  const elemiMaterials = () => {
    const tmpUser = theElemiMaterialContext.materialList;
    let res = [];
    if (tmpUser) {
      tmpUser.forEach((item, index) => {
        // if (item.material) {
        res.push({ label: `${item.material}`, id: index });
        // }
      });
      return res;
    }
    return [];
  };

  const createCloseHandler = () => {
    theElemiContext.setActiveModal("");
  };

  const handleOnSubmit = (e) => {
    if ("fuel" in obj) {
      // if ("fuel" in obj && obj.fuel.length > 0) {
      let tmpFuelQty = parseInt(obj.fuel.replace(/\D+/gi, ""));
      let tmpFuelList = theElemiFuelContext.fuelList;

      let tmpFuelRes = tmpFuelList[tmpFuelList.length - 1];
      if (!tmpFuelRes) {
        return;
      }
      const tmpLastFuel = (arrList) => {
        return parseInt(arrList[`quantity`].toString().replace(/\D+/gi, ""));
      };

      let tmpLastFuelQty = tmpLastFuel(tmpFuelRes) - tmpFuelQty;
      if (tmpLastFuelQty < 0) {
        return;
      }
      theElemiFuelContext.createElemiFuel({
        quantity: tmpLastFuelQty,
        name: "diesel",
        // isBalance: true,
      });
      theElemiContext.createElemi({
        ...obj,
        fuelInvId: tmpFuelRes["id"].toString(),
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoInputChange = (e, val) => {
    setObj((prev) => ({ ...prev, material: val.label }));
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
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Oil"
              name="oil"
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Fuel"
              name="fuel"
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <Autocomplete
              fullWidth
              disablePortal
              name="material"
              onChange={handleAutoInputChange}
              size="small"
              options={elemiMaterials()}
              renderInput={(params) => (
                <TextField {...params} label="Material" />
              )}
            />
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
      {theElemiContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default CreateElemi;
