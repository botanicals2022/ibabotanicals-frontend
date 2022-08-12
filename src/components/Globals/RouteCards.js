import * as React from "react";
import { useNavigate } from "react-router-dom";

// other import file

// muis
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const RouteCards = (props) => {
  const navigate = useNavigate();
  const { title, body, link } = props;

  const handleOnClick = (link) => {
    navigate(`${link}`);
  };

  return (
    <Card sx={{ minWidth: 275, border: "1px solid gray" }}>
      <CardContent>
        <Typography variant="h3" component="div">
          {title}
        </Typography>
        <Typography variant="body2">{body}</Typography>
      </CardContent>
      <CardActions>
        <Button onClick={(e) => handleOnClick(link)} size="small">
          View
        </Button>
      </CardActions>
    </Card>
  );
};

export default RouteCards;
