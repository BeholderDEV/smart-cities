import React, { Component } from "react";
import { Grid, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Skeleton from 'react-loading-skeleton';

class Users extends Component {
  state = {
    isLoading: true,
    users: [],
    error: null
  }
  fetchUsuarios() {
    // Where we're fetching data from
    fetch(`https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/users`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          users: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount() {
    this.fetchUsuarios();
  }
  render() {
    const { isLoading, users, error } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12} >
              <Card
                title="Usuários"
                category="Lista com todos os usuários do sistema"
                ctTableFullWidth
                ctTableResponsive
                content={
                  <div>
                        {!isLoading ? (
                          <ListGroup >
                            {users.map(user => {
                              return (
                                <ListGroupItem key={user.name}>
                                  {user.name}
                                </ListGroupItem>
                              );
                            })}
                          </ListGroup>
                        // If there is a delay in data, let's let the user know it's loading
                        ) : (
                          <h1><Skeleton count={6}/></h1>
                        )}
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Users;