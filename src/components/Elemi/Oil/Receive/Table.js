// react libraries
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

// other import file
import BrowserStorage from "../../../../plugins/storage";
import TimeStamp from "../../../../plugins/format-timestamp";

// muis
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import { visuallyHidden } from "@mui/utils";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import ModeIcon from "@mui/icons-material/Mode";
import PreviewIcon from "@mui/icons-material/Preview";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const NewTableSortLabel = styled(TableSortLabel)`
  & .MuiTableSortLabel-icon {
    color: #fff;
  }
`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator, filter, filterBy) {
  const filteredArray =
    filterBy && filterBy !== "all"
      ? array.filter((item) => item[filter]?.toLowerCase() === filterBy)
      : array;

  const stabilizedThis = filteredArray.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });

  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    headCells,
    order,
    orderBy,
    onRequestSort,
    filter,
    filterBy,
    onRequestFilter,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const createFilterHandler = (event, property) => {
    onRequestFilter(event.target.value, property);
  };

  return (
    <TableHead>
      <TableRow sx={{ backgroundColor: "#2b6cb0" }}>
        {headCells.map((headCell, index) => (
          <TableCell
            sx={{
              border: "2px solid #e2e8f0",
              borderCollapse: "collapse",
            }}
            key={`tblCell-${index}`}
            align={headCell.alignment}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {/* has sortable functionality */}
            {headCell.isSortable && (
              <NewTableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                <Typography
                  sx={{ color: "#fff", textTransform: "uppercase" }}
                  variant="inherit"
                >
                  {headCell.label}
                </Typography>
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                ) : null}
              </NewTableSortLabel>
            )}

            {/* has dropdown functionality */}
            {headCell.hasDropdown && (
              <Box sx={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <Typography
                  sx={{ color: "#fff", textTransform: "uppercase" }}
                  variant="inherit"
                >
                  {headCell.label}:
                </Typography>
                {
                  <FormControl
                    hiddenLabel
                    margin="dense"
                    size="small"
                    variant="filled"
                  >
                    <Select
                      autoWidth
                      sx={{ fontSize: "12px", color: "#fff" }}
                      variant="standard"
                      key={`tblSelect-${index}`}
                      labelId={`table-filter-${index}-label`}
                      id={`table-filter-${index}-select`}
                      defaultValue=""
                      value={headCell.id === filter ? filterBy : ""}
                      onChange={(e) => createFilterHandler(e, headCell.id)}
                    >
                      {headCell.dropDownData.length > 0 &&
                        headCell.dropDownData.map((item, indx) => {
                          return (
                            <MenuItem
                              dense
                              key={indx}
                              value={item.value?.toLowerCase()}
                            >
                              {item.label}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                }
              </Box>
            )}
            {/* display the headcell only */}
            {!headCell.hasDropdown && !headCell.isSortable && (
              <Typography
                sx={{ color: "#fff", textTransform: "uppercase" }}
                variant="inherit"
              >
                {headCell.label}
              </Typography>
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  onRequestFilter: PropTypes.func.isRequired,
  filter: PropTypes.string,
  filterBy: PropTypes.string,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

const DataTbl = (props) => {
  const {
    headCells,
    dataRows,
    isShown,
    editRequest,
    viewRecordTag,
    viewDetailsRequest,
    deleteRequest,
  } = props;

  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("");
  const [filter, setFilter] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(true);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleRequestFilter = (event_data, property) => {
    let tmp_edata = event_data.toString().toLowerCase();
    let temp_prop = property.toString().toLowerCase().replace(/\s/g, "_");

    setFilterBy(tmp_edata);
    setFilter(temp_prop);
  };

  const handleViewTag = (event, data) => {
    viewRecordTag(data);
  };

  const createEditHandler = (event, data) => {
    editRequest(data);
  };

  const handleViewDetails = (event, data) => {
    Swal.fire({
      title: `View Details`,
      text: `item id: ${data.id}`,
      icon: "question",
      showDenyButton: true,
      confirmButtonColor: "#4299e1",
      denyButtonColor: "#a0aec0",
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        viewDetailsRequest(data);
      }
    });
  };

  const handleDeleteCell = (event, entry_id) => {
    Swal.fire({
      title: "Are you sure you want to delete?",
      icon: "question",
      showDenyButton: true,
      confirmButtonColor: "#4299e1",
      denyButtonColor: "#a0aec0",
      confirmButtonText: "Yes",
      denyButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRequest(entry_id);
      }
    });
  };

  const rowColor = (idx, tag) => {
    let rowColor =
      tag !== "" && tag !== null && tag !== undefined
        ? searchParams.get("tag") === tag
          ? "red"
          : idx % 2 === 0
          ? "#fff"
          : "#ececec"
        : idx % 2 === 0
        ? "#fff"
        : "#ececec";

    return rowColor;
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - dataRows?.length) : 0;

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
          >
            <EnhancedTableHead
              // numSelected={selected.length}
              headCells={headCells}
              order={order}
              orderBy={orderBy}
              filter={filter}
              filterBy={filterBy}
              onRequestFilter={handleRequestFilter}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(
                dataRows,
                getComparator(order, orderBy),
                filter,
                filterBy
              )
                // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, RowIndx) => {
                  return (
                    <TableRow
                      hover
                      sx={{
                        backgroundColor: rowColor(RowIndx, row.tag),
                        border: "2px solid #e2e8f0",
                        borderCollapse: "collapse",
                      }}
                      tabIndex={-1}
                      key={`tblRow-${RowIndx}`}
                    >
                      <TableCell
                        sx={{
                          border: "2px solid #e2e8f0",
                          borderCollapse: "collapse",
                        }}
                        align="left"
                      >
                        {row.id}
                      </TableCell>

                      <TableCell
                        onClick={(e) => handleViewTag(e, row)}
                        sx={{
                          cursor: "pointer",
                          border: "2px solid #e2e8f0",
                          borderCollapse: "collapse",
                        }}
                        align="left"
                      >
                        {row.tag}
                      </TableCell>

                      <TableCell
                        sx={{
                          border: "2px solid #e2e8f0",
                          borderCollapse: "collapse",
                        }}
                        align="center"
                      >
                        {row?.prodShift}
                      </TableCell>

                      <TableCell
                        sx={{
                          border: "2px solid #e2e8f0",
                          borderCollapse: "collapse",
                        }}
                        align="right"
                      >
                        {row?.totalHSE?.toFixed(2)}
                      </TableCell>

                      <TableCell
                        sx={{
                          border: "2px solid #e2e8f0",
                          borderCollapse: "collapse",
                        }}
                        align="right"
                      >
                        {row?.totalElemiFilipina?.toFixed(2)}
                      </TableCell>

                      <TableCell
                        sx={{
                          border: "2px solid #e2e8f0",
                          borderCollapse: "collapse",
                        }}
                        align="right"
                      >
                        {row?.totalFlowRate?.toFixed(2)}
                      </TableCell>

                      <TableCell
                        sx={{
                          border: "2px solid #e2e8f0",
                          borderCollapse: "collapse",
                        }}
                        align="right"
                      >
                        {row?.totalOilRecovery?.toFixed(2)}
                      </TableCell>

                      <TableCell
                        sx={{
                          border: "2px solid #e2e8f0",
                          borderCollapse: "collapse",
                        }}
                        align="left"
                      >
                        {BrowserStorage.FoundUser(row.userId)}
                      </TableCell>

                      <TableCell
                        sx={{
                          border: "2px solid #e2e8f0",
                          borderCollapse: "collapse",
                        }}
                        align="left"
                      >
                        {TimeStamp(row.updatedAt)}
                      </TableCell>

                      <TableCell
                        sx={{
                          border: "2px solid #e2e8f0",
                          borderCollapse: "collapse",
                        }}
                        align="center"
                      >
                        {isShown && (
                          <ModeIcon
                            onClick={(e) => createEditHandler(e, row)}
                            sx={{ cursor: "pointer" }}
                          />
                        )}
                        <PreviewIcon
                          onClick={(e) => handleViewDetails(e, row)}
                          sx={{ cursor: "pointer" }}
                        />
                        {isShown && (
                          <DeleteForeverIcon
                            onClick={(e) => handleDeleteCell(e, row.id)}
                            sx={{ cursor: "pointer" }}
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 20 : 53) * emptyRows,
                  }}
                >
                  <TableCell
                    sx={{
                      border: "2px solid #e2e8f0",
                      borderCollapse: "collapse",
                    }}
                    colSpan={6}
                  />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default DataTbl;
