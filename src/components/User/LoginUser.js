// react libraries
import { useState, useEffect } from "react";
import axios from "axios";

// muis
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  Slide,
  AlertTitle,
  InputAdornment,
  IconButton,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// other import file
import logo from "../../ibabotanicals_logo.png";
import { useAuthContext } from "../../context/authContext";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

const LoginUser = () => {
  const authContext = useAuthContext();
  const theUserContext = useUserContext();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [errorSnackbar, seterrorSnackbar] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setError(false);
    seterrorSnackbar(false);
  };

  const loginHandler = () => {
    setLoading(true);
    axios
      .post(process.env.REACT_APP_API_URL + "login", {
        username: username,
        password: password,
      })
      .then((res) => {
        setLoading(false);
        const { accessToken } = res.data;

        axios.defaults.headers.common["Authorization"] =
          "Bearer " + accessToken;

        localStorage.setItem("token", accessToken);
        authContext.login(res.data);
        theUserContext.getAllUser();
        // navigate("/", { replace: true });
      })
      .catch((err) => {
        console.error(err);
        setError(true);
        seterrorSnackbar(true);
        setLoading(false);
      });
  };

  useEffect(() => {
    // redirect to dashboard if user is authenticated
    if (authContext.user) {
      navigate("/", { replace: true });
    }
    // eslint-disable-next-line
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") {
      setUsername(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <>
      <Snackbar
        open={errorSnackbar}
        autoHideDuration={6000}
        onClose={handleClose}
        TransitionComponent={(props) => <Slide {...props} direction="left" />}
      >
        <Alert
          onClose={handleClose}
          severity="error"
          variant="outlined"
          sx={{ width: "100%" }}
        >
          <AlertTitle>Error</AlertTitle>
          Invalid credentials.
        </Alert>
      </Snackbar>
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={logo} alt="logo" width="165" height="125" />
        <Container maxWidth="xs" sx={{ marginTop: "1rem" }}>
          <Paper
            elevation={4}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "12px",
            }}
          >
            <Typography
              sx={{
                textTransform: "uppercase",
                marginBottom: "2rem",
                marginTop: "1rem",
              }}
              variant="h4"
            >
              Log In
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid container sx={{ gap: "20px" }}>
                <Grid item xs={12}>
                  <TextField
                    error={error}
                    required
                    // onChange={e => setUsername(e.target.value)}
                    onChange={handleInputChange}
                    name="username"
                    value={username}
                    fullWidth
                    variant="outlined"
                    label="Username"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={error}
                    required
                    // onChange={e => setPassword(e.target.value)}
                    onChange={handleInputChange}
                    value={password}
                    fullWidth
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    name="password"
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
                  ></TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ m: 1, position: "relative", marginTop: "2rem" }}>
                    <Button
                      color="primary"
                      type="submit"
                      variant="contained"
                      // disabled={loading}
                      onClick={loginHandler}
                      disabled={
                        username.length === 0 ||
                        password.length === 0 ||
                        loading
                      }
                    >
                      Log In
                    </Button>
                    {loading && (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          marginTop: "-12px",
                          marginLeft: "-12px",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default LoginUser;
