import { Col, Row } from "react-bootstrap";
import React from "react";
import "./App.css";
import { AddUser, UserList } from "./User";
import Container from "react-bootstrap/Container";

export const userList = [
  {
    id: 1,
    first_name: "Jeanette",
    last_name: "Penddreth",
    email: "jpenddreth0@census.gov",
    gender: "Female",
  },
  {
    id: 2,
    first_name: "Giavani",
    last_name: "Frediani",
    email: "gfrediani1@senate.gov",
    gender: "Male",
  },
];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      users: userList,
    };
  }

  addUser = (value) => {
    let users = this.state.users;
    value.id = users.length + 1;
    users.push(value);
    this.setState({ users });
  };

  render() {
    const { users } = this.state;
    return (
      <div className="App">
        <Container>
          <label className="heading-h1">Candidates</label>
          <Row>
            <Col lg={12}>
              <UserList users={users} />
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <AddUser addUser={this.addUser} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default App;
