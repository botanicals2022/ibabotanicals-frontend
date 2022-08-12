import { useEffect } from "react";
import { Grid, Box } from "@mui/material";
// import { styled } from "@mui/system";

export default function StyledGridItem(props) {
  const {
    size,
    text = "",
    group = "",
    isBold = true,
    isCenter = true,
    isBorder = true,
    isCursor = true,
    hasCallBack = true,
    cellValue = null,
    currentCell,
    dataRequest,
  } = props;
  const style = {};
  let circle = false;
  const boxStyle =
    "margin: -2px auto; color: red; font-weight: bold; border: 2px solid red; border-radius: 15px; width: fit-content; padding: 0 8px;";

  const callback = (e) => {
    let p = e.target;
    if (!hasCallBack) return;
    dataRequest(group, text);

    circle = !circle;
    p.style = circle ? boxStyle : "";
  };

  useEffect(() => {
    if (!cellValue) return;
    if (cellValue[group - 1].length < 2) return;
    if (cellValue[group - 1][2] === text) {
      let tmpDoc = document.getElementById(`id${group}${text}`);
      tmpDoc.style = boxStyle;
    }
  }, []);

  useEffect(() => {
    for (var i = 1; i < 6; i++) {
      if (!currentCell) return;
      if (!currentCell[0] && !currentCell[1]) return;
      if (i !== parseInt(currentCell[1])) {
        let tmpDoc = document.getElementById(`id${currentCell[0]}${i}`);
        tmpDoc.style = "";
      }
    }
  }, [currentCell]);

  if (isBold) style.fontWeight = "bold";
  if (isCenter) style.textAlign = "center";
  if (isBorder) style.border = "1px solid black";
  if (isCursor) style.cursor = "pointer";

  return (
    <Grid item xs={size} sx={{ ...style, justifyContent: "center" }}>
      <Box id={`id${group}${text}`} onClick={callback}>
        {text}
      </Box>
    </Grid>
  );
}
