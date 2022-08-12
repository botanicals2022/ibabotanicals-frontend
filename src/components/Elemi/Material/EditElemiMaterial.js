// react libraries
import { useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// other import file
import { useElemiMaterialContext } from "../../../context/elemi/elemiMaterialContext";
// import { useUserContext } from "../../../context/userContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditElemiMaterial = (props) => {
  const formTitle = "Edit Elemi Material";
  const { open } = props;
  const theElemiMaterialContext = useElemiMaterialContext();
  // const theUserContext = useUserContext();

  const createCloseHandler = () => {
    theElemiMaterialContext.setActiveModal("");
  };

  const handleOnSubmit = () => {
    theElemiMaterialContext.updateMaterial();
  };

  const handleInputChange = (e) => {
    theElemiMaterialContext.onChange(e.target);
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
              label="Material"
              name="material"
              onChange={handleInputChange}
              value={theElemiMaterialContext.selected?.material ?? ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Material Id"
              name="materialId"
              onChange={handleInputChange}
              value={theElemiMaterialContext.selected?.materialId ?? ""}
              variant="outlined"
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
      {theElemiMaterialContext.loading && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default EditElemiMaterial;
