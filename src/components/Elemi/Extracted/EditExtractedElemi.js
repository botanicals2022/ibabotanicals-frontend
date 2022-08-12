// react libraries
import { useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// other import file
import { useExtractedElemiContext } from "../../../context/elemi/extractedElemiContext";
// import { useUserContext } from "../../../context/userContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditExtractedElemi = (props) => {
  const FormTitle = "Edit Extracted Elemi";
  const { open } = props;
  const theExtractedElemiContext = useExtractedElemiContext();
  // const theUserContext = useUserContext();

  const createCloseHandler = () => {
    theExtractedElemiContext.setActiveModal("");
  };

  const handleOnSubmit = () => {
    // console.log("onsubmit");
    theExtractedElemiContext.updateExtracted();
  };

  const handleInputChange = (e) => {
    theExtractedElemiContext.onChange(e.target);
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
            {FormTitle}
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
              value={theExtractedElemiContext.selected?.product ?? ""}
              onChange={handleInputChange}
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
              value={theExtractedElemiContext.selected?.productCode ?? ""}
              onChange={handleInputChange}
              variant="outlined"
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
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {theExtractedElemiContext.spinner && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default EditExtractedElemi;
