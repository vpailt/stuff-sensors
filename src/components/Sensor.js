import React from 'react'
import { connect } from 'react-redux'

import Value from '../types/Value'
import SensorType from '../types/SensorType'

import './Sensor.css'

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
          {values}
        </tbody>
      </table>
    </div>
  )
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
