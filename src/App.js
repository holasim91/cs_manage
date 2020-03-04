import React from "react";
import "./App.css";
import Customer from "./components/Customer";
import Paper from '@material-ui/core/Paper'
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import {makeStyles} from '@material-ui/core/styles'

const theme = {
  spacing: 4,
}


const useStyles = makeStyles(
  {
  root:{
    width:'100%',
    overflowX: 'auto',
    marginTop:theme.spacing

  },
  table:{
    minWidth : 1080
  }
});

const customers = [
  {
    id: 1,
    img: "https://placeimg.com/64/64/1",
    name: "Thor",
    birth: "950413",
    gender: "male",
    job: "son of odin"
  },
  {
    id: 2,
    img: "https://placeimg.com/64/64/2",
    name: "Natasha",
    birth: "920222",
    gender: "female",
    job: "Black Widow"
  },
  {
    id: 3,
    img: "https://placeimg.com/64/64/3",
    name: "Peter Quill",
    birth: "910413",
    gender: "male",
    job: "Star Lord"
  }
];

export default function App() {
  const classes = useStyles()
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
          {customers.map(customer => (
            <Customer
              key={customer.id}
              id={customer.id}
              img={customer.img}
              name={customer.name}
              birth={customer.birth}
              gender={customer.gender}
              job={customer.job}
            />
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

