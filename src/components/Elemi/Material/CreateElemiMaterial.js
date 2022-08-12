// react libraries
import { useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// import Autocomplete from "@mui/material/Autocomplete";

// other import file
import { useElemiMaterialContext } from "../../../context/elemi/elemiMaterialContext";
// import { useUserContext } from "../../../context/userContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const CreateElemiMaterial = (props) => {
  const formTitle = "Create New Elemi Material";
  const { open } = props;
  const theElemiMaterialContext = useElemiMaterialContext();
  // const theUserContext = useUserContext();

  const [obj, setObj] = useState({});

  const createCloseHandler = () => {
    theElemiMaterialContext.setActiveModal("");
  };

  const handleOnSubmit = (e) => {
    theElemiMaterialContext.createMaterial(obj);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
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
                Create
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

export default CreateElemiMaterial;
