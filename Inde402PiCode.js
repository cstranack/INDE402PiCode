
const five = require('johnny-five');
const board = new five.Board();
//do npm install axios
const axios = require("axios");
let titleSensor;
var date = new Date();

//var state = 'empty';


board.on("ready", function() {
  
  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  var tiltSensor = new five.Sensor("A0");
  let currentStatus = 'onTable';
  // When the sensor value changes, log the value
  tiltSensor.on("change", function(value) {
    var sensorValue = this.value;
    
    //console.log(sensorValue);
    if(sensorValue == 1023  && currentStatus === 'onTable'){
      currentStatus = 'drinking'
		axios.post('https://obscure-oasis-65355.herokuapp.com/addData', {
			state: 'Drinking',
			time: new Date().toLocaleTimeString(),
			date: new Date().toLocaleDateString()
		})
			.then((res) => {
				
				//console.log(value);
				console.log('Drinking at ' + new Date().toLocaleTimeString())
				//state = 'off';
			})
    
    } else if(sensorValue == 1 && currentStatus === 'drinking' ){
      currentStatus = 'onTable'
      axios.post('https://obscure-oasis-65355.herokuapp.com/addData', {
		  state: 'on Table',
		  time: new Date().toLocaleTimeString(),
		  date: new Date().toLocaleDateString()
	  })
		.then((res) => {
			
			//console.log(value);
			console.log('Bottle on the table at' + new Date().toLocaleTimeString())
		  })
    }
      
  });
});




