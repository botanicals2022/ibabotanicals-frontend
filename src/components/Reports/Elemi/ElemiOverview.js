import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

// other import file
import ObjToCSV from "../../../plugins/obj-2-csv";
import { useRouterContext } from "../../../context/routerContext";
import { useAuthContext } from "../../../context/authContext";
import Table from "./Table";
import { useElemiOverviewContext } from "../../../context/elemi/elemiOverviewContext";

import ViewElemiOverview from "./ViewElemiOverview";

// muis
import { Paper, Typography, Box, Button } from "@mui/material";

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
    id: "distillation_date",
    alignment: "center",
    disablePadding: false,
    label: "Distillation Date",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "distillation_batch_no",
    alignment: "center",
    disablePadding: false,
    label: "Distillation Batch No.",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "raw_materials_delivery_date",
    alignment: "center",
    disablePadding: false,
    label: "Raw Materials Delivery Date",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "production_shift",
    alignment: "center",
    disablePadding: false,
    label: "Production Shift",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "raw_materials_batch_no",
    alignment: "center",
    disablePadding: false,
    label: "Raw Materials Batch No.",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "resin_input_material_weight",
    alignment: "center",
    disablePadding: false,
    label: "Resin Input Material Weight",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "total_oil_yield_recovery",
    alignment: "center",
    disablePadding: false,
    label: "Total Oil Yield Recovery",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "oil_yield_percentage",
    alignment: "center",
    disablePadding: false,
    label: "Oil Yield Percentage",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "flow_rate",
    alignment: "center",
    disablePadding: false,
    label: "Flow Rate",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "total_diesel_consumption",
    alignment: "center",
    disablePadding: false,
    label: "Total Diesel Consumption",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "lemonene",
    alignment: "center",
    disablePadding: false,
    label: "Lemonene",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "purified_oil",
    alignment: "center",
    disablePadding: false,
    label: "Purified Oil",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "after_blending",
    alignment: "center",
    disablePadding: false,
    label: "After Blending",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "fraction",
    alignment: "center",
    disablePadding: false,
    label: "Fraction",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "total_oil_yield_recovery",
    alignment: "center",
    disablePadding: false,
    label: "Total Oil Yield Recovery",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "discrepancy",
    alignment: "center",
    disablePadding: false,
    label: "Total Oil Yield Recovery (Less Fraction)",
    isSortable: false,
    hasDropdown: false,
    dropDownData: [],
  },
  {
    id: "monthly_total_oil",
    alignment: "center",
    disablePadding: false,
    label: "Total Oil Yield Recovery",
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

const ElemiOverview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const theRouterContext = useRouterContext();
  const theAuthContext = useAuthContext();
  const theElemiOverviewContext = useElemiOverviewContext();

  useEffect(() => {
    theRouterContext.onAddressUpdate(location);
  }, []);

  const handleViewDetailsRequest = (props) => {
    theElemiOverviewContext.setSelected(props);
    theElemiOverviewContext.setActiveModal("view");
  };

  const listData = [
    {
      id: 1,
      distillation_date: "03-Jan",
      distillation_batch_no: "4",
      raw_materials_delivery_date: "14-Dec-21",
      production_shift: "PM	",
      raw_materials_batch_no: "RM-EL211214-07",
      resin_input_material_weight: "130.00 kg",
      oil_batch_code_no: "OB-EL-220103-02",
      total_oil_yield_recovery: "24 kg",
      oil_yield_percentage: "24.970 kg",
      flow_rate: "19.21%",
      total_diesel_consumption: "4.2",
      lemonene: "170",
      purified_oil: "7.95 kg",
      after_blending: "16.66 kg",
      fraction: "13.60 kg",
      total_oil_yield_recovery_less: "8.00 kg",
      discrepancy: "16.97 kg",
      monthly_total_oil: "0.31 kg",
    },
    {
      id: 2,
      distillation_date: "03-Feb",
      distillation_batch_no: "35	",
      raw_materials_delivery_date: "30-Jan-22",
      production_shift: "PM",
      raw_materials_batch_no: "RM-EL220130-08",
      resin_input_material_weight: "130.00 kg",
      oil_batch_code_no: "OB-EL-220203-02",
      total_oil_yield_recovery: "24 kg",
      oil_yield_percentage: "25.630 kg",
      flow_rate: "19.72%",
      total_diesel_consumption: "3.8",
      lemonene: "160",
      purified_oil: "9.92 kg",
      after_blending: "15.48 kg",
      fraction: "15.62 kg",
      total_oil_yield_recovery_less: "10.00 kg",
      discrepancy: "15.63 kg",
      monthly_total_oil: "0.31 kg",
    },
  ];

  const handleGenRpt = () => {
    let colName = [
      "id",
      "Distillation Date",
      "Distillation Batch No",
      "Raw Materials Delivery Date",
      "Production Shift",
      "Raw Materials Batch No",
      "Resin Input Material Weight",
      "Oil Batch Code No",
      "Total Oil Yield Recovery",
      "Oil Yield Percentage",
      "Flow Rate",
      "Total Diesel Consumption",
      "Lemonene",
      "Purified Oil",
      "After Blending",
      "Fraction",
      "Total Oil Yield Recovery Less",
      "Discrepancy (Losses)",
      "Monthly Total Oil",
    ];
    let tmpFields = [
      "id",
      "distillation_date",
      "distillation_batch_no",
      "raw_materials_delivery_date",
      "production_shift",
      "raw_materials_batch_no",
      "resin_input_material_weight",
      "oil_batch_code_no",
      "total_oil_yield_recovery",
      "oil_yield_percentage",
      "flow_rate",
      "total_diesel_consumption",
      "lemonene",
      "purified_oil",
      "after_blending",
      "fraction",
      "total_oil_yield_recovery_less",
      "discrepancy",
      "monthly_total_oil",
    ];
    let tmpList = listData;
    // let tmpList = theGeneralInventoryContext.generalInventoryList;
    ObjToCSV(colName, tmpFields, tmpList, "Elemi Overview Report");
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
          Elemi Overview
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
      <Table
        headCells={headCells}
        dataRows={listData}
        isShown={false}
        // editRequest={handleEdit}
        // viewRecordRequest={handleViewRecordRequest}
        viewDetailsRequest={handleViewDetailsRequest}
        // deleteRequest={handleDelete}
      />
      {/* )} */}
      <ViewElemiOverview
        data={theElemiOverviewContext.selected}
        open={theElemiOverviewContext.activeModal === "view"}
      />
    </Paper>
  );
};

export default ElemiOverview;
