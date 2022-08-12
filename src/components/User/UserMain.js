import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../plugins/obj-2-csv";
import { useRouterContext } from "../../context/routerContext";
import { useAuthContext } from "../../context/authContext";
import { useUserContext } from "../../context/userContext";
// import CustomTable from "../Globals/CustomTable";
import Table from "./Table";
import RegisterUser from "./RegisterUser";
import EditUser from "./EditUser";
import ViewUser from "./ViewUser";

// muis
import { Paper, Box, Button, Typography } from "@mui/material";

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
    id: "username",
    alignment: "left",
    disablePadding: false,
    label: "Username",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "firstName",
    alignment: "center",
    disablePadding: false,
    label: "First Name",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "lastName",
    alignment: "center",
    disablePadding: false,
    label: "Last Name",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "role",
    alignment: "center",
    disablePadding: false,
    label: "Role",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "status",
    alignment: "center",
    disablePadding: false,
    label: "Status",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "createdAt",
    alignment: "center",
    disablePadding: false,
    label: "Created At",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
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

const UserMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theUserContext = useUserContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = () => {
    theUserContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theUserContext.setSelected(props);
    theUserContext.setActiveModal("edit");
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Username",
      "First Name",
      "Last Name",
      "Role",
      "Status",
      "Created At",
    ];
    let tmpFields = [
      "id",
      "username",
      "firstName",
      "lastName",
      "role",
      "status",
      "createdAt",
    ];
    let tmpList = theUserContext.userList;

    ObjToCSV(colName, tmpFields, tmpList, "User Report");
  };

  const handleDelete = (props) => {
    theUserContext.deleteUser(props);
  };

  const handleViewRecordTag = (props) => {
    let tag = props.id;
    navigate(`/profiles/contacts?userId=${tag}`);
  };

  const handleViewDetailsRequest = (props) => {
    theUserContext.setSelected(props);
    theUserContext.setActiveModal("view");
  };

  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          paddingTop: "2rem",
          paddingBottom: "0.5rem",
          paddingX: "0.5rem",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold" }}>
          User
        </Typography>{" "}
        {theAuthContext.user.role === "ADMIN" && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "0.5rem",
              gap: "10px",
            }}
          >
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => handleGenRpt(e)}
            >
              Generate Report
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => handleModal(e)}
            >
              Create User
            </Button>
          </Box>
        )}
      </Box>
      {theUserContext.userList && (
        <Table
          headCells={headCells}
          dataRows={theUserContext.userList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordTag={handleViewRecordTag}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <RegisterUser open={theUserContext.activeModal === "create"} />
      <EditUser open={theUserContext.activeModal === "edit"} />
      <ViewUser open={theUserContext.activeModal === "view"} />
    </Paper>
  );
};

export default UserMain;
