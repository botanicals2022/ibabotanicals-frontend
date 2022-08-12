import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import BrowserStorage from "../../../../plugins/storage";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useElemiQCPContext } from "../../../../context/elemi/forms/elemiQCPContext";
import Table from "./Table";
import CreateQCP from "./CreateQCP";
import ViewQCP from "./ViewQCP";
import EditQCP from "./EditQCP";

// muis
import { Paper, Box, Button, Grid, Typography } from "@mui/material";

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
    id: "refNumber",
    alignment: "center",
    disablePadding: false,
    label: "Reference Number",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "rMBNumber",
    alignment: "center",
    disablePadding: false,
    label: "Raw Material Batch Number",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "oHSBR",
    alignment: "center",
    disablePadding: false,
    label: "On-Hand Stock Before Releasing",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "sAR",
    alignment: "center",
    disablePadding: false,
    label: "Stocks After Releasing",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "totalROW",
    alignment: "center",
    disablePadding: false,
    label: "Total Resins Outbound Weight",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "outboundDate",
    alignment: "center",
    disablePadding: false,
    label: "Outbound Date",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "remarks",
    alignment: "center",
    disablePadding: false,
    label: "Remarks",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "releasedBy",
    alignment: "center",
    disablePadding: false,
    label: "Released By",
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
    id: "userId",
    alignment: "center",
    disablePadding: false,
    label: "User",
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

const QCP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiQCPContext = useElemiQCPContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const formList = () => {
    let tmpArrs = [];
    const storageItem = localStorage.getItem("eQCPList");
    if (!storageItem) return [];
    if (!JSON.parse(storageItem)) return [];
    let newArrs = JSON.parse(storageItem);
    newArrs.forEach((item, idx) => {
      let username = BrowserStorage.FoundUser(item.userId);
      tmpArrs.push({
        ...item,
        user: username,
      });
    });
    return tmpArrs;
  };

  const handleModal = (e) => {
    theElemiQCPContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiQCPContext.setSelected(props);
    theElemiQCPContext.setJsonObject(props.jsonObject);
    theElemiQCPContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiQCPContext.deleteProcess(props);
  };

  const handleGenProcRpt = () => {
    let colName = [
      "ID",
      "Reference Number",
      "Raw Material Batch Number",
      "On-Hand Stock Before Releasing",
      "Stocks After Releasing",
      "Total Resins Outbound Weight",
      "Outbound Date",
      "Remarks",
      "Released By",
      "Received By",
      "Created At",
      "Updated At",
      "User",
    ];
    let tmpFields = [
      "id",
      "refNumber",
      "rMBNumber",
      "oHSBR",
      "sAR",
      "totalROW",
      "outboundDate",
      "remarks",
      "releasedBy",
      "receivedBy",
      "createdAt",
      "updatedAt",
      "user",
    ];

    ObjToCSV(
      colName,
      tmpFields,
      formList(),
      "Elemi Quality Control Parameters Report"
    );
  };

  const handleViewDetailsRequest = (props) => {
    theElemiQCPContext.setSelected(props);
    theElemiQCPContext.setActiveModal("view");
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
          Quality Control Parameters
        </Typography>
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
              onClick={(e) => handleGenProcRpt(e)}
            >
              Quality Control Excel Report
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => handleModal(e)}
            >
              Create Quality Control Parameters
            </Button>
          </Box>
        )}
      </Box>

      {theElemiQCPContext.qCPList && (
        <Table
          headCells={headCells}
          dataRows={theElemiQCPContext.qCPList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateQCP open={theElemiQCPContext.activeModal === "create"} />
      <ViewQCP
        data={theElemiQCPContext.selected}
        open={theElemiQCPContext.activeModal === "view"}
      />
      <EditQCP open={theElemiQCPContext.activeModal === "edit"} />
    </Paper>
  );
};

export default QCP;
