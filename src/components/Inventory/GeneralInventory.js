import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../plugins/obj-2-csv";
import { useAuthContext } from "../../context/authContext";
import { useRouterContext } from "../../context/routerContext";
import { useGeneralInventoryContext } from "../../context/inventory/generalInventoryContext";
import { useFuelContext } from "../../context/inventory/fuel/fuelContext";
import { useRawMaterial } from "../../context/inventory/rawMaterialContext";

import { useGeneralConsumableContext } from "../../context/inventory/generalConsumableContext";
// consumables
import { useLaboratoryContext } from "../../context/inventory/consumable/laboratoryContext";
import { useMaintenanceContext } from "../../context/inventory/consumable/maintenanceContext";
import { useOfficeContext } from "../../context/inventory/consumable/officeContext";
import { useOtherContext } from "../../context/inventory/consumable/otherContext";

import GeneralInventoryTable from "./GeneralInventoryTable";

// muis
import { Paper, Box, Button, Typography } from "@mui/material";
// import { FindReplace } from "@mui/icons-material";

const headCells = [
  {
    id: "row",
    alignment: "left",
    disablePadding: false,
    label: "Row",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "itemId",
    alignment: "left",
    disablePadding: false,
    label: "Item Id",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "name",
    alignment: "center",
    disablePadding: false,
    label: "Name",
    isSortable: true,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "quantity",
    alignment: "center",
    disablePadding: false,
    label: "Quantity",
    isSortable: true,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "type",
    alignment: "center",
    disablePadding: false,
    label: "type",
    isSortable: false,
    hasDropdown: true,
    dropDownData: [
      {
        value: "all",
        label: "All",
      },
      {
        value: "raw material",
        label: "Raw Material",
      },
      {
        value: "consumable",
        label: "Consumable",
      },
      {
        value: "fuel",
        label: "Fuel",
      },
    ],
  },
  // {
  //   id: "actions",
  //   alignment: "center",
  //   disablePadding: false,
  //   label: "Actions",
  //   isSortable: false,
  //   hasDropdown: false,
  //   dropDownData: [],
  // },
];

const GeneralInventory = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theGeneralInventoryContext = useGeneralInventoryContext();
  const theFuelContext = useFuelContext();
  const theRawMaterial = useRawMaterial();
  const theGeneralConsumableContext = useGeneralConsumableContext();
  // consumables
  const theLaboratoryContext = useLaboratoryContext();
  const theMaintenanceContext = useMaintenanceContext();
  const theOfficeContext = useOfficeContext();
  const theOtherContext = useOtherContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);

    let tmpGenList = [];
    let tmpMFuel =
      theFuelContext?.fuelList[theFuelContext?.fuelList.length - 1];

    let obj = {
      itemId: tmpMFuel.purchaseItemId,
      name: tmpMFuel.name,
      quantity: tmpMFuel.quantity,
      type: "fuel",
    };
    tmpGenList.push(obj);

    const finder = (obj) => {
      let found = tmpGenList.find(
        (item) =>
          // item.itemId
          //   ? item.itemId === obj.itemId
          //   : false ||
          item.name.toLowerCase() === obj.name.toLowerCase() &&
          item.type == obj.type
      );

      if (found) {
        found.quantity += obj.quantity;
      } else {
        tmpGenList.push(obj);
      }
    };

    theRawMaterial.rawMaterialList.forEach((item) => {
      let obj = {
        itemId: item.purchaseItemId,
        name: item.name,
        quantity: item.quantity,
        type: "raw material",
      };
      finder(obj);
    });

    theLaboratoryContext.laboratoryList.forEach((item) => {
      let obj = {
        itemId: item.purchaseItemId,
        name: item.name,
        quantity: item.quantity,
        type: "consumable",
      };

      finder(obj);
    });

    theMaintenanceContext.maintenanceList.forEach((item) => {
      let obj = {
        itemId: item.purchaseItemId,
        name: item.name,
        quantity: item.quantity,
        type: "consumable",
      };

      finder(obj);
    });

    theOfficeContext.officeList.forEach((item) => {
      let obj = {
        itemId: item.purchaseItemId,
        name: item.name,
        quantity: item.quantity,
        type: "consumable",
      };

      finder(obj);
    });

    theOtherContext.otherList.forEach((item) => {
      let obj = {
        itemId: item.purchaseItemId,
        name: item.name,
        quantity: item.quantity,
        type: "consumable",
      };

      finder(obj);
    });

    theGeneralInventoryContext.setGeneralInventoryList(tmpGenList);
  }, []);

  const handleGenRpt = () => {
    let colName = ["Item Id", "Name", "Quantity", "Type"];
    let tmpFields = ["itemId", "name", "quantity", "type"];
    let tmpList = theGeneralInventoryContext.generalInventoryList;
    ObjToCSV(colName, tmpFields, tmpList, "General Inventory Report");
  };

  const handleViewRecordRequest = (props) => {
    const link = props.type.replace(" ", "-");
    navigate(`/inventory/${link}`);
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
          General Inventory
        </Typography>
        {theAuthContext.user.role !== "USER" && (
          <Button
            size="small"
            variant="outlined"
            sx={{ marginBottom: "0.5rem" }}
            onClick={(e) => handleGenRpt(e)}
          >
            Generate Report
          </Button>
        )}
      </Box>
      {theGeneralInventoryContext.generalInventoryList && (
        <GeneralInventoryTable
          headCells={headCells}
          dataRows={theGeneralInventoryContext.generalInventoryList}
          viewRecordRequest={handleViewRecordRequest}
        />
      )}
      {/* <CreateGeneralInventory
        open={theGeneralInventoryContext.activeModal === "create"}
      /> */}
      {/* <EditGeneralInventory
        open={theGeneralInventoryContext.activeModal === "edit"}
      /> */}
    </Paper>
  );
};

export default GeneralInventory;
