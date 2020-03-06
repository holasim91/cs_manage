import React from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import CustomerDelete from "./CustomerDelete";

export default function Customer(props) {
  return (
    <TableRow>
      <TableCell>{props.id}</TableCell>
      <TableCell>
        <img src={props.img} alt="profile" width="64px" height="64px" />
      </TableCell>
      <TableCell>{props.name}</TableCell>
      <TableCell>{props.birth}</TableCell>
      <TableCell>{props.gender}</TableCell>
      <TableCell>{props.job}</TableCell>
      <TableCell>
        <CustomerDelete refreshState={props.stateRefresh} id={props.id} />
      </TableCell>
    </TableRow>
  );
}
