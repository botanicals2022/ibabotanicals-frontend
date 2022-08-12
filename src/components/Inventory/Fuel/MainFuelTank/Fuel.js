import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useFuelContext } from "../../../../context/inventory/fuel/fuelContext";
// import CustomTable from "../../Globals/CustomTable";
import Table from "./Table";
import CreateFuel from "./CreateFuel";
import ViewFuel from "./ViewFuel";
import EditFuel from "./EditFuel";

// muis
import { Paper, Box, Button, Typography } from "@mui/material";

const headCells = [
  {
    id: "fid",
    alignment: "left",
    disablePadding: false,
    label: "FID",
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
  //   id: "withdrawn",
  //   alignment: "center",
  //   disablePadding: false,
  //   label: "Withdrawn",
  //   isSortable: false,
  //   hasDropdown: false,
  //   dropDownData: [],
  // },
  {
    id: "price",
    alignment: "center",
    disablePadding: false,
    label: "Price",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "supplier",
    alignment: "center",
    disablePadding: false,
    label: "Supplier",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "contact",
    alignment: "center",
    disablePadding: false,
    label: "Contact",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "address",
    alignment: "center",
    disablePadding: false,
    label: "Address",
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
  const theFuelContext = useFuelContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theFuelContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theFuelContext.setSelected(props);
    theFuelContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theFuelContext.deleteFuel(props);
  };

  const handleViewRecordRequest = (props) => {
    // const link = props.type.replace(" ", "-");
    navigate(`/inventory/purchase-item`);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Fuel Id",
      "Purchase Id",
      "Batch Code",
      "Name",
      "Quantity",
      "Quality",
      "Price",
      "Supplier",
      "Contact",
      "Address",
      "Date Of Delivery",
      "Encoder",
    ];
    let tmpFields = [
      "id",
      "fid",
      "purchaseItemId",
      "batchCode",
      "name",
      "quantity",
      "quality",
      "price",
      "supplier",
      "contact",
      "address",
      "dateOfDelivery",
      "userId",
    ];
    let tmpList = theFuelContext.fuelList;

    ObjToCSV(colName, tmpFields, tmpList, "Main Fuel Inventory Report");
  };

  const handleViewDetailsRequest = (props) => {
    theFuelContext.setSelected(props);
    theFuelContext.setActiveModal("view");
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
          Main Fuel
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
              Create Fuel
            </Button>
          </Box>
        )}
      </Box>
      {theFuelContext.fuelList && (
        <Table
          headCells={headCells}
          dataRows={theFuelContext.fuelList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
        // <CustomTable
        //   dataRows={theFuelContext.fuelList}
        //   editRequest={handleEdit}
        //   deleteRequest={handleDelete}
        // />
      )}
      <CreateFuel open={theFuelContext.activeModal === "create"} />
      <ViewFuel open={theFuelContext.activeModal === "view"} />
      <EditFuel open={theFuelContext.activeModal === "edit"} />
    </Paper>
  );
};

export default Fuel;
