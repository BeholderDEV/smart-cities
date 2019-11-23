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
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import Skeleton from 'react-loading-skeleton';

class Dashboard extends Component {
  createLegend(json) {
    var legend = [];
    for (var i = 0; i < json["names"].length; i++) {
      var type = "fa fa-circle text-" + json["types"][i];
      legend.push(<i className={type} key={i} />);
      legend.push(" ");
      legend.push(json["names"][i]);
    }
    return legend;
  }
  state = {
    isLoadingBuses: true,
    isLoadingUsers: true,
    isLoadingTracks: true,
    buses: [],
    users: [],
    tracks: [],
    error: null
  }
  fetchBuses() {
    fetch(`https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/buses/count`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          buses: data,
          isLoadingBuses: false,
        })
      )
      .catch(error => this.setState({ error, isLoadingBuses: false }));
  }
  fetchUsers() {
    fetch(`https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/users/count`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          users: data,
          isLoadingUsers: false,
        })
      )
      .catch(error => this.setState({ error, isLoadingUsers: false }));
  }
  fetchTracks() {
    fetch(`https://cors-anywhere.herokuapp.com/https://opksmartbusao.herokuapp.com/api/tracks/count`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          tracks: data,
          isLoadingTracks: false,
        })
      )
      .catch(error => this.setState({ error, isLoadingTracks: false }));
  }
  componentDidMount() {
    this.fetchBuses();
    this.fetchUsers();
    this.fetchTracks();
  }
  render() {
    const { isLoadingBuses,isLoadingUsers,isLoadingTracks, buses, users, tracks, error } = this.state;
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              {!isLoadingBuses ? (
                <StatsCard
                  bigIcon={<i className="pe-7s-car text-info" />}
                  statsText="Frota"
                  statsValue= {buses.count}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated now"
                />
              // If there is a delay in data, let's let the user know it's loading
              ) : (
                <Skeleton height={130}/>
              )}
            </Col>
            <Col lg={3} sm={6}>
              {!isLoadingUsers ? (
                <StatsCard
                  bigIcon={<i className="pe-7s-user text-warning" />}
                  statsText="Usuários"
                  statsValue= {users.count}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated now"
                />
              // If there is a delay in data, let's let the user know it's loading
              ) : (
                <Skeleton height={130}/>
              )}
            </Col>
            <Col lg={3} sm={6}>
            {!isLoadingTracks ? (
                <StatsCard
                  bigIcon={<i className="pe-7s-graph1 text-danger" />}
                  statsText="Rotas"
                  statsValue= {tracks.count}
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated now"
                />
              // If there is a delay in data, let's let the user know it's loading
              ) : (
                <Skeleton height={130}/>
              )}
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col>
          </Row>
          <Row>
            <Col md={8}>
              <Card
                statsIcon="fa fa-history"
                id="chartHours"
                title="Users Behavior"
                category="24 Hours performance"
                stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataSales}
                      type="Line"
                      options={optionsSales}
                      responsiveOptions={responsiveSales}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendSales)}</div>
                }
              />
            </Col>
            <Col md={4}>
              <Card
                statsIcon="fa fa-clock-o"
                title="Email Statistics"
                category="Last Campaign Performance"
                stats="Campaign sent 2 days ago"
                content={
                  <div
                    id="chartPreferences"
                    className="ct-chart ct-perfect-fourth"
                  >
                    <ChartistGraph data={dataPie} type="Pie" />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendPie)}</div>
                }
              />
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
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

export default Dashboard;
