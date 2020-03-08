import React, { useState, useEffect } from "react";
import "./App.css";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, fade } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    minWidth: 1080
  },
  progress:{
    marginLeft: theme.spacing(2),
  },

  paper: {
    marginLeft: 18,
    marginRight: 18
  },
  menu: {
    marginTop: 15,
    marginBottom: 15,
    display: "flex",
    justifyContent: "center"
  },
  tableHead: {
    fontSize: "1.0rem"
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1,
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto"
    }
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit"
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: 120,
      "&:focus": {
        width: 200
      }
    }
  }
}));

export default function App() {
  const classes = useStyles();
  const cellList = ["ID", "사진", "이름", "생년월일", "성별", "직업", "설정"];
  const [customers, setCustomers] = useState([]);
  const [refresh, setRefresh] = useState({
    file: null,
    name: "",
    birth: "",
    gender: "",
    job: "",
    filename: ""
  });
  const [keyword, setKeyword] = useState({
    searchKeayword: ""
  });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/customers");
      const body = await res.json()
      return body
    }
    fetchData()
    .then(res => setCustomers(res))
    .catch(err => console.log(err))

    function tick() {
      setProgress(oldProgress => (oldProgress >= 100 ? 0 : oldProgress + 1))
    }
    const timer = setInterval(tick, 20);
    return () => {
      clearInterval(timer);
    };
  }, []);

  function RefreshState() {
    setRefresh(refresh);
    setKeyword(keyword);
    setProgress(progress)

    async function fetchData() {
      const res = await fetch("/api/customers");
      const body = await res.json()
      return body
    }
    fetchData()
    .then(res => setCustomers(res))
    .catch(err => console.log(err))
  }

  function handleValueChange(e) {
    e.preventDefault();
    setKeyword({ [e.target.name]: e.target.value });
  }

  function filteredComponents(data) {
    data = data.filter(c => {
      return c.name.indexOf(keyword.searchKeayword) > -1;
    });
    return data.map((customer, idx) => {
      return (
        <Customer
          stateRefresh={RefreshState}
          key={idx}
          index ={idx}
          id={customer.id}
          img={customer.image}
          name={customer.name}
          birth={customer.birth}
          gender={customer.gender}
          job={customer.job}
        />
      );
    });
  }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="open drawer"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.title} variant="h6" noWrap>
              고객관리 시스템
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                name="searchKeayword"
                value={keyword.name}
                onChange={handleValueChange}
              />
            </div>
          </Toolbar>
        </AppBar>

        <div className={classes.menu}>
          <CustomerAdd refreshState={RefreshState} />
        </div>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {cellList.map((cell, idx) => (
                <TableCell className={classes.tableHead} key={idx}>
                  {cell}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length!==0 ? (
              filteredComponents(customers)
            ) : (
              <TableRow>
                <TableCell colSpan="7" align="center">
                  <CircularProgress className={classes.progress} variant="determinate" value={progress} />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
