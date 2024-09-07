import React from "react";

function Alert(props) {
  return (
    <div style={{position:"fixed", left:"50%",transform:"translate(-50%,-50%)",top:"17%"}} >
      {
     props.alert && <div className={` alert alert-${props.alert.type} alert-dismissable fade show`} role="alert">
      {props.alert.message}
    </div>
}
    </div>

  );
}

export default Alert;
