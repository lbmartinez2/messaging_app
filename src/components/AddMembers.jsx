import React, { useEffect } from "react";
import { BASE_URL, customStyles } from "../helpers/constants";
import { getAuthHeaders } from "../helpers/functions";
import AsyncSelect from "react-select/async";
import { useState } from "react";
import { getAllUsers } from "../App";

function AddMembers(props) {
    const headers = getAuthHeaders();
    const [selectedOption, setSelectedOption] = useState(null);
    const [userOptions, setUserOptions] = useState([]);
    const [memberId, setMemberId] = useState("")

    useEffect(() => {
      async function fetchUserOptions() {
        try {
          const response = await getAllUsers();
          const options = await response.data.map((user) => ({
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
        setMemberId(selectedOption.value);
        console.log("Member ID: " , memberId);
      }
    }, [selectedOption]);



    async function addMembers() {
        try {
            const data = await fetch(`${BASE_URL}/channel/add_member`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    ...headers,
                  },
                body: JSON.stringify({
                    id: props.channelId,
                    member_id: memberId,
                })
            })
            const response = await data.json();
            console.log(response);
        }
        catch (err) {
            console.error(err);
        }
    }

    function handleSubmit(e) {
         e.preventDefault();
         addMembers()
         e.target.reset();
    }


  return (
    <form className='add-members-form' onSubmit={handleSubmit}>
        <label htmlFor="add-member-input">Add a member to this channel</label>
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
      />
        <button className="submit-add-member">Add Member</button>
    </form>
  )
}

export default AddMembers