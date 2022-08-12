import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useElemiProcessOilContext } from "../../../../context/elemi/oils/elemiProcessOilContext";
import Table from "./Table";
import CreateProcessOil from "./CreateProcessOil";
import ViewProcessOil from "./ViewProcessOil";
import EditProcessOil from "./EditProcessOil";

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
    id: "batchNumber",
    alignment: "center",
    disablePadding: false,
    label: "Batch Number",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "prodShift",
    alignment: "center",
    disablePadding: false,
    label: "Production Shift",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "limonene",
    alignment: "center",
    disablePadding: false,
    label: "Limonene",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "limoneneLoss",
    alignment: "center",
    disablePadding: false,
    label: "Limonene Loss",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "elemiFilipina",
    alignment: "center",
    disablePadding: false,
    label: "Elemi Filipina",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "elemiFilipinaLoss",
    alignment: "center",
    disablePadding: false,
    label: "Elemi Filipina Loss",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "recoveredOil",
    alignment: "center",
    disablePadding: false,
    label: "Elemi Filipina Loss",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "totalLoss",
    alignment: "center",
    disablePadding: false,
    label: "Lotal Loss",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "userId",
    alignment: "center",
    disablePadding: false,
    label: "Modified By",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "distillationDate",
    alignment: "center",
    disablePadding: false,
    label: "Distillation Date",
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

const ProcessOil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiProcessOilContext = useElemiProcessOilContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiProcessOilContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiProcessOilContext.setSelected(props);
    theElemiProcessOilContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiProcessOilContext.deleteProcessOil(props);
  };

  const handleViewRecordRequest = (props) => {
    // const link = props.type.replace(" ", "-");
    navigate(`/elemi/forms`);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Batch Number",
      "Production Shift",
      "High Sesquiterpene Elemi",
      "High Sesquiterpene Elemi Loss",
      "Elemi Filipina",
      "Elemi Filipina Loss",
      "Recovered Oil",
      "Total Loss",
      "Created At",
      "Updated At",
    ];
    let tmpFields = [
      "id",
      "batchNumber",
      "prodShift",
      "hSE",
      "hSELoss",
      "elemiFilipina",
      "elemiFilipinaLoss",
      "recoveredOil",
      "totalLoss",
      "createdAt",
      "updatedAt",
    ];
    let tmpList = theElemiProcessOilContext.processOilList;
    ObjToCSV(colName, tmpFields, tmpList, "Elemi Process Oil Report");
  };

  const handleViewDetailsRequest = (props) => {
    theElemiProcessOilContext.setSelected(props);
    theElemiProcessOilContext.setActiveModal("view");
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
          Elemi Process Oil
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
              Create Process Oil
            </Button>
          </Box>
        )}
      </Box>
      {theElemiProcessOilContext.processOilList && (
        <Table
          headCells={headCells}
          dataRows={theElemiProcessOilContext.processOilList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateProcessOil
        open={theElemiProcessOilContext.activeModal === "create"}
      />
      <ViewProcessOil
        data={theElemiProcessOilContext.selected}
        open={theElemiProcessOilContext.activeModal === "view"}
      />
      <EditProcessOil open={theElemiProcessOilContext.activeModal === "edit"} />
    </Paper>
  );
};

export default ProcessOil;
