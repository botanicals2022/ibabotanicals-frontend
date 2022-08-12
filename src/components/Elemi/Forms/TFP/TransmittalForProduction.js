import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useElemiTFPContext } from "../../../../context/elemi/forms/elemiTFPContext";
import Table from "./Table";
import CreateTransmittalForProduction from "./CreateTransmittalForProduction";
import ViewTransmittalForProduction from "./ViewTransmittalForProduction";
import EditTransmittalForProduction from "./EditTransmittalForProduction";

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
    id: "totalQuantity",
    alignment: "center",
    disablePadding: false,
    label: "Total Quantity",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "totalContainer",
    alignment: "center",
    disablePadding: false,
    label: "Total Container",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "preparedBy",
    alignment: "center",
    disablePadding: false,
    label: "Prepared By",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "receivedBy",
    alignment: "center",
    disablePadding: false,
    label: "Received By",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "dateReceived",
    alignment: "center",
    disablePadding: false,
    label: "Date Received",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "userId",
    alignment: "center",
    disablePadding: false,
    label: "Inputted By",
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

const TransmittalForProduction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiTFPContext = useElemiTFPContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiTFPContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiTFPContext.setSelected(props);
    theElemiTFPContext.setObjTbl(props.tblRows);
    theElemiTFPContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiTFPContext.deleteTFP(props);
  };

  const handleViewRecordRequest = (props) => {
    // const link = props.type.replace(" ", "-");
    navigate(`/elemi/forms`);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Total Quantity",
      "Total Container",
      "Prepared By",
      "Received By",
      "Date Received",
      "Created At",
      "Updated At",
    ];
    let tmpFields = [
      "id",
      "totalQuantity",
      "totalContainer",
      "preparedBy",
      "receivedBy",
      "dateReceived",
      "createdAt",
      "updatedAt",
    ];
    let tmpList = theElemiTFPContext.tFPList;

    ObjToCSV(
      colName,
      tmpFields,
      tmpList,
      "Elemi Transmittal-Production Report"
    );
  };

  const handleViewDetailsRequest = (props) => {
    theElemiTFPContext.setSelected(props);
    theElemiTFPContext.setActiveModal("view");
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
          Transmittal For Production
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
              Create Transmittal
            </Button>
          </Box>
        )}
      </Box>
      {theElemiTFPContext.tFPList && (
        <Table
          headCells={headCells}
          dataRows={theElemiTFPContext.tFPList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateTransmittalForProduction
        open={theElemiTFPContext.activeModal === "create"}
      />
      <ViewTransmittalForProduction
        data={theElemiTFPContext.selected}
        open={theElemiTFPContext.activeModal === "view"}
      />
      <EditTransmittalForProduction
        open={theElemiTFPContext.activeModal === "edit"}
      />
    </Paper>
  );
};

export default TransmittalForProduction;
