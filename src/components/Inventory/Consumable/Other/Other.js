import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useOtherContext } from "../../../../context/inventory/consumable/otherContext";
// import CustomTable from "../../Globals/CustomTable";
import Table from "./Table";
import CreateOther from "./CreateOther";
import ViewOther from "./ViewOther";
import EditOther from "./EditOther";

// muis
import { Paper, Box, Button, Typography } from "@mui/material";

const headCells = [
  {
    id: "othid",
    alignment: "left",
    disablePadding: false,
    label: "OTHID",
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
  {
    id: "quality",
    alignment: "center",
    disablePadding: false,
    label: "Quality",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
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
    id: "destination",
    alignment: "center",
    disablePadding: false,
    label: "Destination",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "description",
    alignment: "center",
    disablePadding: false,
    label: "Description",
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
    id: "dateOfDelivery",
    alignment: "center",
    disablePadding: false,
    label: "Date Of Delivery",
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

const OtherConsumable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theOtherContext = useOtherContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theOtherContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theOtherContext.setSelected(props);
    theOtherContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theOtherContext.deleteConsumable(props);
  };

  const handleViewRecordRequest = (props) => {
    // const link = props.type.replace(" ", "-");
    navigate(`/inventory/purchase-item`);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Other Id",
      "Purchase Id",
      "Batch Code",
      "Name",
      "Quantity",
      "Quality",
      "Price",
      "Supplier",
      "Contact",
      "Address",
      "Destination",
      "Date Of Delivery",
      "Description",
      "Encoder",
    ];
    let tmpFields = [
      "id",
      "othid",
      "purchaseItemId",
      "batchCode",
      "name",
      "quantity",
      "quality",
      "price",
      "supplier",
      "contact",
      "address",
      "destination",
      "dateOfDelivery",
      "description",
      "userId",
    ];
    let tmpList = theOtherContext.otherList;

    ObjToCSV(colName, tmpFields, tmpList, "Consumable Other-Inventory Report");
  };

  const handleViewDetailsRequest = (props) => {
    theOtherContext.setSelected(props);
    theOtherContext.setActiveModal("view");
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
          Other
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
              Create Other
            </Button>
          </Box>
        )}
      </Box>
      {theOtherContext.otherList && (
        <Table
          headCells={headCells}
          dataRows={theOtherContext.otherList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
        // <CustomTable
        //   dataRows={theOtherContext.consumableList}
        //   editRequest={handleEdit}
        //   deleteRequest={handleDelete}
        // />
      )}
      <CreateOther open={theOtherContext.activeModal === "create"} />
      <ViewOther open={theOtherContext.activeModal === "view"} />
      <EditOther open={theOtherContext.activeModal === "edit"} />
    </Paper>
  );
};

export default OtherConsumable;
