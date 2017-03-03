/**
 * Created by valentinpitel on 20/02/2017.
 */

import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import HistoriqueSensorItem from './HistoriqueSensorItem'

//import './SensorsList.css'

const ListHistorique = ({sensors}) => {
    let listOf = sensors.map( (sensor) => {
        return (<HistoriqueSensorItem
            key={sensor.id}
            {...sensor}
        />)})
    if(listOf.length === 0) {
        listOf = (<h3>&empty;</h3>);
    }

    return (
        <div>
            <h2> Sensors </h2>
            <ul>
                {listOf}
            </ul>
        </div>
    )
}

ListHistorique.PropTypes = {
    sensors: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.bool.isRequired,
        type: PropTypes.object.isRequired,
        data: PropTypes.array.isRequired,
    }).isRequired).isRequired
}

export default connect(
    (state) => (
        {
            sensors: state.sensors
        })
)(ListHistorique)