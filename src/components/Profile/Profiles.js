import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// other import file
import BreadCrumbs from "../Globals/BreadCrumbs";
import { useRouterContext } from "../../context/routerContext";
import { useUserContext } from "../../context/userContext";
// import { useStaffContext } from "../../context/---staffContext";
import { useContactContext } from "../../context/contactContext";

// muis
import { Paper } from "@mui/material";

const Profiles = () => {
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
      <BreadCrumbs data={theRouterContext.address} />
      <Outlet />
    </Paper>
  );
};
export default Profiles;
