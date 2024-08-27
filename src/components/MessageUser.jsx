import React, { useEffect, useState } from "react";
import { BASE_URL } from "../helpers/constants";
import { getChannelMembers, getUserChannels, setCurrentId } from "../helpers/functions";
import { getAllUsers } from "../App";
import { useDebouncedCallback } from "use-debounce";
import { Link, defer } from "react-router-dom";
import UserItem from "./UserItem";

function MessageUser() {
  const debouncedChange = useDebouncedCallback(handleChange, 500);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [friendList, setfilteredFriends] = useState([]);
  const [seachTerm, setSearchTerm] = useState("");

  async function filterDMSearch() {
  
    setFilteredUsers(JSON.parse(localStorage.getItem("filteredUsers")));

    if (!filteredUsers) {
      const allUserChannels = await getUserChannels();
      const allChannelMembers = await Promise.all(
        allUserChannels.map((channel) => getChannelMembers(channel.id))
      );
      const allMembers = allChannelMembers.flatMap(
        (channel) => channel.channel_members
      );



      // console.log('members: ', allMembers)
      const allUsers = await getAllUsers();
      // console.log('allUsers: ', allUsers)
      const filteredUsers = await allUsers.data.filter((user) =>
        allMembers.some((member) => member.user_id === user.id)
      );
      setFilteredUsers(await filteredUsers);
      console.log(filteredUsers);
      localStorage.setItem("filteredUsers", JSON.stringify(filteredUsers));



    }


  }

  useEffect(() => {
    filterDMSearch();
  }, []);

  function handleChange(e) {
    filterDMSearch();
    const searchTerm = e.target.value;
    if (searchTerm.trim() !== "") {
      setfilteredFriends(() => {
        return filteredUsers.filter((user) => user.email.includes(searchTerm));
      });
    } else {
      setfilteredFriends([]);
    }
  }


  return (
    <>
      <input
        type="text"
        className="search-input"
        onChange={(e) => debouncedChange(e)}
      />
      <div className="user-list-container">
        <ul className="user-list">
          {friendList.length > 0 &&
            friendList.map((user) => {
              return (
                <Link to={`messages/${user.id}`} key={user.id}>
                  <UserItem
                    userName={user.uid}
                    userId={user.id}
                    index={user.id}
                  />
                </Link>
              );
            })}
        </ul>
      </div>
    </>
  );
}

export default MessageUser;