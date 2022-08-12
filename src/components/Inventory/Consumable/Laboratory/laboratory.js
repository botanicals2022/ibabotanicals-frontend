import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useLaboratoryContext } from "../../../../context/inventory/consumable/laboratoryContext";
// import CustomTable from "../../Globals/CustomTable";
import Table from "./Table";
import CreateLaboratory from "./CreateLaboratory";
import ViewLaboratory from "./ViewLaboratory";
import EditLaboratory from "./EditLaboratory";

// muis
import { Paper, Box, Button, Typography } from "@mui/material";

const headCells = [
  {
    id: "lid",
    alignment: "left",
    disablePadding: false,
    label: "LID",
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

const LaboratoryConsumable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theLaboratoryContext = useLaboratoryContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theLaboratoryContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theLaboratoryContext.setSelected(props);
    theLaboratoryContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theLaboratoryContext.deleteConsumable(props);
  };

  const handleViewRecordRequest = (props) => {
    // const link = props.type.replace(" ", "-");
    navigate(`/inventory/purchase-item`);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Laboratory Id",
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
      "lid",
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
    let tmpList = theLaboratoryContext.laboratoryList;

    ObjToCSV(
      colName,
      tmpFields,
      tmpList,
      "Consumable Laboratory-Inventory Report"
    );
  };

  const handleViewDetailsRequest = (props) => {
    theLaboratoryContext.setSelected(props);
    theLaboratoryContext.setActiveModal("view");
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
          Laboratory
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
              Create Laboratory
            </Button>
          </Box>
        )}
      </Box>
      {theLaboratoryContext.laboratoryList && (
        <Table
          headCells={headCells}
          dataRows={theLaboratoryContext.laboratoryList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
        // <CustomTable
        //   dataRows={theLaboratoryContext.laboratoryList}
        //   editRequest={handleEdit}
        //   deleteRequest={handleDelete}
        // />
      )}
      <CreateLaboratory open={theLaboratoryContext.activeModal === "create"} />
      <ViewLaboratory open={theLaboratoryContext.activeModal === "view"} />
      <EditLaboratory open={theLaboratoryContext.activeModal === "edit"} />
    </Paper>
  );
};

export default LaboratoryConsumable;
