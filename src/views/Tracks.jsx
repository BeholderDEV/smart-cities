import React, { Component } from "react";
import { Grid, Row, Col, Table, Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Skeleton from 'react-loading-skeleton';

class Tracks extends Component {
  state = {
    isLoading: true,
    tracks: [],
    error: null
  }
  fetchTracks() {
    // Where we're fetching data from
    fetch(`https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/tracks`)
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the users state
      .then(data =>
        this.setState({
          tracks: data,
          isLoading: false,
        })
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }
  componentDidMount() {
    this.fetchTracks();
  }
  render() {
    const { isLoading, tracks, error } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col md={12}>
              <Card
                title="Rotas da Empresa"
                category="Lista com todos os ônibus da empresa"
                ctTableFullWidth
                ctTableResponsive
                headerButtons={
                  <Button bsStyle="success" bsSize="xsmall" style={{border:"none", fontSize:"3rem"}} onClick={() => this.setState({ addingBus: !this.state.addingBus })}>
                    <i className="pe-7s-plus" />
                  </Button>
                }
                content={
                  <div>
                    {!isLoading ? (
                      <Table striped hover>
                        <thead>
                          <tr>
                            <th>Número</th>
                            <th>Nome</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tracks.map(bus => {
                            return (
                              <tr key={bus.number}>
                                <td>{bus.number}</td>
                                <td>{bus.name}</td>
                                <td style={{textAlign: "left"}}>
                                  <Button bsStyle="warning" bsSize="xsmall" style={{fontSize:"2rem", marginRight:"1rem", borderRadius:"50%"}} onClick={() => this.setState({ addingBus: !this.state.addingBus })}>
                                    <i className="pe-7s-map-marker" />
                                  </Button>
                                  <Button bsStyle="info" bsSize="xsmall" style={{fontSize:"2rem", marginRight:"1rem", borderRadius:"50%"}} onClick={() => this.handleStartEdit(bus._id)}>
                                    <i className="pe-7s-pen" />
                                  </Button>
                                  <Button bsStyle="danger" bsSize="xsmall" style={{fontSize:"2rem", borderRadius:"50%"}} onClick={() => this.deleteBus(bus._id)}>
                                    <i className="pe-7s-close" />
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}

                        </tbody>
                      </Table>
                    // If there is a delay in data, let's let the user know it's loading
                    ) : (
                      <h1><Skeleton count={10}/></h1>
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

export default Tracks;