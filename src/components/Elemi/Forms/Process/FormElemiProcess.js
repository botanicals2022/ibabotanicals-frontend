import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import BrowserStorage from "../../../../plugins/storage";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useElemiProcessContext } from "../../../../context/elemi/forms/elemiProcessContext";
import Table from "./Table";
import CreateFormElemiProcess from "./CreateFormElemiProcess";
import ViewFormElemiProcess from "./ViewFormElemiProcess";
import EditFormElemiProcess from "./EditFormElemiProcess";

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
    id: "totalTime",
    alignment: "center",
    disablePadding: false,
    label: "Total Time",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "fraction",
    alignment: "center",
    disablePadding: false,
    label: "Fraction",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "averageFlowRate",
    alignment: "center",
    disablePadding: false,
    label: "Average Flow Rate",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "totalOilRecovery",
    alignment: "center",
    disablePadding: false,
    label: "Total Oil Recovery",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "fuelConsumed",
    alignment: "center",
    disablePadding: false,
    label: "Fuel Consumed",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "totalResinWeight",
    alignment: "center",
    disablePadding: false,
    label: "Total Resin Weight",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "oilBatchNumber",
    alignment: "center",
    disablePadding: false,
    label: "Oil Batch Number",
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

const FormElemiProcess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiProcessContext = useElemiProcessContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const formList = (opt = false) => {
    let tmpArrs = [];
    let tmpArrsRMB = [[], [], [], []];
    const storageItem = localStorage.getItem("elemiProcessList");
    if (!storageItem) return [];
    if (!JSON.parse(storageItem)) return [];
    // let fraction = storageItem?.jsonObject?.oil_recovery_0000;

    let newArrs = JSON.parse(storageItem);
    newArrs.forEach((item, idx) => {
      let itemJobj = item?.jsonObject;
      let fraction = itemJobj?.oil_recovery_0000;
      let rmbNum = itemJobj?.resin_batch_no_1;
      let rmbNum2 = itemJobj?.resin_batch_no_2;

      let username = BrowserStorage.FoundUser(item.userId);
      if (!opt) {
        tmpArrs.push({
          ...item,
          fraction: fraction.replace(/\D+/gi, ""),
          resinBatchNo: `${rmbNum} ${rmbNum2}`,
          // rmBtchs: tmpBtch,
          user: username,
        });
      }
      if (opt) {
        tmpArrsRMB[0].push(
          itemJobj[`resin_batch_no_1`],
          itemJobj[`resin_weight_count_1`]
        );
        tmpArrsRMB[1].push(
          itemJobj[`resin_batch_no_2`],
          itemJobj[`resin_weight_count_2`]
        );
        tmpArrsRMB[2].push(
          itemJobj[`resin_batch_no_3`],
          itemJobj[`resin_weight_count_3`]
        );
        tmpArrsRMB[3].push(
          itemJobj[`resin_batch_no_4`],
          itemJobj[`resin_weight_count_4`]
        );
      }
    });

    if (opt) return tmpArrsRMB;
    if (!opt) return tmpArrs;
  };

  const handleModal = (e) => {
    theElemiProcessContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiProcessContext.setSelected(props);
    theElemiProcessContext.setJsonObject(props.jsonObject);
    theElemiProcessContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiProcessContext.deleteProcess(props);
  };

  const handleGenRMBRpt = () => {
    ObjToCSV([], [], formList(true), "Elemi Form Process RMB Report", true);
  };

  const handleGenProcRpt = () => {
    let colName = [
      "ID",
      "Fraction",
      "Total Time",
      "Average Flow Rate",
      "Total Oil Recovery",
      "Fuel Consumed",
      "Raw Material Batch No.",
      "Total Resin Weight",
      "Oil Batch Number",
      "Created At",
      "Updated At",
      "User",
    ];
    let tmpFields = [
      "id",
      "fraction",
      "totalTime",
      "averageFlowRate",
      "totalOilRecovery",
      "fuelConsumed",
      "resinBatchNo",
      "totalResinWeight",
      "oilBatchNumber",
      "createdAt",
      "updatedAt",
      "user",
    ];
    ObjToCSV(colName, tmpFields, formList(), "Elemi Form Process Report");
  };

  const handleViewDetailsRequest = (props) => {
    theElemiProcessContext.setSelected(props);
    theElemiProcessContext.setActiveModal("view");
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
          Process Form
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
              onClick={(e) => handleGenRMBRpt(e)}
            >
              RMBatch Excel Report
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => handleGenProcRpt(e)}
            >
              Process Excel Report
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={(e) => handleModal(e)}
            >
              Create Elemi Process
            </Button>
          </Box>
        )}
      </Box>

      {theElemiProcessContext.processList && (
        <Table
          headCells={headCells}
          dataRows={theElemiProcessContext.processList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateFormElemiProcess
        open={theElemiProcessContext.activeModal === "create"}
      />
      <ViewFormElemiProcess
        data={theElemiProcessContext.selected}
        open={theElemiProcessContext.activeModal === "view"}
      />
      <EditFormElemiProcess
        open={theElemiProcessContext.activeModal === "edit"}
      />
    </Paper>
  );
};

export default FormElemiProcess;
