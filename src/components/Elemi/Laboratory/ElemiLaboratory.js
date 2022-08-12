import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// other import file
import { useRouterContext } from "../../../context/routerContext";
import { useAuthContext } from "../../../context/authContext";
import { useElemiLaboratoryContext } from "../../../context/elemi/elemiLaboratoryContext";
// import CustomTable from "../../Globals/CustomTable";
import Table from "./Table";
import CreateElemiLaboratory from "./CreateElemiLaboratory";
import ViewElemiLaboratory from "./ViewElemiLaboratory";
import EditElemiLaboratory from "./EditElemiLaboratory";

// muis
import { Paper, Box, Button } from "@mui/material";

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
    id: "product",
    alignment: "center",
    disablePadding: false,
    label: "Product",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "productCode",
    alignment: "center",
    disablePadding: false,
    label: "Product Code",
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
    id: "userId",
    alignment: "center",
    disablePadding: false,
    label: "Modified By",
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

const ElemiLaboratory = () => {
  const location = useLocation();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiLaboratoryContext = useElemiLaboratoryContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiLaboratoryContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    console.log(props);
    theElemiLaboratoryContext.setSelected(props);
    theElemiLaboratoryContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiLaboratoryContext.deleteLaboratory(props);
  };

  const handleViewDetailsRequest = (props) => {
    console.log(props);
    theElemiLaboratoryContext.setSelected(props);
    theElemiLaboratoryContext.setActiveModal("view");
  };

  return (
    <Paper elevation={0}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          paddingY: "1rem",
          paddingX: "0.5rem",
        }}
      >
        <Button size="small" variant="outlined" onClick={(e) => handleModal(e)}>
          Create Laboratory
        </Button>
      </Box>
      {theElemiLaboratoryContext.laboratoryList && (
        // <CustomTable
        //   dataRows={theElemiLaboratoryContext.laboratoryList}
        //   editRequest={handleEdit}
        //   deleteRequest={handleDelete}
        // />
        <Table
          headCells={headCells}
          dataRows={theElemiLaboratoryContext.laboratoryList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          // viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateElemiLaboratory
        open={theElemiLaboratoryContext.activeModal === "create"}
      />
      <ViewElemiLaboratory
        open={theElemiLaboratoryContext.activeModal === "view"}
      />
      <EditElemiLaboratory
        open={theElemiLaboratoryContext.activeModal === "edit"}
      />
    </Paper>
  );
};

export default ElemiLaboratory;
