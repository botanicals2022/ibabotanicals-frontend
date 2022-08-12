import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useElemiFinalOilContext } from "../../../../context/elemi/oils/elemiFinalOilContext";
import Table from "./Table";
import CreateFinalOil from "./CreateFinalOil";
import ViewFinalOil from "./ViewFinalOil";
import EditFinalOil from "./EditFinalOil";

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
    id: "lotNumber",
    alignment: "center",
    disablePadding: false,
    label: "Lot Number",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "hSE",
    alignment: "center",
    disablePadding: false,
    label: "High Sesquiterpene Elemi",
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
    id: "remarks",
    alignment: "center",
    disablePadding: false,
    label: "Remarks",
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
    id: "blendingDate",
    alignment: "center",
    disablePadding: false,
    label: "Blending Date",
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

const FinalOil = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiFinalOilContext = useElemiFinalOilContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiFinalOilContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiFinalOilContext.setSelected(props);
    theElemiFinalOilContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiFinalOilContext.deleteFinalOil(props);
  };

  const handleViewRecordRequest = (props) => {
    // const link = props.type.replace(" ", "-");
    navigate(`/elemi/forms`);
  };

  const handleViewRecordTag = (props) => {
    let tag = props.lotNumber;
    navigate(`/elemi/oil/receive?tag=${tag}`);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Lot Number",
      "High Sesquiterpene Elemi",
      "Elemi Filipina",
      "Remarks",
      "BlendingDate",
    ];
    let tmpFields = [
      "id",
      "lotNumber",
      "hSesquiterpeneElemi",
      "elemiFilipina",
      "remarks",
      "blendingDate",
    ];
    let tmpList = theElemiFinalOilContext.finalOilList;

    ObjToCSV(colName, tmpFields, tmpList, "Elemi Final Oil Report");
  };

  const handleViewDetailsRequest = (props) => {
    theElemiFinalOilContext.setSelected(props);
    theElemiFinalOilContext.setActiveModal("view");
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
          Elemi Final Oil
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
              Create Final Oil
            </Button>
          </Box>
        )}
      </Box>
      {theElemiFinalOilContext.finalOilList && (
        <Table
          headCells={headCells}
          dataRows={theElemiFinalOilContext.finalOilList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewRecordRequest={handleViewRecordRequest}
          viewRecordTag={handleViewRecordTag}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateFinalOil open={theElemiFinalOilContext.activeModal === "create"} />
      <ViewFinalOil
        data={theElemiFinalOilContext.selected}
        open={theElemiFinalOilContext.activeModal === "view"}
      />
      <EditFinalOil open={theElemiFinalOilContext.activeModal === "edit"} />
    </Paper>
  );
};

export default FinalOil;
