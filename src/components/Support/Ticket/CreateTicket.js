// react libraries
import { useState, useEffect } from "react";

// muis
import Dialog from "@mui/material/Dialog";
import { styled } from "@mui/material/styles";
import LinearProgress from "@mui/material/LinearProgress";
import { Box, Typography, Paper, Grid, TextField, Button } from "@mui/material";
import TextareaAutosize from "@mui/base/TextareaAutosize";
import CloseIcon from "@mui/icons-material/Close";

// other import file
// import TimeStamp from "../../plugins/format-timestamp";
import { useTicketContext } from "../../../context/ticketContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 6,
}));

const CreateTicket = (props) => {
  const formTitle = "Create New Ticket";
  const { open } = props;
  const theTicketContext = useTicketContext();

  const [obj, setObj] = useState({});

  useEffect(() => {
    setObj({});
  }, []);

  const createCloseHandler = () => {
    theTicketContext.setActiveModal("");
  };

  const handleOnSubmit = (e) => {
    theTicketContext.createTicket(obj);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setObj((prev) => ({ ...prev, [name]: value }));
  };

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
          <Grid item container sx={{ gap: "10px" }} direction="column">
            <Grid item xs>
              <TextField
                fullWidth
                size="small"
                type="text"
                label="Subject"
                name="subject"
                onChange={handleInputChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs>
              <TextareaAutosize
                aria-label="empty textarea"
                name="content"
                placeholder="Enter text here"
                onChange={handleInputChange}
                maxRows={5}
                minRows={5}
                style={{
                  // height: "100%",
                  width: "100%",
                  resize: "none",
                  borderRadius: "0.25rem",
                  padding: "10px",
                }}
              />
            </Grid>
          </Grid>

          <Grid item xs>
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
                Create
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
      {theTicketContext.loading && <BorderLinearProgress color="success" />}
    </Dialog>
  );
};

export default CreateTicket;
