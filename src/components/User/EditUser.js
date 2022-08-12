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
  InputAdornment,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// other import file
import { useUserContext } from "../../context/userContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditUser = (props) => {
  const formTitle = "Edit User";
  const { open } = props;
  const theUserContext = useUserContext();

  const createCloseHandler = () => {
    theUserContext.setActiveModal("");
  };

  const handleOnSubmit = () => {
    theUserContext.updateUser();
  };

  const handleInputChange = (e) => {
    theUserContext.onChange(e.target);
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

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
              label="First Name"
              name="firstName"
              onChange={handleInputChange}
              value={theUserContext.selected?.firstName ?? ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Last Name"
              name="lastName"
              onChange={handleInputChange}
              value={theUserContext.selected?.lastName ?? ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <FormControl fullWidth>
              <InputLabel id="user-role-access-label">Role</InputLabel>
              <Select
                labelId="user-role-access-label"
                id="user-role-access"
                value={theUserContext.selected?.role ?? ""}
                name="role"
                label="Role"
                onChange={handleInputChange}
              >
                <MenuItem value={"EDITOR"}>Editor</MenuItem>
                <MenuItem value={"USER"}>User</MenuItem>
                <MenuItem value={"ADMIN"}>Admin</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          {/* <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Role"
              name="role"
              onChange={handleInputChange}
              value={theUserContext.selected?.role ?? ""}
              variant="outlined"
            />
          </Grid> */}
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Username"
              name="username"
              onChange={handleInputChange}
              value={theUserContext.selected?.username ?? ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Status"
              name="status"
              onChange={handleInputChange}
              value={theUserContext.selected?.status ?? ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type={showPassword ? "text" : "password"}
              label="Password"
              name="password"
              onChange={handleInputChange}
              value={theUserContext.selected?.password ?? ""}
              variant="outlined"
              InputProps={{
                // <-- This is where the toggle button is added.
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
      {theUserContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default EditUser;
