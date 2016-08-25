/*
 * MIT License
 * 
 * Copyright (c) 2016 Michael Labib
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * 
 */  

var awsIot = require('aws-iot-device-sdk');
var Faker = require('Faker');
var PropertiesReader = require('properties-reader');

var properties = PropertiesReader('./utils/iot-properties.file');  

const device = awsIot.device({
	
  "host":       properties.get('host'),
	"port":       properties.get('port'),
	"clientId":   properties.get('clientId'),
	"thingName":  properties.get('thingName'),
	"caPath":     properties.get('caPath'),
	"certPath":   properties.get('certPath'),
	"keyPath":    properties.get('keyPath'),
  "region":     properties.get('region')

});    

device.on('connect', function() {  

console.log('\n===========Emulating Sensor Data=================\n'); 

  setInterval(function () {

         for (i=10; i>=0; i--) {
            //Generate Random Sensor Data        
            var temperature = Math.floor((Math.random() * 110) + 1);
            var deviceId = Math.floor((Math.random() * 5000) + 1);
            var IP =  Faker.Internet.ip();
            var humidity = Math.floor((Math.random() * 100) + 1);
                        
            console.log('deviceId= ' + deviceId + ' temperature= ' + temperature + ' humidity=' + humidity + ' IP=' + IP ); 
            device.publish('temp_readings', JSON.stringify (  
                
                          {  "deviceId" : deviceId, 
                             "temperature" : temperature,          
                             "deviceIP" : IP,
                             "humidity" : humidity         
                          }            
            ));     
       }  
   
   }, 4000);
     
});

