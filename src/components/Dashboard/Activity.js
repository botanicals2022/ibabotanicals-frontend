import { Grid, Typography, Box, Card, Paper } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

const Activity = () => {
  return (
    <Grid container direction="column" sx={{ maxWidth: "400px" }}>
      <Grid item xs={12}>
        <Typography variant="body1" sx={{ fontWeight: "bold" }}>
          Activity
        </Typography>
      </Grid>
      <Grid item xs>
        <Card
          sx={{
            backgroundColor: "#cffddc",
            border: "1px solid gray",
            paddingX: "10px",
            paddingY: "5px",
            marginBottom: ".5rem",
          }}
        >
          <Grid container direction="row">
            <Grid item xs={5}>
              <Grid container direction="column">
                <Grid item xs>
                  <Typography variant="caption" display="block">
                    January, 2, 2022
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="caption" display="block">
                    Harmony Loveranes
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption" display="block">
                Harmony Loveranes has added vetiver record
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <ArrowCircleRightIcon
                sx={{
                  // color: "#fff",
                  height: "35px",
                  width: "35px",
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* sample 2 */}
      <Grid item xs>
        <Card
          sx={{
            backgroundColor: "#cffddc",
            border: "1px solid gray",
            paddingX: "10px",
            paddingY: "5px",
            marginBottom: ".5rem",
          }}
        >
          <Grid container direction="row">
            <Grid item xs={5}>
              <Grid container direction="column">
                <Grid item xs>
                  <Typography variant="caption" display="block">
                    January, 2, 2022
                  </Typography>
                </Grid>
                <Grid item xs>
                  <Typography variant="caption" display="block">
                    Harmony Loveranes
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <Typography variant="caption" display="block">
                Harmony Loveranes has added vetiver record
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <ArrowCircleRightIcon
                sx={{
                  // color: "#fff",
                  height: "35px",
                  width: "35px",
                }}
              />
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Activity;
