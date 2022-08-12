import * as React from "react";
import { useNavigate } from "react-router-dom";
// other import file
// import { useRouterContext } from "../../context/routerContext";

// muis
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Typography } from "@mui/material";
// import Link from "@mui/material/Link";

const ActiveLastBreadcrumb = (props) => {
  const navigate = useNavigate();
  const { data } = props;

  const handleOnClick = (link) => {
    const checkLink = (url) => {
      return url === "/" ? `${url}` : `/${url}`;
    };
    navigate(checkLink(link));
  };

  return (
    <Breadcrumbs aria-label="breadcrumb">
      {data.map((item, index) => {
        return (
          <Typography
            sx={{ cursor: "pointer" }}
            underline={item.underline}
            key={index}
            color={item.color}
            onClick={(e) => handleOnClick(item.href)}
            aria-current={item.ariaCurrent}
          >
            {item.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default ActiveLastBreadcrumb;
