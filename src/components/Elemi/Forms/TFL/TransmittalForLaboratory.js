import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useElemiTFLContext } from "../../../../context/elemi/forms/elemiTFLContext";
import Table from "./Table";
import CreateTransmittalForLaboratory from "./CreateTransmittalForLaboratory";
import ViewTransmittalForLaboratory from "./ViewTransmittalForLaboratory";
import EditTransmittalForLaboratory from "./EditTransmittalForLaboratory";

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
    id: "totalHydrosol",
    alignment: "center",
    disablePadding: false,
    label: "Total Hydrosol",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "totalPurifiedOil",
    alignment: "center",
    disablePadding: false,
    label: "Total Purified Oil",
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

const TransmittalForLaboratory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiTFLContext = useElemiTFLContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiTFLContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiTFLContext.setSelected(props);
    theElemiTFLContext.setObjTbl(props.tblRows);
    theElemiTFLContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiTFLContext.deleteTFL(props);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Total Hydrosol",
      "Total Purified Oil",
      "Prepared By",
      "Received By",
      "Date Received",
      "Created At",
      "Updated At",
    ];
    let tmpFields = [
      "id",
      "totalHydrosol",
      "totalPurifiedOil",
      "preparedBy",
      "receivedBy",
      "dateReceived",
      "createdAt",
      "updatedAt",
    ];
    let tmpList = theElemiTFLContext.tFLList;

    ObjToCSV(
      colName,
      tmpFields,
      tmpList,
      "Elemi Transmittal-Laboratory Report"
    );
  };

  const handleViewDetailsRequest = (props) => {
    theElemiTFLContext.setSelected(props);
    theElemiTFLContext.setActiveModal("view");
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
          Transmittal For Laboratory
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
      {theElemiTFLContext.tFLList && (
        <Table
          headCells={headCells}
          dataRows={theElemiTFLContext.tFLList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateTransmittalForLaboratory
        open={theElemiTFLContext.activeModal === "create"}
      />
      <ViewTransmittalForLaboratory
        data={theElemiTFLContext.selected}
        open={theElemiTFLContext.activeModal === "view"}
      />
      <EditTransmittalForLaboratory
        open={theElemiTFLContext.activeModal === "edit"}
      />
    </Paper>
  );
};

export default TransmittalForLaboratory;
