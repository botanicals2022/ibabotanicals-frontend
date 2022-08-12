import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// other import file
import { useRouterContext } from "../../context/routerContext";
import { useStaffContext } from "../../context/---staffContext";
import CustomTable from "../Globals/CustomTable";
import StaffCreate from "./StaffCreate";
import StaffEdit from "./StaffEdit";

// muis
import { Paper, Box, Button } from "@mui/material";

const StaffMain = () => {
  const location = useLocation();
  const theRouterContext = useRouterContext();
  const theStaffContext = useStaffContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  useEffect(() => {
    // console.log("user location", location);
    // console.log("context userList ", theStaffContext.staffList);
  }, [theStaffContext.staffList]);

  const handleModal = (e) => {
    theStaffContext.setActiveModal("create");
  };
  const handleEdit = () => {
    theStaffContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    console.log("handleDelete", props);
  };

  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingY: "1rem",
          paddingX: "0.5rem",
        }}
      >
        <Button size="small" variant="outlined" onClick={(e) => handleModal(e)}>
          Create Staff
        </Button>
      </Box>
      {theStaffContext.staffList && (
        <CustomTable
          dataRows={theStaffContext.staffList}
          editRequest={handleEdit}
          deleteRequest={handleDelete}
        />
      )}
      <StaffCreate open={theStaffContext.activeModal === "create"} />
      <StaffEdit open={theStaffContext.activeModal === "edit"} />
    </Paper>
  );
};

export default StaffMain;
