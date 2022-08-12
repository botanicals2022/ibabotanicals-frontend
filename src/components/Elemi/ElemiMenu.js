import { useEffect } from "react";

// other import file
// import { useElemiContext } from "../../context/elemi/elemiContext";
// import { useElemiMaterialContext } from "../../context/elemi/elemiMaterialContext";
import { useElemiLaboratoryContext } from "../../context/elemi/elemiLaboratoryContext";
// import { useExtractedElemiContext } from "../../context/elemi/extractedElemiContext";
import { useElemiInventoryContext } from "../../context/elemi/elemiInventoryContext";
import { useElemiFuelContext } from "../../context/inventory/fuel/elemiFuelContext";

// forms
import { useElemiProcessContext } from "../../context/elemi/forms/elemiProcessContext";
import { useElemiMRFContext } from "../../context/elemi/forms/elemiMRFContext";
import { useElemiTFLContext } from "../../context/elemi/forms/elemiTFLContext";
import { useElemiTFPContext } from "../../context/elemi/forms/elemiTFPContext";

// oils
import { useElemiReceiveOilContext } from "../../context/elemi/oils/elemiReceiveOilContext";
import { useElemiProcessOilContext } from "../../context/elemi/oils/elemiProcessOilContext";
import { useElemiFinalOilContext } from "../../context/elemi/oils/elemiFinalOilContext";
import Cards from "../Globals/RouteCards";

// muis
import { Grid, Paper } from "@mui/material";

const ElemiMenu = () => {
  // const theElemiContext = useElemiContext();
  // const theElemiMaterialContext = useElemiMaterialContext();
  const theElemiLaboratoryContext = useElemiLaboratoryContext();
  // const theExtractedElemiContext = useExtractedElemiContext();
  const theElemiInventoryContext = useElemiInventoryContext();
  const theElemiFuelContext = useElemiFuelContext();

  // forms
  const theElemiProcessContext = useElemiProcessContext();
  const theElemiMRFContext = useElemiMRFContext();
  const theElemiTFLContext = useElemiTFLContext();
  const theElemiTFPContext = useElemiTFPContext();

  // oils
  const theElemiReceiveOilContext = useElemiReceiveOilContext();
  const theElemiProcessOilContext = useElemiProcessOilContext();
  const theElemiFinalOilContext = useElemiFinalOilContext();

  useEffect(() => {
    // theElemiContext.getAllElemi();
    // theElemiMaterialContext.getAllMaterial();
    theElemiLaboratoryContext.getAllLaboratory();
    // theExtractedElemiContext.getAllExtracted();
    theElemiInventoryContext.getAllInventory();
    theElemiFuelContext.getAllElemiFuel();

    // forms

    theElemiProcessContext.getAllProcess();
    theElemiMRFContext.getAllMRF();
    theElemiTFLContext.getAllTFL();
    theElemiTFPContext.getAllTFP();

    // oils
    theElemiReceiveOilContext.getAllReceiveOil();
    theElemiProcessOilContext.getAllProcessOil();
    theElemiFinalOilContext.getAllFinalOil();
  }, []);

  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        {/* <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Elemi Main"
            link="/elemi/main"
            body="list of all elemi"
          />
        </Grid> */}
        {/* <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Materials"
            link="/elemi/material"
            body="list of all elemi materials"
          />
        </Grid> */}
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Laboratory"
            link="/elemi/laboratory"
            body="list of all lab data"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Extracted"
            link="/elemi/extracted"
            body="list of all extracted data"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Inventory"
            link="/elemi/inventory"
            body="list of all inventory data"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards title="Forms" link="/elemi/forms" body="list of all forms" />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards title="Oil" link="/elemi/oil" body="list of oil transaction" />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ElemiMenu;
