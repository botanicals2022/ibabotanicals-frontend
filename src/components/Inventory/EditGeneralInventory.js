// react libraries
import { useState } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import Autocomplete from "@mui/material/Autocomplete";

// other import file
import { useGeneralInventoryContext } from "../../context/inventory/generalInventoryContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const EditGeneralInventory = (props) => {
  const formTitle = "Edit General Inventory";
  const { open } = props;
  const theGeneralInventoryContext = useGeneralInventoryContext();

  const inventorySource = () => {
    const tmpUser = theGeneralInventoryContext.generalInventoryList;
    let res = [];
    if (tmpUser) {
      tmpUser.forEach((item, index) => {
        if (item.quantity > 0) {
          res.push({
            label: `id: ${item.id} percentage: ${item.percentage}`,
            id: item.id,
          });
        }
      });
      return res;
    }
    return [];
  };

  const createCloseHandler = () => {
    theGeneralInventoryContext.setActiveModal("");
  };

  const handleOnSubmit = () => {
    theGeneralInventoryContext.updateGeneralInventory();
  };

  const handleInputChange = (e) => {
    theGeneralInventoryContext.onChange(e.target);
  };

  const handleAutoInputChange = (e, val) => {
    theGeneralInventoryContext.onChange({
      name: "source",
      value: val.map((item) => item.id.toString()),
    });
  };

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  return (
    <Dialog fullWidth maxWidth="xs" disableEscapeKeyDown={true} open={open}>
      <Paper sx={{ position: "relative", padding: "10px" }}>
        <Box sx={{ marginBottom: "3rem", marginTop: "1rem" }}>
          <Typography
            align="center"
            sx={{ fontWeight: "bold" }}
            mb={2}
            variant="h5"
            component="div"
          >
            {formTitle}
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

        <Grid container sx={{ gap: "10px" }} direction="column">
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Grade"
              name="grade"
              value={theGeneralInventoryContext.selected?.grade ?? ""}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="Percentage"
              name="percentage"
              value={theGeneralInventoryContext.selected?.percentage ?? ""}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <TextField
              fullWidth
              size="small"
              type="text"
              label="quantity"
              name="quantity"
              value={theGeneralInventoryContext.selected?.quantity ?? ""}
              onChange={handleInputChange}
              variant="outlined"
            />
          </Grid>
          <Grid item xs>
            <Autocomplete
              fullWidth
              // disablePortal
              name="source"
              onChange={handleAutoInputChange}
              size="small"
              // const tmpVal
              options={inventorySource()}
              multiple
              disableCloseOnSelect
              getOptionLabel={(option) => option.label}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.label}
                </li>
              )}
              renderInput={(params) => (
                <TextField {...params} label="Source" placeholder="Source" />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <Button
                sx={{ cursor: "pointer", marginTop: "1.5rem" }}
                onClick={(e) => handleOnSubmit(e)}
                variant="contained"
              >
                Update
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {theGeneralInventoryContext.loading && (
        <BorderLinearProgress color="success" />
      )}
    </Dialog>
  );
};

export default EditGeneralInventory;
