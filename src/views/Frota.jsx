import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Skeleton from 'react-loading-skeleton';

class Frota extends Component {
  state = {
    isLoading: true,
    buses: [],
    error: null
  }
  fetchUsers() {
    // Where we're fetching data from
    fetch(`https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/buses`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          buses: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount() {
    this.fetchUsers();
  }
  render() {
    const { isLoading, buses, error } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Frota da Empresa"
                category="Lista com todos os ônibus da empresa"
                ctTableFullWidth
                ctTableResponsive
                content={
                  
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Número</th>
                        <th>Assentos</th>
                        <th>Capacidade</th>
                        <th>Chassi</th>
                        <th>Lotação</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {!isLoading ? (
                        buses.map(bus => {
                          return (
                            <tr key={bus.number}>
                              <td>{bus.number}</td>
                              <td>{bus.seats}</td>
                              <td>{bus.totalCapacity}</td>
                              <td>{bus.chassi}</td>
                              <td>{bus.passengersNum}</td>
                              <td style={{textAlign: "center"}}><a href="#"><i className="pe-7s-map-marker" /></a><a href="#"><i className="pe-7s-pen" /></a></td>
                            </tr>
                          );
                        })
                      // If there is a delay in data, let's let the user know it's loading
                      ) : (
                        <tr ><Skeleton width={100} count={10}/></tr>
                      )}
                    </tbody>
                  </Table>
                  
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Frota;