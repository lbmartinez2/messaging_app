import React, { useState, useEffect } from "react";
import { getAllUsers } from "../App";
import { useDebouncedCallback } from 'use-debounce';

function Search(props) {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);
  const debouncedChange = useDebouncedCallback(handleChange, 500);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUsers = await getAllUsers();
        setUsers(fetchedUsers.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchData();
  }, []);

  function handleChange(e) {
      setfilteredUsers(() => {
        return users.filter(user => user.email.includes(e.target.value));
      })
  }

  return (
    <>
      <input type="text" className="search-input" onChange={(e) => debouncedChange(e)}/>
      <div>
        <ul>
            {filteredUsers && filteredUsers.map((user, index) => <li className="search-user" key={index}>{user.email}</li>)}
        </ul>
      </div>
    </>
  );
}

export default Search;