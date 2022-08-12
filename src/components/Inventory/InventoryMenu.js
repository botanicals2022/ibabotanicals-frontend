import { useEffect } from "react";

// other import file
import { useFuelContext } from "../../context/inventory/fuel/fuelContext";
import { usePurchaseItemContext } from "../../context/inventory/purchaseItemContext";
import { useRawMaterial } from "../../context/inventory/rawMaterialContext";
import Cards from "../Globals/RouteCards";

// other import file
import { useLaboratoryContext } from "../../context/inventory/consumable/laboratoryContext";
import { useMaintenanceContext } from "../../context/inventory/consumable/maintenanceContext";
import { useOfficeContext } from "../../context/inventory/consumable/officeContext";
import { useOtherContext } from "../../context/inventory/consumable/otherContext";

// muis
import { Grid, Paper } from "@mui/material";

const InventoryMenu = () => {
  const theFuelContext = useFuelContext();
  const thePurchaseItemContext = usePurchaseItemContext();
  const theRawMaterial = useRawMaterial();

  // consumables
  const theLaboratoryContext = useLaboratoryContext();
  const theMaintenanceContext = useMaintenanceContext();
  const theOfficeContext = useOfficeContext();
  const theOtherContext = useOtherContext();

  useEffect(() => {
    theFuelContext.getAllFuel();
    thePurchaseItemContext.getAllPurchaseItem();
    theRawMaterial.getAllRawMaterial();

    // consumables
    theLaboratoryContext.getAllLaboratory();
    theMaintenanceContext.getAllMaintenance();
    theOfficeContext.getAllOffice();
    theOtherContext.getAllOther();
  }, []);

  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Purchase Items"
            link="/inventory/purchase-item"
            body="list of all purchase items"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Raw Materials"
            link="/inventory/raw-material"
            body="list of all raw materials"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards title="Fuel" link="/inventory/fuel" body="list of all fuel" />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Consumable"
            link="/inventory/consumable"
            body="list of all consumable"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="General Inventory"
            link="/inventory/general"
            body="list of all inventory"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default InventoryMenu;
