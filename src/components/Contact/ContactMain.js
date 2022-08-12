import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../plugins/obj-2-csv";
import { useRouterContext } from "../../context/routerContext";
import { useAuthContext } from "../../context/authContext";
import { useContactContext } from "../../context/contactContext";
// import CustomTable from "../Globals/CustomTable";
import Table from "./Table";
import ContactCreate from "./ContactCreate";
import ContactEdit from "./ContactEdit";
import ViewContact from "./ViewContact";

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
    id: "telephone",
    alignment: "left",
    disablePadding: false,
    label: "Telephone",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "mobile",
    alignment: "center",
    disablePadding: false,
    label: "Mobile",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "email",
    alignment: "center",
    disablePadding: false,
    label: "Email",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "other",
    alignment: "center",
    disablePadding: false,
    label: "Other",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "userId",
    alignment: "center",
    disablePadding: false,
    label: "User",
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

const ContactMain = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theContactContext = useContactContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theContactContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theContactContext.setSelected(props);
    theContactContext.setActiveModal("edit");
  };

  const handleGenRpt = () => {
    let colName = ["Id", "Telephone", "Mobile", "Email", "Other", "User"];
    let tmpFields = ["id", "telephone", "mobile", "email", "other", "userId"];
    let tmpList = theContactContext.contactList;

    ObjToCSV(colName, tmpFields, tmpList, "Contact Report");
  };

  const handleDelete = (props) => {
    theContactContext.deleteContact(props);
  };

  const handleViewRecordTag = (props) => {
    let tag = props.userId;
    navigate(`/profiles/users?id=${tag}`);
  };

  const handleViewDetailsRequest = (props) => {
    theContactContext.setSelected(props);
    theContactContext.setActiveModal("view");
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
          Contact
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
              Create Contact
            </Button>
          </Box>
        )}
      </Box>
      {theContactContext.contactList && (
        <Table
          headCells={headCells}
          dataRows={theContactContext.contactList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordTag={handleViewRecordTag}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <ContactCreate open={theContactContext.activeModal === "create"} />
      <ContactEdit open={theContactContext.activeModal === "edit"} />
      <ViewContact open={theContactContext.activeModal === "view"} />
    </Paper>
  );
};

export default ContactMain;
