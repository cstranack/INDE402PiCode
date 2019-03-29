
const five = require('johnny-five');
const board = new five.Board();
//do npm install axios
const axios = require("axios");
let titleSensor;
var date = new Date();

board.on("ready", function() {

  // Create a new generic sensor instance for
  // a sensor connected to an analog (ADC) pin
  var tiltSensor = new five.Sensor("A0");
  
  // When the sensor value changes, log the value
  tiltSensor.on("change", function(value) {
    console.log(value);
    var state = "open";
    var sensorValue = this.value;
    if(value > 200){
		axios.post('HEROKU URL here', {
			state: 'off',
            time: new Date().toLocaleTimeString(),
            date: new Date().toLocaleDateString()
		})
			.then((res) => {
				console.log('Drinking at ' + new Date().toLocaleTimeString())
			})
    
    } else{
      axios.post('HEROKU gitURL here', {
		  state: 'on',
		  time: new Date().toLocaleTimeString(),
		  date: new Date().toLocateDateString()
	  })
		.then((res) => {
			console.log('Bottle on the table at' + new Date().toLocaleTimeString())
		  })
      }
  });
});


