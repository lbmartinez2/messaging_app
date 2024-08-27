import { Link, Navigate } from "react-router-dom";
import { BASE_URL } from "../helpers/constants";


  export function getAuthHeaders() {
    const headers = JSON.parse(localStorage.getItem("headers"));
    return headers;
  }

  export function setCurrentId(id) {
    localStorage.setItem("current_id", id);
  }

  export function getCurrentId() {
    return localStorage.getItem("current_id");
  }

  export function setName(name) {
    localStorage.setItem("name", name);
  }

  export function getName() {
    return localStorage.getItem("name");
  }

  export async function getRecentDMs() {
    const headers = getAuthHeaders();
    try {
      const data = await fetch(`${BASE_URL}/users/recent`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      const response = await data.json();
      // console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  export async function getChannelMembers() {
    const headers = getAuthHeaders();
    const currentID = getCurrentId();
    try {
      const data = await fetch(`${BASE_URL}/channels/${currentID}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      const response = await data.json();
      // console.log(response.data);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  export async function getUserChannels() {
    const headers = getAuthHeaders();
    try {
      const data = await fetch(`${BASE_URL}/channels`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          ...headers,
        },
      });
      const response = await data.json();
      return response.data;
    } catch (err) {
      console.error(err);
    }
  }

  export function handleLogOut() {
    localStorage.removeItem('headers');
  }
  

  
  