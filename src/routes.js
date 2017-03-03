
import App from './components/App';
import LiveSensors from  './components/LiveSensors';
import Sensor from  './components/Sensor';
import HistoriqueSensor from  './components/HistoriqueSensor';
import Historique from  './components/Historique';
import BrokerStatus from './components/BrokerStatus'

export const getRoutes = (store) => {
const routes = [{
  path: '/',
  component: App,
  indexRoute: { onEnter: (nextState, replace) => replace('/liveSensor') },
  childRoutes: [
    { name:'live',
      path:'/liveSensor',
      component: LiveSensors,
      childRoutes: [
        { name: 'live_sensor',
          path:'/liveSensor/:id',
          component: Sensor,
          onEnter: (nextState, replace) => {
            const state = store.getState();
            if(state.sensors.filter((s) => (s.id === nextState.params.id)).length === 0 ){
              replace('/liveSensor')
            }
          }
        }
      ],
      indexRoute: { name: 'broker_status', component: BrokerStatus },
    },
      {
          name:'historique',
          path:'/historique',
          component: HistoriqueSensor,
          childRoutes: [
              { name: 'historique_sensor',
                  path:'/historique/:id',
                  component: Historique,
                  onEnter: (nextState, replace) => {
                      const state = store.getState();
                      if(state.sensors.filter((s) => (s.id === nextState.params.id)).length === 0 ){
                          replace('/historique')
                      }
                  }

              }
          ],
      }
  ]
}]
return routes;
}

export default getRoutes
