import React from "react";
import { setCurrentId, setName } from "../helpers/functions";

function UserItem(props) {
  return (
    <li
      className="user-list-item"
      key={props.index}
      onClick={() => {
        setCurrentId(props.userId);
        setName(props.userName);
      }}
    >
      {props.userName}
    </li>
  );
}

export default UserItem;