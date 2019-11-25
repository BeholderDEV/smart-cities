import React, { Component } from "react";
import { Grid, Row, Col, Table, Modal, FormGroup, FormControl, ControlLabel, Button } from "react-bootstrap";
import { FormInputs } from "components/FormInputs/FormInputs.jsx";

import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";
import Skeleton from 'react-loading-skeleton';
import { ENGINE_METHOD_NONE } from "constants";
import CustomButton from "components/CustomButton/CustomButton";



class Frota extends Component {
  state = {
    isLoading: true,
    buses: [],
    error: null,
    edittingBus: false,
    addingBus: false,
    selectedBus: {},
    selectedBusId: "as",
    isLoadingEdit: true,
    deletingBus: false
  }

  fetchFrota() {
    fetch(`https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/buses`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          buses: data,
          isLoading: false
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }
  fetchSelectedBus(busId) {
    let url = `https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/buses/`+busId
    console.log(url)
    fetch(url)
      .then(response => response.json())
      .then(data =>
        this.setState({
          selectedBus: data[0],
          isLoadingEdit: false
        })
      )
      .catch(error => this.setState({ error, isLoadingEdit: false }));
  }
  deleteBus(id){
    let url = 'https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/buses/'+id
    {console.log(url)}
    fetch(url, {
      method: 'DELETE',
      headers: {'content-type': 'application/json'},
    }).then(() => {
      this.setState({isLoading: true, deletingBus: false});
      this.fetchFrota()
    }).catch(err => {
      console.error(err)
    });
  }
  handleDeleteBus(id){
    this.setState({ deletingBus: true, selectedBusId: id, isLoadingEdit:true })
    this.fetchSelectedBus(id);
  }
  handleBus(){
    // let obj = {
    //   number: newBusNumber,
    //   chassi: newBusChassi,
    //   seats: newBusSeats,
    //   totalCapacity: newBusCap
    // }
    // fetch('https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/buses/', {
    //   method: 'POST',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(obj)
    // }).then(() => {
    //   this.setState({isLoading: true});
    //   this.fetchFrota()
    // })
  }
  handleStartEdit(busId){
    this.setState({ edittingBus: !this.state.edittingBus, selectedBusId: busId, isLoadingEdit:true })
    this.fetchSelectedBus(busId);
  }
  componentDidMount() {
    this.fetchFrota();
  }
  render() {
    const { isLoading, buses, error, edittingBus, addingBus, selectedBus, selectedBusId, isLoadingEdit, deletingBus } = this.state;
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
                            <th>Assentos</th>
                            <th>Capacidade</th>
                            <th>Chassi</th>
                            <th>Lotação</th>
                            <th>Ações</th>
                          </tr>
                        </thead>
                        <tbody>
                          {buses.map(bus => {
                            return (
                              <tr key={bus._id}>
                                <td>{bus.number}</td>
                                <td>{bus.seats}</td>
                                <td>{bus.totalCapacity}</td>
                                <td>{bus.chassi}</td>
                                <td>{bus.passengersNum}</td>
                                <td style={{textAlign: "left"}}>
                                  <Button bsStyle="warning" bsSize="xsmall" style={{fontSize:"2rem", marginRight:"1rem", borderRadius:"50%"}} onClick={() => this.setState({ addingBus: !this.state.addingBus })}>
                                    <i className="pe-7s-map-marker" />
                                  </Button>
                                  <Button bsStyle="info" bsSize="xsmall" style={{fontSize:"2rem", marginRight:"1rem", borderRadius:"50%"}} onClick={() => this.handleStartEdit(bus._id)}>
                                    <i className="pe-7s-pen" />
                                  </Button>
                                  <Button bsStyle="danger" bsSize="xsmall" style={{fontSize:"2rem",borderRadius:"50%"}} onClick={() => this.handleDeleteBus(bus._id)}>
                                    <i className="pe-7s-close"/>
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
        <Modal show={this.state.addingBus} onHide={() => this.setState({addingBus: false})}>
          <Modal.Header closeButton>
            <Modal.Title>Adicionar Ônibus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          <form>
              <FormInputs
                ncols={["col-md-3", "col-md-5", "col-md-2","col-md-2"]}
                properties={[
                  {
                    label: "Número",
                    type: "number",
                    bsClass: "form-control",
                    placeholder: "000"

                  },
                  {
                    label: "Chassi",
                    type: "text",
                    bsClass: "form-control",
                    placeholder: "XXXXXXXXXX"
                  },
                  {
                    label: "Acentos",
                    type: "number",
                    bsClass: "form-control",
                    placeholder: "42"
                  },
                  {
                    label: "Capacidade",
                    type: "number",
                    bsClass: "form-control",
                    placeholder: "60"
                  }
                ]}
              />
              
              <div className="clearfix" />
            </form>
            <CustomButton bsStyle="info" fill onClick={this.handleBus}>
              Adicionar
            </CustomButton>
            
          </Modal.Body>
        </Modal>
        
        <Modal show={this.state.deletingBus} onHide={() => this.setState({deletingBus: false})}>
          <Modal.Header closeButton>
            <Modal.Title>Remover Ônibus</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Quer mesmo remover o Ônibus {edittingBus?<Skeleton width={100}></Skeleton> : selectedBus.number}?</p>
            <CustomButton bsStyle="danger" fill onClick={() => this.deleteBus(selectedBusId)}>
              Remover
            </CustomButton>
            
          </Modal.Body>
        </Modal>

        <Modal show={this.state.edittingBus} onHide={() => this.setState({edittingBus: false})}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Ônibus <small>{selectedBusId}</small></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          {isLoadingEdit ? (
            <Row>
              <Col md={3}>
                <Skeleton height={40}></Skeleton>
              </Col>
              <Col md={5}>
                <Skeleton height={40}></Skeleton>
              </Col>
              <Col md={2}>
                <Skeleton height={40}></Skeleton>
              </Col>
              <Col md={2}>
                <Skeleton height={40}></Skeleton>
              </Col>
            </Row>
          )
              :
              (<form>
                {console.log(selectedBus)}
                <FormInputs
                  ncols={["col-md-3", "col-md-5", "col-md-2","col-md-2"]}
                  properties={[
                    {
                      label: "Número",
                      type: "number",
                      bsClass: "form-control",
                      placeholder: "000",
                      defaultValue: selectedBus.number
                    },
                    {
                      label: "Chassi",
                      type: "text",
                      bsClass: "form-control",
                      placeholder: "XXXXXXXXXX",
                      defaultValue: selectedBus.chassi
                    },
                    {
                      label: "Acentos",
                      type: "number",
                      bsClass: "form-control",
                      placeholder: "42",
                      defaultValue: selectedBus.seats
                    },
                    {
                      label: "Capacidade",
                      type: "number",
                      bsClass: "form-control",
                      placeholder: "60",
                      defaultValue: selectedBus.totalCapacity
                    }
                  ]}
                />
                <CustomButton bsStyle="info" pullRight fill type="submit">
                  Atualizar
                </CustomButton>
                <div className="clearfix" />
              </form>)
            }
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default Frota;