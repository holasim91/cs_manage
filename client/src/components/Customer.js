import React from "react";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from "./CustomerDelete";


export default function Customer(props) {
  // function CustomerProfile(){
  //   return(
  //     <div>
  //       <img src={props.img} alt='profile'/>
  //       <h2>{props.name}({props.id})</h2>
  //     </div>
  //   )
  // }

  // function CustomerInfo(){
  //   return(
  //     <div>
  //       <p>{props.birth}</p>
  //       <p>{props.gender}</p>
  //       <p>{props.job}</p>
  //     </div>
  //   )
  // }
  return (
      <TableRow>
        <TableCell>{props.id}</TableCell>
        <TableCell>
          <img src={props.img} alt="profile" width='64px' height='64px' />
        </TableCell>
        <TableCell>{props.name}</TableCell>
        <TableCell>{props.birth}</TableCell>
        <TableCell>{props.gender}</TableCell>
        <TableCell>{props.job}</TableCell>
        <TableCell><CustomerDelete refreshState={props.refreshState} id={props.id}/></TableCell>
      </TableRow>
  );
}
