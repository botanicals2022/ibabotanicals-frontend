import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// other import file
import { useRouterContext } from "../../../context/routerContext";
import { useAuthContext } from "../../../context/authContext";
import { useElemiMaterialContext } from "../../../context/elemi/elemiMaterialContext";
// import CustomTable from "../../Globals/CustomTable";
import Table from "./Table";
import CreateElemiMaterial from "./CreateElemiMaterial";
import ViewElemiMaterial from "./ViewElemiMaterial";
import EditElemiMaterial from "./EditElemiMaterial";

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
    id: "name",
    alignment: "center",
    disablePadding: false,
    label: "Name",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "materialId",
    alignment: "center",
    disablePadding: false,
    label: "Material Id",
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

const ElemiMaterial = () => {
  const location = useLocation();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiMaterialContext = useElemiMaterialContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiMaterialContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiMaterialContext.setSelected(props);
    theElemiMaterialContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiMaterialContext.deleteMaterial(props);
  };

  const handleViewDetailsRequest = (props) => {
    theElemiMaterialContext.setSelected(props);
    theElemiMaterialContext.setActiveModal("view");
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
          Create Material
        </Button>
      </Box>
      {theElemiMaterialContext.materialList && (
        <Table
          headCells={headCells}
          dataRows={theElemiMaterialContext.materialList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          // viewRecordRequest={handleViewRecordRequest}
          viewDetailsRequest={handleViewDetailsRequest}
          deleteRequest={handleDelete}
        />
      )}
      <CreateElemiMaterial
        open={theElemiMaterialContext.activeModal === "create"}
      />
      <ViewElemiMaterial
        open={theElemiMaterialContext.activeModal === "view"}
      />
      <EditElemiMaterial
        open={theElemiMaterialContext.activeModal === "edit"}
      />
    </Paper>
  );
};

export default ElemiMaterial;
