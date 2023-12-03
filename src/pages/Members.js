import React, { useContext, useEffect, useState } from "react";
import { memberContext } from "../App";
import "../styles/Members.css";

export default function Members() {
  const { members, setMembers, page, setPage } = useContext(memberContext);
  useEffect(() => {
    fetch(
      "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
    )
      .then((response) => response.json())
      .then((json) =>
        setMembers(json.map((member) => ({ ...member, checked: false })))
      );
  }, [setMembers]);
  const [pageMembers, setpageMembers] = useState([]);
  useEffect(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    setpageMembers(members.slice(start, end));
  }, [members, page, setMembers]);
  const ondelete = (id) => {
    const newMembers = members.filter((member) => member.id !== id);
    setMembers(newMembers);
    const start = (page - 1) * 10;
    const end = start + 10;
    setpageMembers(newMembers.slice(start, end));
  };
  const search = (e) => {
    // if (e.target.value === "") {
    const newMembers = members.filter(
      (member) =>
        member.id.toLowerCase().includes(e.target.value.toLowerCase()) ||
        member.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        member.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
        member.role.toLowerCase().includes(e.target.value.toLowerCase())
    );
    const start = (page - 1) * 10;
    const end = start + 10;
    setpageMembers(newMembers.slice(start, end));
    // }
  };

  const [selectedId, setselectedId] = useState([]);
  const selectRow = (id) => {
    setselectedId([...selectedId, id]);
    setpageMembers(
      pageMembers.filter((member) => {
        if (member.id === id) {
          member.checked = !member.checked;
        }
        return member;
      })
    );
  };

  const deleteSelected = () => {
    const newMembers = members.filter((member) => {
      if (selectedId.includes(member.id)) {
        return false;
      }
      return true;
    });
    setMembers(newMembers);
    // setselectedId([]);
    // const newMembers = members.filter((member) => member.id !== id);

    const start = (page - 1) * 10;
    const end = start + 10;
    setpageMembers(newMembers.slice(start, end));
    // setpageMembers(newMembers);
  };

  return (
    <div>
      <input type="text" placeholder="Search.." onChange={search} />
      <button onClick={deleteSelected}>delete</button>
      <table
        style={{
          border: "1px solid black",
          width: "100%",
          textAlign: "left",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        <tr>
          <th></th>
          <th>id</th>
          <th>name</th>
          <th>email</th>
          <th>role</th>
        </tr>
        {members ? (
          pageMembers.map((member) => {
            return (
              <tr>
                <input
                  type="checkbox"
                  checked={member.checked}
                  onChange={() => {
                    selectRow(member.id);
                  }}
                />
                <td>{member.id}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.role}</td>
                <td>
                  <button>edit</button>
                </td>
                <td>
                  <button onClick={() => ondelete(member.id)}>delete</button>
                </td>
              </tr>
            );
          })
        ) : (
          <h1>Loading...</h1>
        )}
      </table>
      <div>
        <button
          onClick={() => {
            setPage(1);
          }}
        >
          First
        </button>
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            } else {
              window.alert("Its the first page");
            }
          }}
        >
          prev
        </button>
        <span>{page}</span>
        <button
          onClick={() => {
            if (page < Math.ceil(members.length / 10)) {
              setPage(page + 1);
            } else {
              window.alert("no more pages");
            }
          }}
        >
          next
        </button>
        <button
          onClick={() => {
            setPage(Math.ceil(members.length / 10));
          }}
        >
          Last
        </button>
      </div>
    </div>
  );
}
