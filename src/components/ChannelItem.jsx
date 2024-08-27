import React from "react";
import { setCurrentId, setName } from "../helpers/functions";
import { GrChannel } from "react-icons/gr";

function ChannelItem(props) {
  return (
    <li
      className="channel-list-item"
      key={props.index}
      onClick={() => {
        setCurrentId(props.channelId);
        setName(props.channelName);
      }}
    >
       <GrChannel />
      {props.channelName}
    </li>
  );
}

export default ChannelItem;