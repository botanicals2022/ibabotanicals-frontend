// react libraries
import { useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { Box, Typography, Paper, Grid } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

// other import file
import { useLaboratoryContext } from "../../../../context/inventory/consumable/laboratoryContext";

const ViewLaboratoryConsumable = (props) => {
  const { open } = props;
  const theLaboratoryContext = useLaboratoryContext();

  const createCloseHandler = () => {
    theLaboratoryContext.setActiveModal("");
  };

  return (
    <Dialog fullWidth maxWidth="sm" disableEscapeKeyDown={true} open={open}>
      <Paper sx={{ position: "relative", padding: "10px" }}>
        <Box sx={{ marginBottom: "2rem", marginTop: "1rem" }}>
          <Typography
            align="center"
            sx={{ fontWeight: "bold" }}
            // mb={2}
            variant="h5"
            component="div"
          >
            {/* {theLaboratoryContext.selected?.name} */}
            Laboratory
          </Typography>
        </Box>
        <CloseIcon
          onClick={createCloseHandler}
          sx={{
            cursor: "pointer",
            position: "absolute",
            top: "10px",
            right: "10px",
          }}
        />
        <Grid container direction="column">
          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                ID
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.id}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Purchase Item Id
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.purchaseItemId}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Laboratory Id
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.lid}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Name
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.name}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Quantity
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.quantity}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Quality
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.quality}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Batch Code
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.batchCode}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Price
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.price}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Origin
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.destination}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Supplier
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.supplier}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Contact
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.contact}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Address
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.address}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Date Of Delivery
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.dateOfDelivery}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Updated At
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.updatedAt}
              </Typography>
            </Grid>
          </Grid>

          <Grid item container sx={{ gap: "10px" }} xs direction="row">
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                Description
              </Typography>
            </Grid>
            <Grid item xs>
              <Typography
                sx={{ fontWeight: "bold", fontSize: 12 }}
                variant="caption"
                display="block"
              >
                : {theLaboratoryContext.selected?.description}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Dialog>
  );
};

export default ViewLaboratoryConsumable;
