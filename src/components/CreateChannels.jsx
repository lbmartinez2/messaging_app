import React, { useEffect, useState } from "react";
import { BASE_URL, customStyles } from "../helpers/constants";
import { getAuthHeaders } from "../helpers/functions";
import AsyncSelect from "react-select/async";
import { getAllUsers } from "../App";

function CreateChannels() {
  const headers = getAuthHeaders();
  const [selectedOption, setSelectedOption] = useState(null);
  const [userOptions, setUserOptions] = useState([]);

  const activeUser = JSON.parse(localStorage.getItem('activeUser'));
  const [members, setMembers] = useState([activeUser]);

  useEffect(() => {
    async function fetchUserOptions() {
      try {
        const response = await getAllUsers();
        const options = response.data.map((user) => ({
          value: user.id,
          label: user.uid,
        }));
        setUserOptions(options);
      } catch (error) {
        console.error("Error fetching user options:", error);
      }
    }
    fetchUserOptions();
  }, []);

  useEffect(() => {
    if (selectedOption) {
      setMembers([...selectedOption.map((option) => option.value), activeUser]);
    }
  }, [selectedOption]);

  async function handleCreateChannel(e) {
    e.preventDefault();
    const channel_data = new FormData(e.target);
    const members = selectedOption.map(option => option.value);

    try {
      const response = await fetch(`${BASE_URL}/channels`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
        body: JSON.stringify({
          name: channel_data.get("channelName"),
          user_ids: [...members, activeUser],
        }),
      });
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.error(err);
    }

    e.target.reset();
  }

  return (
    <form className="create-channel-form" onSubmit={handleCreateChannel}>
      <input
        type="text"
        className="channel-name-input"
        name="channelName"
        placeholder="Name the channel"
      />
      <AsyncSelect
        placeholder="Search Users"
        defaultOptions
        cacheOptions
        loadOptions={(inputValue, callback) => {
          setTimeout(() => {
            const filteredOptions = userOptions.filter((user) =>
              user.label.toLowerCase().includes(inputValue.toLowerCase())
            );
            callback(filteredOptions);
          }, 500);
        }}
        onChange={setSelectedOption}
        value={selectedOption}
        styles={customStyles}
        isMulti
      />
      <button type="submit" className="channel-create-btn btn">
        Create Channel
      </button>
    </form>
  );
}

export default CreateChannels;
