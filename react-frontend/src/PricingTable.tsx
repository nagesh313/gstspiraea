import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(
  option: string,
  particulars: string,
  place1: string,
  place2: string,
  remarks: string
) {
  return { option, particulars, place1, place2, remarks };
}

const rows = [
  createData(
    "1",
    "Place of Business (Rent Agreement) + GST registration",
    "11,000",
    "18,000",
    "11 months rent agreement."
  ),
  createData(
    "2",
    "Place of Business (Rent Agreement) Only",
    "10,000",
    "12,000",
    "11 months rent agreement."
  ),
  createData(
    "3",
    "GST Registration Only",
    "2,500",
    "5,000",
    "Gumasta / Shop establishment license is not included in this"
  ),
  createData(
    "4",
    "Gumasta / Shop establishment license",
    "NA",
    "3000",
    "Applicable only Kolkata"
  ),
];

export const PricingTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Option</TableCell>
            <TableCell align="left">Particulars</TableCell>
            <TableCell align="left">
              Mumbai / Bangalore / Delhi NCR/ Hyderabad
            </TableCell>
            <TableCell align="left">Kolkata</TableCell>
            <TableCell align="left">Remarks</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.option}>
              <TableCell component="th" scope="row">
                {row.option}
              </TableCell>
              <TableCell align="left">{row.particulars}</TableCell>
              <TableCell align="left">{row.place1}</TableCell>
              <TableCell align="left">{row.place2}</TableCell>
              <TableCell align="left">{row.remarks}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
