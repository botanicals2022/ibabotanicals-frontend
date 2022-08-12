import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../context/routerContext";
import { useAuthContext } from "../../../context/authContext";
import { useRawMaterial } from "../../../context/inventory/rawMaterialContext";
// import CustomTable from "../../Globals/CustomTable";
import Table from "./Table";
import CreateRawMaterial from "./CreateRawMaterial";
import ViewRawMaterial from "./ViewRawMaterial";
import EditRawMaterial from "./EditRawMaterial";

// muis
import { Paper, Box, Button, Typography } from "@mui/material";

const headCells = [
  {
    id: "rmid",
    alignment: "left",
    disablePadding: false,
    label: "RMID",
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
    id: "name",
    alignment: "center",
    disablePadding: false,
    label: "Name",
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
    id: "contact",
    alignment: "center",
    disablePadding: false,
    label: "Contact",
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

const RawMaterial = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theRawMaterial = useRawMaterial();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theRawMaterial.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theRawMaterial.setSelected(props);
    theRawMaterial.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theRawMaterial.deleteRawMaterial(props);
  };

  const handleViewRecordRequest = (props) => {
    // const link = props.type.replace(" ", "-");
    navigate(`/inventory/purchase-item`);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Raw Material Id",
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
      "Description",
      "Encoder",
    ];
    let tmpFields = [
      "id",
      "rmid",
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
      "description",
      "userId",
    ];
    let tmpList = theRawMaterial.rawMaterialList;

    ObjToCSV(colName, tmpFields, tmpList, "Raw Material Inventory Report");
  };

  const handleViewDetailsRequest = (props) => {
    theRawMaterial.setSelected(props);
    theRawMaterial.setActiveModal("view");
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
          Raw Material
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
              Create Raw Material
            </Button>
          </Box>
        )}
      </Box>
      {theRawMaterial.rawMaterialList && (
        <Table
          headCells={headCells}
          dataRows={theRawMaterial.rawMaterialList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
        // <CustomTable
        //   dataRows={theRawMaterial.rawMaterialList}
        //   editRequest={handleEdit}
        //   deleteRequest={handleDelete}
        // />
      )}
      <CreateRawMaterial open={theRawMaterial.activeModal === "create"} />
      <ViewRawMaterial open={theRawMaterial.activeModal === "view"} />
      <EditRawMaterial open={theRawMaterial.activeModal === "edit"} />
    </Paper>
  );
};

export default RawMaterial;
