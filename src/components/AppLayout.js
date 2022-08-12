/* eslint-disable */
import AppBar from "./Globals/AppBar";

import RouterProvider from "../context/routerContext";
import { useAuthContext } from "../context/authContext";
import { useSnackContext } from "../context/snackAlertContext";

import {
  Container,
  Box,
  Slide,
  Alert,
  Snackbar,
  AlertTitle,
} from "@mui/material";

const AppLayout = () => {
  const auth = useAuthContext();

  const theSnackContext = useSnackContext();
  return (
    <>
      <RouterProvider>
        <Snackbar
          open={theSnackContext.open}
          autoHideDuration={6000}
          onClose={theSnackContext.clearclose}
          TransitionComponent={(props) => <Slide {...props} direction="left" />}
        >
          <Alert
            onClose={theSnackContext.clearclose}
            severity={theSnackContext.severity}
            sx={{ width: "100%" }}
          >
            <AlertTitle>{theSnackContext.title}</AlertTitle>
            {theSnackContext.message}
          </Alert>
        </Snackbar>

        <AppBar />
      </RouterProvider>

      {/* {auth.is_authenticated ? <AppBar /> : null} */}
      {/* <Box sx={{
                padding: 0,
                height: '95vh',
                overflowY: 'auto',
                }}>
                <BrowserRouter>
                    <Routes>
                        <Route exact path="/" element={auth.user ? <Dashboard /> : <Login />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </BrowserRouter>
            </Box> */}
    </>
  );
};

export default AppLayout;
