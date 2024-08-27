import React, { useEffect, useState } from "react";
import { getAuthHeaders, setCurrentId, setName } from "../helpers/functions";
import { BASE_URL } from "../helpers/constants";
import { Link, useNavigate } from "react-router-dom";
import ChannelItem from "./ChannelItem";


function ChannelsGet(props) {
  const headers = getAuthHeaders();
  const [channels, setChannels] = useState([]);

   
  async function getChannels() {
    try {
      const data = await fetch(`${BASE_URL}/channels`, {
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      const response = await data.json();
      setChannels(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getChannels();
  }, []);
  

  return (
    <>
      <ul className="channel-list">
        {channels
          ? channels.map((channel) => {
              return (
                <Link key={channel.id} to={`channels/${channel.id}`}>
                    <ChannelItem channelName={channel.name} channelId={channel.id} index={channel.id}/>
                </Link>
              );
            })
          : null}
      </ul>
    </>
  );
}

export default ChannelsGet;