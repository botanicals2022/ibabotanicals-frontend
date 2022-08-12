import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useElemiFuelContext } from "../../../../context/inventory/fuel/elemiFuelContext";
// import CustomTable from "../../Globals/CustomTable";
import Table from "./Table";
import CreateElemiFuel from "./CreateElemiFuel";
import ViewElemiFuel from "./ViewElemiFuel";
import EditElemiFuel from "./EditElemiFuel";

// muis
import { Paper, Box, Button, Typography } from "@mui/material";

const headCells = [
  {
    id: "efid",
    alignment: "left",
    disablePadding: false,
    label: "EFID",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "name",
    alignment: "center",
    disablePadding: false,
    label: "Name",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "quantity",
    alignment: "center",
    disablePadding: false,
    label: "Quantity",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  // {
  //   id: "consumed",
  //   alignment: "center",
  //   disablePadding: false,
  //   label: "Consumed",
  //   isSortable: false,
  //   hasDropdown: false,
  //   dropDownData: [],
  // },
  {
    id: "batchCode",
    alignment: "center",
    disablePadding: false,
    label: "Batch Code",
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

const Fuel = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiFuelContext = useElemiFuelContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiFuelContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiFuelContext.setSelected(props);
    theElemiFuelContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiFuelContext.deleteElemiFuel(props);
  };

  const handleViewRecordRequest = (props) => {
    // const link = props.type.replace(" ", "-");
    navigate(`/inventory/fuel`);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Elemi Fuel Id",
      "Fuel Id",
      "Batch Code",
      "Name",
      "Quantity",
      "Created At",
      "Updated At",
      "Encoder",
    ];
    let tmpFields = [
      "id",
      "efid",
      "fuelId",
      "batchCode",
      "name",
      "quantity",
      "createdAt",
      "updatedAt",
      "userId",
    ];
    let tmpList = theElemiFuelContext.fuelList;

    ObjToCSV(colName, tmpFields, tmpList, "Elemi Fuel Inventory Report");
  };

  const handleViewDetailsRequest = (props) => {
    theElemiFuelContext.setSelected(props);
    theElemiFuelContext.setActiveModal("view");
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
          Elemi Fuel
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
              Create Elemi Fuel
            </Button>
          </Box>
        )}
      </Box>
      {theElemiFuelContext.fuelList && (
        <Table
          headCells={headCells}
          dataRows={theElemiFuelContext.fuelList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
        // <CustomTable
        //   dataRows={theElemiFuelContext.fuelList}
        //   editRequest={handleEdit}
        //   deleteRequest={handleDelete}
        // />
      )}
      <CreateElemiFuel open={theElemiFuelContext.activeModal === "create"} />
      <ViewElemiFuel open={theElemiFuelContext.activeModal === "view"} />
      <EditElemiFuel open={theElemiFuelContext.activeModal === "edit"} />
    </Paper>
  );
};

export default Fuel;
