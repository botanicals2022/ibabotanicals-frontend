import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../../context/routerContext";
import { useAuthContext } from "../../../../context/authContext";
import { useElemiMRFContext } from "../../../../context/elemi/forms/elemiMRFContext";
import Table from "./Table";
import CreateMaterialRequestForm from "./CreateMaterialRequestForm";
import ViewMaterialRequestForm from "./ViewMaterialRequestForm";
import EditMaterialRequestForm from "./EditMaterialRequestForm";

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
    id: "productionRequest",
    alignment: "center",
    disablePadding: false,
    label: "Production Request",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "totalWeight",
    alignment: "center",
    disablePadding: false,
    label: "total Weight",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "endorsedBy",
    alignment: "center",
    disablePadding: false,
    label: "Endorsed By",
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
    id: "date",
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

const MaterialRequestForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiMRFContext = useElemiMRFContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiMRFContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiMRFContext.setSelected(props);
    theElemiMRFContext.setObjTbl(props.tblRows);
    theElemiMRFContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiMRFContext.deleteMRF(props);
  };

  const handleGenRpt = () => {
    let colName = [
      "Id",
      "Production Request",
      "Total Weight",
      "Endorsed By",
      "Received By",
      "Date",
      "Created At",
      "Updated At",
    ];
    let tmpFields = [
      "id",
      "productionRequest",
      "totalWeight",
      "endorsedBy",
      "receivedBy",
      "date",
      "createdAt",
      "updatedAt",
    ];
    let tmpList = theElemiMRFContext.mRFList;

    ObjToCSV(colName, tmpFields, tmpList, "Elemi Material Request Form Report");
  };

  const handleViewDetailsRequest = (props) => {
    theElemiMRFContext.setSelected(props);
    theElemiMRFContext.setActiveModal("view");
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
          Material Request Form
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
              Create Material Request Form
            </Button>
          </Box>
        )}
      </Box>
      {theElemiMRFContext.mRFList && (
        <Table
          headCells={headCells}
          dataRows={theElemiMRFContext.mRFList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateMaterialRequestForm
        open={theElemiMRFContext.activeModal === "create"}
      />
      <ViewMaterialRequestForm
        data={theElemiMRFContext.selected}
        open={theElemiMRFContext.activeModal === "view"}
      />
      <EditMaterialRequestForm
        open={theElemiMRFContext.activeModal === "edit"}
      />
    </Paper>
  );
};

export default MaterialRequestForm;
