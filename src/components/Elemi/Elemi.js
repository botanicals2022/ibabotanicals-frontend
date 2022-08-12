import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// other import file
import { useRouterContext } from "../../context/routerContext";
import { useAuthContext } from "../../context/authContext";
import { useElemiContext } from "../../context/elemi/elemiContext";
// import CustomTable from "../Globals/CustomTable";
import Table from "./Table";
import CreateElemi from "./CreateElemi";
import ViewElemi from "./ViewElemi";
import EditElemi from "./EditElemi";

// muis
import { Paper, Box, Button } from "@mui/material";

const headCells = [
  {
    id: "id",
    alignment: "left",
    disablePadding: false,
    label: "ID",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "oil",
    alignment: "center",
    disablePadding: false,
    label: "Oil",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "oilInvId",
    alignment: "center",
    disablePadding: false,
    label: "Oil Inv Id",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "fuel",
    alignment: "center",
    disablePadding: false,
    label: "Fuel",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "fuelInvId",
    alignment: "center",
    disablePadding: false,
    label: "Fuel Inv Id",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "material",
    alignment: "center",
    disablePadding: false,
    label: "Material",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "userId",
    alignment: "center",
    disablePadding: false,
    label: "Modified By",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  // {
  //   id: "createdAt",
  //   alignment: "center",
  //   disablePadding: false,
  //   label: "Created At",
  //   isSortable: false,
  //   hasDropdown: false,
  //   dropDownData: [],
  // },
  // {
  //   id: "updatedAt",
  //   alignment: "center",
  //   disablePadding: false,
  //   label: "Updated At",
  //   isSortable: false,
  //   hasDropdown: false,
  //   dropDownData: [],
  // },
  {
    id: "actions",
    alignment: "center",
    disablePadding: false,
    label: "Actions",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
];

const Elemi = () => {
  const location = useLocation();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiContext = useElemiContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiContext.setSelected(props);
    theElemiContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiContext.deleteElemi(props);
  };

  const handleViewDetailsRequest = (props) => {
    theElemiContext.setSelected(props);
    theElemiContext.setActiveModal("view");
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
          Create Elemi
        </Button>
      </Box>
      {theElemiContext.elemiList && (
        // <CustomTable
        //   dataRows={theElemiContext.elemiList}
        //   editRequest={handleEdit}
        //   deleteRequest={handleDelete}
        // />
        <Table
          headCells={headCells}
          dataRows={theElemiContext.elemiList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          // viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateElemi open={theElemiContext.activeModal === "create"} />
      <ViewElemi open={theElemiContext.activeModal === "view"} />
      <EditElemi open={theElemiContext.activeModal === "edit"} />
    </Paper>
  );
};

export default Elemi;
