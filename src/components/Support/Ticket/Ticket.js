import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// other import file
import ObjToCSV from "../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../context/routerContext";
import { useAuthContext } from "../../../context/authContext";
import { useTicketContext } from "../../../context/ticketContext";
// import CustomTable from "../Globals/CustomTable";
import Table from "./Table";
import CreateTicket from "./CreateTicket";
import ViewTicket from "./ViewTicket";

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
    id: "ticketId",
    alignment: "center",
    disablePadding: false,
    label: "Ticket ID",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "subject",
    alignment: "center",
    disablePadding: false,
    label: "Subject",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "content",
    alignment: "center",
    disablePadding: false,
    label: "Content",
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
    id: "updatedAt",
    alignment: "center",
    disablePadding: false,
    label: "Updated At",
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

const Ticket = () => {
  const location = useLocation();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theTicketContext = useTicketContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theTicketContext.setActiveModal("create");
  };

  // const handleEdit = (props) => {
  //   theTicketContext.setSelected(props);
  //   theTicketContext.setActiveModal("edit");
  // };

  const handleDelete = (props) => {
    theTicketContext.deleteElemi(props);
  };

  const handleViewDetailsRequest = (props) => {
    theTicketContext.setSelected(props);
    theTicketContext.setActiveModal("view");
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Ticket ID",
      "Subject",
      "Content",
      "User",
      "Created At",
      "Updated At",
    ];
    let tmpFields = [
      "id",
      "ticketId",
      "subject",
      "content",
      "userId",
      "createdAt",
      "updatedAt",
    ];
    let tmpList = theTicketContext.ticketList;
    ObjToCSV(colName, tmpFields, tmpList, "Ticket Report");
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
          Ticket
        </Typography>{" "}
        {theAuthContext.user.role !== "USER" && (
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
              Create Ticket
            </Button>
          </Box>
        )}
      </Box>
      {theTicketContext.ticketList && (
        <Table
          headCells={headCells}
          dataRows={theTicketContext.ticketList}
          isShown={theAuthContext.user.role === "ADMIN"}
          // editRequest={handleEdit}
          // viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateTicket open={theTicketContext.activeModal === "create"} />
      <ViewTicket open={theTicketContext.activeModal === "view"} />
    </Paper>
  );
};

export default Ticket;
