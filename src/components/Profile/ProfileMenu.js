import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// other import file
import { useRouterContext } from "../../context/routerContext";
import { useUserContext } from "../../context/userContext";
import { useContactContext } from "../../context/contactContext";
import Cards from "../Globals/RouteCards";

// muis
import { Grid, Paper } from "@mui/material";

const ProfileMenu = () => {
  const location = useLocation();
  const theRouterContext = useRouterContext();

  /////////////////////////////////////////////////
  // instantiate func
  const theUserContext = useUserContext();
  // const theStaffContext = useStaffContext();
  const theContactContext = useContactContext();
  /////////////////////////////////////////////////

  useEffect(() => {
    /////////////////////////////////////////////////
    // instantiate data
    theUserContext.getAllUser();
    // theStaffContext.getAllStaff();
    theContactContext.getAllContact();

    /////////////////////////////////////////////////
  }, []);
  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards title="Users" link="/profiles/users" body="list of all user" />
        </Grid>
        {/* <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Staffs"
            link="/profiles/staffs"
            body="list of all staff"
          />
        </Grid> */}
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Contacts"
            link="/profiles/contacts"
            body="list of all contacts"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ProfileMenu;
