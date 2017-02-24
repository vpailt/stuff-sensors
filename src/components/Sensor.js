import React from 'react'
import { connect } from 'react-redux'

import Value from '../types/Value'
import SensorType from '../types/SensorType'

import './Sensor.css'
import * as d3 from 'd3'

const Sensor = ({id, name, type, data, noSensor}) => {
  const unit = (type) => {
    const units = {}
    units[SensorType.TEMPERATURE] = "°C"
    units[SensorType.PERCENT] = "%"
    return units[type] || ""
  }
  const value  = (v, t) => {
    if(v instanceof Value ){
      return v.toString()
    }
    switch(t){
      case SensorType.PERCENT: return (v*100).toFixed(2);
      case SensorType.TEMPERATURE: return (v*1).toFixed(1);
      default : return v;
    }
  }
  const values = data.map(((datum,index) => (<tr key={index}><td>{value(datum, type)+" "+unit(type)}</td></tr>)));
  if(noSensor) {
    return (<div className="Sensor">nope</div>)
  }
  return (
    <div className="Sensor">
      <h1>{name}</h1>

      <h3>Valeur actuelle</h3>
      <p> <span className="badge">{value(data.slice(-1), type)+" "+unit(type)}</span></p>
      <h3>Historique</h3>
      <table>
        <tbody>
        <div className="chart"></div>
        <Content className="comp" test={values}></Content>
        </tbody>
      </table>
    </div>
  )
/*
    return (
        <div className="Sensor">
            <h1>{name}</h1>

            <h3>Valeur actuelle</h3>
            <p> <span className="badge">{value(data.slice(-1), type)+" "+unit(type)}</span></p>
            <h3>Historique</h3>
            <svg width="800" height="300">
            </svg>
                {test()}

        </div>
    )*/
    function test() {
        var p1 = 'M 0 0 L 10 0 L 10 10 L 20 10 L 30 10 L 30 0 L 40 0 L 50 0 ';
        //var p2 = 'M 10 20 L 20 20 L 20 30 L 10 30 L 10 20';

        var paths = [{
            path: p1,
            fill: false
        }];

        var svg = d3.select('svg');
        console.log(svg);
        svg.append("g")
            .attr("transform", "scale(10)")
            .selectAll('.block') // (2)
            .data(paths) // (3)
            .enter() // data to be linked to DOM
            .append("svg:path") // (4)
            .attr("d", function (d) { // (5.2)
                return d.path;
            })
            .classed('fill', function (d) {
                return d.fill
            })
            .classed('no-fill', function (d) {
                return !d.fill
            });
    }
}

class Content extends React.Component {

    componentWillMount() {
        console.log('Component WILL MOUNT!')
    }

    componentDidMount() {

        /*if(valnul="onoff") {
         console.log('Allow')
         var svgContainer = d3.select(".onoff").selectAll("div")
         .data(this.props.test).enter().append("svg")
         .attr("width", 200)
         .attr("height", 200);
         var circle = svgContainer.append("circle")
         .attr("cx", 30)
         .attr("cy", 30)
         .attr("r", 20);
         }
         else {*/

        console.log('Component DID MOUNT!')
        var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 1000]);

        console.log(this.props.test)

        d3.select(".chart") //
            .selectAll("div")
            .data(this.props.test)
            .enter().append("div")
            .style("width", function (d) {
                return x(d.props.children.props.children) + "px";
            })
            .text(function (d) {
                return d.props.children.props.children;
            });
        //}

        console.log('Fin du composant');
    }

    componentWillReceiveProps(newProps) {
        console.log('Component WILL RECIEVE PROPS!')
    }

    shouldComponentUpdate(newProps, newState) {
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('Component WILL UPDATE!');
        d3.select(".chart").selectAll("div").remove();
        d3.select(".onoff").selectAll("div").remove();

    }

    componentDidUpdate(prevProps, prevState) {
        console.log('Component DID UPDATE!');

        /*if(valnul="onoff") {
         console.log('Allow                                         ----- ')
         var svgContainer = d3.select(".onoff").data(this.props.test).enter().append("svg")
         .attr("width", 200)
         .attr("height", 200);
         var circle = svgContainer.append("circle")
         .attr("cx", 30)
         .attr("cy", 30)
         .attr("r", 20);
         }
         else {*/
        var x = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 1000]);

        console.log(this.props.test)

        d3.select(".chart") //
            .selectAll("div")
            .data(this.props.test)
            .enter().append("div")
            .style("width", function(d) { return x(d.props.children.props.children) + "px"; })
            .text(function(d) { return d.props.children.props.children; });
        //}


        console.log('Fin du composant');
    }

    componentWillUnmount() {
        console.log('Component WILL UNMOUNT!')
        d3.select(".comp").remove();
    }

    render() {

        return (
            <div>

            </div>
        );
    }
}

export default connect(
    (state, ownProp) => {
      const sensor = state.sensors.filter((s) => (s.id === ownProp.params.id))
      if(sensor.length === 1){
        return { ...sensor[0], noSensor: false}
      }
      return {noSensor:true}
    }
  )(Sensor)
