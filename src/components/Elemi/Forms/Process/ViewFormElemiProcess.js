// other import file
import { useElemiProcessContext } from "../../../../context/elemi/forms/elemiProcessContext";

// muis
import {
  Box,
  Typography,
  Paper,
  Grid,
  TextareaAutosize,
  TextField,
  Button,
  Dialog,
} from "@mui/material";
import { styled } from "@mui/system";
import CloseIcon from "@mui/icons-material/Close";

const StyledTable = styled("table")({
  borderCollapse: "collapse",
  width: "100%",
  border: "1px solid black",
});
const StyledTh = styled("th")({
  border: "1px solid black",
  paddingRight: "5px",
  paddingLeft: "5px",
});
const StyledTd = styled("td")({
  border: "1px solid black",
  paddingRight: "5px",
  paddingLeft: "5px",
});

const ViewFormElemiProcess = (props) => {
  const { open, data } = props;
  const theElemiProcessContext = useElemiProcessContext();

  const createCloseHandler = () => {
    theElemiProcessContext.setActiveModal("");
  };

  return (
    <Dialog fullScreen open={open}>
      <Paper sx={{ position: "relative", padding: "10px" }}>
        {/* <Box sx={{ marginBottom: "3rem", marginTop: "1rem" }}>
          <Typography
            align="center"
            sx={{ fontWeight: "bold" }}
            mb={2}
            variant="h5"
            component="div"
          >
            {formTitle}
          </Typography>
        </Box> */}
        <CloseIcon
          onClick={createCloseHandler}
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        />

        <Grid container direction="column" sx={{ gap: "10px" }}>
          <Grid item container direction="row">
            <Grid item container xs></Grid>
            <Grid item container xs direction="column">
              <Grid item xs>
                <Typography
                  viriant="h6"
                  component="div"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Standard Operating Procedures
                </Typography>
              </Grid>
              <Grid item xs>
                <Typography
                  viriant="h4"
                  component="div"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Elemi Distillation
                </Typography>
              </Grid>
              <Grid item xs sx={{ marginTop: "2rem" }}>
                <Typography
                  viriant="h4"
                  component="div"
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  Appendix 6: Elemi Distillation Record
                </Typography>
              </Grid>
            </Grid>
            <Grid item container xs direction="column">
              {/* Document No. */}
            </Grid>
          </Grid>

          <Grid
            item
            container
            direction="row"
            sx={{ lg: { gap: "0" }, md: { gap: "10px" } }}
          >
            <Grid item xs={12} md={6}>
              <StyledTable>
                <tbody>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "200px" }}>
                      Date
                    </StyledTd>
                    <StyledTd>{data.jsonObject?.date}</StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "200px" }}>
                      Oil Batch Number
                    </StyledTd>
                    <StyledTd>
                      {theElemiProcessContext.selected?.oilBatchNumber}
                    </StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "200px" }}>
                      Oil Batch Number Format
                    </StyledTd>
                    <StyledTd>
                      IB-EF-YYYYMMDD-Distilation Vessel No- Distillation Batch
                      No
                    </StyledTd>
                  </tr>
                </tbody>
              </StyledTable>
            </Grid>
            <Grid item xs>
              <StyledTable>
                <tbody>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "200px" }}>
                      Vessel No.
                    </StyledTd>
                    <StyledTd>
                      {data.jsonObject?.vessel_number ?? "n/a"}
                    </StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "200px" }}>
                      Person in Charge
                    </StyledTd>
                    <StyledTd>
                      {data.jsonObject?.person_in_charge ?? "n/a"}
                    </StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "200px" }}>
                      Operators
                    </StyledTd>
                    <StyledTd>{data.jsonObject?.operator_1 ?? "n/a"}</StyledTd>
                  </tr>
                  <tr>
                    <StyledTd></StyledTd>
                    <StyledTd>{data.jsonObject?.operator_2 ?? "n/a"}</StyledTd>
                  </tr>
                </tbody>
              </StyledTable>
            </Grid>
          </Grid>

          <Grid item container direction="row" sx={{ gap: "10px" }}>
            <Grid
              item
              xl={3}
              lg={4}
              md={3}
              xs={12}
              container
              direction="column"
              sx={{ gap: "10px" }}
            >
              <Grid item xs>
                <StyledTable>
                  <tbody>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Resin Batch No.
                      </StyledTd>
                      <StyledTd sx={{ fontWeight: "bold" }}>Weight</StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.resin_batch_no_1 ?? "n/a"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.resin_weight_count_1 ?? "n/a"}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.resin_batch_no_2 ?? "n/a"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.resin_weight_count_2 ?? "n/a"}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.resin_batch_no_3 ?? "n/a"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.resin_weight_count_3 ?? "n/a"}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.resin_batch_no_4 ?? "n/a"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.resin_weight_count_4 ?? "n/a"}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", minWidth: "230px" }}>
                        Total Resin Weight
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {/* {data.jsonObject?.resin_weight_total ?? "n/a"} */}
                        {theElemiProcessContext.selected?.totalResinWeight ??
                          "n/a"}
                      </StyledTd>
                    </tr>
                  </tbody>
                </StyledTable>
              </Grid>
              <Grid item xs>
                <StyledTable>
                  <tbody>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Process water volume
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.process_water_volume}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Time start boiler
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_start_boiler}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Time start resin loading
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_start_resin_loading}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Time end resin loading
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_end_resin_loading}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Time start distillation
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_start_distillation}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Time end distillation
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_end_distillation}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Total diesel consumption
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {/* {data.jsonObject?.total_diesel_consumption} */}
                        {theElemiProcessContext.selected?.fuelConsumed ?? "n/a"}
                      </StyledTd>
                    </tr>
                  </tbody>
                </StyledTable>
              </Grid>
            </Grid>

            <Grid item xs container direction="column">
              <Grid item xs>
                <StyledTable>
                  <thead>
                    <tr>
                      <StyledTh>Time</StyledTh>
                      <StyledTh>T1: Jacket</StyledTh>
                      <StyledTh>T2: Condenser</StyledTh>
                      <StyledTh>T3: Inside Still</StyledTh>
                      <StyledTh>Headers</StyledTh>
                      <StyledTh>Flow Rate</StyledTh>
                      <StyledTh>Oil Recovery</StyledTh>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0000 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0000 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0000 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0000 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0000 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0000 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0000 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0001 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0001 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0001 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0001 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0001 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0001 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0001 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0002 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0002 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0002 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0002 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0002 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0002 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0002 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0003 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0003 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0003 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0003 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0003 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0003 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0003 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0004 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0004 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0004 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0004 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0004 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0004 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0004 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0005 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0005 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0005 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0005 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0005 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0005 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0005 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0006 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0006 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0006 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0006 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0006 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0006 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0006 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0007 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0007 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0007 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0007 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0007 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0007 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0007 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0008 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0008 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0008 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0008 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0008 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0008 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0008 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0009 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0009 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0009 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0009 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0009 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0009 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0009 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0010 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0010 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0010 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0010 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0010 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0010 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0010 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0011 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0011 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0011 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0011 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0011 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0011 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0011 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0012 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0012 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0012 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0012 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0012 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0012 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0012 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0013 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0013 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0013 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0013 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0013 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0013 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0013 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0014 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0014 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0014 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0014 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0014 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0014 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0014 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0015 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0015 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0015 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0015 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0015 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0015 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0015 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0016 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0016 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0016 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0016 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0016 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0016 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0016 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0017 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0017 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0017 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0017 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0017 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0017 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0017 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0018 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0018 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0018 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0018 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0018 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0018 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0018 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0019 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0019 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0019 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0019 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0019 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0019 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0019 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0020 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0020 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0020 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0020 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0020 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0020 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0020 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.time_0021 ?? ""}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t1_jacket_0021 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t2_condenser_0021 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.t3_inside_still_0021 ?? "*C"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.header_0021 ?? "psi"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.flow_rate_0021 ?? "lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {data.jsonObject?.oil_recovery_0021 ?? "g"}
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {theElemiProcessContext.selected?.totalTime + " hrs" ??
                          ""}
                      </StyledTd>
                      <StyledTd></StyledTd>
                      <StyledTd></StyledTd>
                      <StyledTd></StyledTd>
                      <StyledTd></StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {theElemiProcessContext.selected?.averageFlowRate?.toFixed(
                          2
                        ) + " ave lpm" ?? "ave lpm"}
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {theElemiProcessContext.selected?.totalOilRecovery?.toFixed(
                          2
                        ) + " total g" ?? "total g"}
                      </StyledTd>
                    </tr>
                  </tbody>
                </StyledTable>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs container direction="column" sx={{ gap: "10px" }}>
            <Grid item xs>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Notes (Foreign material, power interruption)"
                minRows={4}
                maxRows={4}
                name="notes"
                value={data.jsonObject?.notes}
                style={{
                  // height: "calc(50vh - 60px)",
                  width: "100%",
                  resize: "none",
                  borderRadius: "0.5rem",
                  padding: "10px",
                }}
              />
            </Grid>
            <Grid item xs container direction="row" sx={{ gap: "50px" }}>
              <Grid item xs>
                <StyledTable>
                  <tbody>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold" }}>
                        Waste Type
                      </StyledTd>
                      <StyledTd sx={{ fontWeight: "bold" }}>
                        Compliant Disposal
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd>Spent Resin</StyledTd>
                      <StyledTd>
                        {data.jsonObject?.compliant_disposal_1 ?? "n/a"}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd>Hydrosol</StyledTd>
                      <StyledTd>
                        {data.jsonObject?.compliant_disposal_2 ?? "n/a"}
                      </StyledTd>
                    </tr>
                  </tbody>
                </StyledTable>
              </Grid>
              <Grid item xs container direction="column" sx={{ gap: "10px" }}>
                <Grid item xs>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    label="Operator"
                    name="operator"
                    value={data.jsonObject?.operator}
                    variant="standard"
                  />
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    size="small"
                    type="text"
                    label="Supervisor"
                    name="supervisor"
                    value={data.jsonObject?.supervisor}
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default ViewFormElemiProcess;
