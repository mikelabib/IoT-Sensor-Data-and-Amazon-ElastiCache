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

 var redis = require("redis");

 exports.handler = function(event, context) {

 console.log("Request received:\n", JSON.stringify(event));
 console.log("Context received:\n", JSON.stringify(context));

 console.log(" deviceId:"    + event.deviceId +
             " temperature:" + event.temperature +
             " deviceIP:"    + event.deviceIP +
             " humidity:"    + event.humidity );

 client = redis.createClient("redis://your-elasticache-redis-endpoint-here:6379");
 multi = client.multi();

 var date = Date.now();
 var climate;

  if (event.temperature > 85 ) {

      multi.incr("climate:hot");
      climate = "hot";
      multi.publish("Warnings",
                             " deviceID:" + event.deviceId +
						                 "<font color='red'>  temperature:" + event.temperature + "</font>" +
						                 " awsRequestId:" + context.awsRequestId 	+
						                 " timestamp:" + date );

  } else if (event.temperature > 75 ) {

         multi.incr("climate:warm");
         climate = "warm";

  } else if (event.temperature > 65 ) {

         multi.incr("climate:cool");
         climate = "cool";

  } else {

         multi.incr("climate:cold");
         climate = "cold";
  }


 multi.zadd("SensorData", date, event.deviceId);

 multi.hmset(event.deviceId,  "temperature",  event.temperature,
                              "deviceIP",     event.deviceIP,
                              "humidity",     event.humidity,
                              "climate",      climate,
                              "timestamp",    date,
                              "awsRequestId", context.awsRequestId);

 multi.exec(function (err, replies) {

      if (err) {

       console.log('error updating event: ' + err);
			 context.fail('error updating event: ' + err);

		  } else {

			 console.log('updated event ' + replies);
			 context.succeed(replies);
       client.quit();

      }

 });

}
