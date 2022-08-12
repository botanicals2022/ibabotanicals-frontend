import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";

// other import file
import BreadCrumbs from "../Globals/BreadCrumbs";
import { useRouterContext } from "../../context/routerContext";

// muis
import { Paper } from "@mui/material";

const MainIndex = (props) => {
  const { showBreadCrumbs } = props;
  const location = useLocation();
  const theRouterContext = useRouterContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, [location.pathname]);

  return (
    <Paper elevation={0}>
      {showBreadCrumbs && <BreadCrumbs data={theRouterContext.address} />}
      <Outlet />
    </Paper>
  );
};

export default MainIndex;
