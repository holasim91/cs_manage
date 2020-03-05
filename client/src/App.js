import React, { useState, useEffect } from "react";
import "./App.css";
import Customer from "./components/Customer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    overflowX: "auto",
    marginTop: theme.spacing(4)
  },
  table: {
    minWidth: 1080
  }
}));

export default function App() {
  const classes = useStyles();
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/customers");
      res.json().then(res => setCustomers(res));
    }

    fetchData();
  }, []);

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>사진</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers
            ? customers.map(customer => (
                <Customer
                  key={customer.id}
                  id={customer.id}
                  img={customer.image}
                  name={customer.name}
                  birth={customer.birth}
                  gender={customer.gender}
                  job={customer.job}
                />
              ))
            : "Data Fetching..."}
        </TableBody>
      </Table>
    </Paper>
  );
}
