Sensor-Data-with-AWS
====================
This project illustrates how to ingest sensor data using AWS IoT platform, AWS Lambda and Amazon ElastiCache for Redis. The AWS IoT service makes it easy to securely connect devices to the cloud. Included in the AWS IoT platform is the Device Gateway which is a component that allows bi-directional low latency communication between  connected devices and AWS. The AWS IoT Rules engine is configured to trigger a AWS Lambda Node.js function (PersistSensorData.js) which will continously process and persist the IoT events into Amazon ElastiCache.

Author: Michael Labib

##Getting Started

Clone IoT-Sensor-Data-and-Amazon-ElastiCache </br>
Install Node.js locally or on Amazon EC2</br>

###Setup AWS IoT 
Create a Thing </br>
Connect a Device </br> 
Use Node.js </br>
Download public key, private key and certificate </br>

###Create ElastiCache Cluster with Redis Engine
Copy the Redis Endpoint

###Create the AWS Lambda function
Download the PersistSensorData.js application <br>
npm install redis </br>
Update the ElastiCache Redis endpoint in PersistSensorData.js </br>
Zip up the PersistSensorData.js application along with the node_modules </br>
Name the zipped artifact PersistSensorData.zip and upload it to AWS Lambda </br>
Configure the AWS Lambda function to run in the same VPC as the ElastiCache for Redis cluster <br>

###Run Sensor Emulator on your machine
Download the temp-sensor.js Node.js application
npm install aws-iot-device-sdk </br>
npm install properties-reader </br>
npm install Faker </br>
Place your IoT certs in /utils directory that you downloaded from the AWS IoT service</br>
Update utils/iot-properties.file with the location of your certificates and Device Gateway endpoint</br>
node temp-sensor.js </br>







