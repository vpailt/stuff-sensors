import axios from 'axios';

function fetch(request, callback) {
    axios.get(request)
        .then(response => {

          //  console.log("test : " + response.data)
            callback(response.data);
        });
}

export function getSensorsMeasures(idSensor, dateMin, dateMax, callback) {
    const request = `/sensors?idSensor=${idSensor}&dateMin=${dateMin}&dateMax=${dateMax}`;
    fetch(request, callback);
}