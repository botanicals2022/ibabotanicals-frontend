import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../context/routerContext";
import { useGeneralConsumableContext } from "../../../context/inventory/generalConsumableContext";
// import CustomTable from "../Globals/CustomTable";
import ConsumableTable from "./ConsumableTable";

// consumables
import { useAuthContext } from "../../../context/authContext";
import { useLaboratoryContext } from "../../../context/inventory/consumable/laboratoryContext";
import { useMaintenanceContext } from "../../../context/inventory/consumable/maintenanceContext";
import { useOfficeContext } from "../../../context/inventory/consumable/officeContext";
import { useOtherContext } from "../../../context/inventory/consumable/otherContext";

// muis
import { Paper, Box, Button, Typography } from "@mui/material";

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
        value: "Laboratory",
        label: "laboratory",
      },
      {
        value: "Maintenance",
        label: "maintenance",
      },
      {
        value: "Office",
        label: "office",
      },
      {
        value: "Other",
        label: "other",
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

const Consumable = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theGeneralConsumableContext = useGeneralConsumableContext();

  const theLaboratoryContext = useLaboratoryContext();
  const theMaintenanceContext = useMaintenanceContext();
  const theOfficeContext = useOfficeContext();
  const theOtherContext = useOtherContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  useEffect(() => {
    let tmpGenConsList = [];
    const finder = (obj) => {
      let found = tmpGenConsList.find((item) =>
        item.itemId
          ? item.itemId === obj.itemId
          : false ||
            (item.name.toLowerCase() === obj.name.toLowerCase() &&
              item.type == obj.type)
      );

      if (found) {
        found.quantity += obj.quantity;
      } else {
        tmpGenConsList.push(obj);
      }
    };

    theLaboratoryContext.laboratoryList.forEach((item) => {
      let obj = {
        itemId: item.purchaseItemId,
        name: item.name,
        quantity: item.quantity,
        type: "laboratory",
      };

      finder(obj);
    });

    theMaintenanceContext.maintenanceList.forEach((item) => {
      let obj = {
        itemId: item.purchaseItemId,
        name: item.name,
        quantity: item.quantity,
        type: "maintenance",
      };

      finder(obj);
    });

    theOfficeContext.officeList.forEach((item) => {
      let obj = {
        itemId: item.purchaseItemId,
        name: item.name,
        quantity: item.quantity,
        type: "office",
      };

      finder(obj);
    });

    theOtherContext.otherList.forEach((item) => {
      let obj = {
        itemId: item.purchaseItemId,
        name: item.name,
        quantity: item.quantity,
        type: "other",
      };

      finder(obj);
    });

    theGeneralConsumableContext.setGeneralConsumableList(tmpGenConsList);
  }, []);

  const handleGenRpt = () => {
    let colName = ["Item Id", "Name", "Quantity", "Type"];
    let tmpFields = ["itemId", "name", "quantity", "type"];
    let tmpList = theGeneralConsumableContext.generalConsumableList;
    ObjToCSV(colName, tmpFields, tmpList, "Consumable Inventory Report");
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
          General Consumable Inventory
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
      {theGeneralConsumableContext.generalConsumableList && (
        <ConsumableTable
          headCells={headCells}
          dataRows={theGeneralConsumableContext.generalConsumableList}
          viewRecordRequest={handleViewRecordRequest}
        />
      )}
    </Paper>
  );
};

export default Consumable;
