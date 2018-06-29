module.exports = function(RED) {
    'use strict';
    function es80aNode(n) {
        RED.nodes.createNode(this,n);
        this.gpioPin = Number(n.gpioPin);
        this.angle = (Number(n.angle) * 10 ) + 600;
        
        console.log("gpioPin is " + this.gpioPin + " PWM is " +this.angle );
        var node = this;

    
        var Gpio = require('pigpio').Gpio,
        motor = new Gpio(node.gpioPin, {mode: Gpio.OUTPUT}),
        pulseWidth = node.angle;

        console.log("init");

        node.on('input', function (msg) {
            console.log("node.on");
            
            var start = start_supply(mortor,node.angle); // interval
            
            move_servo(motor,node.angle); //即時実行
            console.log("move_servo");

            start;

            setTimeout(stop_supply(start),start,2000);

            node.send(msg);
        });
    
        node.on('close',function(){
            stop_supply(start);
        });
    }
    RED.nodes.registerType("ES80A",es80aNode);

}

function start_supply(_motor,_angle){
    console.log("interval");
    setInterval(function(){
        move(_motor,_angle);
    },1000);
    return true;
}

function stop_supply(func){
    clearInterval(func);
    return true;
}

function move(_motor,_angle){
    motor.servoWrite(_angle);
    return true;
}