import React, { useCallback, useState } from "react";
import axios from "axios";

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ8.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
const apiURL = "http://localhost:3001/api";

const authAxios = axios.create({
  baseURL: apiURL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

function Temp() {
  const [users, setUsers] = useState([]);
  const [requestError, setRequestError] = useState();

  const fetchData = useCallback(async () => {
    try {
      const resp = await authAxios.get("/users/all");
      setUsers(resp.data);
    } catch (e) {
      setRequestError(e.response.data);
    }
  }, []);
  return (
    <div>
      <button onClick={fetchData} style={{ backgroundColor: "blue" }}>
        Get Users
      </button>
      {users.map((user) => (
        <p key={user.id}>{user.name}</p>
      ))}
      {requestError && <p style={{ color: "red" }}>{requestError}</p>}
    </div>
  );
}

export default Temp;
