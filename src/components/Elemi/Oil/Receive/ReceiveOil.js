import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useElemiReceiveOilContext } from "../../../../context/elemi/oils/elemiReceiveOilContext";
import Table from "./Table";
import CreateReceiveOil from "./CreateReceiveOil";
import ViewReceiveOil from "./ViewReceiveOil";
import EditReceiveOil from "./EditReceiveOil";

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
    id: "tag",
    alignment: "center",
    disablePadding: false,
    label: "Tag",
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
    id: "totalHSE",
    alignment: "center",
    disablePadding: false,
    label: "Total High Sesquiterpene Elemi",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "totalElemiFilipina",
    alignment: "center",
    disablePadding: false,
    label: "Elemi Filipina",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "totalFlowRate",
    alignment: "center",
    disablePadding: false,
    label: "Total Flow Rate",
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
    id: "userId",
    alignment: "center",
    disablePadding: false,
    label: "User",
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

const ReceiveOil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiReceiveOilContext = useElemiReceiveOilContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiReceiveOilContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiReceiveOilContext.setSelected(props);
    theElemiReceiveOilContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiReceiveOilContext.deleteReceiveOil(props);
  };

  const handleViewRecordTag = (props) => {
    let tag = props.tag;
    navigate(`/elemi/oil/final?lotNumber=${tag}`);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Tag",
      "Production Shift",
      "Total High Sesquiterpene Elemi",
      "Elemi Filipina",
      "Flow Rate",
      "Recovered Oil",
      "Created At",
      "Updated At",
    ];
    let tmpFields = [
      "id",
      "tag",
      "prodShift",
      "totalHSE",
      "totalElemiFilipina",
      "totalFlowRate",
      "totalOilRecovery",
      "createdAt",
      "updatedAt",
    ];
    let tmpList = theElemiReceiveOilContext.receiveOilList;

    ObjToCSV(colName, tmpFields, tmpList, "Elemi Receive Oil Report");
  };

  const handleViewDetailsRequest = (props) => {
    theElemiReceiveOilContext.setSelected(props);
    theElemiReceiveOilContext.setActiveModal("view");
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
          Elemi Receive Oil
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
              Create Receive Oil
            </Button>
          </Box>
        )}
      </Box>
      {theElemiReceiveOilContext.receiveOilList && (
        <Table
          headCells={headCells}
          dataRows={theElemiReceiveOilContext.receiveOilList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordTag={handleViewRecordTag}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateReceiveOil
        open={theElemiReceiveOilContext.activeModal === "create"}
      />
      <ViewReceiveOil
        data={theElemiReceiveOilContext.selected}
        open={theElemiReceiveOilContext.activeModal === "view"}
      />
      <EditReceiveOil open={theElemiReceiveOilContext.activeModal === "edit"} />
    </Paper>
  );
};

export default ReceiveOil;
