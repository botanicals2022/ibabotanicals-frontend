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
import { useFuelContext } from "../../context/inventory/fuel/fuelContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditElemi = (props) => {
  const formTitle = "Edit Elemi";
  const { open } = props;
  const theElemiContext = useElemiContext();
  const theElemiMaterialContext = useElemiMaterialContext();
  const theFuelContext = useFuelContext();

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

  const handleOnSubmit = () => {
    let tmpElemiSlctd = theElemiContext.selected;
    let tmpFuelList = theFuelContext.fuelList;
    let tmpElemiLast = theElemiContext.elemiList;

    const lastFuelVal = (list) => {
      let res = list[theElemiContext.selected.id - 1];
      return res.fuel;
    };

    let tmpFuelRes = tmpFuelList[tmpFuelList.length - 1];
    if (!tmpFuelRes) {
      return;
    }

    const tmpLastFuel = (objList) => {
      return parseInt(objList[`quantity`].toString().replace(/\D+/gi, ""));
    };

    const updatedFuel = () => {
      if (lastFuelVal(tmpElemiLast) > tmpElemiSlctd.fuel) {
        return (
          tmpLastFuel(tmpFuelRes) +
          (lastFuelVal(tmpElemiLast) - tmpElemiSlctd.fuel)
        );
      } else {
        return (
          tmpLastFuel(tmpFuelRes) +
          (lastFuelVal(tmpElemiLast) - tmpElemiSlctd.fuel)
        );
      }
    };

    theFuelContext.createFuel({
      quantity: updatedFuel(),
      name: "diesel",
      isBalance: true,
    });
    theElemiContext.updateElemi();
  };

  const handleInputChange = (e) => {
    theElemiContext.onChange(e.target);
  };

  const handleAutoInputChange = (e, val) => {
    // setObj((prev) => ({ ...prev, material: val.label }));
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
              value={theElemiContext.selected?.oil ?? ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Oil Inventory Id"
              name="oilInvId"
              onChange={handleInputChange}
              value={theElemiContext.selected?.oilInvId ?? ""}
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
              value={theElemiContext.selected?.fuel ?? ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Fuel Inventory Id"
              name="fuelInvId"
              onChange={handleInputChange}
              value={theElemiContext.selected?.fuelInvId ?? ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <Autocomplete
              fullWidth
              disablePortal
              size="small"
              name="material"
              onChange={handleAutoInputChange}
              value={theElemiContext.selected?.material ?? ""}
              options={elemiMaterials()}
              renderInput={(params) => (
                <TextField {...params} label="Material" />
              )}
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
      {theElemiContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default EditElemi;
