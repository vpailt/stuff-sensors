/**
 * Created by valentinpitel on 20/02/2017.
 */
import React from 'react'
import './LiveSensors.css'

import ListHistorique from './ListHistorique'
import Broker from './Broker'

const HistoriqueSensor = ( {children} ) => (
    <div className="LiveSensors" >
        <Broker className="Broker"/>
        <div className="wrapper">
            <ListHistorique className="ListHistorique"/>
            {children}
        </div>
        <footer className="footer">footer</footer>
    </div>
)

export default HistoriqueSensor