/**
 * Created by valentinpitel on 24/02/2017.
 */
import React from 'react'
import AppNavLink from './AppNavLink'

const liStyle = {
    margin:'1em'
}
const HistoriqueSensorItem = ({id, name}) => (
    <li style={liStyle}>
        <AppNavLink  to={`/historique/${id}`}>{name}</AppNavLink>
    </li>
)
export default HistoriqueSensorItem