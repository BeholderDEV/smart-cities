/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, ListGroup, ListGroupItem } from "react-bootstrap";

class BusMap extends Component {

  constructor(props) {
    super(props)
    this.state = { isLoading: true }
  }

  async componentDidMount() {

    const { match: { params } } = this.props

    const response = await fetch(`https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/buses/chassi/${params.chassi}?includeSchedule=true`)
    const data = await response.json()
    const bus = data[0]

    document.querySelector('.navbar-brand').innerHTML = `Posição do Ônibus ${bus.chassi}`

    this.setState({ isLoading: false })
    this.showMap(bus, document.getElementById('bus-map'))
  }

  componentWillUnmount() {
    if (window.clearMap) {
      window.clearMap()
      window.hideMap()
    }
  }

  loadScript(path, attributes, position) {
    const id = 'script_' + path.replace(/(\/|\.|-)/g, '_')

    if (!document.getElementById(id)) {

      const head = document.getElementsByTagName("head")[0]
      const self = head.getElementsByTagName('script')[0]

      const scriptTag = document.createElement('script')

      scriptTag.id = id
      scriptTag.setAttribute('src', path)

      if (attributes) {
        for (let name in attributes) {
          scriptTag.setAttribute(name, attributes[name])
        }
      }

      if (position == 'first') {
        head.insertBefore(scriptTag, self.nextSibling)
      }
      else {
        head.appendChild(scriptTag)
      }
    }
  }

  showMap(bus, container) {

    if (!window.showBusMap) {

      window.mapsApiKey = process.env.REACT_APP_MAPS_KEY
      this.loadScript('/js/google_maps.js')
      this.loadScript('https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js', { integrity: 'sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=', crossorigin: 'anonymous' })
      this.loadScript('/js/bus_map.js')

      setTimeout(() => this.showMap(bus, container), 1000)
    }
    else {
      window.showBusMap(bus, container)
    }
  }

  render() {
    const { isLoading, bus } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          {isLoading ?
            (
              <Row>
                <Col md={12} id="loading-map">Carregando...</Col>
              </Row>
            )
            :
            (
              <Row>
                <Col md={12} id="bus-status"></Col>
                <Col md={12} id="bus-map" style={{ height: '85vh' }}></Col>
              </Row>
            )
          }
        </Grid>
      </div >
    )
  }
}

export default BusMap;