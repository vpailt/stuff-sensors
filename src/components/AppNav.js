import React from "react"
import AppNavLink from "./AppNavLink"
import './AppNav.css'

const AppNav = () => (
  <nav className="AppNav">
    <ul>
      <li><AppNavLink to="liveSensor">Real Time Sensors</AppNavLink></li>
      <li><AppNavLink to="historique">Historique</AppNavLink></li>
    </ul>
  </nav>
)

export default AppNav
