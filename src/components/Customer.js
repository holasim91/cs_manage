import React from "react";

export default function Customer(props) {
  function CustomerProfile(){
    return(
      <div>
        <img src={props.img} alt='profile'/>
        <h2>{props.name}({props.id})</h2>
      </div>
    )
  }

  function CustomerInfo(){
    return(
      <div>
        <p>{props.birth}</p>
        <p>{props.gender}</p>
        <p>{props.job}</p>
      </div>
    )
  }
  return (
    <div>
      <CustomerProfile/>
      <CustomerInfo/>
    </div>
  );
}
