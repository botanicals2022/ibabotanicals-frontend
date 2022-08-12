// react libraries
import { useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// other import file
import { useElemiLaboratoryContext } from "../../../context/elemi/elemiLaboratoryContext";
// import { useUserContext } from "../../../context/userContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditElemiLaboratory = (props) => {
  const formTitle = "Edit Elemi Laboratory";
  const { open } = props;
  const theElemiLaboratoryContext = useElemiLaboratoryContext();
  // const theUserContext = useUserContext();

  const createCloseHandler = () => {
    theElemiLaboratoryContext.setActiveModal("");
  };

  const handleOnSubmit = () => {
    theElemiLaboratoryContext.updateLaboratory();
  };

  const handleInputChange = (e) => {
    theElemiLaboratoryContext.onChange(e.target);
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
              label="Product"
              name="product"
              onChange={handleInputChange}
              value={theElemiLaboratoryContext.selected?.product ?? ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Product Code"
              name="productCode"
              onChange={handleInputChange}
              value={theElemiLaboratoryContext.selected?.productCode ?? ""}
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
              value={theElemiLaboratoryContext.selected?.quantity ?? ""}
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
      {theElemiLaboratoryContext.loading && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default EditElemiLaboratory;
