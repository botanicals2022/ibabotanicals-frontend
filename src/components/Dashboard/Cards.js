import { Grid, Typography, Box, Card, Paper, Divider } from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const Cards = () => {
  return (
    <Grid container>
      <Grid item xs={12} sx={{ textAlign: "center" }}>
        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
          Statistic
        </Typography>
      </Grid>
      <Grid item xs>
        <Grid
          container
          // sx={{
          //   overflowY: "hidden",
          // }}
          justifyContent="center"
          alignItems="center"
        >
          <Grid
            item
            xs
            sx={{
              border: "1px solid blue",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: "260px",
                maxHeight: "400px",
                height: "315px",
                paddingBottom: "2rem",
                paddingTop: "1rem",
                paddingX: "10px",
                margin: "10px",
                border: "1px solid red",
              }}
              variant="outlined"
            >
              <Grid container direction="column">
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      height: "80px",
                      // textTransform: "uppercase"
                    }}
                    variant="h6"
                    component="div"
                    mb={3}
                  >
                    Elemi Elemi Elemi Elemi Elemi Elemi Elemi Elemi Elemi Elemi
                    Elemi Elemi
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      textTransform: "uppercase",
                      marginBottom: "-0.75rem",
                      marginTop: "1rem",
                    }}
                    component="div"
                  >
                    Count
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                    variant="h2"
                    component="div"
                  >
                    227
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ paddingX: "1rem", paddingY: "0.5rem" }}
                >
                  <Divider sx={{ borderBottomWidth: 2 }} />
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={0} sx={{ height: "60px" }}>
                    <Grid item xs>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          textTransform: "uppercase",
                        }}
                        component="div"
                      >
                        CSV Report
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <PreviewIcon sx={{ marginX: "5px" }} />|
                      <CloudDownloadIcon sx={{ marginX: "5px" }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid
            item
            xs
            sx={{
              border: "1px solid blue",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: "260px",
                maxHeight: "400px",
                height: "315px",
                paddingBottom: "2rem",
                paddingTop: "1rem",
                paddingX: "10px",
                margin: "10px",
                border: "1px solid red",
              }}
              variant="outlined"
            >
              <Grid container direction="column">
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      height: "80px",
                      // textTransform: "uppercase"
                    }}
                    variant="h6"
                    component="div"
                    mb={3}
                  >
                    Elemi Elemi Elemi Elemi Elemi Elemi Elemi Elemi Elemi Elemi
                    Elemi Elemi
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      textTransform: "uppercase",
                      marginBottom: "-0.75rem",
                      marginTop: "1rem",
                    }}
                    component="div"
                  >
                    Count
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                    variant="h2"
                    component="div"
                  >
                    227
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ paddingX: "1rem", paddingY: "0.5rem" }}
                >
                  <Divider sx={{ borderBottomWidth: 2 }} />
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={0} sx={{ height: "60px" }}>
                    <Grid item xs>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          textTransform: "uppercase",
                        }}
                        component="div"
                      >
                        CSV Report
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <PreviewIcon sx={{ marginX: "5px" }} />|
                      <CloudDownloadIcon sx={{ marginX: "5px" }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid
            item
            xs
            sx={{
              border: "1px solid blue",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Card
              sx={{
                width: "260px",
                maxHeight: "400px",
                height: "315px",
                paddingBottom: "2rem",
                paddingTop: "1rem",
                paddingX: "10px",
                margin: "10px",
                border: "1px solid red",
              }}
              variant="outlined"
            >
              <Grid container direction="column">
                <Grid item xs={2}>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      height: "80px",
                      // textTransform: "uppercase"
                    }}
                    variant="h6"
                    component="div"
                    mb={3}
                  >
                    Elemi Elemi Elemi Elemi Elemi Elemi Elemi Elemi Elemi Elemi
                    Elemi Elemi
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      textTransform: "uppercase",
                      marginBottom: "-0.75rem",
                      marginTop: "1rem",
                    }}
                    component="div"
                  >
                    Count
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      textTransform: "uppercase",
                    }}
                    variant="h2"
                    component="div"
                  >
                    227
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{ paddingX: "1rem", paddingY: "0.5rem" }}
                >
                  <Divider sx={{ borderBottomWidth: 2 }} />
                </Grid>
                <Grid item xs={4}>
                  <Grid container spacing={0} sx={{ height: "60px" }}>
                    <Grid item xs>
                      <Typography
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          textTransform: "uppercase",
                        }}
                        component="div"
                      >
                        CSV Report
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      <PreviewIcon sx={{ marginX: "5px" }} />|
                      <CloudDownloadIcon sx={{ marginX: "5px" }} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cards;
