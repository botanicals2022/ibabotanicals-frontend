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
import { useContactContext } from "../../context/contactContext";
import { useUserContext } from "../../context/userContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const CreateContact = (props) => {
  const formTitle = "Create New Contact";
  const { open } = props;
  const theContactContext = useContactContext();
  const theUserContext = useUserContext();

  const [obj, setObj] = useState({});

  const users = () => {
    const tmpUser = theUserContext.userList;
    let res = [];
    if (tmpUser) {
      tmpUser.forEach((item, index) => {
        // if (item.material) {
        res.push({
          label: item.firstName
            ? `${item.firstName} ${item.lastName}`
            : `${item.username}`,
          id: item.id,
        });
        // }
      });
      return res;
    }
    return [];
  };

  const createCloseHandler = () => {
    theContactContext.setActiveModal("");
  };

  const handleOnSubmit = (e) => {
    theContactContext.createContact(obj);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  };

  const handleAutoInputChange = (e, val) => {
    setObj((prev) => ({ ...prev, ["userId"]: val.id }));
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
              label="Telephone"
              name="telephone"
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Mobile"
              name="mobile"
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Email"
              name="email"
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Other"
              name="other"
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <Autocomplete
              fullWidth
              disablePortal
              name="userId"
              onChange={handleAutoInputChange}
              size="small"
              options={users()}
              renderInput={(params) => <TextField {...params} label="User" />}
            />
          </Grid>
          {/* <Grid item xs>
            <Autocomplete
              fullWidth
              disablePortal
              name="staffId"
              onChange={handleAutoInputChange}
              size="small"
              options={staffs}
              renderInput={(params) => <TextField {...params} label="Staff" />}
            />
          </Grid> */}

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
      {theContactContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default CreateContact;
