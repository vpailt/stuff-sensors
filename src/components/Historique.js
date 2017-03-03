/**
 * Created by valentinpitel on 24/02/2017.
 */

import React from 'react'
import { connect } from 'react-redux'

import Value from '../types/Value'
import SensorType from '../types/SensorType'
import * as measuresApi from '../api/MeasuresClient'

import './Sensor.css'

const Sensor = ({id, name, type, data, noSensor}) =>  {

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
    if(noSensor) {
        return (<div className="Sensor">nope</div>)
    }

    return (
        <div className="Sensor">
            <h1>{name}</h1>
            <h3>Valeur actuelle</h3>
            <p> <span className="badge">{value(data.slice(-1), type)+" "+unit(type)}</span></p>
            <h3>Historique</h3>
            <FormHistorique idSensor={name}/>
            <div id="historique"></div>
        </div>
    )
}

class FormHistorique extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listMeasures : [],
            idSensor: this.props.idSensor,
            dateMin: "",
            dateMax: "",
            debut: 0,
            fin: 9,
            numPage:1,
            submitted: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.processMeasures = this.processMeasures.bind(this);
    }

    processMeasures(payload) {
        this.setState({
            listMeasures: payload
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        console.log(value);
        if(value==="precedent") {
            if (this.state.debut != 0) {
                this.setState({
                    debut: this.state.debut - 9,
                    fin: this.state.fin - 9,
                });
            }
        }else if(value==="suivant") {
            console.log("test1");
                if (this.state.fin <= this.state.listMeasures.length - 1) {
                    this.setState({
                        debut: this.state.debut+9,
                        fin: this.state.fin+9
                    });
                    console.log("fin :" +this.state.fin +" | vraiFin :"+(this.state.listMeasures.length-1));

                }


        }else{
            const name = target.name;

            this.setState({
                [name]: value
            });
        }
            console.log(this.state.debut);
    }

    handleSubmit(event) {
        measuresApi.getSensorsMeasures(this.state.idSensor, this.state.dateMin, this.state.dateMax, this.processMeasures);
        this.setState({
            submitted: true,
            debut:0,
            fin:9
        });
        event.preventDefault();
    }

    afficageFormulaire(){
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Id du sensor :
                </label>
                    <input
                        name="SensorId"
                        type="text"
                        value={this.state.idSensor}
                        onChange={this.handleInputChange} />
                <br />
                <label>
                    Date minimum :
                </label>
                    <input
                        name="dateMin"
                        type="datetime-local"
                        onChange={this.handleInputChange} />
                <br />
                <label>
                    Date maximum :
                </label>
                    <input
                        name="dateMax"
                        type="datetime-local"
                        onChange={this.handleInputChange}
                        />
                <br />
                <input type="submit" value="Submit" />
            </form>
        );
    }

    render() {
        if (this.state.submitted) {
            var arrayValue = [];
            var interval=[];
            var fin;

            if(this.state.fin>this.state.listMeasures.length -1) {
                fin=this.state.listMeasures.length -1;
            }else
                fin=this.state.fin;

            for(var i =this.state.debut;i <= fin;i++){
                interval.push(this.state.listMeasures[i]);
            }
            var obj = interval;

            for (var i in obj)
            {
                var newObj = new Object();
                    if (obj[i].hasOwnProperty('value')) {
                        newObj.value=obj[i]['value'];
                    }
                    if (obj[i].hasOwnProperty('date')) {
                        newObj.date=obj[i]['date'];
                    }
                    arrayValue.push(newObj);

            }

            var values = arrayValue.map(((newObj,index) => (
                <tr key={index}>
                    <td>{newObj.date}</td>
                    <td>{newObj.value}</td>
                </tr>)));

            return (
            <div>
                {this.afficageFormulaire()}
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Valeur</th>
                            </tr>
                        </thead>
                        <tbody>
                            {values}
                        </tbody>
                    </table>
                <input type="button" onClick={this.handleInputChange} value="precedent"/> <input type="button" onClick={this.handleInputChange} value="suivant"/>
            </div>
            );
        }
        else {
            return (<div>{this.afficageFormulaire()}</div>);
        }

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
