import { useState, useEffect } from "react";
// import Swal from "sweetalert2";

// other import file
import useFocusNext from "../../../../helper/hooks/focusNext";
// import { useSnackContext } from "../../../../context/snackAlertContext";
import { useElemiQCPContext } from "../../../../context/elemi/forms/elemiQCPContext";
import StyledGridItem from "./StyledGridItem";

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

const EditQCP = (props) => {
  const { open } = props;
  const theElemiQCPContext = useElemiQCPContext();

  const theFocusNext = useFocusNext();

  const createCloseHandler = () => {
    theElemiQCPContext.setActiveModal("");
  };

  const handleInputChange = (gname = "", e) => {
    theElemiQCPContext.onChange(gname, e.target);
  };

  const handleOnclickSelect = (group, text) => {
    theElemiQCPContext.onClick(group, text);
  };

  const handleOnSubmit = (e) => {
    theElemiQCPContext.updateQCP();
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
        <Grid container direction="column" sx={{ gap: "30px" }}>
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
                  Appendix 4b: Quality Control Parameters
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
                    <StyledTd sx={{ fontWeight: "bold", width: "350px" }}>
                      On-Hand Stocks Before Releasing
                    </StyledTd>
                    <StyledTd
                      sx={{ textAlign: "right" }}
                      contentEditable
                      ref={theFocusNext}
                      onBlur={(e) => handleInputChange("oHSBR", e)}
                      suppressContentEditableWarning={true}
                    >
                      {theElemiQCPContext.selected?.oHSBR ?? ""}
                    </StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "350px" }}>
                      Total Resins Outbound Weight
                    </StyledTd>
                    <StyledTd
                      sx={{ textAlign: "right" }}
                      contentEditable
                      ref={theFocusNext}
                      onBlur={(e) => handleInputChange("totalROW", e)}
                      suppressContentEditableWarning={true}
                    >
                      {theElemiQCPContext.selected?.totalROW ?? ""}
                    </StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "350px" }}>
                      Stocks After Releasing
                    </StyledTd>
                    <StyledTd
                      sx={{ textAlign: "right" }}
                      contentEditable
                      ref={theFocusNext}
                      onBlur={(e) => handleInputChange("sAR", e)}
                      suppressContentEditableWarning={true}
                    >
                      {theElemiQCPContext.selected?.sAR ?? ""}
                    </StyledTd>
                  </tr>
                </tbody>
              </StyledTable>
            </Grid>
            <Grid item xs>
              <StyledTable>
                <tbody>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "350px" }}>
                      Reference Number
                    </StyledTd>
                    <StyledTd
                      sx={{ textAlign: "right" }}
                      contentEditable
                      ref={theFocusNext}
                      onBlur={(e) => handleInputChange("refNumber", e)}
                      suppressContentEditableWarning={true}
                    >
                      {theElemiQCPContext.selected?.refNumber ?? ""}
                    </StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "350px" }}>
                      Raw Material Batch Number
                    </StyledTd>
                    <StyledTd
                      sx={{ textAlign: "right" }}
                      contentEditable
                      ref={theFocusNext}
                      onBlur={(e) => handleInputChange("rMBNumber", e)}
                      suppressContentEditableWarning={true}
                    >
                      {theElemiQCPContext.selected?.rMBNumber ?? ""}
                    </StyledTd>
                  </tr>
                  <tr>
                    <StyledTd sx={{ fontWeight: "bold", width: "350px" }}>
                      Outbound Date
                    </StyledTd>
                    <StyledTd
                      sx={{ textAlign: "right" }}
                      contentEditable
                      ref={theFocusNext}
                      onBlur={(e) => handleInputChange("outboundDate", e)}
                      suppressContentEditableWarning={true}
                    >
                      {theElemiQCPContext.selected?.outboundDate ?? ""}
                    </StyledTd>
                  </tr>
                </tbody>
              </StyledTable>
            </Grid>
          </Grid>

          <Grid item container direction="column">
            <Grid item xs container direction="row">
              <Grid
                item
                xs={1}
                sx={{
                  border: "1px solid black",
                  padding: "1rem 0.5rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                No.
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  border: "1px solid black",
                  padding: "1rem 0.5rem",
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Description
              </Grid>
              <Grid
                item
                xs={8}
                sx={{
                  border: "1px solid black",
                  padding: "1rem 0.5rem",
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
              >
                Judgement
              </Grid>
            </Grid>
            <Grid item xs container direction="row">
              <Grid
                item
                xs={4}
                sx={{ border: "1px solid black", backgroundColor: "#9292f9" }}
              ></Grid>
              <Grid item xs={8} container direction="row">
                <Grid
                  item
                  xs={3}
                  sx={{
                    textAlign: "center",
                    border: "1px solid black",
                    backgroundColor: "green",
                    padding: "1rem 0.5rem",
                  }}
                >
                  Highly Accepted 0-10%
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    textAlign: "center",
                    border: "1px solid black",
                    padding: "1rem 0.5rem",
                  }}
                >
                  10-25%
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    textAlign: "center",
                    border: "1px solid black",
                    backgroundColor: "yellow",
                    padding: "1rem 0.5rem",
                  }}
                >
                  Fair 25-50%
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    textAlign: "center",
                    border: "1px solid black",
                    backgroundColor: "orange",
                    padding: "1rem 0.5rem",
                  }}
                >
                  Tolerable 50-60%
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    textAlign: "center",
                    border: "1px solid black",
                    backgroundColor: "red",
                    padding: "1rem 0.5rem",
                  }}
                >
                  Reject 60-100%
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs container direction="row">
              <StyledGridItem
                size={1}
                text={1}
                isCursor={false}
                hasCallBack={false}
              />
              <StyledGridItem
                size={3}
                text="Scent"
                isCursor={false}
                hasCallBack={false}
              />
              <Grid item xs={8} container direction="column">
                <Grid
                  item
                  xs
                  sx={{
                    border: "1px solid black",
                    textAlign: "center",
                    backgroundColor: "#9292f9",
                  }}
                >
                  Balsamic-spicy with lemony scent
                </Grid>
                <Grid item xs container direction="row">
                  <StyledGridItem
                    size={3}
                    text={5}
                    group={1}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={4}
                    group={1}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={3}
                    group={1}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={2}
                    group={1}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={3}
                    text={1}
                    group={1}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs container direction="row">
              <StyledGridItem
                size={1}
                text={2}
                isCursor={false}
                hasCallBack={false}
              />
              <StyledGridItem
                size={3}
                text="Color"
                isCursor={false}
                hasCallBack={false}
              />
              <Grid item xs={8} container direction="column">
                <Grid
                  item
                  xs
                  container
                  direction="row"
                  sx={{ backgroundColor: "#9292f9" }}
                >
                  <StyledGridItem
                    size={3}
                    text="White"
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={6}
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={3}
                    text="Pale Yellow"
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                </Grid>
                <Grid item xs container direction="row">
                  <StyledGridItem
                    size={3}
                    text={5}
                    group={2}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={4}
                    group={2}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={3}
                    group={2}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={2}
                    group={2}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={3}
                    text={1}
                    group={2}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs container direction="row">
              <StyledGridItem
                size={1}
                text={3}
                isCursor={false}
                hasCallBack={false}
              />
              <StyledGridItem
                size={3}
                text="Hardness or Softness"
                isCursor={false}
                hasCallBack={false}
              />
              <Grid item xs={8} container direction="column">
                <Grid
                  item
                  xs
                  container
                  direction="row"
                  sx={{ backgroundColor: "#9292f9" }}
                >
                  <StyledGridItem
                    size={3}
                    text="Soft"
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={6}
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={3}
                    text="Hard"
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                </Grid>
                <Grid item xs container direction="row">
                  <StyledGridItem
                    size={3}
                    text={5}
                    group={3}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={4}
                    group={3}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={3}
                    group={3}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={2}
                    group={3}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={3}
                    text={1}
                    group={3}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs container direction="row">
              <StyledGridItem
                size={1}
                text={4}
                isCursor={false}
                hasCallBack={false}
              />
              <StyledGridItem
                size={3}
                text="Stickyness"
                isCursor={false}
                hasCallBack={false}
              />
              <Grid item xs={8} container direction="column">
                <Grid
                  item
                  xs
                  container
                  direction="row"
                  sx={{ backgroundColor: "#9292f9" }}
                >
                  <StyledGridItem
                    size={3}
                    text="Sticky"
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={6}
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={3}
                    text="Not Sticky"
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                </Grid>
                <Grid item xs container direction="row">
                  <StyledGridItem
                    size={3}
                    text={5}
                    group={4}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={4}
                    group={4}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={3}
                    group={4}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={2}
                    group={4}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={3}
                    text={1}
                    group={4}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs container direction="row">
              <StyledGridItem
                size={1}
                text={5}
                isCursor={false}
                hasCallBack={false}
              />
              <StyledGridItem
                size={3}
                text="Presence Of Wood Barks"
                isCursor={false}
                hasCallBack={false}
              />
              <Grid item xs={8} container direction="column">
                <Grid
                  item
                  xs
                  container
                  direction="row"
                  sx={{ backgroundColor: "#9292f9" }}
                >
                  <StyledGridItem
                    size={3}
                    text="Not Observed"
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={6}
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={3}
                    text={"Observed but tolerable"}
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                </Grid>
                <Grid item xs container direction="row">
                  <StyledGridItem
                    size={3}
                    text={5}
                    group={5}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={4}
                    group={5}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={3}
                    group={5}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={2}
                    group={5}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={3}
                    text={1}
                    group={5}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs container direction="row">
              <StyledGridItem
                size={1}
                text={6}
                isCursor={false}
                hasCallBack={false}
              />
              <StyledGridItem
                size={3}
                text="Presence Of Borax"
                isCursor={false}
                hasCallBack={false}
              />

              <Grid item xs={8} container direction="column">
                <Grid
                  item
                  xs
                  container
                  direction="row"
                  sx={{ backgroundColor: "#9292f9" }}
                >
                  <StyledGridItem
                    size={3}
                    text="Not Observed"
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={6}
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={3}
                    text={"Observed but tolerable"}
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                </Grid>
                <Grid item xs container direction="row">
                  <StyledGridItem
                    size={3}
                    text={5}
                    group={6}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={4}
                    group={6}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={3}
                    group={6}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={2}
                    group={6}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={3}
                    text={1}
                    group={6}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs container direction="row">
              <StyledGridItem
                size={1}
                text={7}
                isCursor={false}
                hasCallBack={false}
              />
              <StyledGridItem
                size={3}
                text="Molds"
                isCursor={false}
                hasCallBack={false}
              />

              <Grid item xs={8} container direction="column">
                <Grid
                  item
                  xs
                  container
                  direction="row"
                  sx={{ backgroundColor: "#9292f9" }}
                >
                  <StyledGridItem
                    size={3}
                    text="Not Observed"
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={6}
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                  <StyledGridItem
                    size={3}
                    text={"Observed but tolerable"}
                    isBold={false}
                    isCursor={false}
                    hasCallBack={false}
                  />
                </Grid>
                <Grid item xs container direction="row">
                  <StyledGridItem
                    size={3}
                    text={5}
                    group={7}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={4}
                    group={7}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={3}
                    group={7}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={2}
                    text={2}
                    group={7}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                  <StyledGridItem
                    size={3}
                    text={1}
                    group={7}
                    isBold={false}
                    currentCell={theElemiQCPContext.selected?.cell}
                    dataRequest={handleOnclickSelect}
                    cellValue={theElemiQCPContext.selected?.tblRows}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item>
              <TextareaAutosize
                aria-label="empty textarea"
                placeholder="Remarks"
                minRows={6}
                maxRows={8}
                name="remarks"
                value={theElemiQCPContext.selected?.remarks ?? ""}
                onChange={(e) => handleInputChange("", e)}
                style={{
                  borderColor: "1px solid black",
                  width: "100%",
                  resize: "none",
                  padding: "10px",
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs container direction="column" sx={{ gap: "10px" }}>
            <Grid item xs container direction="row" sx={{ gap: "50px" }}>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Released By:"
                  name="releasedBy"
                  value={theElemiQCPContext.selected?.releasedBy ?? ""}
                  onChange={(e) => handleInputChange("", e)}
                  variant="standard"
                />
              </Grid>
              <Grid item xs>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  label="Received By:"
                  name="receivedBy"
                  value={theElemiQCPContext.selected?.receivedBy ?? ""}
                  onChange={(e) => handleInputChange("", e)}
                  variant="standard"
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs>
            <Button
              sx={{ cursor: "pointer", marginTop: "1.5rem" }}
              onClick={(e) => handleOnSubmit(e)}
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
      {theElemiQCPContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default EditQCP;
