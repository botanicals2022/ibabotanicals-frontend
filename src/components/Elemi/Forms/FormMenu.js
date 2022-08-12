import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// other import file
// import { useElemiProcessContext } from "../../../context/elemi/forms/elemiProcessContext";
import { useElemiQCPContext } from "../../../context/elemi/forms/elemiQCPContext";
// import { useElemiMRFContext } from "../../../context/elemi/forms/elemiMRFContext";
// import { useElemiTFLContext } from "../../../context/elemi/forms/elemiTFLContext";
// import { useElemiTFPContext } from "../../../context/elemi/forms/elemiTFPContext";
import Cards from "../../../components/Globals/RouteCards";

// muis
import { Grid, Paper } from "@mui/material";

const ElemiMenu = () => {
  // const location = useLocation();
  // const theElemiProcessContext = useElemiProcessContext();
  const theElemiQCPContext = useElemiQCPContext();
  // const theElemiTFLContext = useElemiTFLContext();
  // const theElemiTFPContext = useElemiTFPContext();

  useEffect(() => {
    // theElemiProcessContext.getAllProcess();
    theElemiQCPContext.getAllQCP();
    // theElemiMRFContext.getAllMRF();
    // theElemiTFLContext.getAllTFL();
    // theElemiTFPContext.getAllTFP();
  }, []);

  return (
    <Paper elevation={0}>
      <Grid sx={{ padding: "2rem" }} container spacing={3}>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Operating Procedure"
            link="/elemi/forms/process"
            body="Elemi SOP fill up form"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Quality Control Parameters"
            link="/elemi/forms/quality-control-parameters"
            body="ELemi quality control parameters fill up form"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Production Transmittal"
            link="/elemi/forms/transmittal-production"
            body="ELemi transmittal for production fill up form"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Laboratory Transmittal"
            link="/elemi/forms/transmittal-laboratory"
            body="Elemi transmittal for laboratory fill up form"
          />
        </Grid>
        <Grid item md={4} sm={6} xs={12}>
          <Cards
            title="Material Request Form"
            link="/elemi/forms/material-request-form"
            body="Elemi material request fill up form"
          />
        </Grid>
      </Grid>
    </Paper>
  );
};

export default ElemiMenu;
