module.exports = function(RED) {
    'use strict';
    function es80aNode(n) {
        RED.nodes.createNode(this,n);
        this.gpioPin = Number(n.gpioPin);
        this.angle = (Number(n.angle) * 10 ) + 600;
        var node = this;

        var Gpio = require('pigpio').Gpio,
        motor = new Gpio(node.gpioPin, {mode: Gpio.OUTPUT}),
        pulseWidth = node.angle;

        node.on('input', function (msg) {
            var move_servo = function(){
                motor.servoWrite(pulseWidth);
            };

            move_servo();

            function start_servo(){
               setInterval(function(){
                    move_servo();
                },1000);
            }

            var servo_stop = function(){
                clearInterval(move_servo);
            }

            start_servo();

            setTimeout(servo_stop,2000);
            node.send(msg);
        });
    
        node.on('close',function(){
            //servo_stop;
        });
    }
    RED.nodes.registerType("ES80A",es80aNode);

}