import { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// other import file
import useFocusNext from "../../../../helper/hooks/focusNext";
import HourTime from "../../../../plugins/hour-calculator";
// import { useSnackContext } from "../../../../context/snackAlertContext";
import { useElemiProcessContext } from "../../../../context/elemi/forms/elemiProcessContext";
import { useElemiFuelContext } from "../../../../context/inventory/fuel/elemiFuelContext";

// muis
import {
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
import LinearProgress from "@mui/material/LinearProgress";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

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

const CreateFormElemiProcess = (props) => {
  const { open } = props;
  const theElemiProcessContext = useElemiProcessContext();

  const theFocusNext = useFocusNext();
  const theElemiFuelContext = useElemiFuelContext();
  // const theSnackContext = useSnackContext();

  const [obj, setObj] = useState({});
  const [averageFlowRate, setAverageFlowRate] = useState(0);
  const [totalOilRecovery, setTotalOilRecovery] = useState(0);

  const [fuelConsumed, setFuelConsumed] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [totalResinWeight, setTotalResinWeight] = useState(0);
  const [oilBatchNumber, setOilBatchNumber] = useState("");

  const createCloseHandler = () => {
    reset();
    theElemiProcessContext.setActiveModal("");
  };

  const reset = () => {
    setObj({});
    setTotalTime(0);
    setAverageFlowRate(0);
    setTotalOilRecovery(0);
    setTotalResinWeight(0);
  };

  useEffect(() => {
    let tmpTime = [];

    let tmpCount = 0;
    let tmpAveFlowRate = 0;
    let tmpOilRecovered = 0;
    let tmpResinWeight = 0;

    const flowRateTotal = (frate) => {
      return (tmpAveFlowRate += parseFloat(frate));
    };

    for (const [key, value] of Object.entries(obj)) {
      const tmpNum = value.toString().replace(/[a-zA-Z]+/gi, "");

      if (key.includes("time_00")) {
        let tempConv = HourTime(value);
        if (tempConv > 0) {
          tmpTime.push(tempConv);
        }
      }

      if (tmpNum) {
        if (tmpNum > 0) {
          if (key.includes("flow_rate")) {
            tmpCount += 1;
            setAverageFlowRate(flowRateTotal(tmpNum) / tmpCount);
          }
          if (key.includes("oil_recovery")) {
            tmpOilRecovered += parseFloat(tmpNum);
            setTotalOilRecovery(tmpOilRecovered);
          }
          if (key.includes("resin_weight_count")) {
            tmpResinWeight += parseFloat(tmpNum);
            setTotalResinWeight(tmpResinWeight);
          }
        }
      }
    }

    const tTime = (rtime) => {
      if (rtime.length > 0) {
        let stmptime = rtime.sort((a, b) => b - a);
        return stmptime[0] - stmptime[stmptime.length - 1];
      } else {
        return 0;
      }
    };

    setTotalTime(tTime(tmpTime));
  }, [obj]);

  const compliantDisposal = (val1, val2) => {
    let v2res = parseFloat(val2) * 0.001;
    return parseFloat(val1) - v2res;
  };

  const handleInputChange = (gname = "", e) => {
    const { name, value, textContent } = e.target;

    if (name) {
      setObj((prev) => ({ ...prev, [name]: value }));
    }
    if (gname) {
      setObj((prev) => ({ ...prev, [gname]: textContent }));
    }
  };

  const numberOnly = (data) => {
    return parseFloat(data.replace(/\D/gi, ""));
  };

  const handleInput2Change = (gname = "", e) => {
    const { textContent } = e.target;
    if (gname === "oilBatchNumber") setOilBatchNumber(textContent);
    if (gname === "fuelConsumed") setFuelConsumed(numberOnly(textContent));
  };

  const handleOnSubmit = (e) => {
    if (fuelConsumed > 0) {
      let tmpFuelQty = parseInt(fuelConsumed);
      let tmpFuelList = theElemiFuelContext.fuelList;

      let tmpFuelRes = tmpFuelList[tmpFuelList.length - 1];
      if (!tmpFuelRes) {
        return;
      }
      const tmpLastFuel = (arrList) => {
        return parseInt(arrList[`quantity`].toString().replace(/\D+/gi, ""));
      };

      let tmpLastFuelQty = tmpLastFuel(tmpFuelRes) - tmpFuelQty;
      if (tmpLastFuelQty < 0) {
        return;
      }
      theElemiFuelContext.createElemiFuel({
        quantity: tmpLastFuelQty,
        name: "diesel",
      });

      theElemiProcessContext.createProcess(
        {
          ...obj,
          compliant_disposal_1: compliantDisposal(
            totalResinWeight,
            totalOilRecovery
          ),
        },
        {
          totalTime,
          averageFlowRate,
          totalOilRecovery,
          fuelConsumed,
          totalResinWeight,
          oilBatchNumber,
        }
      );
      reset();
    }
  };

  return (
    <Dialog fullScreen open={open}>
      <Paper sx={{ position: "relative", padding: "10px" }}>
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
                    <StyledTd
                      contentEditable
                      ref={theFocusNext}
                      onKeyUp={(e) => handleInputChange("date", e)}
                      suppressContentEditableWarning={true}
                    ></StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "200px" }}>
                      Oil Batch Number
                    </StyledTd>
                    <StyledTd
                      contentEditable
                      ref={theFocusNext}
                      onKeyUp={(e) => handleInput2Change("oilBatchNumber", e)}
                      suppressContentEditableWarning={true}
                    ></StyledTd>
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
                    <StyledTd
                      contentEditable
                      ref={theFocusNext}
                      onKeyUp={(e) => handleInputChange("vessel_number", e)}
                      suppressContentEditableWarning={true}
                    ></StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "200px" }}>
                      Person in Charge
                    </StyledTd>
                    <StyledTd
                      contentEditable
                      ref={theFocusNext}
                      onKeyUp={(e) => handleInputChange("person_in_charge", e)}
                      suppressContentEditableWarning={true}
                    ></StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "200px" }}>
                      Operators
                    </StyledTd>
                    <StyledTd
                      contentEditable
                      ref={theFocusNext}
                      onKeyUp={(e) => handleInputChange("operator_1", e)}
                      suppressContentEditableWarning={true}
                    ></StyledTd>
                  </tr>
                  <tr>
                    <StyledTd></StyledTd>
                    <StyledTd
                      contentEditable
                      ref={theFocusNext}
                      onKeyUp={(e) => handleInputChange("operator_2", e)}
                      suppressContentEditableWarning={true}
                    ></StyledTd>
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
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("resin_batch_no_1", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        sx={{ textAlign: "right" }}
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("resin_weight_count_1", e)
                        }
                        suppressContentEditableWarning={true}
                      ></StyledTd>
                    </tr>
                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("resin_batch_no_2", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        sx={{ textAlign: "right" }}
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("resin_weight_count_2", e)
                        }
                        suppressContentEditableWarning={true}
                      ></StyledTd>
                    </tr>
                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("resin_batch_no_3", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        sx={{ textAlign: "right" }}
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("resin_weight_count_3", e)
                        }
                        suppressContentEditableWarning={true}
                      ></StyledTd>
                    </tr>
                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("resin_batch_no_4", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        sx={{ textAlign: "right" }}
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("resin_weight_count_4", e)
                        }
                        suppressContentEditableWarning={true}
                      ></StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", minWidth: "230px" }}>
                        Total Resin Weight
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {totalResinWeight.toFixed(4)}&nbsp;<span>kg</span>
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
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("process_water_volume", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>L</span>
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Time start boiler
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("time_start_boiler", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Time start resin loading
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("time_start_resin_loading", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Time end resin loading
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("time_end_resin_loading", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Time start distillation
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("time_start_distillation", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Time end distillation
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("time_end_distillation", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                    </tr>
                    <tr>
                      <StyledTd sx={{ fontWeight: "bold", width: "230px" }}>
                        Total diesel consumption
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInput2Change("fuelConsumed", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>L</span>
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
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0000", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0000", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0000", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0000", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0000", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0000", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0000", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0001", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0001", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0001", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0001", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0001", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0001", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0001", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0002", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0002", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0002", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0002", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0002", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0002", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0002", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0003", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0003", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0003", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0003", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0003", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0003", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0003", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0004", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0004", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0004", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0004", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0004", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0004", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0004", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0005", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0005", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0005", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0005", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0005", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0005", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0005", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0006", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0006", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0006", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0006", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0006", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0006", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0006", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0007", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0007", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0007", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0007", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0007", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0007", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0007", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0008", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0008", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0008", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0008", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0008", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0008", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0008", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0009", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0009", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0009", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0009", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0009", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0009", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0009", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0010", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0010", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0010", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0010", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0010", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0010", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0010", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0011", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0011", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0011", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0011", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0011", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0011", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0011", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0012", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0012", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0012", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0012", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0012", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0012", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0012", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0013", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0013", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0013", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0013", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0013", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0013", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0013", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0014", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0014", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0014", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0014", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0014", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0014", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0014", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0015", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0015", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0015", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0015", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0015", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0015", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0015", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0016", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0016", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0016", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0016", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0016", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0016", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0016", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0017", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0017", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0017", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0017", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0017", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0017", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0017", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0018", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0018", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0018", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0018", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0018", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0018", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0018", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0019", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0019", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0019", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0019", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0019", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0019", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0019", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0020", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0020", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0020", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0020", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0020", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0020", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0020", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("time_0021", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      ></StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("t1_jacket_0021", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t2_condenser_0021", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("t3_inside_still_0021", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>*C</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("header_0021", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>psi</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) => handleInputChange("flow_rate_0021", e)}
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>lpm</span>
                      </StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("oil_recovery_0021", e)
                        }
                        suppressContentEditableWarning={true}
                        sx={{ textAlign: "right" }}
                      >
                        &nbsp;<span>g</span>
                      </StyledTd>
                    </tr>

                    <tr>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {totalTime.toFixed(2) + " hrs"}
                      </StyledTd>
                      <StyledTd></StyledTd>
                      <StyledTd></StyledTd>
                      <StyledTd></StyledTd>
                      <StyledTd></StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {averageFlowRate.toFixed(4)}&nbsp;<span>ave</span>
                      </StyledTd>
                      <StyledTd sx={{ textAlign: "right" }}>
                        {totalOilRecovery}&nbsp;<span>total</span>
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
                onChange={(e) => handleInputChange("", e)}
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
                        {compliantDisposal(totalResinWeight, totalOilRecovery)}
                      </StyledTd>
                    </tr>
                    <tr>
                      <StyledTd>Hydrosol</StyledTd>
                      <StyledTd
                        contentEditable
                        ref={theFocusNext}
                        onKeyUp={(e) =>
                          handleInputChange("compliant_disposal_2", e)
                        }
                        suppressContentEditableWarning={true}
                      ></StyledTd>
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
                    onChange={(e) => handleInputChange("", e)}
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
                    onChange={(e) => handleInputChange("", e)}
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <Button
              sx={{ cursor: "pointer", marginTop: "1.5rem" }}
              onClick={(e) => handleOnSubmit(e)}
              variant="contained"
            >
              Create
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {theElemiProcessContext.loading && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default CreateFormElemiProcess;
