import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// other import file
import { useRouterContext } from "../../../context/routerContext";
import { useElemiInventoryContext } from "../../../context/elemi/elemiInventoryContext";
import CustomTable from "../../Globals/CustomTable";
import CreateElemiInventory from "./CreateElemiInventory";
import EditElemiInventory from "./EditElemiInventory";

// muis
import { Paper, Box, Button } from "@mui/material";

const ElemiInventory = () => {
  const location = useLocation();
  const theRouterContext = useRouterContext();
  const theElemiInventoryContext = useElemiInventoryContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleModal = (e) => {
    theElemiInventoryContext.setActiveModal("create");
  };

  const handleEdit = (props) => {
    theElemiInventoryContext.setSelected(props);
    theElemiInventoryContext.setActiveModal("edit");
  };

  const handleDelete = (props) => {
    theElemiInventoryContext.deleteInventory(props);
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
          Create Inventory
        </Button>
      </Box>
      {theElemiInventoryContext.inventoryList && (
        <CustomTable
          dataRows={theElemiInventoryContext.inventoryList}
          editRequest={handleEdit}
          deleteRequest={handleDelete}
        />
      )}
      <CreateElemiInventory
        open={theElemiInventoryContext.activeModal === "create"}
      />
      <EditElemiInventory
        open={theElemiInventoryContext.activeModal === "edit"}
      />
    </Paper>
  );
};

export default ElemiInventory;
