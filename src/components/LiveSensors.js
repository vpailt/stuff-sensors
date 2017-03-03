import React from 'react'
import './LiveSensors.css'

import SensorsList from './SensorsList'
import Broker from './Broker'

const LiveSensors = ( {children} ) => (
  <div className="LiveSensors" >
    <Broker className="Broker"/>
    <div className="wrapper">
      <SensorsList className="SensorsList"/>
      {children}
    </div>
    <footer className="footer">Valentin Pitel - <a href="https://github.com/vpailt/stuff-sensors">Git Hub TP Sensor</a></footer>
  </div>
)

export default LiveSensors
