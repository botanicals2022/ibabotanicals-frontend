import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// other import file
import { useRouterContext } from "../../../context/routerContext";
import { useAuthContext } from "../../../context/authContext";
import { useExtractedElemiContext } from "../../../context/elemi/extractedElemiContext";
// import CustomTable from "../../Globals/CustomTable";
import Table from "./Table";
import CreateExtractedElemi from "./CreateExtractedElemi";
import EditExtractedElemi from "./EditExtractedElemi";

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

const ExtractedElemi = () => {
  const location = useLocation();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theExtractedElemiContext = useExtractedElemiContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theExtractedElemiContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theExtractedElemiContext.setSelected(props);
    theExtractedElemiContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    console.log("handleDelete", props);
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
          Create Extracted
        </Button>
      </Box>
      {theExtractedElemiContext.extractedList && (
        <Table
          headCells={headCells}
          dataRows={theExtractedElemiContext.extractedList}
          isShown={theAuthContext.user.role === "ADMIN"}
          editRequest={handleEdit}
          deleteRequest={handleDelete}
        />
      )}
      <CreateExtractedElemi
        open={theExtractedElemiContext.activeModal === "create"}
      />
      <EditExtractedElemi
        open={theExtractedElemiContext.activeModal === "edit"}
      />
    </Paper>
  );
};

export default ExtractedElemi;
