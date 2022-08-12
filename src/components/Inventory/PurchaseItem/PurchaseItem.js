import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../context/routerContext";
import { useAuthContext } from "../../../context/authContext";
import { usePurchaseItemContext } from "../../../context/inventory/purchaseItemContext";
// import CustomTable from "../../Globals/CustomTable";
import Table from "./Table";
import CreatePurchaseitem from "./CreatePurchaseitem";
import ViewPurchaseItem from "./ViewPurchaseItem";
import EditPurchaseItem from "./EditPurchaseItem";

// muis
import { Paper, Box, Button, Typography } from "@mui/material";

const headCells = [
  {
    id: "piid",
    alignment: "left",
    disablePadding: false,
    label: "PIID",
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
    label: "price",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "type",
    alignment: "center",
    disablePadding: false,
    label: "Type",
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

const PurchaseItem = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const thePurchaseItemContext = usePurchaseItemContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    thePurchaseItemContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    thePurchaseItemContext.setSelected(props);
    thePurchaseItemContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    thePurchaseItemContext.deletePurchaseItem(props);
  };

  const handleViewRecordRequest = (props) => {
    // const link = props.type.replace(" ", "-");
    navigate(`/inventory/purchase-item`);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Purchase Id",
      "Batch Code",
      "Name",
      "Quantity",
      "Quality",
      "Price",
      "Type",
      "Supplier",
      "Contact",
      "Address",
      "Date Of Delivery",
      "Encoder",
    ];
    let tmpFields = [
      "id",
      "piid",
      "batchCode",
      "name",
      "quantity",
      "quality",
      "price",
      "type",
      "supplier",
      "contact",
      "address",
      "dateOfDelivery",
      "userId",
    ];
    let tmpList = thePurchaseItemContext.purchaseItemList;
    ObjToCSV(colName, tmpFields, tmpList, "Purchase Inventory Report");
  };

  const handleViewDetailsRequest = (props) => {
    thePurchaseItemContext.setSelected(props);
    thePurchaseItemContext.setActiveModal("view");
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
          Purchase Item
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
              Create Purchase Item
            </Button>
          </Box>
        )}
      </Box>
      {thePurchaseItemContext.purchaseItemList && (
        <Table
          headCells={headCells}
          dataRows={thePurchaseItemContext.purchaseItemList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
        // <CustomTable
        //   dataRows={thePurchaseItemContext.purchaseItemList}
        //   editRequest={handleEdit}
        //   deleteRequest={handleDelete}
        // />
      )}
      <CreatePurchaseitem
        open={thePurchaseItemContext.activeModal === "create"}
      />
      <ViewPurchaseItem open={thePurchaseItemContext.activeModal === "view"} />
      <EditPurchaseItem open={thePurchaseItemContext.activeModal === "edit"} />
    </Paper>
  );
};

export default PurchaseItem;
