import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";

function UserList(props) {
  const [users, setUsers] = useState(props.users);
  const [isMaleSelected, setMaleSelected] = useState(true);
  const [isFemaleSelected, setFemaleSelected] = useState(true);
  const [search, setSearch] = React.useState("");

  useEffect(() => {
    setUsers(users);
  }, [users]);

  function filterUsers(isMaleSelected, isFemaleSelected, search) {
    let userList = props.users;
    if (isMaleSelected && !isFemaleSelected) {
      userList = userList.filter((item, index) => {
        return item.gender == "Male";
      });
    } else if (!isMaleSelected && isFemaleSelected) {
      userList = userList.filter((item, index) => {
        return item.gender == "Female";
      });
    } else if (!isMaleSelected && !isFemaleSelected) {
      userList = userList.filter((item, index) => {
        return item.gender != "Female" && item.gender != "Male";
      });
    }
    if (search) {
      userList = userList.filter(
        (item) =>
          item.first_name.toLowerCase().includes(search.toLowerCase()) ||
          item.last_name.toLowerCase().includes(search.toLowerCase()) ||
          item.email.toLowerCase().includes(search.toLowerCase())
      );
    }
    setUsers(userList);
  }

  const handleSearch = (event) => {
    let inputValue = event.target.value;
    setSearch(inputValue);
    if (inputValue) {
      filterUsers(isMaleSelected, isFemaleSelected, inputValue);
    } else {
      filterUsers(isMaleSelected, isFemaleSelected, "");
    }
  };

  return (
    <div className="user-list">
      <Row className="pb-3">
        <Col lg={6}>
          <div role="group" aria-labelledby="checkbox-group">
            <label className="label-btn">
              <input
                type="checkbox"
                name="gender"
                value="Female"
                onChange={(e) => {
                  setFemaleSelected(e.target.checked);
                  filterUsers(isMaleSelected, e.target.checked);
                }}
                defaultChecked={isFemaleSelected}
              />
              Female
            </label>
            <label className="label-btn">
              <input
                type="checkbox"
                name="gender"
                value="Male"
                onChange={(e) => {
                  setMaleSelected(e.target.checked);
                  filterUsers(e.target.checked, isFemaleSelected);
                }}
                defaultChecked={isMaleSelected}
              />
              Male
            </label>
          </div>
        </Col>
        <Col lg={6}>
          <label htmlFor="search">
            <input className="input" placeholder="Search here" id="search" type="text" onChange={handleSearch} />
          </label>
        </Col>
      </Row>
      {users && users.length > 0 ? (
        <>
          <Table responsive="lg" className="list-table">
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        "Empty List"
      )}
    </div>
  );
}

export { UserList };
